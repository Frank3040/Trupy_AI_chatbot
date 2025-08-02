import { Link } from 'react-router-dom'
import BackButton from '@/components/BackButton/BackButton'
import { IconRobot, IconFileReport } from '@tabler/icons-react'

/**
 * Portal de estudiantes.
 * Permite escoger entre chatear con el bot o enviar un reporte.
 */
export default function Students() {
  return (
    <>
     

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Student Portal
          </h2>

          <p className="text-purple-200 max-w-2xl mx-auto mb-12">
            Choose how you would like to receive support from our AI-powered platform
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20 flex flex-col items-center">
              <IconRobot size={48} className="text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-purple-300">AI Chat Support</h3>
              <p className="text-purple-100 mb-6 text-center">
                Start a conversation with our AI assistant for immediate support and guidance
              </p>
              <Link
                to="/chat"
                className="mt-auto bg-purple-500 text-white hover:bg-purple-400 px-6 py-3 rounded-lg text-center transition-all duration-300 w-full"
              >
                Start Chat
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20 flex flex-col items-center">
              <IconFileReport size={48} className="text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Submit Report</h3>
              <p className="text-purple-100 mb-6 text-center">
                Send a detailed report to our psychology department for professional review
              </p>
              <Link
                to="/report"
                className="mt-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-3 rounded-lg text-center transition-all duration-300 border border-purple-400/20 w-full"
              >
                Create Report
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
