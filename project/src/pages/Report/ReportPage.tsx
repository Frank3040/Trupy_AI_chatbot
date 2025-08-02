import React, { useCallback, useMemo, useRef, useState } from 'react'

type ReportType =
  | 'Academic Issue'
  | 'Behavioral Incident'
  | 'Counseling Request'
  | 'Bullying'
  | 'Facilities'
  | 'Other'

type Priority = 'Low' | 'Medium' | 'High' | 'Urgent'

const REPORT_TYPES: ReportType[] = [
  'Academic Issue',
  'Behavioral Incident',
  'Counseling Request',
  'Bullying',
  'Facilities',
  'Other',
]

const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Urgent']

const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200 MB
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']

/** 🎨 Tokens de estilo — calcados del card “For Students” */
const panel =
  'rounded-lg border border-purple-400/20 bg-white/10 backdrop-blur-sm p-6 md:p-7'

/** Mantengo tipografía ligera como pediste; si prefieres morado, cambia a text-purple-300 */
const label =
  'mb-1 text-sm font-medium text-white/90'

/** Inputs/Select/Textarea con fondo translúcido, borde púrpura y foco suave púrpura */
const fieldBase =
  'w-full rounded-lg border border-purple-400/20 bg-white/10 px-3 py-2 text-sm text-white/95 placeholder-purple-200/70 shadow-inner outline-none transition focus:border-purple-300/30 focus:ring-2 focus:ring-purple-300/30'

const input = fieldBase
const selectArea = fieldBase
const helper = 'text-sm text-purple-200/90'

/** Tu botón gradiente se mantiene igual */
const primaryGradient =
  'bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:opacity-95'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getExtension(name: string) {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? parts.pop()! : ''
}

function isFileAllowed(file: File): string | null {
  const ext = getExtension(file.name)
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return `Tipo no permitido (${ext || 'sin extensión'}). Permitidos: ${ALLOWED_EXTENSIONS.join(', ')}`
  }
  if (file.size > MAX_FILE_SIZE) {
    return `Archivo supera 200 MB: ${file.name} (${formatBytes(file.size)})`
  }
  return null
}

function dedupeFiles(files: File[]) {
  const seen = new Set<string>()
  const result: File[] = []
  for (const f of files) {
    const key = `${f.name}-${f.size}-${f.lastModified}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(f)
    }
  }
  return result
}

export default function ReportPage() {
  const [yourName, setYourName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [reportType, setReportType] = useState<ReportType | ''>('')
  const [priority, setPriority] = useState<Priority>('Low')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [fileErrors, setFileErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const acceptAttr = useMemo(
    () => ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'].join(','),
    [],
  )

  const addFiles = useCallback((list: FileList | File[]) => {
    const incoming = Array.from(list)
    const errors: string[] = []
    const valids: File[] = []

    for (const f of incoming) {
      const err = isFileAllowed(f)
      if (err) errors.push(`${f.name}: ${err}`)
      else valids.push(f)
    }
    setFileErrors((prev) => (errors.length ? [...prev, ...errors] : prev))
    setFiles((prev) => dedupeFiles([...prev, ...valids]))
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.dataTransfer?.files?.length) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles],
  )

  const onSelectFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (list?.length) addFiles(list)
    e.target.value = ''
  }, [addFiles])

  const removeFileAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const clearFileErrors = () => setFileErrors([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!yourName.trim() || !studentId.trim() || !reportType || !subject.trim() || !description.trim()) {
      alert('Por favor completa todos los campos obligatorios (*)')
      return
    }
    setIsSubmitting(true)
    try {
      console.log({
        yourName,
        studentId,
        reportType,
        priority,
        subject,
        description,
        files,
      })
      alert('Reporte preparado (demo). Integraremos el endpoint cuando me lo compartas.')
      setYourName('')
      setStudentId('')
      setReportType('')
      setPriority('Low')
      setSubject('')
      setDescription('')
      setFiles([])
      setFileErrors([])
    } catch (err) {
      console.error(err)
      alert('No se pudo enviar el reporte.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Submit a Report
        </h1>
        <p className="mt-1 text-sm text-purple-200">
          Los campos marcados con <span className="text-red-400">*</span> son obligatorios.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={panel}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Your Name */}
          <div className="flex flex-col">
            <label htmlFor="yourName" className={label}>
              Your Name<span className="text-red-400">*</span>
            </label>
            <input
              id="yourName"
              name="yourName"
              type="text"
              placeholder="Nombre completo"
              required
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className={input}
            />
          </div>

          {/* Student ID */}
          <div className="flex flex-col">
            <label htmlFor="studentId" className={label}>
              Student ID<span className="text-red-400">*</span>
            </label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              placeholder="Número de estudiante"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={input}
            />
          </div>

          {/* Report Type */}
          <div className="flex flex-col">
            <label htmlFor="reportType" className={label}>
              Report Type<span className="text-red-400">*</span>
            </label>
            <select
              id="reportType"
              name="reportType"
              required
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className={selectArea}
            >
              <option value="" disabled>
                Select a report type…
              </option>
              {REPORT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label htmlFor="priority" className={label}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className={selectArea}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label htmlFor="subject" className={label}>
              Subject<span className="text-red-400">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Breve descripción del reporte"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={input}
            />
          </div>

          {/* Detailed Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className={label}>
              Detailed Description<span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Proporciona todos los detalles relevantes…"
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${input} resize-y`}
            />
          </div>
        </div>

        {/* Attach files */}
        <div className="mt-5">
          <label className={`${label} mb-2`}>
            Attach files <span className="text-purple-200">(optional)</span>
          </label>

          <DropArea
            acceptAttr={acceptAttr}
            onDropFiles={(files) => setFiles((prev) => dedupeFiles([...prev, ...files]))}
            onSelectFiles={(files) => setFiles((prev) => dedupeFiles([...prev, ...files]))}
            setFileErrors={setFileErrors}
          />

          {/* Errores de archivos */}
          {fileErrors.length > 0 && (
            <div className="mt-3 rounded-lg border border-rose-300/30 bg-rose-600/10 p-3 text-sm text-rose-200">
              <div className="mb-2 font-semibold">Algunos archivos fueron omitidos:</div>
              <ul className="list-disc pl-5">
                {fileErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={clearFileErrors}
                className="mt-2 text-xs underline underline-offset-4"
              >
                Ocultar mensajes
              </button>
            </div>
          )}

          {/* Lista de archivos seleccionados */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2 rounded-lg border border-purple-400/20 bg-white/10 p-3">
              <div className="text-sm font-medium text-white/90">
                Archivos seleccionados ({files.length})
              </div>
              <ul className="divide-y divide-purple-400/10">
                {files.map((f, idx) => (
                  <li
                    key={`${f.name}-${f.size}-${f.lastModified}`}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white/90">
                        {f.name}
                      </div>
                      <div className="text-xs text-purple-200/90">
                        {formatBytes(f.size)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFileAt(idx)}
                      className="rounded-md border border-purple-400/20 px-2 py-1 text-xs text-purple-100 transition hover:bg-white/10"
                      aria-label={`Remove ${f.name}`}
                      title="Remove"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="text-xs text-purple-200 underline underline-offset-4"
                >
                  Añadir más archivos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="reset"
            onClick={() => {
              setYourName('')
              setStudentId('')
              setReportType('')
              setPriority('Low')
              setSubject('')
              setDescription('')
              setFiles([])
              setFileErrors([])
            }}
            className="rounded-lg border border-purple-400/20 px-4 py-2 text-sm text-purple-100 transition hover:bg-white/10"
          >
            Limpiar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-white/40 ${primaryGradient} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isSubmitting ? 'Enviando…' : 'Enviar reporte'}
          </button>
        </div>
      </form>
    </div>
  )
}

/** —— Componente DropArea — mismo look que “For Students” ————————— */
function DropArea({
  acceptAttr,
  onDropFiles,
  onSelectFiles,
  setFileErrors,
}: {
  acceptAttr: string
  onDropFiles: (files: File[]) => void
  onSelectFiles: (files: File[]) => void
  setFileErrors: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const dtFiles = e.dataTransfer?.files
    if (!dtFiles?.length) return
    const { valids, errors } = validateList(dtFiles)
    if (errors.length) setFileErrors((prev) => [...prev, ...errors])
    if (valids.length) onDropFiles(valids)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (list?.length) {
      const { valids, errors } = validateList(list)
      if (errors.length) setFileErrors((prev) => [...prev, ...errors])
      if (valids.length) onSelectFiles(valids)
    }
    e.target.value = ''
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDrop={handleDrop}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400/20 bg-white/10 px-4 py-10 text-center transition hover:bg-white/15"
    >
      <div className={`${helper} pointer-events-none select-none`}>
        Arrastra y suelta tus archivos aquí o{' '}
        <span className="font-semibold underline decoration-dashed underline-offset-4">
          haz clic para seleccionar
        </span>
      </div>
      <div className="pointer-events-none text-xs text-purple-200">
        Límite por archivo: 200 MB. Tipos: PDF, DOC, DOCX, TXT, JPG, PNG, JPEG
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptAttr}
        onChange={handleSelect}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  )
}

function validateList(list: FileList | File[]) {
  const incoming = Array.from(list)
  const errors: string[] = []
  const valids: File[] = []

  for (const f of incoming) {
    const err = isFileAllowed(f)
    if (err) errors.push(`${f.name}: ${err}`)
    else valids.push(f)
  }
  return { valids: dedupeFiles(valids), errors }
}
