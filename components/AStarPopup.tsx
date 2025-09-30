'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { MathEquation, EQUATIONS } from './MathEquation'

export function AStarPopup() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        What is A*?
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
        What is A*?
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
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Designing Fabrics with Robust Oil Repellency</h4>
              <p className="text-sm text-blue-700">
                For low-surface-tension liquids, the Cassie-Baxter state is metastable, and pressure can cause 
                droplets to transition from the non-wetted to the wetted Wenzel state. The robustness parameter, 
                A*, was previously developed as a measure of the capillary resistance that a surface exhibits 
                against transitioning from the Cassie state to the Wenzel state.
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>A*</strong> is defined as the pressure required to force a wetting transition (breakthrough) 
                divided by a reference pressure, P<sub>ref</sub>:
              </p>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-red-500">
                <MathEquation equation={EQUATIONS.robustnessParameter} />
              </div>
              
              <p className="text-sm text-gray-700">
                For cylindrical fibres of radius R<sub>fibre</sub>, A<sub>fibre</sub> is given by:
              </p>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-red-500">
                <MathEquation equation={EQUATIONS.fiberRobustness} />
              </div>
              
              <p className="text-sm text-gray-700">
                The reference pressure is defined as the Laplace pressure of a droplet whose radius is equal 
                to the capillary length of the liquid, l<sub>cap</sub>, or P<sub>ref</sub> = 2γ<sub>LV</sub>/l<sub>cap</sub>, 
                where l<sub>cap</sub> = √(γ<sub>LV</sub>/ρg). Here ρ is the liquid density and g is the 
                acceleration due to gravity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">A* &lt; 1 (Unstable)</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Surface texture unable to support Cassie-Baxter state</li>
                  <li>• Droplets will wet the surface</li>
                  <li>• Poor liquid repellency</li>
                  <li>• Avoid this range</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">A* &gt;&gt; 1 (Robust)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Robust, liquid-repellent surfaces</li>
                  <li>• Maintains Cassie-Baxter state</li>
                  <li>• Excellent liquid repellency</li>
                  <li>• Target for design</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">Hierarchical Effects</h4>
              <p className="text-sm text-yellow-700">
                It has been previously argued that the addition of particles atop an underlying texture does not 
                impact the robustness of the non-wetted interface. However, if the particles are non-wetted, 
                the meniscus on the fibres will sit at θ*<sub>particle</sub> and not θ<sub>Y</sub>, which does 
                impact the overall capillary resistance of the textile.
              </p>
              <p className="text-sm text-yellow-700 mt-2">
                Hence, for spherical particles decorating the surface of cylindrical fibres, the robustness 
                of the Cassie state is given by:
              </p>
              <div className="bg-gray-50 p-3 rounded mt-2">
                <MathEquation equation={EQUATIONS.hierarchicalRobustness} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}