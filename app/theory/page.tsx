import Link from 'next/link'
import { ArrowLeft, BookOpen, Calculator, Droplets } from 'lucide-react'
import { Figure1Plot, Figure2Plot, Figure3Plot } from '@/components/InteractivePlot'
import { MathEquation, EQUATIONS } from '@/components/MathEquation'

export default function TheoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <BookOpen className="h-6 w-6 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">The Science Behind Liquid Repellency</h1>
            </div>
            <Link href="/designer" className="flex items-center text-primary-600 hover:text-primary-700">
              <Calculator className="h-5 w-5 mr-2" />
              Start Designing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding Liquid Repellency Through Mathematical Models
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This page explains the scientific principles behind liquid repellency, 
              from basic contact angle theory to complex hierarchical surface structures.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Figure 1: Contact Angle Theory</h3>
            <div className="mb-6">
              <Figure1Plot width={800} height={400} />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                The fundamental principle of liquid repellency is based on the contact angle between 
                a liquid droplet and a solid surface. This is governed by Young's equation:
              </p>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
                <MathEquation equation={EQUATIONS.youngsEquation} display={true} />
              </div>
              <p className="text-gray-700">
                Where γ<sub>SV</sub> is the solid-vapor surface tension, γ<sub>SL</sub> is the 
                solid-liquid surface tension, and γ<sub>LV</sub> is the liquid-vapor surface tension.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Figure 2: Fiber Porosity Effects</h3>
            <div className="mb-6">
              <Figure2Plot width={800} height={400} />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                For cylindrical fibers, the apparent contact angle depends on the fiber porosity parameter D*<sub>fiber</sub>:
              </p>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-green-500">
                <MathEquation equation={EQUATIONS.fiberContactAngle} display={true} />
              </div>
              <p className="text-gray-700">
                This equation shows how the fiber spacing and radius affect the overall contact angle, 
                enabling the design of superoleophobic surfaces.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Figure 3: Hierarchical Structures</h3>
            <div className="mb-6">
              <Figure3Plot width={800} height={400} />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Hierarchical structures combine multiple length scales to achieve superior liquid repellency. 
                The hierarchical contact angle is calculated as:
              </p>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-500">
                <MathEquation equation={EQUATIONS.hierarchicalContactAngle} display={true} />
              </div>
              <p className="text-gray-700">
                This recursive relationship allows for the design of surfaces that can repel even 
                low-surface-tension liquids like oils and organic solvents.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}