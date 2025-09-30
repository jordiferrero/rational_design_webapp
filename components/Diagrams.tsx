'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { MathEquation, EQUATIONS } from './MathEquation'

export function DFiberDiagram() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        What is D*<sub>fiber</sub>?
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
        What is D*<sub>fiber</sub>?
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fiber Porosity Parameter (D*<sub>fiber</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <svg width="400" height="250" viewBox="0 0 400 250" className="mx-auto">
                  <circle cx="100" cy="125" r="30" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                  <circle cx="300" cy="125" r="30" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                  
                  <line x1="130" y1="125" x2="270" y2="125" stroke="#EF4444" strokeWidth="3" strokeDasharray="5,5"/>
                  <line x1="100" y1="95" x2="100" y2="155" stroke="#10B981" strokeWidth="2"/>
                  <line x1="300" y1="95" x2="300" y2="155" stroke="#10B981" strokeWidth="2"/>
                  
                  <text x="200" y="110" textAnchor="middle" className="text-sm font-bold fill-red-600">Spacing (s)</text>
                  <text x="85" y="85" textAnchor="middle" className="text-sm font-bold fill-green-600">Radius (R)</text>
                  <text x="315" y="85" textAnchor="middle" className="text-sm font-bold fill-green-600">Radius (R)</text>
                  
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>D*<sub>fiber</sub></strong> characterizes the texture of cylindrical fiber surfaces. 
                If a region of the surface remains non-wetted underneath a droplet, the liquid stays in 
                contact with air. Increasing this fraction of air is the only way to increase the apparent 
                contact angle for low-surface-tension liquids (θ<sub>Y</sub> &lt; 90°).
              </p>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <MathEquation equation={EQUATIONS.fiberPorosity} />
              </div>
              
              <p className="text-sm text-gray-700">
                Where <strong>2D</strong> is the spacing between fibers and <strong>2R</strong> is the fiber diameter. 
                Large values of D*<sub>fiber</sub> indicate fabrics with high inherent porosity.
              </p>
              
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>D* = 1:</strong> No porosity (solid surface)</li>
                <li>• <strong>D* = 2:</strong> Moderate porosity (common in fabrics)</li>
                <li>• <strong>D* &gt; 3:</strong> High porosity (open structures)</li>
                <li>• <strong>D* &gt; 5:</strong> Very high porosity (mesh-like)</li>
              </ul>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Key Insight:</strong> For cylindrical fibers, the texture of the surface may be 
                  characterized by the porosity parameter D*<sub>fiber</sub>. This parameter directly 
                  influences the apparent contact angle and liquid repellency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export function DParticleDiagram() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Info className="h-4 w-4 mr-1" />
        What is D*<sub>particle</sub>?
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
        What is D*<sub>particle</sub>?
      </button>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Particle Porosity Parameter (D*<sub>particle</sub>)</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <svg width="400" height="250" viewBox="0 0 400 250" className="mx-auto">
                  <circle cx="100" cy="125" r="25" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                  <circle cx="300" cy="125" r="25" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                  <circle cx="200" cy="175" r="25" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                  
                  <line x1="125" y1="125" x2="275" y2="125" stroke="#EF4444" strokeWidth="3" strokeDasharray="5,5"/>
                  <line x1="100" y1="100" x2="100" y2="150" stroke="#10B981" strokeWidth="2"/>
                  <line x1="300" y1="100" x2="300" y2="150" stroke="#10B981" strokeWidth="2"/>
                  
                  <text x="200" y="110" textAnchor="middle" className="text-sm font-bold fill-red-600">Spacing (s)</text>
                  <text x="85" y="85" textAnchor="middle" className="text-sm font-bold fill-green-600">Radius (r)</text>
                  <text x="315" y="85" textAnchor="middle" className="text-sm font-bold fill-green-600">Radius (r)</text>
                  

                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>D*<sub>particle</sub></strong> is the porosity of the particles, defined by:
              </p>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-yellow-500">
                <MathEquation equation={EQUATIONS.particlePorosity} />
              </div>
              
              <p className="text-sm text-gray-700">
                Here <strong>2D<sub>particle</sub></strong> is the inter-particle spacing and <strong>R<sub>particle</sub></strong> 
                is the particle radius. This parameter describes the texture observed on a smooth surface 
                decorated with spherical particles.
              </p>
              
              <p className="text-sm text-gray-700">
                The total effect comes from convoluting both phenomena: hierarchical texture where these 
                spherical particles decorate the surface of cylindrical fibers. The apparent contact angle 
                can be found recursively by combining both D*<sub>fiber</sub> and D*<sub>particle</sub> effects.
              </p>
              
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>D* = 1:</strong> No porosity (solid coating)</li>
                <li>• <strong>D* = 2:</strong> Moderate porosity (sparse particles)</li>
                <li>• <strong>D* = 3-5:</strong> High porosity (dense particle coating)</li>
                <li>• <strong>D* &gt; 5:</strong> Very high porosity (ultra-dense coating)</li>
              </ul>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Hierarchical Effect:</strong> D*<sub>particle</sub> works together with D*<sub>fiber</sub> 
                  to create hierarchical surface structures that can significantly enhance liquid repellency 
                  through multiple length scales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}