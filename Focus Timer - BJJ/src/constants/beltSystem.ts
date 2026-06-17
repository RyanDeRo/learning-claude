import { BeltColor, BeltRank, Unlock } from '@/types/progression'

/**
 * BJJ Belt System - Simplified for POC
 *
 * 🎓 HOW IT WORKS:
 * - Each belt color has 4 stripes (0, 1, 2, 3, 4)
 * - Earning 4 stripes advances to next belt color
 * - XP thresholds increase as you advance
 *
 * This is a simplified version. Full system has 32 stages (see PRD Section 7.4)
 */

// XP required to advance to each stage
export interface BeltStage {
  rank: BeltRank
  xpRequired: number  // Total cumulative XP needed to reach this stage
  unlocks: Unlock[]
}

// Simplified belt progression for POC (first ~10 stages)
export const BELT_PROGRESSION: BeltStage[] = [
  {
    rank: { color: 'white', stripes: 0 },
    xpRequired: 0,
    unlocks: [
      {
        id: 'white_gi',
        name: 'White Gi',
        description: 'Your first gi - the uniform of a beginner',
        type: 'gear',
      },
    ],
  },
  {
    rank: { color: 'white', stripes: 1 },
    xpRequired: 250,
    unlocks: [
      {
        id: 'first_stripe',
        name: 'First Stripe',
        description: 'Your first stripe on the white belt',
        type: 'gear',
      },
    ],
  },
  {
    rank: { color: 'white', stripes: 2 },
    xpRequired: 600,
    unlocks: [],
  },
  {
    rank: { color: 'white', stripes: 3 },
    xpRequired: 1000,
    unlocks: [],
  },
  {
    rank: { color: 'white', stripes: 4 },
    xpRequired: 1500,
    unlocks: [],
  },
  {
    rank: { color: 'blue', stripes: 0 },
    xpRequired: 2100,
    unlocks: [
      {
        id: 'blue_gi',
        name: 'Blue Gi',
        description: 'Blue belt earned! A major milestone in your journey',
        type: 'gear',
      },
      {
        id: 'blue_belt',
        name: 'Blue Belt',
        description: 'You are no longer a beginner',
        type: 'gear',
      },
    ],
  },
  {
    rank: { color: 'blue', stripes: 1 },
    xpRequired: 2750,
    unlocks: [
      {
        id: 'rash_guard',
        name: 'Rash Guard',
        description: 'Alternative training attire unlocked',
        type: 'gear',
      },
    ],
  },
  {
    rank: { color: 'blue', stripes: 2 },
    xpRequired: 3500,
    unlocks: [],
  },
  {
    rank: { color: 'blue', stripes: 3 },
    xpRequired: 4350,
    unlocks: [],
  },
  {
    rank: { color: 'blue', stripes: 4 },
    xpRequired: 5250,
    unlocks: [],
  },
]

// Helper: Find current belt stage based on XP
export function getCurrentBeltStage(xp: number): BeltStage {
  // Find the highest stage where xpRequired <= current xp
  for (let i = BELT_PROGRESSION.length - 1; i >= 0; i--) {
    if (xp >= BELT_PROGRESSION[i].xpRequired) {
      return BELT_PROGRESSION[i]
    }
  }
  return BELT_PROGRESSION[0]
}

// Helper: Get next belt stage
export function getNextBeltStage(currentXP: number): BeltStage | null {
  const currentIndex = BELT_PROGRESSION.findIndex((stage) => stage.xpRequired > currentXP)
  return currentIndex >= 0 ? BELT_PROGRESSION[currentIndex] : null
}

// Helper: Calculate progress to next rank (0-1)
export function getProgressToNextRank(xp: number): number {
  const current = getCurrentBeltStage(xp)
  const next = getNextBeltStage(xp)

  if (!next) return 1 // Max rank reached

  const xpIntoCurrentRank = xp - current.xpRequired
  const xpNeededForNextRank = next.xpRequired - current.xpRequired

  return xpIntoCurrentRank / xpNeededForNextRank
}

// Belt colors for display
export const BELT_COLORS: Record<BeltColor, string> = {
  white: '#FFFFFF',
  blue: '#2563EB',
  purple: '#9333EA',
  brown: '#92400E',
  black: '#000000',
  coral: '#DC2626',
}
