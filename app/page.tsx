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
              <Link href="/theory" className="text-gray-600 hover:text-gray-900">Theory</Link>
              <Link href="/designer" className="text-gray-600 hover:text-gray-900">Interactive Tools</Link>
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
              <span className="block text-primary-600">Without Harmful PFCs</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Interactive tools for textile designers to create sustainable, PFC-free oil-repellent fabrics 
              using rational design principles and hierarchical surface textures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/designer" className="btn btn-primary text-lg px-8 py-3">
                Start Designing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/theory" className="btn btn-secondary text-lg px-8 py-3">
                Learn the Science
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why This Matters for Your Textile Business
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Traditional PFC-based finishes are being phased out due to environmental and health concerns. 
              This tool helps you design sustainable alternatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Environmental Safety</h4>
              <p className="text-gray-600">
                Eliminate harmful PFCs while maintaining oil repellency. Design sustainable finishes 
                that meet environmental regulations.
              </p>
            </div>
            
            <div className="card text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Performance Optimization</h4>
              <p className="text-gray-600">
                Optimize fabric porosity, particle size, and surface chemistry for maximum 
                oil repellency with minimal material usage.
              </p>
            </div>
            
            <div className="card text-center">
              <Calculator className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Design Precision</h4>
              <p className="text-gray-600">
                Calculate exact parameters for hierarchical textures. Get precise specifications 
                for particle spacing and fiber porosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Applications */}
      <section id="applications" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Real-World Applications
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Design oil-repellent finishes for various textile applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <h4 className="font-semibold text-lg mb-2">Outdoor Apparel</h4>
              <p className="text-gray-600 text-sm">
                Jackets, hiking gear, and outdoor clothing that repel oils and stains
              </p>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-lg mb-2">Medical Textiles</h4>
              <p className="text-gray-600 text-sm">
                Surgical gowns, drapes, and medical equipment covers
              </p>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-lg mb-2">Automotive</h4>
              <p className="text-gray-600 text-sm">
                Car seat covers, interior fabrics, and protective materials
              </p>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-lg mb-2">Food Packaging</h4>
              <p className="text-gray-600 text-sm">
                Grease-resistant packaging materials and food service textiles
              </p>
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
                <li>• Yarn material (nylon, polyester, cotton)</li>
                <li>• Yarn diameter and spacing</li>
                <li>• Weaving pattern (plain, twill, satin)</li>
                <li>• Fabric porosity (D*<sub>fibre</sub>)</li>
              </ul>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-semibold">Surface Coating</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Nanoparticle type and size</li>
                <li>• Particle spacing and distribution</li>
                <li>• Coating material (PDMS, wax, alkyl)</li>
                <li>• Surface chemistry contact angle</li>
              </ul>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-semibold">Target Liquid</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Liquid surface tension</li>
                <li>• Liquid density and viscosity</li>
                <li>• Application environment</li>
                <li>• Performance requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="design" className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Design Your Oil-Repellent Fabric?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our interactive tools to calculate the optimal parameters for your specific application
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/designer" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
              Open Design Calculator
              <Calculator className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/theory" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
              Learn the Theory
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Droplets className="h-6 w-6 text-primary-400 mr-2" />
              <span className="text-lg font-semibold">Oleophobic Textile Designer</span>
            </div>
            <p className="text-gray-400 mb-4">
              Based on "Rational design of perfluorocarbon-free oleophobic textiles" 
              (Nature Sustainability, 2020)
            </p>
            <p className="text-sm text-gray-500">
              Interactive webapp for sustainable textile design
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
