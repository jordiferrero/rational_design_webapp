'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'

interface DiagramInfoPopupProps {
  liquid?: string
  surfaceChemistry?: string
}

export function DiagramInfoPopup({ liquid = 'hexadecane', surfaceChemistry = 'PDMS' }: DiagramInfoPopupProps) {
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
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Understanding the Plot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Plot Axes</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  <strong>X-axis:</strong> D*<sub>fiber</sub> (Fiber Porosity) - ranges from 1 to 10
                </p>
                <p>
                  <strong>Left Y-axis (Blue, Solid Line):</strong> Contact Angle (degrees) - ranges from 0 to 160°
                </p>
                <p>
                  <strong>Right Y-axis (Green, Dashed Line):</strong> Robustness A* - ranges from 0 to 100
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">What the Lines Show</h4>
              <div className="space-y-2 text-sm text-green-700">
                <p>
                  The <strong>blue solid line</strong> shows how the apparent contact angle changes as fiber porosity (D*<sub>fiber</sub>) increases.
                </p>
                <p>
                  The <strong>green dashed line</strong> shows how the robustness parameter (A*) changes as fiber porosity increases.
                </p>
                <p>
                  Both lines are calculated for your currently selected liquid ({liquid.charAt(0).toUpperCase() + liquid.slice(1)}) and surface chemistry ({surfaceChemistry}).
                </p>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">X Symbol (Line Termination)</h4>
              <div className="space-y-2 text-sm text-orange-700">
                <p>
                  When the <strong>green dashed line (A*)</strong> drops below your target stability value, the lines stop and an <strong>X symbol</strong> appears at the termination point.
                </p>
                <p>
                  This indicates that beyond this point, the design would be unstable (A* &lt; target), meaning the surface would not maintain the Cassie-Baxter state and droplets would wet the surface.
                </p>
                <p>
                  The X symbol appears on both lines to show where the plot data becomes invalid due to insufficient stability.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">Current Position Indicator</h4>
              <div className="space-y-2 text-sm text-purple-700">
                <p>
                  The <strong>red dashed vertical line</strong> shows your current design's position on the plot.
                </p>
                <p>
                  The <strong>blue circle</strong> on the contact angle line and the <strong>green circle</strong> on the A* line indicate the exact values for your current design parameters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

