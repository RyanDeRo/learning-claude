import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProgressionState } from '@/types/progression'
import { getCurrentBeltStage } from '@/constants/beltSystem'
import { calculateSessionXP, isFirstSessionToday } from '@/utils/xpCalc'
import { getLessonByIndex, type BJJLesson } from '@/constants/bjjLessons'

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
  receivedLessons: string[]  // Array of lesson IDs user has received
  lastDuration: number  // Last selected session duration in seconds
  awardXP: (sessionDurationSeconds: number) => number  // Returns XP earned
  getNextLesson: () => BJJLesson | null  // Returns next lesson in sequence
  setLastDuration: (durationSeconds: number) => void  // Store last duration choice
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
      receivedLessons: [],
      lastDuration: 1500,  // Default: 25 minutes

      setLastDuration: (durationSeconds: number) => {
        set({ lastDuration: durationSeconds })
      },

      getNextLesson: () => {
        const state = get()
        const nextLessonIndex = state.receivedLessons.length
        const nextLesson = getLessonByIndex(nextLessonIndex)

        if (nextLesson) {
          // Add lesson ID to received lessons
          set({
            receivedLessons: [...state.receivedLessons, nextLesson.id],
          })
          console.log('📚 Lesson awarded:', nextLesson.title)
        }

        return nextLesson
      },

      awardXP: (sessionDurationSeconds: number) => {
        const state = get()
        const isFirstToday = isFirstSessionToday(state.lastSessionTimestamp)

        console.log('🎯 awardXP called:', {
          sessionDurationSeconds,
          isFirstToday,
          currentTotalXP: state.totalXP,
        })

        // Calculate XP for this session
        const { totalXP: xpEarned, breakdown } = calculateSessionXP(sessionDurationSeconds, isFirstToday)

        console.log('📊 XP calculation result:', {
          xpEarned,
          breakdown,
        })

        // Update state
        const newTotalXP = state.totalXP + xpEarned
        const newBeltStage = getCurrentBeltStage(newTotalXP)

        console.log('💾 Updating progression state:', {
          oldTotalXP: state.totalXP,
          newTotalXP,
          newBelt: newBeltStage.rank,
          completedSessions: state.completedSessions + 1,
        })

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
          receivedLessons: [],
          lastDuration: 1500,  // Reset to default 25 min
        })
      },
    }),
    {
      name: 'fightfocus-progression',  // localStorage key
    }
  )
)
