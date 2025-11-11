'use client'

interface FiberPorosityDiagramProps {
  dStar: number // D*_fiber value
  size?: number // Size of the diagram in pixels (default: 200)
}

export function FiberPorosityDiagram({ 
  dStar, 
  size = 200 
}: FiberPorosityDiagramProps) {
  // Remap D* from range [1, 9] to [1, 5] for scaling
  // This makes D* = 9 show what D* = 5 currently shows, while D* = 1 stays the same
  // Formula: remapped = 1 + (dStar - 1) * (5 - 1) / (9 - 1) = 1 + (dStar - 1) * 0.5
  const remappedDStar = 1 + (dStar - 1) * 0.5
  
  // 1) Convert remapped D* -> open fraction (0..1)
  // D* = 1/(1 - %OA) => %OA = 1 - 1/D*
  let fOpen = 1 - 1 / remappedDStar
  fOpen = Math.max(0, Math.min(fOpen, 0.95)) // clamp for sanity

  // 2) Solve for normalized strand width w (0..1) from (1 - w)^2 = fOpen
  // w = 1 - sqrt(fOpen)
  const wNorm = 1 - Math.sqrt(fOpen) // 0..1

  // 3) Map to pixels
  const cellSize = 40 // px period of the mesh pattern
  let strandPx = cellSize * wNorm

  // Make yarns thicker (2.5x for more visible fabric texture)
  strandPx = strandPx * 2.5

  // avoid invisibly thin or too fat strands
  strandPx = Math.max(3, Math.min(strandPx, cellSize - 2))

  // Blue color scheme matching slider components (#3B82F6)
  const strandColorLight = '#DBEAFE' // light blue-100
  const strandColorMid = '#93C5FD' // light blue-300
  const strandColorDark = '#3B82F6' // blue-500 (same as slider)
  const openColor = '#EFF6FF' // very light blue-50 (background)
  const shadowColor = '#1E40AF' // blue-800 for shadows

  // Calculate how many cells fit in the diagram
  const numCells = Math.ceil(size / cellSize) + 1 // Add 1 to ensure coverage

  // Generate horizontal lines (strands going left-right) with interlacing
  // In a plain weave, horizontal yarns alternate over/under vertical yarns
  const horizontalLinesUnder = [] // Yarns that go under verticals
  const horizontalLinesOver = [] // Yarns that go over verticals
  
  for (let i = 0; i < numCells; i++) {
    const y = i * cellSize
    const gradientId = `h-gradient-${i}`
    const isOver = i % 2 === 0 // Alternate: even rows go over, odd rows go under
    
    const yarnElement = (
      <g key={`h-${i}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strandColorLight} />
            <stop offset="50%" stopColor={strandColorMid} />
            <stop offset="100%" stopColor={strandColorDark} />
          </linearGradient>
        </defs>
        {/* Shadow for depth - only if on top */}
        {isOver && (
          <rect
            x={0}
            y={y + 1}
            width={size}
            height={strandPx}
            fill={shadowColor}
            opacity="0.15"
          />
        )}
        {/* Main strand with gradient */}
        <rect
          x={0}
          y={y}
          width={size}
          height={strandPx}
          fill={`url(#${gradientId})`}
        />
        {/* Highlight for texture - stronger if on top */}
        <rect
          x={0}
          y={y}
          width={size}
          height={strandPx * 0.3}
          fill={strandColorLight}
          opacity={isOver ? "0.5" : "0.3"}
        />
      </g>
    )
    
    if (isOver) {
      horizontalLinesOver.push(yarnElement)
    } else {
      horizontalLinesUnder.push(yarnElement)
    }
  }

  // Generate vertical lines (strands going up-down) with interlacing
  // In a plain weave, vertical yarns alternate over/under horizontal yarns
  const verticalLinesUnder = [] // Yarns that go under horizontals
  const verticalLinesOver = [] // Yarns that go over horizontals
  
  for (let i = 0; i < numCells; i++) {
    const x = i * cellSize
    const gradientId = `v-gradient-${i}`
    const isOver = i % 2 === 0 // Alternate: even columns go over, odd columns go under
    
    const yarnElement = (
      <g key={`v-${i}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strandColorLight} />
            <stop offset="50%" stopColor={strandColorMid} />
            <stop offset="100%" stopColor={strandColorDark} />
          </linearGradient>
        </defs>
        {/* Shadow for depth - only if on top */}
        {isOver && (
          <rect
            x={x + 1}
            y={0}
            width={strandPx}
            height={size}
            fill={shadowColor}
            opacity="0.15"
          />
        )}
        {/* Main strand with gradient */}
        <rect
          x={x}
          y={0}
          width={strandPx}
          height={size}
          fill={`url(#${gradientId})`}
        />
        {/* Highlight for texture - stronger if on top */}
        <rect
          x={x}
          y={0}
          width={strandPx * 0.3}
          height={size}
          fill={strandColorLight}
          opacity={isOver ? "0.5" : "0.3"}
        />
      </g>
    )
    
    if (isOver) {
      verticalLinesOver.push(yarnElement)
    } else {
      verticalLinesUnder.push(yarnElement)
    }
  }

  return (
    <div className="flex justify-center items-center py-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          borderRadius: '4px',
          border: '1px solid #E5E7EB',
          backgroundColor: openColor
        }}
      >
        {/* Background with subtle texture */}
        <rect x={0} y={0} width={size} height={size} fill={openColor} />
        
        {/* Render in correct order for interlacing: under first, then over */}
        {/* Horizontal strands that go under verticals */}
        {horizontalLinesUnder}
        {/* Vertical strands that go under horizontals */}
        {verticalLinesUnder}
        {/* Horizontal strands that go over verticals */}
        {horizontalLinesOver}
        {/* Vertical strands that go over horizontals */}
        {verticalLinesOver}
      </svg>
    </div>
  )
}

