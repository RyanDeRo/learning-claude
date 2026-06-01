/**
 * Progression system types
 *
 * 🎓 THE BELT SYSTEM:
 * BJJ uses colored belts with 4 stripes per belt.
 * Each stripe requires multiple sessions to earn.
 * This is a long-term progression system (months to years).
 */

// Belt colors in BJJ progression order
export type BeltColor =
  | 'white'
  | 'blue'
  | 'purple'
  | 'brown'
  | 'black'
  | 'coral'  // Ultimate rank

// Belt rank with stripes (0-4 stripes per belt)
export interface BeltRank {
  color: BeltColor
  stripes: number  // 0-4 (0 = no stripes, 4 = ready for next belt)
}

// Single unlock (gear, decoration, etc.)
export interface Unlock {
  id: string
  name: string
  description: string
  type: 'gear' | 'decoration' | 'lesson'
  unlockedAt?: number  // Timestamp when unlocked
}

// User progression state
export interface ProgressionState {
  totalXP: number
  currentBelt: BeltRank
  unlockedItems: Unlock[]
  completedSessions: number
  totalFocusTime: number  // Total minutes focused
  currentStreak: number    // Consecutive days
  longestStreak: number
}
