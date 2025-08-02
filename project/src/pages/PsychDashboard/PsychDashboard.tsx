import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import BackButton from '@/components/BackButton/BackButton'

interface Stat {
  label: string
  value: number
}

/**
 * Dashboard para psicólogos.
 * Muestra métricas de uso y un listado preliminar de reportes recientes.
 */
export default function PsychDashboard() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  // Simula llamada al backend
  useEffect(() => {
    // TODO: reemplazar por reportService.getStats()
    const timeout = setTimeout(() => {
      setStats([
        { label: 'Reportes recibidos', value: 128 },
        { label: 'Chats iniciados', value: 342 },
        { label: 'Usuarios activos', value: 89 },
      ])
      setLoading(false)
    }, 600)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
     

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Dashboard Psicólogos
        </h2>

        {/* Métricas */}
        <section className="mb-10">
          <h3 className="text-lg font-medium mb-4 text-purple-200">Métricas rápidas</h3>

          {loading ? (
            <p className="text-purple-200">Cargando...</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-purple-400/20 p-4 text-center"
                >
                  <p className="text-sm text-purple-200">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-purple-300">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reportes recientes */}
        <section className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-purple-400/20">
          <h3 className="text-lg font-medium mb-4 text-purple-300">Reportes recientes</h3>
          <p className="text-purple-200">
            (Aquí se mostrará una tabla o lista de los reportes más recientes
            cuando se conecte la API.)
          </p>
        </section>
      </main>
    </>
  )
}

