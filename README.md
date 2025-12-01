# Rational Design of Oleophobic Textiles - Interactive Webapp

An interactive web application for designing PFC-free oil-repellent textile finishes based on the research paper "Rational design of perfluorocarbon-free oleophobic textiles" (Nature Sustainability, 2020).

## 🎯 Purpose

This webapp translates complex academic theory into practical tools for textile designers and engineers who need to create sustainable, oil-repellent fabrics without using harmful perfluorocarbon compounds (PFCs).

## ✨ Features

### 🏠 Main Page

- **TLDR Overview**: Practical summary of the research for industry professionals
- **Key Benefits**: Environmental safety, performance optimization, design precision
- **Real-world Applications**: Outdoor apparel, medical textiles, automotive, food packaging
- **Design Parameters**: Clear explanation of fabric structure, surface coating, and target liquid factors

### 📊 Interactive Theory Section

- **Figure 1**: Contact angle vs fiber porosity for different surface chemistries
- **Figure 2**: Contact angle vs particle porosity for hierarchical textures
- **Figure 3**: Robustness analysis showing stability vs performance trade-offs
- **Mathematical Foundation**: Step-by-step explanation of key equations
- **Design Process**: Complete workflow for PFC-free oleophobic textile design

### 🧮 Design Calculator

- **Interactive Parameters**: Real-time calculation of fabric design parameters
- **Surface Chemistry Selection**: PDMS, alkyl, fluorinated, and perfluorinated options
- **Stability Analysis**: Robustness parameter A\* calculation and recommendations
- **Performance Targets**: Contact angle and stability optimization
- **Design Recommendations**: Intelligent suggestions based on calculated results

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Web Analytics Setup

This webapp includes both Google Analytics and PostHog for comprehensive analytics tracking.

#### Google Analytics Setup

1. **Create a Google Analytics 4 (GA4) property** at [Google Analytics](https://analytics.google.com/)

2. **Get your Measurement ID** (format: `G-XXXXXXXXXX`)

3. **Set the environment variable:**
   - For local development: Create a `.env.local` file:
     ```
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
   - For GitHub Pages: Add the environment variable in your GitHub repository settings:
     - Go to Settings → Secrets and variables → Actions
     - Add a new repository secret: `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your GA4 Measurement ID

4. **The analytics will automatically track:**
   - Page views
   - Route changes
   - User interactions

#### PostHog Setup

1. **Create a PostHog account** at [PostHog](https://posthog.com/) (free tier available)

2. **Get your Project API Key** from your PostHog project settings

3. **Set the environment variables:**
   - For local development: Add to your `.env.local` file:
     ```
     NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
     NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
     ```
     (Use `https://eu.i.posthog.com` if your PostHog instance is in the EU region)

   - For GitHub Pages: Add these secrets in your GitHub repository settings:
     - Go to Settings → Secrets and variables → Actions
     - Add `NEXT_PUBLIC_POSTHOG_KEY` with your PostHog API key
     - Add `NEXT_PUBLIC_POSTHOG_HOST` with your PostHog host URL (optional, defaults to US)

4. **PostHog features:**
   - Automatic event capture
   - Page view tracking
   - User session recording (if enabled)
   - Custom event tracking
   - Funnel analysis

Note: Both analytics tools only load if their respective environment variables are set, so it's safe to deploy without them. You can use one or both analytics solutions.

## 🏗️ Technical Architecture

### Framework

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **D3.js**: Interactive data visualization

### Key Components

#### `/lib/calculations.ts`

- Mathematical functions converted from Python to TypeScript
- All equations from the research paper implemented
- Type-safe parameter interfaces
- Comprehensive liquid properties database

#### `/components/InteractivePlot.tsx`

- D3.js-powered interactive visualizations
- Figure 1, 2, and 3 implementations
- Real-time parameter updates
- Professional scientific plotting

#### `/app/designer/page.tsx`

- Interactive design calculator
- Real-time parameter adjustment
- Stability analysis and recommendations
- User-friendly interface for technical users

## 📚 Scientific Background

### Key Equations Implemented

1. **Fiber Contact Angle (Equation 1):**

   ```
   cos θ*₍ᵢᵦᵣₑ₎ = -1 + (1/D*₍ᵢᵦᵣₑ₎) [sin θᵧ + (π - θᵧ) cos θᵧ]
   ```

2. **Particle Contact Angle (Equation 2):**

   ```
   cos θ*₍ₚₐᵣₜᵢcₗₑ₎ = -1 + (π(1 + cos θᵧ)²)/(2√3 D*₍ₚₐᵣₜᵢcₗₑ₎)
   ```

3. **Hierarchical Contact Angle (Equation 3):**

   ```
   cos θ*₍ₕᵢₑᵣₐᵣcₕᵢcₐₗ₎ = -1 + (1/D*₍ᵢᵦᵣₑ₎) [sin θ*₍ₚₐᵣₜᵢcₗₑ₎ + (π - θ*₍ₚₐᵣₜᵢcₗₑ₎) cos θ*₍ₚₐᵣₜᵢcₗₑ₎]
   ```

4. **Robustness Parameter A\*:**
   ```
   A*₍ᵢᵦᵣₑ₎ = (ℓcₐₚ/(R₍ᵢᵦᵣₑ₎(D*₍ᵢᵦᵣₑ₎ - 1))) × ((1 - cos θᵧ)/(D*₍ᵢᵦᵣₑ₎ - 1 + 2 sin θᵧ))
   ```

### Design Parameters

- **D\*₍ᵢᵦᵣₑ₎**: Fiber porosity parameter
- **D\*₍ₚₐᵣₜᵢcₗₑ₎**: Particle porosity parameter
- **θᵧ**: Young's contact angle (surface chemistry)
- **θ\*₍ᵢᵦᵣₑ₎**: Apparent contact angle on fibers
- **θ\*₍ₚₐᵣₜᵢcₗₑ₎**: Apparent contact angle on particles
- **A\***: Robustness parameter (stability)

## 🎯 Target Users

### Primary Users

- **Textile Designers**: Creating sustainable fabric finishes
- **Materials Engineers**: Optimizing surface treatments
- **R&D Teams**: Developing PFC-free alternatives
- **Sustainability Managers**: Meeting environmental regulations

### Use Cases

- **Outdoor Apparel**: Jackets, hiking gear, protective clothing
- **Medical Textiles**: Surgical gowns, drapes, equipment covers
- **Automotive**: Seat covers, interior fabrics
- **Food Packaging**: Grease-resistant materials

## 🔬 Scientific Validation

This webapp is based on peer-reviewed research published in Nature Sustainability (2020):

- **Title**: "Rational design of perfluorocarbon-free oleophobic textiles"
- **Authors**: Sadaf Shabanian, Behrooz Khatir, Ambreen Nisar, Kevin Golovin
- **DOI**: https://doi.org/10.1038/s41893-020-0591-9

All mathematical models and equations are directly implemented from the research paper.

## 🛠️ Development

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── theory/            # Theory and plots
│   └── designer/          # Design calculator
├── components/            # React components
│   └── InteractivePlot.tsx
├── lib/                   # Utility functions
│   └── calculations.ts    # Mathematical models
└── academic_paper/        # Source research materials
```

### Key Features Implemented

- ✅ Interactive D3.js visualizations
- ✅ Real-time parameter calculations
- ✅ Comprehensive mathematical models
- ✅ User-friendly design interface
- ✅ Scientific accuracy and validation
- ✅ Modern responsive design

## 📄 License

This project is for educational and research purposes. The underlying scientific work is published in Nature Sustainability and subject to the journal's copyright terms.

## 🤝 Contributing

This webapp is designed to make academic research accessible to industry professionals. Contributions that improve usability, add new features, or enhance scientific accuracy are welcome.

## 📞 Contact

For questions about the scientific content, please refer to the original research paper. For technical issues with the webapp, please create an issue in the repository.
