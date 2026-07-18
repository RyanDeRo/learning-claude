import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from '@/types/session'

/**
 * Persists the active focus session to localStorage.
 *
 * 🎓 WHY THIS EXISTS:
 * Mobile browsers (Samsung especially) aggressively kill backgrounded tabs
 * to save battery. Locking the phone can kill the tab entirely, not just
 * hide it — losing any state that only lives in React's in-memory useState.
 * By persisting here, a killed-and-reloaded tab can recover the session
 * (startTimestamp + goalDuration) and still correctly judge success/failure
 * based on real elapsed time, instead of the session just vanishing.
 */
interface SessionStore {
  session: Session | null
  setSession: (session: Session | null | ((prev: Session | null) => Session | null)) => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) =>
        set((state) => ({
          session: typeof session === 'function' ? session(state.session) : session,
        })),
    }),
    {
      name: 'fightfocus-session',
    }
  )
)
