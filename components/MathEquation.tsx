'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathEquationProps {
  equation: string
  display?: boolean
  className?: string
}

export function MathEquation({ equation, display = false, className = '' }: MathEquationProps) {
  if (display) {
    return <BlockMath math={equation} />
  }
  return <InlineMath math={equation} />
}

// Common equations used in the application
export const EQUATIONS = {
  youngsEquation: '\\cos\\theta_Y = \\frac{\\gamma_{SV} - \\gamma_{SL}}{\\gamma_{LV}}',
  
  fiberContactAngle: '\\cos\\theta^*_{\\text{fiber}} = -1 + \\frac{1}{D^*_{\\text{fiber}}} [\\sin\\theta_Y + (\\pi - \\theta_Y) \\cos\\theta_Y]',
  
  particleContactAngle: '\\cos\\theta^*_{\\text{particle}} = -1 + \\frac{1}{D^*_{\\text{particle}}} [\\sin\\theta_Y + (\\pi - \\theta_Y) \\cos\\theta_Y]',
  
  hierarchicalContactAngle: '\\cos\\theta^*_{\\text{hierarchical}} = -1 + \\frac{1}{D^*_{\\text{fiber}}} [\\sin\\theta^*_{\\text{particle}} + (\\pi - \\theta^*_{\\text{particle}}) \\cos\\theta^*_{\\text{particle}}]',
  
  fiberPorosity: 'D^*_{\\text{fiber}} = \\frac{s/2 + R}{R}',
  
  particlePorosity: 'D^*_{\\text{particle}} = \\frac{s + r}{r}',
  
  robustnessFiber: 'A^*_{\\text{fiber}} = \\frac{\\ell_{\\text{cap}}}{R_{\\text{fiber}}(D^*_{\\text{fiber}} - 1)} \\frac{1 - \\cos\\theta_Y}{D^*_{\\text{fiber}} - 1 + 2\\sin\\theta_Y}',
  
  robustnessHierarchical: 'A^*_{\\text{hierarchical}} = \\frac{\\ell_{\\text{cap}}}{R_{\\text{fiber}}(D^*_{\\text{fiber}} - 1)} \\frac{1 - \\cos\\theta^*_{\\text{particle}}}{D^*_{\\text{fiber}} - 1 + 2\\sin\\theta^*_{\\text{particle}}}',
  
  capillaryLength: '\\ell_{\\text{cap}} = \\sqrt{\\frac{\\gamma_{LV}}{\\rho g}}',
  
  maxFiberPorosity: 'D^*_{\\text{fiber,max}} = 1 - \\sin\\theta^*_{\\text{particle}} + \\sqrt{\\sin^2\\theta^*_{\\text{particle}} + \\frac{\\ell_{\\text{cap}}(1 - \\cos\\theta^*_{\\text{particle}})}{A^*_{\\text{hierarchical}} R_{\\text{fiber}}}}',
  
  // A* robustness equations
  robustnessParameter: 'A^* = \\frac{P_{\\text{breakthrough}}}{P_{\\text{ref}}}',
  
  fiberRobustness: 'A^*_{\\text{fiber}} = \\frac{\\ell_{\\text{cap}}}{R_{\\text{fiber}}(D^*_{\\text{fiber}} - 1)} \\frac{1 - \\cos\\theta_Y}{D^*_{\\text{fiber}} - 1 + 2\\sin\\theta_Y}',
  
  hierarchicalRobustness: 'A^*_{\\text{hierarchical}} = \\frac{\\ell_{\\text{cap}}}{R_{\\text{fiber}}(D^*_{\\text{fiber}} - 1)} \\frac{1 - \\cos\\theta^*_{\\text{particle}}}{D^*_{\\text{fiber}} - 1 + 2\\sin\\theta^*_{\\text{particle}}}',
  
  // Equation 7: 2D Fabric Contact Angle
  fabric2DContactAngle: '\\cos\\theta^*_{\\text{fabric}} = -1 + \\frac{2D^*_{\\text{fiber}} - 1}{(D^*_{\\text{fiber}})^2} [(\\pi - \\theta_Y) \\cos\\theta_Y + \\sin\\theta_Y]',
  
  // %OA to D* conversion
  percentOpenAreaToDStar: 'D^* = \\frac{1}{1 - \\sqrt{\\%OA}}'
}
