import { useState, useEffect, useCallback, useRef } from 'react'
import { Session, SessionState } from '@/types/session'

/**
 * Core timer hook that manages focus session logic
 *
 * 🎓 THE CORE MECHANIC:
 * 1. User starts session → we record start timestamp
 * 2. User locks phone → we do NOTHING (app just sits idle)
 * 3. User returns → we compare current time vs goal
 * 4. If enough time passed → SUCCESS
 * 5. If not enough time → BROKEN
 *
 * This hook handles all the math and state transitions.
 */
export function useTimer() {
  const [session, setSession] = useState<Session | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0) // Seconds elapsed
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Start a new focus session
  const startSession = useCallback((durationInSeconds: number) => {
    const now = Date.now()

    const newSession: Session = {
      id: `session_${now}`,
      startTimestamp: now,
      goalDuration: durationInSeconds,
      state: 'focus_running',
    }

    setSession(newSession)
    setElapsedTime(0)

    console.log('⏱️ Session started:', {
      duration: `${durationInSeconds}s (${Math.floor(durationInSeconds / 60)}min)`,
      goal: new Date(now + durationInSeconds * 1000).toLocaleTimeString(),
    })
  }, [])

  // Check if session is complete (called when user returns)
  const checkSession = useCallback(() => {
    if (!session || session.state !== 'focus_running') return

    const now = Date.now()
    const elapsed = (now - session.startTimestamp) / 1000 // Convert to seconds
    const goalReached = elapsed >= session.goalDuration

    setSession(prev => {
      if (!prev) return prev

      return {
        ...prev,
        returnTimestamp: now,
        state: goalReached ? 'session_complete' : 'session_broken',
        timeCompleted: elapsed,
        xpEarned: goalReached ? 100 : 0, // Fixed XP for now, will be dynamic later
      }
    })

    console.log(goalReached ? '✅ SESSION SUCCESS!' : '❌ Session broken', {
      elapsed: `${Math.floor(elapsed)}s`,
      goal: `${session.goalDuration}s`,
      percentage: `${Math.floor((elapsed / session.goalDuration) * 100)}%`,
    })
  }, [session])

  // Reset session (start new one)
  const resetSession = useCallback(() => {
    setSession(null)
    setElapsedTime(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Update elapsed time display while session is running
  useEffect(() => {
    if (!session || session.state !== 'focus_running') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Update elapsed time every second for UI display
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const elapsed = (now - session.startTimestamp) / 1000
      setElapsedTime(elapsed)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [session])

  return {
    session,
    elapsedTime,
    remainingTime: session ? Math.max(0, session.goalDuration - elapsedTime) : 0,
    startSession,
    checkSession,
    resetSession,
    isRunning: session?.state === 'focus_running',
  }
}
