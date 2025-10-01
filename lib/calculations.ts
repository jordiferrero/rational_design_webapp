// Mathematical functions converted from Python to TypeScript
// Based on the academic paper "Rational design of perfluorocarbon-free oleophobic textiles"

export interface LiquidProperties {
  surfaceTension: number; // N/m
  density: number; // kg/m³
}

export interface FabricParameters {
  fiberDiameter: number; // μm
  fiberSpacing: number; // μm
  thetaFiberStar: number; // degrees - direct input for fiber contact angle
  particleDiameter: number; // μm
  particleSpacing: number; // μm
  thetaParticleStar: number; // degrees - direct input for particle contact angle
  // particle input mode: 'size' uses diameter/spacing; 'angle' uses thetaParticleStar directly
  particleInputMode?: 'size' | 'angle';
  // When in 'angle' mode, persist geometry as D*_particle derived once from theta* and current liquid
  dParticleStarOverride?: number | null;
  youngsAngle: number; // degrees
  desiredContactAngle: number; // degrees
  stabilityValue: number; // A* value
  useHierarchical: boolean; // whether to use particle coating
  usePerformanceTargets: boolean; // whether to use performance targets
  // Equation mixing for 2D fabric model (only when no particle coating)
  equation7Weight: number; // 0-1, weight of Equation 7 vs Equation 1 (0 = pure Eq 1, 1 = pure Eq 7)
  percentOA?: number; // percent open area for %OA input mode
}

export const LIQUID_PROPERTIES: Record<string, LiquidProperties> = {
  water: {
    surfaceTension: 72e-3, // N/m
    density: 1000, // kg/m³
  },
  tertButylnaphthalene: {
    surfaceTension: 33.7e-3, // N/m
    density: 950, // kg/m³
  },
  hexadecane: {
    surfaceTension: 27.47e-3, // N/m
    density: 773, // kg/m³
  },
  decane: {
    surfaceTension: 23.8e-3, // N/m
    density: 730, // kg/m³
  },
};

export const SURFACE_CHEMISTRIES = {
  pdms: { name: 'PDMS', color: '#3B82F6' },
  alkyl: { name: 'Alkyl (-CH₃)', color: '#10B981' },
  fluorinated: { name: 'Fluorinated (-CF₂)', color: '#F59E0B' },
  perfluorinated: { name: 'Perfluorinated (-CF₃)', color: '#EF4444' },
};

// Liquid-dependent contact angles for different surface chemistries
export const LIQUID_SURFACE_CONTACT_ANGLES: Record<string, Record<string, number>> = {
  water: {
    pdms: 105,
    alkyl: 110,
    fluorinated: 115,
    perfluorinated: 120,
  },
  tertButylnaphthalene: {
    pdms: 49,
    alkyl: 57,
    fluorinated: 65,
    perfluorinated: 86,
  },
  hexadecane: {
    pdms: 35,
    alkyl: 46,
    fluorinated: 65,
    perfluorinated: 78,
  },
  decane: {
    pdms: 13,
    alkyl: 30,
    fluorinated: 38,
    perfluorinated: 70,
  },
};

// Function to get contact angle for a specific liquid-surface combination
export function getContactAngleForLiquid(liquid: string, surfaceChemistry: string): number {
  const liquidAngles = LIQUID_SURFACE_CONTACT_ANGLES[liquid];
  if (!liquidAngles) {
    // Default fallback values
    return {
      pdms: 35,
      alkyl: 46,
      fluorinated: 45,
      perfluorinated: 68,
    }[surfaceChemistry] || 35;
  }
  return liquidAngles[surfaceChemistry] || 35;
}

export const FABRIC_PRESETS = {
  // Low D* fabrics (1-5 range)
  nylonJacket: { 
    name: 'Nylon Jacket Fabric', 
    DFiberStar: 1.5, 
    description: 'Low porosity fabric, 30% open area' 
  },
  sateenRegular: { 
    name: 'Sateen Regular', 
    DFiberStar: 2.8, 
    description: 'Low porosity, 42% open area' 
  },
  sateenIrregular: { 
    name: 'Sateen Irregular', 
    DFiberStar: 3.2, 
    description: 'Low-medium porosity, 47% open area' 
  },
  plainWeave: { 
    name: 'Plain/Tabby Weave', 
    DFiberStar: 3.4, 
    description: 'Most common weave, 50% open area' 
  },
  twillWeave: { 
    name: 'Balanced Twill', 
    DFiberStar: 3.4, 
    description: 'Diagonal pattern, 50% open area' 
  },
  warpRibRegular: { 
    name: 'Warp Rib Weave Regular', 
    DFiberStar: 3.5, 
    description: 'Ribbed pattern, 51% open area' 
  },
  herringboneTwill: { 
    name: 'Herringbone Twill', 
    DFiberStar: 3.7, 
    description: 'V-shaped pattern, 53% open area' 
  },
  warpRibIrregular: { 
    name: 'Warp Rib Weave Irregular', 
    DFiberStar: 3.9, 
    description: 'Irregular ribbed, 55% open area' 
  },
  mattRibIrregular: { 
    name: 'Matt Rib Weave Irregular', 
    DFiberStar: 4.0, 
    description: 'Irregular basket weave, 57% open area' 
  },
  honeycomb: { 
    name: 'Ordinary Honeycomb', 
    DFiberStar: 4.0, 
    description: 'Honeycomb pattern, 56% open area' 
  },
  satinSateenChecks: { 
    name: 'Satin-Sateen Checks', 
    DFiberStar: 4.2, 
    description: 'Checkered pattern, 58% open area' 
  },
  huckaback: { 
    name: 'Huck-a-back Weave', 
    DFiberStar: 4.3, 
    description: 'Traditional pattern, 59% open area' 
  },
  weftRibRegular: { 
    name: 'Weft Rib Weave Regular', 
    DFiberStar: 4.4, 
    description: 'Weft ribbed, 59% open area' 
  },
  weftRibIrregular: { 
    name: 'Weft Rib Weave Irregular', 
    DFiberStar: 4.5, 
    description: 'Irregular weft ribbed, 60% open area' 
  },
  pointedTwill: { 
    name: 'Pointed Twill', 
    DFiberStar: 4.8, 
    description: 'Pointed diagonal, 63% open area' 
  },
  mattWeave: { 
    name: 'Matt Weave Regular', 
    DFiberStar: 5.3, 
    description: 'Basket weave, 66% open area' 
  },
  // High D* fabrics (5+ range)
  warpFacedTwill: { 
    name: 'Warp-faced Twill', 
    DFiberStar: 6.0, 
    description: 'Warp-dominant, 70% open area' 
  },
  weftFacedTwill: { 
    name: 'Weft-faced Twill', 
    DFiberStar: 6.8, 
    description: 'Weft-dominant, 73% open area' 
  },
  satinIrregular: { 
    name: 'Satin Irregular', 
    DFiberStar: 6.9, 
    description: 'Medium-high porosity, 73% open area' 
  },
  satinRegular: { 
    name: 'Satin Regular', 
    DFiberStar: 8.1, 
    description: 'High porosity, 77% open area' 
  },
};

// Convert degrees to radians
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Convert radians to degrees
export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

// Young's contact angle calculation
export function youngsAngle(
  surfaceTensionSV: number,
  surfaceTensionSL: number,
  surfaceTensionLV: number
): number {
  return Math.acos((surfaceTensionSV - surfaceTensionSL) / surfaceTensionLV);
}

// Wenzel angle calculation
export function wenzelAngle(thetaY: number, curvatureR: number): number {
  const cosValue = Math.max(-1, Math.min(1, curvatureR * Math.cos(thetaY)));
  return Math.acos(cosValue);
}

// Porosity parameter for cylindrical fibers
export function porosityCylindricalFibers(
  spacingBtwFibers: number,
  fiberRadius: number
): number {
  return (spacingBtwFibers / 2 + fiberRadius) / fiberRadius;
}

// Apparent contact angle for fibers
export function thetaFiberStar(thetaY: number, DFiberStar: number): number {
  const cosThetaFiberStar = -1 + (1 / DFiberStar) * (
    Math.sin(thetaY) + (Math.PI - thetaY) * Math.cos(thetaY)
  );
  return Math.acos(Math.max(-1, Math.min(1, cosThetaFiberStar)));
}

// Porosity parameter for spherical particles
export function porositySphericalParticles(
  spacingBtwParticles: number,
  particleRadius: number
): number {
  return Math.pow(1 + spacingBtwParticles / 2 / particleRadius, 2);
}

// Apparent contact angle for particles
export function thetaParticleStar(thetaY: number, DParticleStar: number): number {
  const cosThetaParticleStar = -1 + (Math.PI * Math.pow(1 + Math.cos(thetaY), 2)) / (
    2 * Math.sqrt(3) * DParticleStar
  );
  return Math.acos(Math.max(-1, Math.min(1, cosThetaParticleStar)));
}

// Hierarchical contact angle (particles on fibers)
export function thetaHierarchicalStar(
  thetaParticleStar: number,
  DFiberStar: number
): number {
  const cosThetaHierarchicalStar = -1 + (1 / DFiberStar) * (
    Math.sin(thetaParticleStar) + (Math.PI - thetaParticleStar) * Math.cos(thetaParticleStar)
  );
  return Math.acos(Math.max(-1, Math.min(1, cosThetaHierarchicalStar)));
}

// Capillary length calculation
export function capillaryLength(
  surfaceTensionLV: number,
  liquidDensity: number,
  gravity: number = 9.81
): number {
  return Math.sqrt(surfaceTensionLV / (liquidDensity * gravity));
}

// Robustness parameter for fibers
export function AFiberStar(
  thetaY: number,
  DFiberStar: number,
  lCap: number,
  RFiber: number
): number {
  return (lCap / (RFiber * (DFiberStar - 1))) * (
    (1 - Math.cos(thetaY)) / (DFiberStar - 1 + 2 * Math.sin(thetaY))
  );
}

// Robustness parameter for hierarchical textures
export function AHierarchicalStar(
  thetaParticleStar: number,
  DFiberStar: number,
  lCap: number,
  RFiber: number
): number {
  return (lCap / (RFiber * (DFiberStar - 1))) * (
    (1 - Math.cos(thetaParticleStar)) / (DFiberStar - 1 + 2 * Math.sin(thetaParticleStar))
  );
}

// Maximum fiber porosity for given particle contact angle
export function DFiberMaxStar(
  thetaParticleStar: number,
  lCap: number,
  AHierarchicalStar: number,
  RFiber: number
): number {
  return 1 - Math.sin(thetaParticleStar) + Math.sqrt(
    Math.pow(Math.sin(thetaParticleStar), 2) + 
    (lCap * (1 - Math.cos(thetaParticleStar))) / (AHierarchicalStar * RFiber)
  );
}

// 2D fabric contact angle
export function thetaFabric2DStar(thetaY: number, DFiberStar: number): number {
  const cosThetaFabricStar = -1 + ((2 * DFiberStar - 1) / Math.pow(DFiberStar, 2)) * (
    (Math.PI - thetaY) * Math.cos(thetaY) + Math.sin(thetaY)
  );
  return Math.acos(Math.max(-1, Math.min(1, cosThetaFabricStar)));
}

// Calculate all parameters for a given fabric design
export function calculateFabricDesign(
  params: FabricParameters,
  liquid: string
): {
  DFiberStar: number;
  thetaFiber1D: number;
  thetaFabric2D: number;
  thetaConvolved: number;
  thetaHierarchical: number | null;
  currentDParticleStar: number | null;
  desiredThetaParticle: number | null;
  desiredDParticleStar: number | null;
  desiredParticleSpacing: number | null;
  lCapillary: number;
  maxDFiberStar: number | null;
  isStable: boolean;
  AHierarchicalStar: number | null;
  AFiberStar: number;
  equationsUsed: string[];
} {
  const liquidProps = LIQUID_PROPERTIES[liquid];
  if (!liquidProps) {
    throw new Error(`Unknown liquid: ${liquid}`);
  }

  const thetaY = degToRad(params.youngsAngle);
  const desiredContactAngleRad = params.usePerformanceTargets ? degToRad(params.desiredContactAngle) : null;
  
  // Calculate fiber porosity
  const DFiberStar = porosityCylindricalFibers(
    params.fiberSpacing * 1e-6, // Convert μm to m
    params.fiberDiameter * 1e-6 / 2 // Convert μm to m, radius
  );
  
  // Calculate 1D and 2D fiber models
  const thetaFiber1D = thetaFiberStar(thetaY, DFiberStar);
  const thetaFabric2D = thetaFabric2DStar(thetaY, DFiberStar);
  
  // Use equation mixing if no particle coating is applied
  let thetaConvolved: number;
  if (!params.useHierarchical) {
    // Mix Equation 1 and Equation 7 based on equation7Weight
    const weight = params.equation7Weight ?? 0.5; // Default to 50/50 mix
    thetaConvolved = (1 - weight) * thetaFiber1D + weight * thetaFabric2D;
  } else {
    // When hierarchical coating is used, use the standard average
    thetaConvolved = (thetaFiber1D + thetaFabric2D) / 2;
  }
  
  // Calculate hierarchical model if enabled
  let thetaHierarchical: number | null = null;
  let currentDParticleStar: number | null = null;
  let desiredThetaParticle: number | null = null;
  let desiredDParticleStar: number | null = null;
  let desiredParticleSpacing: number | null = null;
  let aHierarchicalStar: number | null = null;
  let maxDFiberStar: number | null = null;
  let thetaParticleStarValue: number | null = null;
  
  if (params.useHierarchical) {
    // Determine source based on particle input mode
    const mode = params.particleInputMode ?? 'size';

    if (mode === 'size') {
      // Use geometry to compute D* and derive theta*particle
      currentDParticleStar = porositySphericalParticles(
        params.particleSpacing * 1e-6, // m
        params.particleDiameter * 1e-6 / 2 // m
      );
      thetaParticleStarValue = thetaParticleStar(thetaY, currentDParticleStar);
    } else {
      // Angle mode: keep geometry constant via override D* if provided
      const overrideD = params.dParticleStarOverride ?? null;
      if (overrideD && isFinite(overrideD)) {
        currentDParticleStar = overrideD;
        thetaParticleStarValue = thetaParticleStar(thetaY, currentDParticleStar);
      } else {
        // Derive once from theta* for current liquid (fallback)
        thetaParticleStarValue = degToRad(params.thetaParticleStar);
        try {
          currentDParticleStar = calculateDParticleFromTheta(thetaParticleStarValue, thetaY);
        } catch (error) {
          currentDParticleStar = porositySphericalParticles(
            params.particleSpacing * 1e-6,
            params.particleDiameter * 1e-6 / 2
          );
        }
      }
    }

    // Calculate hierarchical contact angle from theta*particle and D*fiber
    thetaHierarchical = thetaHierarchicalStar(thetaParticleStarValue, DFiberStar);
    
    // If performance targets are enabled, calculate required parameters
    if (params.usePerformanceTargets && desiredContactAngleRad !== null) {
      desiredThetaParticle = isolateThetaParticleStarFromThetaHierarchicalStar(
        desiredContactAngleRad,
        DFiberStar
      );
      desiredDParticleStar = isolateDParticleStar(thetaY, desiredThetaParticle);
      desiredParticleSpacing = 2 * isolateSpacingBtwParticles(
        desiredDParticleStar,
        params.particleDiameter * 1e-6 / 2 // Convert μm to m, radius
      ) * 1e6; // Convert back to μm
    }
  }
  
  // Calculate stability
  const lCapillary = capillaryLength(
    liquidProps.surfaceTension,
    liquidProps.density
  );

  // Calculate maximum D*fiber for hierarchical textures
  if (params.useHierarchical && thetaParticleStarValue !== null) {
    maxDFiberStar = DFiberMaxStar(
      thetaParticleStarValue,
      lCapillary,
      params.stabilityValue,
      params.fiberDiameter * 1e-6 / 2
    );
  }
  
  const aFiberStar = AFiberStar(
    thetaY,
    DFiberStar,
    lCapillary,
    params.fiberDiameter * 1e-6 / 2
  );
  
  if (params.useHierarchical && thetaHierarchical !== null && thetaParticleStarValue !== null) {
    aHierarchicalStar = AHierarchicalStar(
      thetaParticleStarValue,
      DFiberStar,
      lCapillary,
      params.fiberDiameter * 1e-6 / 2
    );
    
    if (params.usePerformanceTargets && desiredThetaParticle !== null) {
      maxDFiberStar = DFiberMaxStar(
        desiredThetaParticle,
        lCapillary,
        params.stabilityValue,
        params.fiberDiameter * 1e-6 / 2
      );
    }
  }
  
  const isStable = (aHierarchicalStar !== null ? aHierarchicalStar : aFiberStar) >= params.stabilityValue;
  
  // Determine which equations are being used
  const equationsUsed: string[] = ['Equation 1 (Fiber Contact Angle)'];
  
  // Add Equation 7 if not using hierarchical coating
  if (!params.useHierarchical) {
    equationsUsed.push('Equation 7 (2D Fabric Contact Angle)');
  }
  
  if (params.useHierarchical) {
    equationsUsed.push('Equation 2 (Particle Contact Angle)', 'Equation 3 (Hierarchical Contact Angle)', 'Equation 6 (Maximum Fiber Porosity)');
  }
  if (params.usePerformanceTargets) {
    equationsUsed.push('Equation 6 (Maximum Fiber Porosity)');
  }
  equationsUsed.push('Robustness Parameter A*');
  
  return {
    DFiberStar,
    thetaFiber1D: radToDeg(thetaFiber1D),
    thetaFabric2D: radToDeg(thetaFabric2D),
    thetaConvolved: radToDeg(thetaConvolved),
    thetaHierarchical: thetaHierarchical ? radToDeg(thetaHierarchical) : null,
    currentDParticleStar,
    desiredThetaParticle: desiredThetaParticle ? radToDeg(desiredThetaParticle) : null,
    desiredDParticleStar,
    desiredParticleSpacing,
    lCapillary,
    maxDFiberStar,
    isStable,
    AHierarchicalStar: aHierarchicalStar,
    AFiberStar: aFiberStar,
    equationsUsed,
  };
}

// Helper functions for inverse calculations
function isolateThetaParticleStarFromThetaHierarchicalStar(
  thetaHierarchicalStar: number,
  DFiberStar: number
): number {
  const cosThetaHierarchicalStar = Math.cos(thetaHierarchicalStar);
  const numerator = cosThetaHierarchicalStar + 1 - (1 / DFiberStar);
  const denominator = Math.cos((cosThetaHierarchicalStar + 1) / DFiberStar);
  return Math.PI - Math.acos(numerator / denominator);
}

function isolateDParticleStar(thetaY: number, thetaParticleStar: number): number {
  return (Math.PI * Math.pow(1 + Math.cos(thetaY), 2)) / (
    2 * Math.sqrt(3) * (1 + Math.cos(thetaParticleStar))
  );
}

function isolateSpacingBtwParticles(DParticleStar: number, particleRadius: number): number {
  return 2 * particleRadius * (Math.sqrt(DParticleStar) - 1);
}

// Calculate D*_fiber from θ*_fiber by rearranging equation 1
export function calculateDFiberFromTheta(
  thetaFiberStar: number, // radians
  thetaY: number // radians - Young's contact angle
): number {
  // From equation 1: cos(θ*_fiber) = -1 + (1/D*_fiber) * [sin(θY) + (π - θY) * cos(θY)]
  // Rearranged: D*_fiber = [sin(θY) + (π - θY) * cos(θY)] / (1 + cos(θ*_fiber))
  const numerator = Math.sin(thetaY) + (Math.PI - thetaY) * Math.cos(thetaY);
  const denominator = 1 + Math.cos(thetaFiberStar);
  
  if (denominator === 0) {
    throw new Error('Invalid θ*_fiber: cos(θ*_fiber) = -1');
  }
  
  return numerator / denominator;
}

// Calculate spacing from D*_fiber and fiber radius
export function calculateSpacingFromDFiber(DFiberStar: number, fiberRadius: number): number {
  // D*_fiber = (spacing/2 + radius) / radius
  // spacing = 2 * radius * (D*_fiber - 1)
  return 2 * fiberRadius * (DFiberStar - 1);
}

// Calculate D*_fiber from spacing and fiber radius
export function calculateDFiberFromSpacing(spacing: number, fiberRadius: number): number {
  // D*_fiber = (spacing/2 + radius) / radius
  return (spacing / 2 + fiberRadius) / fiberRadius;
}

// Calculate D*_particle from θ*_particle by rearranging equation 2
export function calculateDParticleFromTheta(
  thetaParticleStar: number, // radians
  thetaY: number // radians - Young's contact angle
): number {
  // From equation 2: cos(θ*_particle) = -1 + (1/D*_particle) * [sin(θY) + (π - θY) * cos(θY)]
  // Rearranged: D*_particle = [sin(θY) + (π - θY) * cos(θY)] / (1 + cos(θ*_particle))
  const numerator = Math.sin(thetaY) + (Math.PI - thetaY) * Math.cos(thetaY);
  const denominator = 1 + Math.cos(thetaParticleStar);
  
  if (denominator === 0) {
    throw new Error('Invalid θ*_particle: cos(θ*_particle) = -1');
  }
  
  return numerator / denominator;
}

// Calculate D*_fiber from percent open area (%OA)
export function calculateDFiberFromPercentOA(percentOA: number): number {
  // D* = 1/(1 - sqrt(%OA))
  // %OA is expressed as a decimal (e.g., 0.5 for 50%)
  const percentOADecimal = percentOA / 100;
  return 1 / (1 - Math.sqrt(percentOADecimal));
}

// Calculate %OA from D*_fiber
export function calculatePercentOAFromDFiber(DFiberStar: number): number {
  // %OA = (1 - 1/D*)^2
  // Returns as percentage (e.g., 50 for 50%)
  const percentOADecimal = Math.pow(1 - 1/DFiberStar, 2);
  return percentOADecimal * 100;
}
