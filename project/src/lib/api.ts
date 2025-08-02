// src/lib/api.ts
const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000').replace(/\/+$/, '')

/**
 * Envía el mensaje del usuario al backend y devuelve el texto de respuesta.
 * Tu Flask expone POST /api/chat y responde { user: string, bot: string }.
 */
export async function sendChatMessageEcho(message: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} – ${text || res.statusText}`)
  }
  const data = (await res.json()) as { user?: string; bot?: string }
  return data.bot ?? ''
}
