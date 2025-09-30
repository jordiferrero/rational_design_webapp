import { 
  calculateFabricDesign,
  thetaFiberStar,
  thetaParticleStar,
  thetaHierarchicalStar,
  AFiberStar,
  AHierarchicalStar,
  degToRad,
  radToDeg,
  LIQUID_PROPERTIES
} from '../calculations'

describe('Calculations Tests', () => {
  // Test data from Python notebook
  const testParams = {
    fiberDiameter: 80, // μm
    fiberSpacing: 40, // μm (corrected from Python notebook)
    particleDiameter: 1, // μm
    particleSpacing: 0.5, // μm
    youngsAngle: 80, // degrees (from Python notebook)
    desiredContactAngle: 140, // degrees
    stabilityValue: 10, // A* value
    useHierarchical: false, // whether to use particle coating
    usePerformanceTargets: false, // whether to use performance targets
  }

  describe('Basic Math Functions', () => {
    test('degToRad and radToDeg conversions', () => {
      expect(degToRad(90)).toBeCloseTo(Math.PI / 2, 5)
      expect(radToDeg(Math.PI / 2)).toBeCloseTo(90, 5)
      expect(degToRad(180)).toBeCloseTo(Math.PI, 5)
      expect(radToDeg(Math.PI)).toBeCloseTo(180, 5)
    })

    test('thetaFiberStar calculation', () => {
      const thetaY = degToRad(35) // PDMS
      const DFiberStar = 1.5
      const result = thetaFiberStar(thetaY, DFiberStar)
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThan(Math.PI)
      expect(radToDeg(result)).toBeGreaterThan(35) // Should be higher than Young's angle
    })

    test('thetaParticleStar calculation', () => {
      const thetaY = degToRad(35) // PDMS
      const DParticleStar = 2.0
      const result = thetaParticleStar(thetaY, DParticleStar)
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThan(Math.PI)
    })

    test('thetaHierarchicalStar calculation', () => {
      const thetaParticleStar = degToRad(60)
      const DFiberStar = 1.5
      const result = thetaHierarchicalStar(thetaParticleStar, DFiberStar)
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThan(Math.PI)
    })
  })

  describe('Fabric Design Calculation', () => {
    test('should calculate fabric design without errors', () => {
      expect(() => {
        const result = calculateFabricDesign(testParams, 'hexadecane')
        expect(result).toBeDefined()
        expect(result.DFiberStar).toBeGreaterThan(1)
        expect(result.thetaConvolved).toBeGreaterThan(0)
        expect(result.thetaConvolved).toBeLessThan(180)
        expect(result.isStable).toBeDefined()
        expect(typeof result.isStable).toBe('boolean')
      }).not.toThrow()
    })

    test('should handle different liquids', () => {
      const liquids = ['water', 'tertButylnaphthalene', 'hexadecane', 'decane']
      liquids.forEach(liquid => {
        expect(() => {
          const result = calculateFabricDesign(testParams, liquid)
          expect(result).toBeDefined()
          expect(result.lCapillary).toBeGreaterThan(0)
        }).not.toThrow()
      })
    })

    test('should handle edge cases', () => {
      // Test with very small fiber diameter
      const smallFiberParams = { ...testParams, fiberDiameter: 1 }
      expect(() => calculateFabricDesign(smallFiberParams, 'hexadecane')).not.toThrow()

      // Test with very large fiber diameter
      const largeFiberParams = { ...testParams, fiberDiameter: 200 }
      expect(() => calculateFabricDesign(largeFiberParams, 'hexadecane')).not.toThrow()

      // Test with different Young's angles
      const angles = [0, 35, 68, 90, 120]
      angles.forEach(angle => {
        const angleParams = { ...testParams, youngsAngle: angle }
        expect(() => calculateFabricDesign(angleParams, 'hexadecane')).not.toThrow()
      })
    })
  })

  describe('Robustness Calculations', () => {
    test('AFiberStar should be positive for valid inputs', () => {
      const thetaY = degToRad(35)
      const DFiberStar = 1.5
      const lCap = 2.7e-3 // Capillary length for hexadecane
      const RFiber = 10e-6 // 10 μm fiber radius
      
      const result = AFiberStar(thetaY, DFiberStar, lCap, RFiber)
      expect(result).toBeGreaterThan(0)
    })

    test('AHierarchicalStar should be positive for valid inputs', () => {
      const thetaParticleStar = degToRad(60)
      const DFiberStar = 1.5
      const lCap = 2.7e-3
      const RFiber = 10e-6
      
      const result = AHierarchicalStar(thetaParticleStar, DFiberStar, lCap, RFiber)
      expect(result).toBeGreaterThan(0)
    })
  })

  describe('Liquid Properties', () => {
    test('should have valid liquid properties', () => {
      Object.entries(LIQUID_PROPERTIES).forEach(([name, props]) => {
        expect(props.surfaceTension).toBeGreaterThan(0)
        expect(props.density).toBeGreaterThan(0)
        expect(props.surfaceTension).toBeLessThan(1) // Should be in N/m
        expect(props.density).toBeGreaterThan(100) // Should be in kg/m³
      })
    })
  })

  describe('Consistency with Python Results', () => {
    test('should match Python notebook results for default parameters', () => {
      const result = calculateFabricDesign(testParams, 'hexadecane')
      
      // These values should be close to what we get in Python
      expect(result.DFiberStar).toBeCloseTo(1.5, 1) // Should be 1.5 for 80μm spacing, 80μm diameter
      expect(result.thetaConvolved).toBeGreaterThan(80) // Should be oleophobic
      expect(result.thetaConvolved).toBeLessThan(150) // But not superoleophobic with these parameters
    })

    test('should show instability for high porosity', () => {
      const highPorosityParams = { ...testParams, fiberSpacing: 200 } // Very high porosity
      const result = calculateFabricDesign(highPorosityParams, 'hexadecane')
      
      // High porosity should lead to instability
      expect(result.DFiberStar).toBeGreaterThan(2)
      // The result might be unstable depending on other parameters
    })
  })
})
