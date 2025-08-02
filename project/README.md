# TRUPY AI – Frontend

Aplicación SPA hecha con **Vite + React + TypeScript + TailwindCSS + React Router**.

---

## 1) ¿Cómo funciona el código? (visión general)

- **Ruteo (React Router)**: La app es de una sola página (SPA) con rutas básicas:
  - `/` → **Home** (tarjetas informativas para estudiantes y psicólogos).
  - `/students` → Portal informativo para estudiantes.
  - `/report` → **ReportPage** con formulario y adjuntos.
  - `/chat` → **ChatPage** con contenedor de chat.
  - `/psych/login` → Login para psicólogos.
  - `/psych/dashboard` → Dashboard (se puede proteger con auth más adelante).

- **Estilos (TailwindCSS)**: Se usan clases utilitarias; los paneles y el encabezado del chat usan el mismo estilo translúcido que el card “For Students” en Home (bordes morados + blur).

- **Chat (`src/components/Chatbubble.tsx`)**:
  - `ChatContainer` renderiza el header del chat (más claro), el listado de mensajes y la caja de texto.
  - `Chatbubble` muestra cada mensaje (usuario/bot) en **burbujas blancas** para que se aprecien los íconos/avatares.
  - El avatar del **bot** puede ser una imagen local (p. ej. `@/assets/img/qq.png`).
  - El envío de mensajes se hace vía `onSendMessage(message)` recibido por props desde `ChatPage`. Si se conecta a backend, esa función suele hacer un `fetch` al endpoint del chat y luego añadir la respuesta al estado de `messages`.

- **Reportes (`src/pages/ReportPage.tsx`)**:
  - Formulario con campos: **Your Name, Student ID, Report Type, Priority, Subject, Detailed Description**.
  - Adjuntos con arrastrar/soltar o selector (tipos permitidos: PDF, DOC, DOCX, TXT, JPG, PNG, JPEG; máx. 200 MB/archivo).
  - Validación básica en el cliente. Para conectar a backend, se recomienda enviar **FormData** (multipart):
    ```ts
    const form = new FormData()
    form.append('yourName', yourName)
    form.append('studentId', studentId)
    form.append('reportType', reportType)
    form.append('priority', priority)
    form.append('subject', subject)
    form.append('description', description)
    files.forEach(f => form.append('attachments', f))

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/reports`, {
      method: 'POST',
      body: form,
    })
    ```

- **Variables de entorno**:
  - `VITE_API_BASE_URL` (opcional, **necesaria** si conectarás endpoints reales para chat/reportes). Se define en `.env.local`.

---

## 2) Requisitos y cómo levantar el proyecto

### Requisitos
- **Node.js 18+** (o 20 LTS).
- npm (o pnpm/yarn si prefieres).

### Pasos
```bash
# 1) Instalar dependencias
npm i

# 2) (Opcional) Configurar API si usarás backend
# crea .env.local en la raíz con:
# VITE_API_BASE_URL=http://localhost:3000

# 3) Levantar en desarrollo
npm run dev
# Vite mostrará la URL (ej. http://localhost:5173)

# 4) (Opcional) Build de producción y vista previa local
npm run build
npm run preview
