'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { 
  thetaFiberStar, 
  thetaParticleStar, 
  thetaHierarchicalStar,
  thetaFabric2DStar,
  AFiberStar,
  AHierarchicalStar,
  degToRad,
  radToDeg,
  SURFACE_CHEMISTRIES,
  LIQUID_PROPERTIES
} from '@/lib/calculations'

interface PlotProps {
  width?: number
  height?: number
  className?: string
}

export function Figure1Plot({ width = 800, height = 400, className = '' }: PlotProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedChemistry, setSelectedChemistry] = useState('pdms')

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 50, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([1, 10])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, 180])
      .range([innerHeight, 0])

    // Generate data for different chemistries
    const chemistries = Object.entries(SURFACE_CHEMISTRIES)
    const DFiberStarRange = d3.range(1, 10.1, 0.1)

    chemistries.forEach(([key, chem]) => {
      const thetaY = degToRad(80) // Default contact angle for plotting
      const data = DFiberStarRange.map(d => ({
        x: d,
        y: radToDeg(thetaFiberStar(thetaY, d))
      })).filter(d => !isNaN(d.y))

      const line = d3.line<{x: number, y: number}>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', chem.color)
        .attr('stroke-width', key === selectedChemistry ? 3 : 2)
        .attr('stroke-opacity', key === selectedChemistry ? 1 : 0.7)
        .attr('d', line)
    })

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('D*₍ᵢᵦᵣₑ₎')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('Apparent Contact Angle (degrees)')

    // Add horizontal line at 140°
    g.append('line')
      .attr('x1', xScale(1))
      .attr('x2', xScale(10))
      .attr('y1', yScale(140))
      .attr('y2', yScale(140))
      .attr('stroke', '#666')
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7)

    g.append('text')
      .attr('x', xScale(8))
      .attr('y', yScale(140) - 5)
      .attr('fill', '#666')
      .style('font-size', '12px')
      .text('140° threshold')

  }, [width, height, selectedChemistry])

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Figure 1: Contact Angle vs Fiber Porosity</h3>
        <p className="text-sm text-gray-600 mb-3">
          Apparent contact angle of hexadecane on fibers for different surface chemistries
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SURFACE_CHEMISTRIES).map(([key, chem]) => (
            <button
              key={key}
              onClick={() => setSelectedChemistry(key)}
              className={`px-3 py-1 rounded text-sm ${
                selectedChemistry === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {chem.name}
            </button>
          ))}
        </div>
      </div>
      <svg ref={svgRef} width={width} height={height} className="border rounded" />
    </div>
  )
}

export function Figure2Plot({ width = 800, height = 400, className = '' }: PlotProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedChemistry, setSelectedChemistry] = useState('pdms')

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 50, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([1, 20])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, 180])
      .range([innerHeight, 0])

    // Generate data for different chemistries
    const chemistries = Object.entries(SURFACE_CHEMISTRIES)
    const DParticleStarRange = d3.range(1, 20.1, 0.1)

    chemistries.forEach(([key, chem]) => {
      const thetaY = degToRad(80) // Default contact angle for plotting
      const data = DParticleStarRange.map(d => ({
        x: d,
        y: radToDeg(thetaParticleStar(thetaY, d))
      })).filter(d => !isNaN(d.y))

      const line = d3.line<{x: number, y: number}>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', chem.color)
        .attr('stroke-width', key === selectedChemistry ? 3 : 2)
        .attr('stroke-opacity', key === selectedChemistry ? 1 : 0.7)
        .attr('d', line)
    })

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('D*₍ₚₐᵣₜᵢcₗₑ₎')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('Apparent Contact Angle (degrees)')

    // Add horizontal line at 140°
    g.append('line')
      .attr('x1', xScale(1))
      .attr('x2', xScale(20))
      .attr('y1', yScale(140))
      .attr('y2', yScale(140))
      .attr('stroke', '#666')
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7)

  }, [width, height, selectedChemistry])

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Figure 2: Contact Angle vs Particle Porosity</h3>
        <p className="text-sm text-gray-600 mb-3">
          Apparent contact angle of hexadecane on particles for different surface chemistries
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SURFACE_CHEMISTRIES).map(([key, chem]) => (
            <button
              key={key}
              onClick={() => setSelectedChemistry(key)}
              className={`px-3 py-1 rounded text-sm ${
                selectedChemistry === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {chem.name}
            </button>
          ))}
        </div>
      </div>
      <svg ref={svgRef} width={width} height={height} className="border rounded" />
    </div>
  )
}

export function Figure3Plot({ width = 800, height = 400, className = '' }: PlotProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedChemistry, setSelectedChemistry] = useState('pdms')

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 50, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([1, 10])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0])

    // Generate data for robustness and contact angle
    const chemistries = Object.entries(SURFACE_CHEMISTRIES)
    const DFiberStarRange = d3.range(1, 10.1, 0.1)

    chemistries.forEach(([key, chem]) => {
      const thetaY = degToRad(80) // Default contact angle for plotting
      
      // Contact angle data
      const contactData = DFiberStarRange.map(d => ({
        x: d,
        y: radToDeg(thetaFiberStar(thetaY, d))
      })).filter(d => !isNaN(d.y))

      // Robustness data
      const robustnessData = DFiberStarRange.map(d => {
        const lCap = 2.7e-3 // Capillary length for hexadecane
        const RFiber = 10e-6 // 10 μm fiber radius
        return {
          x: d,
          y: AFiberStar(thetaY, d, lCap, RFiber)
        }
      }).filter(d => !isNaN(d.y) && d.y > 0)

      // Plot contact angle (dashed line)
      const contactLine = d3.line<{x: number, y: number}>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(contactData)
        .attr('fill', 'none')
        .attr('stroke', chem.color)
        .attr('stroke-width', key === selectedChemistry ? 3 : 2)
        .attr('stroke-opacity', key === selectedChemistry ? 1 : 0.7)
        .attr('stroke-dasharray', '5,5')
        .attr('d', contactLine)

      // Plot robustness (solid line)
      const robustnessLine = d3.line<{x: number, y: number}>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX)

      g.append('path')
        .datum(robustnessData)
        .attr('fill', 'none')
        .attr('stroke', chem.color)
        .attr('stroke-width', key === selectedChemistry ? 3 : 2)
        .attr('stroke-opacity', key === selectedChemistry ? 1 : 0.7)
        .attr('d', robustnessLine)

      // Mark where A* < 1
      const unstablePoint = robustnessData.find(d => d.y < 1)
      if (unstablePoint) {
        g.append('circle')
          .attr('cx', xScale(unstablePoint.x))
          .attr('cy', yScale(unstablePoint.y))
          .attr('r', 4)
          .attr('fill', chem.color)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
      }
    })

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('D*₍ᵢᵦᵣₑ₎')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'currentColor')
      .style('text-anchor', 'middle')
      .text('Robustness (A*) / Contact Angle (°)')

    // Add horizontal line at A* = 1
    g.append('line')
      .attr('x1', xScale(1))
      .attr('x2', xScale(10))
      .attr('y1', yScale(1))
      .attr('y2', yScale(1))
      .attr('stroke', '#666')
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7)

    g.append('text')
      .attr('x', xScale(8))
      .attr('y', yScale(1) - 5)
      .attr('fill', '#666')
      .style('font-size', '12px')
      .text('A* = 1 threshold')

  }, [width, height, selectedChemistry])

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Figure 3: Robustness vs Fiber Porosity</h3>
        <p className="text-sm text-gray-600 mb-3">
          Robustness factor (solid lines) and apparent contact angle (dashed lines) for hexadecane
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SURFACE_CHEMISTRIES).map(([key, chem]) => (
            <button
              key={key}
              onClick={() => setSelectedChemistry(key)}
              className={`px-3 py-1 rounded text-sm ${
                selectedChemistry === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {chem.name}
            </button>
          ))}
        </div>
      </div>
      <svg ref={svgRef} width={width} height={height} className="border rounded" />
    </div>
  )
}
