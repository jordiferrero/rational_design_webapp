'use client'

import { useEffect, useRef, useState } from 'react'

interface ContactAngleDiagramProps {
  contactAngle: number // in degrees
  width?: number
  height?: number
}

export function ContactAngleDiagram({ 
  contactAngle, 
  width = 200, 
  height = 150 
}: ContactAngleDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>()
  const surfaceY = height * 0.7 // Surface position (70% down)
  const surfaceHeight = 10 // Thickness of the surface rectangle
  const dropletRadius = 45 // Radius of the droplet circle
  const centerX = width / 2

  // Calculate circle center position based on contact angle
  // At 90°, center is at surface level (circle exactly halfway)
  // At 0°, center is at surfaceY + radius (circle completely below surface)
  // At 180°, center is at surfaceY - radius (circle completely above surface)
  const calculateCircleY = (angle: number) => {
    // Normalize: 90° = 0 offset, 0° = -1, 180° = +1
    const normalizedAngle = (angle - 90) / 90 // -1 to 1
    // Calculate offset:
    // At 0° (normalizedAngle = -1): offset = -(-1) * radius = +radius (center below surface)
    // At 90° (normalizedAngle = 0): offset = 0 (center at surface)
    // At 180° (normalizedAngle = 1): offset = -1 * radius = -radius (center above surface)
    const offset = -normalizedAngle * dropletRadius
    return surfaceY + offset
  }

  const [circleCenterY, setCircleCenterY] = useState<number>(() => calculateCircleY(contactAngle))
  const currentYRef = useRef<number>(calculateCircleY(contactAngle))
  const clipPathId = `aboveSurface-${width}-${height}`
  const gradientId = `dropletGradient-${width}-${height}`

  useEffect(() => {
    if (!svgRef.current) return

    const targetY = calculateCircleY(contactAngle)
    const startY = currentYRef.current

    // If already at target, no need to animate
    if (Math.abs(startY - targetY) < 0.1) {
      currentYRef.current = targetY
      setCircleCenterY(targetY)
      return
    }

    // Clear previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    // Animate the transition
    const startTime = Date.now()
    const duration = 600 // 600ms animation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const newY = startY + (targetY - startY) * easeOutCubic
      
      currentYRef.current = newY
      setCircleCenterY(newY)

      // Update circle position in DOM
      const circle = svgRef.current?.querySelector('.droplet-circle') as SVGCircleElement
      const highlight = svgRef.current?.querySelector('.droplet-highlight') as SVGEllipseElement
      
      if (circle) {
        circle.setAttribute('cy', String(newY))
      }
      if (highlight) {
        highlight.setAttribute('cy', String(newY - dropletRadius * 0.3))
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure final position is exact
        currentYRef.current = targetY
        setCircleCenterY(targetY)
        if (circle) {
          circle.setAttribute('cy', String(targetY))
        }
        if (highlight) {
          highlight.setAttribute('cy', String(targetY - dropletRadius * 0.3))
        }
      }
    }

    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [contactAngle, height])

  return (
    <div className="flex justify-center items-center py-2">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Define clip path to show only part of circle above surface */}
        <defs>
          <clipPath id={clipPathId}>
            <rect x="0" y="0" width={width} height={surfaceY} />
          </clipPath>
          
          {/* Water-like gradient for droplet - lighter at top, darker at bottom */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#7DD3FC" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Highlight/reflection gradient for water droplet */}
          <radialGradient id={`highlight-${width}-${height}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          
          {/* Surface gradient for modern look */}
          <linearGradient id={`surfaceGradient-${width}-${height}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          
          {/* Shadow filter for surface depth */}
          <filter id={`shadow-${width}-${height}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Surface shadow */}
        <rect
          x="0"
          y={surfaceY + surfaceHeight}
          width={width}
          height="4"
          fill="#000000"
          opacity="0.2"
        />

        {/* Surface (modern dark table with gradient) */}
        <rect
          x="0"
          y={surfaceY}
          width={width}
          height={surfaceHeight}
          fill={`url(#surfaceGradient-${width}-${height})`}
          className="surface"
          filter={`url(#shadow-${width}-${height})`}
        />

        {/* Droplet circle - only visible part above surface */}
        <g clipPath={`url(#${clipPathId})`}>
          {/* Main droplet body with water gradient */}
          <circle
            className="droplet-circle"
            cx={centerX}
            cy={circleCenterY}
            r={dropletRadius}
            fill={`url(#${gradientId})`}
            stroke="#0C4A6E"
            strokeWidth="1.5"
            opacity="0.9"
          />
          
          {/* Water highlight/reflection */}
          <ellipse
            className="droplet-highlight"
            cx={centerX - dropletRadius * 0.25}
            cy={circleCenterY - dropletRadius * 0.3}
            rx={dropletRadius * 0.4}
            ry={dropletRadius * 0.3}
            fill={`url(#highlight-${width}-${height})`}
          />
        </g>
      </svg>
    </div>
  )
}

