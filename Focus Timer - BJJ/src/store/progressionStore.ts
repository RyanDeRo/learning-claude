import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProgressionState } from '@/types/progression'
import { getCurrentBeltStage } from '@/constants/beltSystem'
import { calculateSessionXP, isFirstSessionToday } from '@/utils/xpCalc'

/**
 * Progression store - manages XP, belt ranks, and unlocks
 *
 * 🎓 WHY ZUSTAND?
 * - Simple state management (no boilerplate)
 * - Built-in persistence (saves to localStorage)
 * - Easy for AI to understand and modify
 *
 * The persist middleware automatically saves state to localStorage,
 * so progression is preserved across browser refreshes.
 */

interface ProgressionStore extends ProgressionState {
  lastSessionTimestamp: number | null
  awardXP: (sessionDurationSeconds: number) => number  // Returns XP earned
  reset: () => void
}

const initialState: ProgressionState = {
  totalXP: 0,
  currentBelt: { color: 'white', stripes: 0 },
  unlockedItems: [],
  completedSessions: 0,
  totalFocusTime: 0,
  currentStreak: 1,
  longestStreak: 1,
}

export const useProgressionStore = create<ProgressionStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      lastSessionTimestamp: null,

      awardXP: (sessionDurationSeconds: number) => {
        const state = get()
        const isFirstToday = isFirstSessionToday(state.lastSessionTimestamp)

        // Calculate XP for this session
        const { totalXP: xpEarned } = calculateSessionXP(sessionDurationSeconds, isFirstToday)

        // Update state
        const newTotalXP = state.totalXP + xpEarned
        const newBeltStage = getCurrentBeltStage(newTotalXP)

        set({
          totalXP: newTotalXP,
          currentBelt: newBeltStage.rank,
          completedSessions: state.completedSessions + 1,
          totalFocusTime: state.totalFocusTime + Math.floor(sessionDurationSeconds / 60),
          lastSessionTimestamp: Date.now(),
        })

        return xpEarned
      },

      reset: () => {
        set({
          ...initialState,
          lastSessionTimestamp: null,
        })
      },
    }),
    {
      name: 'fightfocus-progression',  // localStorage key
    }
  )
)
