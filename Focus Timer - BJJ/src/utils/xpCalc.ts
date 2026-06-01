/**
 * XP calculation utilities
 *
 * 🎓 HOW XP WORKS:
 * - Base XP per completed session
 * - Bonus for first session of the day
 * - Longer sessions = more XP
 * - Broken sessions = no XP (by default)
 */

export interface XPCalculation {
  baseXP: number
  bonusXP: number
  totalXP: number
  breakdown: string[]  // Human-readable breakdown for UI
}

export function calculateSessionXP(
  sessionDurationSeconds: number,
  isFirstSessionToday: boolean = false
): XPCalculation {
  // Base: 100 XP per 25 minutes (1500 seconds)
  const baseRate = 100 / 1500
  const baseXP = Math.floor(sessionDurationSeconds * baseRate)

  // Bonus: +25% for first session of the day
  const firstSessionBonus = isFirstSessionToday ? Math.floor(baseXP * 0.25) : 0

  const breakdown: string[] = []
  breakdown.push(`Base: ${baseXP} XP`)

  if (firstSessionBonus > 0) {
    breakdown.push(`First session bonus: +${firstSessionBonus} XP`)
  }

  const totalXP = baseXP + firstSessionBonus

  return {
    baseXP,
    bonusXP: firstSessionBonus,
    totalXP,
    breakdown,
  }
}

// Check if this is the user's first session today
export function isFirstSessionToday(lastSessionTimestamp: number | null): boolean {
  if (!lastSessionTimestamp) return true

  const lastSession = new Date(lastSessionTimestamp)
  const now = new Date()

  // Check if last session was a different day
  return (
    lastSession.getDate() !== now.getDate() ||
    lastSession.getMonth() !== now.getMonth() ||
    lastSession.getFullYear() !== now.getFullYear()
  )
}
