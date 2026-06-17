import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/screens/Home'
import Journal from '@/screens/Journal'

/**
 * 🎓 MAIN APP COMPONENT
 *
 * Sets up routing for the app:
 * - / → Home screen (timer + avatar)
 * - /journal → Training manual (lessons)
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
