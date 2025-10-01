'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, AlertCircle, CheckCircle, Info, Target, Settings, ToggleLeft, ToggleRight, BookOpen } from 'lucide-react'
import { DFiberDiagram, DParticleDiagram } from '@/components/Diagrams'
import { AStarPopup } from '@/components/AStarPopup'
import { 
  YoungsEquationPopup, 
  FiberContactAnglePopup, 
  ParticleContactAnglePopup, 
  HierarchicalContactAnglePopup, 
  MaxFiberPorosityPopup,
  RobustnessParameterPopup,
  Fabric2DContactAnglePopup
} from '@/components/EquationExplanations'
import { 
  calculateFabricDesign, 
  FabricParameters, 
  LIQUID_PROPERTIES,
  SURFACE_CHEMISTRIES,
  FABRIC_PRESETS,
  getContactAngleForLiquid,
  calculateDFiberFromTheta,
  calculateSpacingFromDFiber,
  calculateDFiberFromSpacing,
  calculateDParticleFromTheta,
  thetaParticleStar,
  porositySphericalParticles,
  thetaFiberStar,
  calculateDFiberFromPercentOA,
  calculatePercentOAFromDFiber
} from '@/lib/calculations'

export default function DesignerPage() {
  const [params, setParams] = useState<FabricParameters>({
    fiberDiameter: 80, // μm
    fiberSpacing: 40, // μm (corrected to match Python notebook)
    thetaFiberStar: 120, // degrees - direct input for fiber contact angle
    particleDiameter: 1, // μm
    particleSpacing: 0.5, // μm
    thetaParticleStar: 120, // degrees - direct input for particle contact angle
    particleInputMode: 'angle',
    dParticleStarOverride: null,
    youngsAngle: 35, // degrees (PDMS)
    desiredContactAngle: 140, // degrees
    stabilityValue: 5, // A* value
    useHierarchical: false, // whether to use particle coating
    usePerformanceTargets: false, // whether to use performance targets
    equation7Weight: 0.5, // Default to 50/50 mix of Equation 1 and 7
  })
  
  const [selectedLiquid, setSelectedLiquid] = useState('hexadecane')
  const [selectedSurfaceChemistry, setSelectedSurfaceChemistry] = useState('pdms')
  const [selectedFabricPreset, setSelectedFabricPreset] = useState<string | null>('plainWeave')
  const [targetAStar, setTargetAStar] = useState(5) // Default A* value
  const [particleInputMode, setParticleInputMode] = useState<'size' | 'angle'>('angle') // 'size' for diameter/spacing, 'angle' for theta*_particle
  const [fabricInputMode, setFabricInputMode] = useState<'preset' | 'size' | 'angle' | 'percentOA'>('preset') // 'preset' for dropdown, 'size' for diameter/spacing, 'angle' for theta*_fiber, 'percentOA' for %OA input
  const [calculatedDParticleStar, setCalculatedDParticleStar] = useState<number | null>(null) // D*_particle calculated from θ*_particle
  const [results, setResults] = useState<any>(null)
  const [errors, setErrors] = useState<string[]>([])

  // Update contact angle when liquid or surface chemistry changes
  useEffect(() => {
    const newContactAngle = getContactAngleForLiquid(selectedLiquid, selectedSurfaceChemistry)
    setParams(prev => ({ ...prev, youngsAngle: newContactAngle }))
  }, [selectedLiquid, selectedSurfaceChemistry])

  // Apply default fabric preset on mount
  useEffect(() => {
    if (selectedFabricPreset) {
      selectFabricPreset(selectedFabricPreset)
    }
  }, []) // Only run on mount

  // Update stability value when target A* changes
  useEffect(() => {
    updateParam('stabilityValue', targetAStar)
  }, [targetAStar])

  // Calculate D*_particle from θ*_particle when using contact angle input mode
  useEffect(() => {
    if (particleInputMode === 'angle' && params.useHierarchical) {
      try {
        const thetaY = (params.youngsAngle * Math.PI) / 180; // Convert to radians
        const thetaParticleStar = (params.thetaParticleStar * Math.PI) / 180; // Convert to radians
        const dParticleStar = calculateDParticleFromTheta(thetaParticleStar, thetaY);
        setCalculatedDParticleStar(dParticleStar);
        // Persist geometry equivalent so that changes in liquid still recompute with fixed D*
        updateParam('dParticleStarOverride', dParticleStar);
      } catch (error) {
        console.error('Error calculating D*_particle from θ*_particle:', error);
        setCalculatedDParticleStar(null);
      }
    } else {
      setCalculatedDParticleStar(null);
      // Clear override when not in angle mode to follow geometry inputs
      if (particleInputMode !== 'angle') {
        updateParam('dParticleStarOverride', null)
      }
    }
  }, [particleInputMode, params.useHierarchical, params.thetaParticleStar, params.youngsAngle])

  // Synchronize θ*_particle with particle parameters when in size mode
  useEffect(() => {
    if (particleInputMode === 'size' && params.useHierarchical) {
      try {
        const thetaY = (params.youngsAngle * Math.PI) / 180; // Convert to radians
        const dParticleStar = porositySphericalParticles(
          params.particleSpacing * 1e-6, // Convert μm to m
          params.particleDiameter * 1e-6 / 2 // Convert μm to m, radius
        );
        // Calculate θ*_particle from D*_particle using equation 2
        const thetaParticleStarRad = thetaParticleStar(thetaY, dParticleStar);
        const thetaParticleStarDeg = (thetaParticleStarRad * 180) / Math.PI; // Convert to degrees
        updateParam('thetaParticleStar', thetaParticleStarDeg);
      } catch (error) {
        console.error('Error calculating θ*_particle from particle parameters:', error);
      }
    }
  }, [particleInputMode, params.useHierarchical, params.particleSpacing, params.particleDiameter, params.youngsAngle])

  // Synchronize θ*_fiber with fabric parameters when in size mode
  useEffect(() => {
    if (fabricInputMode === 'size') {
      try {
        const thetaY = (params.youngsAngle * Math.PI) / 180; // Convert to radians
        const radius = params.fiberDiameter / 2;
        const dFiberStar = calculateDFiberFromSpacing(params.fiberSpacing, radius);
        // Calculate θ*_fiber from D*_fiber using equation 1
        const thetaFiberStarRad = thetaFiberStar(thetaY, dFiberStar);
        const thetaFiberStarDeg = (thetaFiberStarRad * 180) / Math.PI; // Convert to degrees
        updateParam('thetaFiberStar', thetaFiberStarDeg);
      } catch (error) {
        console.error('Error calculating θ*_fiber from fabric parameters:', error);
      }
    }
  }, [fabricInputMode, params.fiberSpacing, params.fiberDiameter, params.youngsAngle])

  useEffect(() => {
    try {
      const calculated = calculateFabricDesign(params, selectedLiquid)
      setResults(calculated)
      setErrors([])
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Unknown error'])
      setResults(null)
    }
  }, [params, selectedLiquid])

  const updateParam = (key: keyof FabricParameters, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  // Helper function to safely parse numeric values
  const safeParseFloat = (value: string, defaultValue: number = 0): number => {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? defaultValue : parsed
  }

  const selectFabricPreset = (presetKey: string) => {
    const preset = FABRIC_PRESETS[presetKey as keyof typeof FABRIC_PRESETS]
    if (preset) {
      // Calculate fiber spacing from D* value
      // D* = (spacing/2 + radius) / radius
      // spacing = 2 * radius * (D* - 1)
      const radius = params.fiberDiameter / 2
      const spacing = 2 * radius * (preset.DFiberStar - 1)
      updateParam('fiberSpacing', spacing)
      setSelectedFabricPreset(presetKey)
    }
  }

  // Update fabric parameters when input mode changes
  const updateFabricFromSpacing = (spacing: number) => {
    updateParam('fiberSpacing', spacing)
    // Calculate D*_fiber from spacing
    const radius = params.fiberDiameter / 2
    const dFiberStar = calculateDFiberFromSpacing(spacing, radius)
    // Note: We don't store D*_fiber directly, it's calculated in the main function
  }

  const updateFabricFromTheta = (thetaFiberStar: number) => {
    updateParam('thetaFiberStar', thetaFiberStar)
    // Calculate D*_fiber from theta*_fiber
    const radius = params.fiberDiameter / 2
    const thetaY = (params.youngsAngle * Math.PI) / 180 // Convert to radians
    const thetaFiberStarRad = (thetaFiberStar * Math.PI) / 180 // Convert to radians
    const dFiberStar = calculateDFiberFromTheta(thetaFiberStarRad, thetaY)
    // Calculate spacing from D*_fiber
    const spacing = calculateSpacingFromDFiber(dFiberStar, radius)
    updateParam('fiberSpacing', spacing)
  }

  const updateFabricFromDiameter = (diameter: number) => {
    updateParam('fiberDiameter', diameter)
    const radius = diameter / 2
    
    // Recalculate based on current input mode
    if (fabricInputMode === 'size') {
      // In size mode, recalculate D*_fiber from current spacing
      const dFiberStar = calculateDFiberFromSpacing(params.fiberSpacing, radius)
      // Note: We don't store D*_fiber directly, it's calculated in the main function
    } else if (fabricInputMode === 'angle') {
      // In angle mode, recalculate spacing from current theta*_fiber
      const thetaY = (params.youngsAngle * Math.PI) / 180 // Convert to radians
      const thetaFiberStarRad = (params.thetaFiberStar * Math.PI) / 180 // Convert to radians
      const dFiberStar = calculateDFiberFromTheta(thetaFiberStarRad, thetaY)
      const spacing = calculateSpacingFromDFiber(dFiberStar, radius)
      updateParam('fiberSpacing', spacing)
    } else if (fabricInputMode === 'percentOA') {
      // In %OA mode, recalculate spacing from current %OA
      const dFiberStar = calculateDFiberFromPercentOA(params.percentOA || 50)
      const spacing = calculateSpacingFromDFiber(dFiberStar, radius)
      updateParam('fiberSpacing', spacing)
    }
  }

  const updateFabricFromPercentOA = (percentOA: number) => {
    updateParam('percentOA', percentOA)
    const radius = params.fiberDiameter / 2
    const dFiberStar = calculateDFiberFromPercentOA(percentOA)
    const spacing = calculateSpacingFromDFiber(dFiberStar, radius)
    updateParam('fiberSpacing', spacing)
  }

  const getStabilityColor = (isStable: boolean) => {
    return isStable ? 'text-green-600' : 'text-red-600'
  }

  const getStabilityIcon = (isStable: boolean) => {
    return isStable ? CheckCircle : AlertCircle
  }

  const getPerformanceLevel = (contactAngle: number) => {
    if (contactAngle < 90) return { level: 'Oleophilic', color: 'red', icon: '⚠️' }
    if (contactAngle < 140) return { level: 'Oleophobic', color: 'blue', icon: '✅' }
    return { level: 'Superoleophobic', color: 'green', icon: '🎯' }
  }

  const getStabilityRecommendations = (aStar: number) => {
    const recommendations = []
    if (aStar < 1) {
      recommendations.push({ aStar: 1, description: 'Minimum stability for basic applications' })
    }
    if (aStar < 5) {
      recommendations.push({ aStar: 5, description: 'Good stability for most applications' })
    }
    if (aStar < 10) {
      recommendations.push({ aStar: 10, description: 'High stability for demanding applications' })
    }
    return recommendations
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-primary-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">
                Fabric Design Calculator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Design Parameters
              </h2>
              
              {/* Liquid Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Liquid
                </label>
                <select
                  value={selectedLiquid}
                  onChange={(e) => setSelectedLiquid(e.target.value)}
                  className="input"
                >
                  {Object.entries(LIQUID_PROPERTIES).map(([key, props]) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
                      (γ = {(props.surfaceTension * 1000).toFixed(2)} mN/m)
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Surface tension affects capillary length and stability calculations
                </p>
              </div>

              {/* Target A* Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Stability (A*)
                </label>
                <select
                  value={targetAStar}
                  onChange={(e) => setTargetAStar(Number(e.target.value))}
                  className="input"
                >
                  <option value={1}>Barely Stable (A* = 1)</option>
                  <option value={5}>Normal Stability (A* = 5)</option>
                  <option value={10}>Very Stable (A* = 10)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Very stable repellent finish A*=10, normal stability = 5, barely stable = 1
                </p>
              </div>

              {/* Fabric Structure */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Fabric Structure</h3>
                
                {/* Input Mode Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fabricInputMode"
                        value="preset"
                        checked={fabricInputMode === 'preset'}
                        onChange={(e) => setFabricInputMode(e.target.value as 'preset' | 'size' | 'angle' | 'percentOA')}
                        className="mr-2"
                      />
                      Preset Weaves
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fabricInputMode"
                        value="size"
                        checked={fabricInputMode === 'size'}
                        onChange={(e) => setFabricInputMode(e.target.value as 'preset' | 'size' | 'angle' | 'percentOA')}
                        className="mr-2"
                      />
                      Size & Spacing
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fabricInputMode"
                        value="angle"
                        checked={fabricInputMode === 'angle'}
                        onChange={(e) => setFabricInputMode(e.target.value as 'preset' | 'size' | 'angle' | 'percentOA')}
                        className="mr-2"
                      />
                      Size & θ*<sub>fiber</sub>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fabricInputMode"
                        value="percentOA"
                        checked={fabricInputMode === 'percentOA'}
                        onChange={(e) => setFabricInputMode(e.target.value as 'preset' | 'size' | 'angle' | 'percentOA')}
                        className="mr-2"
                      />
                      % Open Area
                    </label>
                  </div>
                </div>

                {fabricInputMode === 'preset' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose from Common Weaves
                    </label>
                    <select
                      value={selectedFabricPreset || ''}
                      onChange={(e) => selectFabricPreset(e.target.value)}
                      className="input"
                    >
                      <option value="">Select a weave type...</option>
                      {Object.entries(FABRIC_PRESETS).map(([key, preset]) => (
                        <option key={key} value={key}>
                          {preset.name} (D* = {preset.DFiberStar})
                        </option>
                      ))}
                    </select>
                    {selectedFabricPreset && FABRIC_PRESETS[selectedFabricPreset as keyof typeof FABRIC_PRESETS] && (
                      <p className="text-xs text-gray-500 mt-1">
                        {FABRIC_PRESETS[selectedFabricPreset as keyof typeof FABRIC_PRESETS].description}
                      </p>
                    )}
                  </div>
                )}

                {fabricInputMode === 'size' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fiber Diameter (μm)
                        <span className="text-xs text-gray-500 block">Normal range: 10-200 μm</span>
                      </label>
                      <input
                        type="number"
                        value={params.fiberDiameter}
                        onChange={(e) => updateFabricFromDiameter(safeParseFloat(e.target.value, params.fiberDiameter))}
                        className="input"
                        min="1"
                        max="2000"
                        step="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fiber Spacing (μm)
                        <span className="text-xs text-gray-500 block">Distance between fiber centers</span>
                      </label>
                      <input
                        type="number"
                        value={params.fiberSpacing}
                        onChange={(e) => updateFabricFromSpacing(safeParseFloat(e.target.value, params.fiberSpacing))}
                        className="input"
                        min="1"
                        max="2000"
                        step="1"
                      />
                    </div>
                  </div>
                )}

                {fabricInputMode === 'angle' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fiber Diameter (μm)
                        <span className="text-xs text-gray-500 block">Normal range: 10-200 μm</span>
                      </label>
                      <input
                        type="number"
                        value={params.fiberDiameter}
                        onChange={(e) => updateFabricFromDiameter(safeParseFloat(e.target.value, params.fiberDiameter))}
                        className="input"
                        min="1"
                        max="2000"
                        step="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        θ*<sub>fiber</sub> (degrees)
                        <span className="text-xs text-gray-500 block">Contact angle on fiber surface</span>
                      </label>
                      <input
                        type="number"
                        value={params.thetaFiberStar}
                        onChange={(e) => updateFabricFromTheta(safeParseFloat(e.target.value, params.thetaFiberStar))}
                        className="input"
                        min="0"
                        max="180"
                        step="1"
                      />
                    </div>
                  </div>
                )}

                {fabricInputMode === 'percentOA' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fiber Diameter (μm)
                        <span className="text-xs text-gray-500 block">Normal range: 10-200 μm</span>
                      </label>
                      <input
                        type="number"
                        value={params.fiberDiameter}
                        onChange={(e) => updateFabricFromDiameter(safeParseFloat(e.target.value, params.fiberDiameter))}
                        className="input"
                        min="1"
                        max="2000"
                        step="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        % Open Area
                        <span className="text-xs text-gray-500 block">Percentage of open area (0-100%)</span>
                      </label>
                      <input
                        type="number"
                        value={params.percentOA || 50}
                        onChange={(e) => updateFabricFromPercentOA(safeParseFloat(e.target.value, 50))}
                        className="input"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                  </div>
                )}

                {/* Equation Mixing (only when no particle coating) */}
                {!params.useHierarchical && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4">Equation Mixing (2D Fabric Model)</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Equation 1 vs Equation 7 Weight
                          <span className="text-xs text-gray-500 block">
                            Mix between 1D approximation (Equation 1) and 2D fabric model (Equation 7)
                          </span>
                        </label>
                        
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={params.equation7Weight}
                            onChange={(e) => updateParam('equation7Weight', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${params.equation7Weight * 100}%, #E5E7EB ${params.equation7Weight * 100}%, #E5E7EB 100%)`
                            }}
                          />
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Pure Equation 1 (1D)</span>
                            <span>Pure Equation 7 (2D)</span>
                          </div>
                          
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-700">
                              Current mix: {Math.round((1 - params.equation7Weight) * 100)}% Equation 1, {Math.round(params.equation7Weight * 100)}% Equation 7
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                          <p className="text-sm text-blue-800">
                            <strong>Equation 7:</strong> Two-dimensional definition of fabric porosity that accounts for 
                            the actual weave structure. This is more accurate for plain weave fabrics where 
                            yarns intersect and create a true 2D geometry.
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Use more Equation 7 for plain weaves, more Equation 1 for simple fiber arrays.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show calculated values */}
                {fabricInputMode !== 'preset' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700 font-medium">D*<sub>fiber</sub>:</span>
                        <span className="ml-2 text-blue-900">
                          {results?.DFiberStar?.toFixed(2) || 'Calculating...'}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">
                          {fabricInputMode === 'percentOA' ? '% Open Area:' : 'Spacing:'}
                        </span>
                        <span className="ml-2 text-blue-900">
                          {fabricInputMode === 'percentOA' 
                            ? `${params.percentOA?.toFixed(1) || 50}%`
                            : `${params.fiberSpacing.toFixed(1)} μm`
                          }
                        </span>
                      </div>
                    </div>
                    {fabricInputMode === 'percentOA' && (
                      <div className="mt-2 text-xs text-blue-600">
                        Spacing: {params.fiberSpacing.toFixed(1)} μm
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Surface Chemistry */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Surface Chemistry</h3>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(SURFACE_CHEMISTRIES).map(([key, chem]) => {
                    const contactAngle = getContactAngleForLiquid(selectedLiquid, key)
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSurfaceChemistry(key)}
                        className={`p-3 rounded-lg border text-sm ${
                          selectedSurfaceChemistry === key
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{chem.name}</div>
                        <div className="text-xs text-gray-600">θᵧ = {contactAngle}°</div>
                      </button>
                    )
                  })}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Young's Contact Angle (degrees)
                    <span className="text-xs text-gray-500 block">
                      Auto-updated based on liquid selection. Normal range: 0-120°
                    </span>
                  </label>
                  <input
                    type="number"
                    value={params.youngsAngle}
                    onChange={(e) => updateParam('youngsAngle', safeParseFloat(e.target.value, params.youngsAngle))}
                    className="input"
                    min="0"
                    max="120"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Contact angle between liquid and a smooth, solid surface of this chemistry. You can override manually if material/liquid is not in the default list.
                  </p>
                </div>
              </div>

              {/* Particle Coating Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Particle Coating (Hierarchical)</h3>
                  <button
                    onClick={() => updateParam('useHierarchical', !params.useHierarchical)}
                    className="flex items-center"
                  >
                    {params.useHierarchical ? (
                      <ToggleRight className="h-6 w-6 text-primary-600" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {params.useHierarchical && (
                  <div className="space-y-4">
                    {/* Input Mode Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Input Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="particleInputMode"
                            value="size"
                            checked={particleInputMode === 'size'}
                            onChange={(e) => { setParticleInputMode(e.target.value as 'size' | 'angle'); updateParam('particleInputMode', 'size') }}
                            className="mr-2"
                          />
                          Particle Size & Spacing
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="particleInputMode"
                            value="angle"
                            checked={particleInputMode === 'angle'}
                            onChange={(e) => { setParticleInputMode(e.target.value as 'size' | 'angle'); updateParam('particleInputMode', 'angle') }}
                            className="mr-2"
                          />
                          θ*<sub>particle</sub> (Contact Angle)
                        </label>
                      </div>
                    </div>

                    {particleInputMode === 'size' ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Particle Diameter (μm)
                            <span className="text-xs text-gray-500 block">Normal range: 0.1-10 μm</span>
                          </label>
                          <input
                            type="number"
                            value={params.particleDiameter}
                            onChange={(e) => updateParam('particleDiameter', safeParseFloat(e.target.value, params.particleDiameter))}
                            className="input"
                            min="0.01"
                            max="10"
                            step="0.01"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Particle Spacing (μm)
                            <span className="text-xs text-gray-500 block">Distance between particles</span>
                          </label>
                          <input
                            type="number"
                            value={params.particleSpacing}
                            onChange={(e) => updateParam('particleSpacing', safeParseFloat(e.target.value, params.particleSpacing))}
                            className="input"
                            min="0.01"
                            max="5"
                            step="0.01"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          θ*<sub>particle</sub> (degrees)
                          <span className="text-xs text-gray-500 block">Contact angle measured on smooth substrate with particle coating</span>
                        </label>
                        <input
                          type="number"
                          value={params.thetaParticleStar}
                          onChange={(e) => updateParam('thetaParticleStar', safeParseFloat(e.target.value, params.thetaParticleStar))}
                          className="input"
                          min="0"
                          max="180"
                          step="1"
                        />
                      </div>
                    )}

                    {/* Display max D*fiber when hierarchical is enabled */}
                    {results && results.maxDFiberStar && (
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-blue-700">
                          <strong>Maximum D*<sub>fiber</sub> for A* = {targetAStar}:</strong> {results.maxDFiberStar.toFixed(2)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          This is the maximum fiber porosity that maintains the target stability for your particle coating.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {errors.length > 0 && (
              <div className="card border-red-200 bg-red-50">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Calculation Errors</h3>
                </div>
                <ul className="text-sm text-red-800">
                  {errors.map((error, i) => (
                    <li key={i}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {results && (
              <>
                {/* Key Results */}
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Key Results</h2>
                  
                  <div className={`grid gap-4 mb-6 ${params.useHierarchical ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {results.DFiberStar.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Fiber Porosity (D*<sub>fiber</sub>)</div>
                      <DFiberDiagram />
                    </div>
                    
                    {params.useHierarchical && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        {particleInputMode === 'size' ? (
                          <>
                            <div className="text-2xl font-bold text-gray-900">
                              {results.currentDParticleStar?.toFixed(2) || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">Particle Porosity (D*<sub>particle</sub>)</div>
                            <DParticleDiagram />
                          </>
                        ) : (
                          <>
                            <div className="text-2xl font-bold text-gray-900">
                              {calculatedDParticleStar?.toFixed(2) || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">Particle Porosity (D*<sub>particle</sub>)</div>
                            <div className="text-xs text-gray-500 mt-2">
                              Calculated from θ*<sub>particle</sub> = {params.thetaParticleStar.toFixed(1)}°
                            </div>
                            <DParticleDiagram />
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {params.useHierarchical && results.thetaHierarchical 
                          ? results.thetaHierarchical.toFixed(1)
                          : results.thetaConvolved.toFixed(1)}°
                      </div>
                      <div className="text-sm text-gray-600">
                        {params.useHierarchical ? 'Hierarchical Contact Angle' : 'Current Contact Angle'}
                      </div>
                    </div>
                  </div>

                  {/* Performance Level */}
                  {(() => {
                    const contactAngle = params.useHierarchical && results.thetaHierarchical 
                      ? results.thetaHierarchical 
                      : results.thetaConvolved
                    const performance = getPerformanceLevel(contactAngle)
                    return (
                      <div className={`p-4 rounded-lg border-2 ${
                        performance.color === 'red' ? 'bg-red-50 border-red-200' :
                        performance.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-2">{performance.icon}</span>
                          <span className={`text-lg font-semibold ${
                            performance.color === 'red' ? 'text-red-800' :
                            performance.color === 'blue' ? 'text-blue-800' :
                            'text-green-800'
                          }`}>
                            {performance.level}
                          </span>
                        </div>
                        <div className="text-center text-sm text-gray-600 mt-1">
                          {performance.level === 'Oleophilic' && 'Liquid will wet the surface'}
                          {performance.level === 'Oleophobic' && 'Good oil repellency achieved'}
                          {performance.level === 'Superoleophobic' && 'Excellent oil repellency'}
                        </div>
                      </div>
                    )
                  })()}

                  {/* Stability Analysis */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      {(() => {
                        const Icon = getStabilityIcon(results.isStable)
                        return <Icon className={`h-5 w-5 mr-2 ${getStabilityColor(results.isStable)}`} />
                      })()}
                      <span className={`font-semibold ${getStabilityColor(results.isStable)}`}>
                        {results.isStable ? 'Design is Stable' : 'Design is Unstable'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      Robustness A* = {(results.AHierarchicalStar || results.AFiberStar).toFixed(1)}
                      {!results.isStable && (
                        <span className="text-red-600 ml-2">
                          (Target: {params.stabilityValue})
                        </span>
                      )}
                      <div className="ml-2">
                        <AStarPopup />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Smart Recommendations */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Smart Recommendations</h3>
                  
                  <div className="space-y-3">
                    {(() => {
                      const contactAngle = params.useHierarchical && results.thetaHierarchical 
                        ? results.thetaHierarchical 
                        : results.thetaConvolved
                      
                      if (contactAngle < 90) {
                        return (
                          <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div className="text-sm">
                              <strong>Low Contact Angle:</strong> Consider using a different surface chemistry 
                              (try PDMS or fluorinated) or increasing fabric porosity.
                            </div>
                          </div>
                        )
                      }
                      
                      if (contactAngle >= 90 && contactAngle < 140) {
                        return (
                          <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                            <div className="text-sm">
                              <strong>Good Oleophobicity:</strong> Consider adding hierarchical particle texture 
                              to achieve superoleophobic behavior (θ* &gt; 140°).
                            </div>
                          </div>
                        )
                      }
                      
                      if (results.desiredParticleSpacing && results.desiredParticleSpacing < 0.1) {
                        return (
                          <div className="flex items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <Info className="h-5 w-5 text-orange-600 mr-2 mt-0.5" />
                            <div className="text-sm">
                              <strong>Precise Control Required:</strong> Very small particle spacing needed. 
                              Consider using smaller particles or different coating method.
                            </div>
                          </div>
                        )
                      }
                      
                      if (results.isStable && contactAngle >= 140) {
                        return (
                          <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Info className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                            <div className="text-sm">
                              <strong>Excellent Design:</strong> You have achieved superoleophobic behavior 
                              with good stability. This design should work well in practice.
                            </div>
                          </div>
                        )
                      }
                      
                      return null
                    })()}
                  </div>
                </div>

                {/* Equations Used Footer */}
                <div className="card bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Equations Used
                  </h3>
                  
                  <div className="space-y-3">
                    {results.equationsUsed.map((equation: string, i: number) => {
                      // Map equation names to their corresponding popup components
                      const getEquationComponent = (eqName: string) => {
                        if (eqName.includes("Young's Equation")) return <YoungsEquationPopup key={i} />
                        if (eqName.includes("Fiber Contact Angle")) return <FiberContactAnglePopup key={i} />
                        if (eqName.includes("Particle Contact Angle")) return <ParticleContactAnglePopup key={i} />
                        if (eqName.includes("Hierarchical Contact Angle")) return <HierarchicalContactAnglePopup key={i} />
                        if (eqName.includes("Maximum Fiber Porosity")) return <MaxFiberPorosityPopup key={i} />
                        if (eqName.includes("Robustness Parameter")) return <RobustnessParameterPopup key={i} />
                        if (eqName.includes("Equation 7")) return <Fabric2DContactAnglePopup key={i} />
                        return null
                      }
                      
                      return (
                        <div key={i} className="flex items-center justify-between text-sm text-gray-700 p-2 rounded hover:bg-gray-100">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {equation}
                          </div>
                          <div>
                            {getEquationComponent(equation)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-xs text-gray-600">
                      <strong>Note:</strong> The equations used depend on which features are enabled. 
                      Basic fiber-only calculations use Equation 1, while hierarchical calculations 
                      add Equations 2 and 3. Performance targets use Equation 6 for stability analysis.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}