import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/screens/Home'
import Journal from '@/screens/Journal'
import Onboarding from '@/screens/Onboarding'
import { useOnboardingStore } from '@/store/onboardingStore'

/**
 * 🎓 MAIN APP COMPONENT
 *
 * Sets up routing for the app:
 * - / → Onboarding (first launch only) or Home screen (timer + avatar)
 * - /journal → Training manual (lessons)
 */

function App() {
  const hasCompletedOnboarding = useOnboardingStore((s) => s.hasCompletedOnboarding)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={hasCompletedOnboarding ? <Home /> : <Onboarding />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
