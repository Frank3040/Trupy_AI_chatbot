import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconLock } from '@tabler/icons-react'
import BackButton from '@/components/BackButton/BackButton'

/**
 * Login para psicólogos.
 * Simula autenticación y redirige al dashboard.
 */
export default function PsychLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: reemplazar con authService.login(email, password)
    console.log('Login:', { email, password })
    // Simulación de éxito
    navigate('/psych/dashboard')
  }

  return (
    <>
     

      <main className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <IconLock size={48} className="text-purple-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Acceso para Psicólogos
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto mb-8">
            Accede a tu panel para gestionar los casos y reportes de los estudiantes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
          <div>
            <label className="block mb-2 font-medium text-purple-200">
              Correo institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/20 border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50"
              placeholder="ejemplo@universidad.mx"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-purple-200">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/20 border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-400 transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </main>
    </>
  )
}
