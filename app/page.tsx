import Link from 'next/link'
import { ArrowRight, Droplets, Shield, Zap, Calculator, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Oleophobic Textile Designer
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/designer" className="text-gray-600 hover:text-gray-900">Design Calculator</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Design Oil-Repellent Textiles
              <span className="block text-primary-600">by combining fabric structure, surface chemistry, and particle roughness</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Interactive tool for textile and material designers to understand the physical limits on designing oil-repellent fabrics
              using rational design principles and hierarchical surface textures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/designer" className="btn btn-primary text-lg px-8 py-3">
                Start Designing
              </Link>
              <Link href="https://www.nature.com/articles/s41893-020-0591-9" target="_blank" className="btn btn-secondary text-lg px-8 py-3">
                Learn the Science
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Parameters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Key Design Parameters
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three critical factors determine your fabric's oil repellency
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-semibold">Fabric Structure</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Yarn diameter and spacing</li>
                <li>• Weaving pattern (plain, twill, satin)</li>
                <li>• Fabric porosity (D*<sub>fibre</sub>)</li>
              </ul>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-semibold">Surface Coating Chemistry</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Coating chemistry (PDMS, wax, alkyl, fluorinated...)</li>
                <li>• Surface chemistry contact angle</li>
                <li>• Nanoparticle additives (type, size, spacing,distribution)</li>
              </ul>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-semibold">Target Liquid and Stability</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Liquid surface tension</li>
                <li>• Stability value (A*) - how stable the coating is</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="design" className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Design Your Oil-Repellent Fabric and Understand the Physical Limits?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our interactive tool to calculate the optimal parameters for your specific application and understand the physical limits of your design.
          </p>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Will you be able to achieve oil repellency and a stable coating?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/designer" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
              Open Interactive Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              All code and content is based on the research paper "Rational design of perfluorocarbon-free oleophobic textiles" 
              (Nature Sustainability, 2020) by Sadaf Shabanian, Behrooz Khatir, Ambreen Nisar, and Kevin Golovin.
            </p>
            <p className="text-sm text-gray-500">
              All rights reserved to Amphibio Ltd. (trading as Amphico). 2025.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
