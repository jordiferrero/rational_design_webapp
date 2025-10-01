'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { MathEquation, EQUATIONS } from './MathEquation'

export function YoungsEquationPopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Young's Equation
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Young's Equation
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Young's Equation</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Fundamental Contact Angle Theory</h4>
              <p className="text-sm text-blue-700">
                Young's equation describes the equilibrium contact angle of a liquid droplet on a solid surface, 
                relating the surface tensions of the three phases (solid, liquid, vapor).
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
                <MathEquation equation={EQUATIONS.youngsEquation} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>θ<sub>Y</sub>:</strong> Young's contact angle (equilibrium angle)</li>
                  <li>• <strong>γ<sub>SV</sub>:</strong> Solid-vapor surface tension (mN/m)</li>
                  <li>• <strong>γ<sub>SL</sub>:</strong> Solid-liquid surface tension (mN/m)</li>
                  <li>• <strong>γ<sub>LV</sub>:</strong> Liquid-vapor surface tension (mN/m)</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-800 mb-2">Physical Implications:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>θ<sub>Y</sub> &lt; 90°:</strong> Hydrophilic/oleophilic surface (liquid wets)</li>
                  <li>• <strong>θ<sub>Y</sub> &gt; 90°:</strong> Hydrophobic/oleophobic surface (liquid beads)</li>
                  <li>• <strong>θ<sub>Y</sub> &gt; 150°:</strong> Superhydrophobic/superoleophobic surface</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <p className="text-sm text-green-700">
                  <strong>Design Impact:</strong> This equation forms the foundation for understanding how surface 
                  chemistry affects liquid repellency. Different surface chemistries (PDMS, alkyl, fluorinated, 
                  perfluorinated) create different γ<sub>SV</sub> and γ<sub>SL</sub> values, directly influencing θ<sub>Y</sub>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FiberContactAnglePopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Fiber Contact Angle
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Fiber Contact Angle
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fiber Contact Angle (θ*<sub>fiber</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">Cylindrical Fiber Surface Theory</h4>
              <p className="text-sm text-green-700">
                For cylindrical fibers, the apparent contact angle depends on the fiber porosity parameter D*<sub>fiber</sub>. 
                This equation shows how fiber spacing and radius affect the overall contact angle, enabling the design 
                of superoleophobic surfaces.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-green-500">
                <MathEquation equation={EQUATIONS.fiberContactAngle} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>θ*<sub>fiber</sub>:</strong> Apparent contact angle on fiber surface</li>
                  <li>• <strong>θ<sub>Y</sub>:</strong> Young's contact angle (from surface chemistry)</li>
                  <li>• <strong>D*<sub>fiber</sub>:</strong> Fiber porosity parameter = (s/2 + R)/R</li>
                  <li>• <strong>s:</strong> Spacing between fiber centers</li>
                  <li>• <strong>R:</strong> Fiber radius</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-800 mb-2">Physical Implications:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Higher D*<sub>fiber</sub>:</strong> More porous structure, higher apparent contact angle</li>
                  <li>• <strong>Lower D*<sub>fiber</sub>:</strong> Denser structure, lower apparent contact angle</li>
                  <li>• <strong>D*<sub>fiber</sub> = 1:</strong> Solid surface (no porosity)</li>
                  <li>• <strong>D*<sub>fiber</sub> &gt; 3:</strong> High porosity, potential for superoleophobicity</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                <p className="text-sm text-purple-700">
                  <strong>Design Impact:</strong> This equation enables the rational design of fiber-based liquid-repellent 
                  surfaces by controlling the fiber spacing and radius to achieve desired contact angles. It's the foundation 
                  for creating superoleophobic fabrics that can repel low-surface-tension liquids.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ParticleContactAnglePopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Particle Contact Angle
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Particle Contact Angle
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Particle Contact Angle (θ*<sub>particle</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">Spherical Particle Surface Theory</h4>
              <p className="text-sm text-yellow-700">
                For spherical particles decorating a surface, the apparent contact angle depends on the particle 
                porosity parameter D*<sub>particle</sub>. This describes the texture observed on a smooth surface 
                decorated with spherical particles.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-yellow-500">
                <MathEquation equation={EQUATIONS.particleContactAngle} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>θ*<sub>particle</sub>:</strong> Apparent contact angle on particle surface</li>
                  <li>• <strong>θ<sub>Y</sub>:</strong> Young's contact angle (from surface chemistry)</li>
                  <li>• <strong>D*<sub>particle</sub>:</strong> Particle porosity parameter = (s + r)/r</li>
                  <li>• <strong>s:</strong> Inter-particle spacing</li>
                  <li>• <strong>r:</strong> Particle radius</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                <h5 className="font-semibold text-orange-800 mb-2">Physical Implications:</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• <strong>Higher D*<sub>particle</sub>:</strong> Denser particle coating, higher apparent contact angle</li>
                  <li>• <strong>Lower D*<sub>particle</sub>:</strong> Sparse particle coating, lower apparent contact angle</li>
                  <li>• <strong>D*<sub>particle</sub> = 1:</strong> No particles (smooth surface)</li>
                  <li>• <strong>D*<sub>particle</sub> &gt; 3:</strong> Dense particle coating, enhanced repellency</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p className="text-sm text-red-700">
                  <strong>Design Impact:</strong> This equation enables the design of particle-based surface modifications 
                  to enhance liquid repellency. The total effect comes from convoluting both phenomena: hierarchical 
                  texture where spherical particles decorate the surface of cylindrical fibers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HierarchicalContactAnglePopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Hierarchical Contact Angle
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Hierarchical Contact Angle
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Hierarchical Contact Angle (θ*<sub>hierarchical</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">Hierarchical Surface Structures</h4>
              <p className="text-sm text-purple-700">
                Hierarchical structures combine multiple length scales to achieve superior liquid repellency. 
                This recursive relationship allows for the design of surfaces that can repel even low-surface-tension 
                liquids like oils and organic solvents.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-500">
                <MathEquation equation={EQUATIONS.hierarchicalContactAngle} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>θ*<sub>hierarchical</sub>:</strong> Final hierarchical contact angle</li>
                  <li>• <strong>θ*<sub>particle</sub>:</strong> Contact angle on particle surface</li>
                  <li>• <strong>D*<sub>fiber</sub>:</strong> Fiber porosity parameter</li>
                  <li>• <strong>Recursive relationship:</strong> Uses particle angle as input to fiber equation</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                <h5 className="font-semibold text-indigo-800 mb-2">Physical Implications:</h5>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• <strong>Multi-scale effects:</strong> Combines fiber and particle length scales</li>
                  <li>• <strong>Enhanced repellency:</strong> Can achieve superoleophobic behavior</li>
                  <li>• <strong>Liquid versatility:</strong> Effective against various liquid types</li>
                  <li>• <strong>Design flexibility:</strong> Multiple parameters for optimization</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-3">Meniscus Position on Hierarchical Textures</h5>
                <div className="text-center">
                  <img 
                    src="/images/diagram1.jpeg" 
                    alt="Meniscus position on hierarchical textures"
                    className="max-w-full h-auto rounded border"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Schematic of a low surface tension liquid on fibers decorated with particles with the liquid meniscus sitting at <strong>a,</strong> the fibers (θ=θ<sub>Y</sub>) and <strong>b,</strong> the particles θ = θ*<sub>particle</sub>.
                  </p>
                </div>
              </div>
              
              <div className="bg-pink-50 p-3 rounded border-l-4 border-pink-500">
                <p className="text-sm text-pink-700">
                  <strong>Design Impact:</strong> This equation represents the pinnacle of liquid-repellent surface design, 
                  enabling the creation of hierarchical structures that can repel even the most challenging liquids. 
                  It's the key to achieving superoleophobic behavior in practical applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MaxFiberPorosityPopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Maximum Fiber Porosity
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Maximum Fiber Porosity
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Maximum Fiber Porosity (D*<sub>fiber,max</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-semibold text-indigo-800 mb-2">Design Optimization for Target Stability</h4>
              <p className="text-sm text-indigo-700">
                This equation calculates the maximum fiber porosity (D*<sub>fiber,max</sub>) that can be achieved 
                for a given particle contact angle while maintaining the desired robustness parameter A*. It's 
                essential for optimizing hierarchical surface designs.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-indigo-500">
                <MathEquation equation={EQUATIONS.maxFiberPorosity} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>D*<sub>fiber,max</sub>:</strong> Maximum achievable fiber porosity</li>
                  <li>• <strong>θ*<sub>particle</sub>:</strong> Particle contact angle</li>
                  <li>• <strong>l<sub>cap</sub>:</strong> Capillary length of the liquid</li>
                  <li>• <strong>A*<sub>hierarchical</sub>:</strong> Target robustness parameter</li>
                  <li>• <strong>R<sub>fiber</sub>:</strong> Fiber radius</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-800 mb-2">Physical Implications:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Design constraint:</strong> Limits maximum porosity for stability</li>
                  <li>• <strong>Optimization tool:</strong> Balances porosity vs. stability</li>
                  <li>• <strong>Hierarchical design:</strong> Accounts for particle effects</li>
                  <li>• <strong>Liquid-specific:</strong> Depends on liquid properties</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                <p className="text-sm text-purple-700">
                  <strong>Design Impact:</strong> This equation enables the rational design of hierarchical 
                  surfaces by determining the maximum fiber porosity that can maintain the desired stability 
                  for a given particle coating. It's crucial for optimizing the balance between high porosity 
                  (better repellency) and stability (durability).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Fabric2DContactAnglePopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Equation 7 (2D Fabric)
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Equation 7 (2D Fabric)
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Equation 7: 2D Fabric Contact Angle</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">Two-Dimensional Fabric Model</h4>
              <p className="text-sm text-purple-700">
                Equation 7 provides a two-dimensional definition of fabric porosity that accounts for the actual 
                weave structure. This is more accurate for plain weave fabrics where yarns intersect and create 
                a true 2D geometry, compared to the one-dimensional approximation of Equation 1.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-500">
                <MathEquation equation={EQUATIONS.fabric2DContactAngle} display={true} />
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-3">Geometric Schematics of Fibers</h5>
                <div className="text-center">
                  <img 
                    src="/images/diagram2.jpeg" 
                    alt="Geometric schematics of fibers"
                    className="max-w-full h-auto rounded border"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>a,</strong> A schematic of the woven mesh in plain weave. <strong>b,</strong> SEM image of the nylon jacket fabric (D*≈ 1.5) indicating a unit cell of yarns and open area.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>θ*<sub>fabric</sub>:</strong> 2D fabric contact angle</li>
                  <li>• <strong>θ<sub>Y</sub>:</strong> Young's contact angle (from surface chemistry)</li>
                  <li>• <strong>D*<sub>fiber</sub>:</strong> Fiber porosity parameter</li>
                  <li>• <strong>2D geometry:</strong> Accounts for yarn intersections in weave</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-800 mb-2">Key Differences from Equation 1:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Equation 1:</strong> One-dimensional approximation for simple fiber arrays</li>
                  <li>• <strong>Equation 7:</strong> Two-dimensional model for actual woven fabrics</li>
                  <li>• <strong>Weave structure:</strong> Accounts for yarn intersections and overlaps</li>
                  <li>• <strong>More accurate:</strong> Better prediction for plain weave fabrics</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <h5 className="font-semibold text-green-800 mb-2">Physical Interpretation:</h5>
                <p className="text-sm text-green-700 mb-2">
                  This equation assumes every yarn of the weave adopts θ<sub>Y</sub> (magenta line in Figure 6). 
                  If one instead assumes half the yarns remain dry, the two-dimensional definition reduces to Equation 1.
                </p>
                <p className="text-sm text-green-700">
                  Data from Figure 6 indicated that this was true above a surface tension of γ<sub>LV</sub> ~ 31 mN/m. 
                  Below this, an equally weighted average of equations (1) and (7) nicely fits the data (dashed line, Figure 6), 
                  indicating that both wetted and non-wetted yarns were present along the contact line.
                </p>
              </div>
              
              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                <p className="text-sm text-orange-700">
                  <strong>Design Impact:</strong> Equation 7 is essential for accurately predicting contact angles on 
                  woven fabrics, especially plain weaves. The ability to mix Equations 1 and 7 allows for fine-tuning 
                  the model based on the specific fabric structure and wetting behavior observed experimentally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RobustnessParameterPopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Robustness Parameter (A*)
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        Robustness Parameter (A*)
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Robustness Parameter (A*)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-2">Designing Fabrics with Robust Oil Repellency</h4>
              <p className="text-sm text-red-700">
                For low-surface-tension liquids, the Cassie-Baxter state is metastable, and pressure can cause 
                droplets to transition from the non-wetted to the wetted Wenzel state. The robustness parameter, 
                A*, measures the capillary resistance against transitioning from the Cassie state to the Wenzel state.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-red-500">
                <MathEquation equation={EQUATIONS.robustnessParameter} display={true} />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800">Parameters:</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>A*:</strong> Robustness parameter (dimensionless)</li>
                  <li>• <strong>P<sub>breakthrough</sub>:</strong> Pressure required to force wetting transition</li>
                  <li>• <strong>P<sub>ref</sub>:</strong> Reference pressure = 2γ<sub>LV</sub>/l<sub>cap</sub></li>
                  <li>• <strong>l<sub>cap</sub>:</strong> Capillary length = √(γ<sub>LV</sub>/ρg)</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                  <h5 className="font-semibold text-red-800 mb-2">A* &lt; 1 (Unstable)</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Surface texture unable to support Cassie-Baxter state</li>
                    <li>• Droplets will wet the surface</li>
                    <li>• Poor liquid repellency</li>
                    <li>• Avoid this range</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-semibold text-green-800 mb-2">A* &gt;&gt; 1 (Robust)</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Robust, liquid-repellent surfaces</li>
                    <li>• Maintains Cassie-Baxter state</li>
                    <li>• Excellent liquid repellency</li>
                    <li>• Target for design</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <p className="text-sm text-blue-700">
                  <strong>Design Impact:</strong> A* is crucial for practical applications where surfaces must maintain 
                  their repellent properties under pressure or mechanical stress. It determines the durability and 
                  reliability of liquid-repellent surfaces in real-world conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
