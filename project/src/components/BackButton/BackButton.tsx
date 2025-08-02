import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'          

/**
 * Botón genérico para regresar a la pantalla anterior.
 */
export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-white/10 backdrop-blur-sm border border-purple-400/20
                 text-sm font-medium text-purple-200 
                 hover:bg-white/20 hover:text-purple-100 
                 transition-all duration-300"
    >
      <ArrowLeft size={16} strokeWidth={2} />
      Regresar
    </button>
  )
}
