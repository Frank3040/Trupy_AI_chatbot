import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import Home from '@/pages/Home/Home'
import Students from '@/pages/Students/Students'
import ReportPage from '@/pages/Report/ReportPage'
import ChatPage from '@/pages/Chat/ChatPage'
import PsychLogin from '@/pages/PsychLogin/PsychLogin'
import PsychDashboard from '@/pages/PsychDashboard/PsychDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-[#0A0011] via-purple-950 to-purple-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/psych/login" element={<PsychLogin />} />
          <Route path="/psych/dashboard" element={<PsychDashboard />} />
          <Route path="*" element={<p style={{ padding: 16 }}>Página no encontrada</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
