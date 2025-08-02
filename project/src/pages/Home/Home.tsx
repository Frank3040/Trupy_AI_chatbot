import { Link } from 'react-router-dom'
import { IconBrain } from '@tabler/icons-react'

/**
 * Página de bienvenida.
 * Ofrece dos caminos: un portal para estudiantes y el login para psicólogos.
 */
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <IconBrain size={48} className="text-purple-300" />
          <h1 className="text-4xl font-bold text-white">TRUPY AI</h1>
        </div>
        
        <h2 className="text-xl text-purple-200 mb-2">Psychology Department Assistant</h2>
        <h3 className="text-lg text-purple-300 mb-8">Universidad Politécnica de Yucatán</h3>
        
        <h4 className="text-2xl font-semibold mb-3 text-white">Welcome to Trupy AI Platform</h4>
        <p className="text-purple-200 max-w-2xl mx-auto mb-12">
          Your intelligent assistant for psychological support and guidance in your academic journey
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">For Students</h3>
            <ul className="space-y-3 text-purple-100 text-left">
              <li>• Confidential space for emotional support</li>
              <li>• 24/7 AI assistance available</li>
              <li>• Self-reflection and mindfulness exercises</li>
              <li>• Direct access to professional help</li>
              <li>• Personal growth resources</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">For Psychologists</h3>
            <ul className="space-y-3 text-purple-100 text-left">
              <li>• Efficient case management system</li>
              <li>• Student progress tracking</li>
              <li>• AI-assisted preliminary assessments</li>
              <li>• Data-driven insights</li>
              <li>• Secure communication platform</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/students"
            className="btn bg-purple-500 text-white hover:bg-purple-400 px-6 py-3 rounded-lg text-center transition-all duration-300"
          >
            Get Started as Student
          </Link>
          <Link
            to="/psych/login"
            className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-3 rounded-lg text-center transition-all duration-300 border border-purple-400/20"
          >
            Login as Psychologist
          </Link>
        </div>
      </div>
    </div>
  )
}
