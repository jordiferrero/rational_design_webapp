'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { 
  thetaFiberStar, 
  thetaFabric2DStar,
  AFiberStar,
  capillaryLength,
  degToRad,
  radToDeg,
  LIQUID_PROPERTIES
} from '@/lib/calculations'

interface DesignerPlotProps {
  liquid: string
  surfaceChemistry: string
  youngsAngle: number // degrees
  fiberDiameter: number // μm
  equation7Weight: number // 0-1
  currentDFiberStar: number | null // Current D*_fiber value
  targetStabilityValue: number // Target A* value for line termination
  width?: number
  height?: number
  className?: string
}

export function DesignerPlot({ 
  liquid,
  surfaceChemistry,
  youngsAngle,
  fiberDiameter,
  equation7Weight,
  currentDFiberStar,
  targetStabilityValue,
  width = 800, 
  height = 400, 
  className = '' 
}: DesignerPlotProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{x: number, aStar: number, contactAngle: number} | null>(null)
  const [dimensions, setDimensions] = useState({ width, height })

  // Make plot reactive to container size
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      const containerWidth = containerRef.current?.clientWidth || width
      const availableWidth = Math.max(containerWidth)
      const newWidth = availableWidth
      const newHeight = (newWidth / 800) * 400
      setDimensions({ width: newWidth, height: newHeight })
    }

    // Initial sizing
    updateDimensions()

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions()
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [width])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 60, bottom: 60, left: 60 }
    const innerWidth = dimensions.width - margin.left - margin.right
    const innerHeight = dimensions.height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Get liquid properties
    const liquidProps = LIQUID_PROPERTIES[liquid]
    if (!liquidProps) return

    // Calculate capillary length
    const lCapillary = capillaryLength(
      liquidProps.surfaceTension,
      liquidProps.density
    )

    // Convert fiber diameter to radius in meters
    const RFiber = (fiberDiameter * 1e-6) / 2

    // Convert Young's angle to radians
    const thetaY = degToRad(youngsAngle)

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([1, 10])
      .range([0, innerWidth])

    // Left y-axis for contact angle (0-160)
    const yScaleContactAngle = d3.scaleLinear()
      .domain([0, 160])
      .range([innerHeight, 0])

    // Right y-axis for A* (0-100)
    const yScaleAStar = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0])

    // Generate data for range of D*_fiber (1-10)
    const DFiberStarRange = d3.range(1, 10.01, 0.05)

    // Calculate A* and contact angle data
    const aStarData: Array<{x: number, y: number}> = []
    const contactAngleData: Array<{x: number, y: number}> = []

    DFiberStarRange.forEach(d => {
      // Calculate A*
      const aStar = AFiberStar(thetaY, d, lCapillary, RFiber)
      
      // Calculate contact angle using equation mixing
      const thetaFiber1D = thetaFiberStar(thetaY, d)
      const thetaFabric2D = thetaFabric2DStar(thetaY, d)
      const thetaConvolved = (1 - equation7Weight) * thetaFiber1D + equation7Weight * thetaFabric2D
      const contactAngle = radToDeg(thetaConvolved)

      // Only add points where A* >= targetStabilityValue (lines stop when A* < target)
      if (aStar >= targetStabilityValue && !isNaN(aStar) && !isNaN(contactAngle) && isFinite(aStar) && isFinite(contactAngle)) {
        aStarData.push({ x: d, y: aStar })
        contactAngleData.push({ x: d, y: contactAngle })
      }
    })

    // Track last valid points for X markers
    const lastValidAStar = aStarData.length > 0 ? aStarData[aStarData.length - 1] : null
    const lastValidContactAngle = contactAngleData.length > 0 ? contactAngleData[contactAngleData.length - 1] : null

    // Create line generators
    const contactAngleLine = d3.line<{x: number, y: number}>()
      .x(d => xScale(d.x))
      .y(d => yScaleContactAngle(d.y))
      .curve(d3.curveMonotoneX)

    const aStarLine = d3.line<{x: number, y: number}>()
      .x(d => xScale(d.x))
      .y(d => yScaleAStar(d.y))
      .curve(d3.curveMonotoneX)

    // Plot contact angle (solid blue line) - LEFT axis
    g.append('path')
      .datum(contactAngleData)
      .attr('fill', 'none')
      .attr('stroke', '#3B82F6')
      .attr('stroke-width', 2)
      .attr('d', contactAngleLine)

    // Plot A* (dashed green line) - RIGHT axis
    g.append('path')
      .datum(aStarData)
      .attr('fill', 'none')
      .attr('stroke', '#10B981')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('d', aStarLine)

    // Add X markers at termination points if lines were cut off
    if (lastValidAStar && aStarData.length > 0) {
      const lastPoint = aStarData[aStarData.length - 1]
      // Check if we stopped before reaching D* = 10
      if (lastPoint.x < 9.9) {
        const xPos = xScale(lastPoint.x)
        const yPosAStar = yScaleAStar(lastPoint.y)
        const yPosContactAngle = lastValidContactAngle ? yScaleContactAngle(lastValidContactAngle.y) : yPosAStar

        // X marker for contact angle line (blue)
        const xMarkerSize = 8
        g.append('g')
          .attr('transform', `translate(${xPos},${yPosContactAngle})`)
          .append('path')
          .attr('d', `M ${-xMarkerSize} ${-xMarkerSize} L ${xMarkerSize} ${xMarkerSize} M ${xMarkerSize} ${-xMarkerSize} L ${-xMarkerSize} ${xMarkerSize}`)
          .attr('stroke', '#3B82F6')
          .attr('stroke-width', 2)
          .attr('stroke-linecap', 'round')

        // X marker for A* line (green)
        if (lastValidAStar) {
          g.append('g')
            .attr('transform', `translate(${xPos},${yPosAStar})`)
            .append('path')
            .attr('d', `M ${-xMarkerSize} ${-xMarkerSize} L ${xMarkerSize} ${xMarkerSize} M ${xMarkerSize} ${-xMarkerSize} L ${-xMarkerSize} ${xMarkerSize}`)
            .attr('stroke', '#10B981')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')
        }
      }
    }

    // Add current position indicator if available
    if (currentDFiberStar !== null && currentDFiberStar >= 1 && currentDFiberStar <= 10) {
      const currentAStar = AFiberStar(thetaY, currentDFiberStar, lCapillary, RFiber)
      const currentThetaFiber1D = thetaFiberStar(thetaY, currentDFiberStar)
      const currentThetaFabric2D = thetaFabric2DStar(thetaY, currentDFiberStar)
      const currentThetaConvolved = (1 - equation7Weight) * currentThetaFiber1D + equation7Weight * currentThetaFabric2D
      const currentContactAngle = radToDeg(currentThetaConvolved)

      if (currentAStar >= targetStabilityValue) {
        const xPos = xScale(currentDFiberStar)
        const yPosAStar = yScaleAStar(currentAStar)
        const yPosContactAngle = yScaleContactAngle(currentContactAngle)

        // Vertical line indicating current position
        g.append('line')
          .attr('x1', xPos)
          .attr('x2', xPos)
          .attr('y1', 0)
          .attr('y2', innerHeight)
          .attr('stroke', '#EF4444')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '3,3')
          .attr('opacity', 0.7)

        // Point on contact angle line (blue)
        g.append('circle')
          .attr('cx', xPos)
          .attr('cy', yPosContactAngle)
          .attr('r', 6)
          .attr('fill', '#3B82F6')
          .attr('stroke', 'white')
          .attr('stroke-width', 2)

        // Point on A* line (green)
        g.append('circle')
          .attr('cx', xPos)
          .attr('cy', yPosAStar)
          .attr('r', 6)
          .attr('fill', '#10B981')
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
      }
    }

    // Add hover interactivity
    const hoverGroup = g.append('g')
      .attr('opacity', 0)

    const hoverLine = hoverGroup.append('line')
      .attr('stroke', '#666')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .attr('y1', 0)
      .attr('y2', innerHeight)

    const hoverCircleContactAngle = hoverGroup.append('circle')
      .attr('r', 5)
      .attr('fill', '#3B82F6')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)

    const hoverCircleAStar = hoverGroup.append('circle')
      .attr('r', 5)
      .attr('fill', '#10B981')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)

    const hoverText = hoverGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -10)
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')

    // Add invisible overlay for mouse tracking
    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .on('mousemove', function(event) {
        const [mouseX] = d3.pointer(event)
        const xValue = xScale.invert(mouseX)
        
        if (xValue >= 1 && xValue <= 10) {
          // Find closest data point (both arrays have same x values since built together)
          const closestIndex = aStarData.reduce((prevIdx, curr, idx) => 
            Math.abs(curr.x - xValue) < Math.abs(aStarData[prevIdx].x - xValue) ? idx : prevIdx,
            0
          )
          
          const closestPoint = aStarData[closestIndex]
          const contactAnglePoint = contactAngleData[closestIndex]

          if (closestPoint && contactAnglePoint) {
            const xPos = xScale(closestPoint.x)
            const yPosAStar = yScaleAStar(closestPoint.y)
            const yPosContactAngle = yScaleContactAngle(contactAnglePoint.y)

            hoverGroup.attr('opacity', 1)
            hoverLine.attr('x1', xPos).attr('x2', xPos)
            hoverCircleContactAngle.attr('cx', xPos).attr('cy', yPosContactAngle)
            hoverCircleAStar.attr('cx', xPos).attr('cy', yPosAStar)
            hoverText
              .attr('x', xPos)
              .text(`D* = ${closestPoint.x.toFixed(2)}, A* = ${closestPoint.y.toFixed(1)}, θ = ${contactAnglePoint.y.toFixed(1)}°`)

            setHoveredPoint({
              x: closestPoint.x,
              aStar: closestPoint.y,
              contactAngle: contactAnglePoint.y
            })
          }
        }
      })
      .on('mouseleave', () => {
        hoverGroup.attr('opacity', 0)
        setHoveredPoint(null)
      })

    // Add axes (all 4 sides to create a box)
    // Bottom X-axis
    const bottomAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
    
    bottomAxis.selectAll('text')
      .style('fill', 'currentColor')
    
    bottomAxis.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('D*fiber')

    // Top X-axis (plain line, no labels)
    const topAxis = g.append('g')
      .call(d3.axisTop(xScale).tickValues([]))
    
    topAxis.selectAll('line, path')
      .style('stroke', 'currentColor')

    // Left y-axis (Contact Angle) - colored blue
    const leftAxis = g.append('g')
      .call(d3.axisLeft(yScaleContactAngle))
    
    leftAxis.selectAll('text')
      .style('fill', '#3B82F6')
      .style('font-weight', '500')
    
    leftAxis.selectAll('line, path')
      .style('stroke', '#3B82F6')
    
    leftAxis.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', '#3B82F6')
      .style('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text('Contact Angle (°)')

    // Right y-axis (A*) - colored green
    const rightAxis = g.append('g')
      .attr('transform', `translate(${innerWidth},0)`)
      .call(d3.axisRight(yScaleAStar))
    
    rightAxis.selectAll('text')
      .style('fill', '#10B981')
      .style('font-weight', '500')
    
    rightAxis.selectAll('line, path')
      .style('stroke', '#10B981')
    
    // Right axis label - placed outside the plot area (to the right of the axis)
    svg.append('text')
      .attr('transform', `translate(${dimensions.width - 20}, ${margin.top + innerHeight / 2}) rotate(90)`)
      .attr('fill', '#10B981')
      .style('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text('Robustness A*')

    // // Add horizontal line at target stability value (on right axis scale)
    // g.append('line')
    //   .attr('x1', xScale(1))
    //   .attr('x2', xScale(10))
    //   .attr('y1', yScaleAStar(targetStabilityValue))
    //   .attr('y2', yScaleAStar(targetStabilityValue))
    //   .attr('stroke', '#666')
    //   .attr('stroke-dasharray', '5,5')
    //   .attr('opacity', 0.5)

  }, [dimensions.width, dimensions.height, liquid, surfaceChemistry, youngsAngle, fiberDiameter, equation7Weight, currentDFiberStar, targetStabilityValue])

  return (
    <div ref={containerRef} className={className}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="border rounded" />
      {/* {hoveredPoint && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          Hover: D* = {hoveredPoint.x.toFixed(2)}, A* = {hoveredPoint.aStar.toFixed(1)}, θ = {hoveredPoint.contactAngle.toFixed(1)}°
        </div>
      )} */}
    </div>
  )
}

