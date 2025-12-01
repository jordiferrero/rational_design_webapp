'use client'

interface ParticlePorosityDiagramProps {
  dParticleStar: number // D*_particle value
  size?: number // Width of the diagram in pixels (default: 300)
  height?: number // Height of the diagram in pixels (default: 100)
}

export function ParticlePorosityDiagram({ 
  dParticleStar, 
  size = 300,
  height = 100
}: ParticlePorosityDiagramProps) {
  // Fixed particle radius (in pixels) - this is just for visualization
  const rParticle = 12 // pixels
  
  // Calculate spacing from D*_particle
  // D*_particle = (1 + spacing/(2*R_particle))^2
  // spacing = 2*R_particle*(sqrt(D*_particle) - 1)
  const theoreticalSpacing = 2 * rParticle * (Math.sqrt(dParticleStar) - 1)
  
  // Calculate how many particles we need to fill the width
  // We want particles to extend across the full viewing box
  // Start with one particle, then add more until we fill the width
  let numParticles = 1
  let totalWidth = 2 * rParticle
  
  while (totalWidth + theoreticalSpacing + 2 * rParticle <= size) {
    numParticles++
    totalWidth += theoreticalSpacing + 2 * rParticle
  }
  
  // Ensure we have at least 3 particles for visibility
  if (numParticles < 3) {
    numParticles = 3
  }
  
  // Calculate spacing to fit particles exactly across the width
  const availableWidth = size - (numParticles * 2 * rParticle)
  const adjustedSpacing = availableWidth / (numParticles - 1)
  const startX = rParticle
  
  // Substrate line position (near bottom, thick black line)
  const substrateY = height - 10
  
  // Particle center Y position (resting on substrate)
  const particleCenterY = substrateY - rParticle
  
  // Generate particles with 3D gloss effect
  const particles = []
  for (let i = 0; i < numParticles; i++) {
    const x = startX + i * (2 * rParticle + adjustedSpacing)
    const gradientId = `particle-gradient-${i}`
    
    particles.push(
      <g key={i}>
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {/* Main sphere with gradient */}
        <circle
          cx={x}
          cy={particleCenterY}
          r={rParticle}
          fill={`url(#${gradientId})`}
          stroke="#92400E"
          strokeWidth="1"
        />
        {/* Highlight for 3D gloss effect */}
        <ellipse
          cx={x - rParticle * 0.3}
          cy={particleCenterY - rParticle * 0.3}
          rx={rParticle * 0.4}
          ry={rParticle * 0.5}
          fill="#FCD34D"
          opacity="0.6"
        />
      </g>
    )
  }

  return (
    <div className="flex justify-center items-center py-2">
      <svg
        width={size}
        height={height}
        viewBox={`0 0 ${size} ${height}`}
        style={{
          borderRadius: '4px',
          border: '1px solid #E5E7EB'
        }}
      >
        {/* Particles (spheres with 3D gloss resting on substrate) */}
        {particles}
        {/* Substrate line (thick black horizontal line at bottom) */}
        <line
          x1={0}
          y1={substrateY}
          x2={size}
          y2={substrateY}
          stroke="#000"
          strokeWidth="3"
        />
        
        
      </svg>
    </div>
  )
}

