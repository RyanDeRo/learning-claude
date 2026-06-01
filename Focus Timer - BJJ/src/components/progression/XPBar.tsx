import { getProgressToNextRank, getNextBeltStage } from '@/constants/beltSystem'

/**
 * Progress bar showing advancement toward next belt/stripe
 */

interface XPBarProps {
  currentXP: number
}

export function XPBar({ currentXP }: XPBarProps) {
  const progress = getProgressToNextRank(currentXP)
  const nextStage = getNextBeltStage(currentXP)
  const percentage = Math.floor(progress * 100)

  if (!nextStage) {
    return (
      <div className="text-center text-sm text-gray-400">
        🏆 Maximum rank achieved!
      </div>
    )
  }

  const { rank } = nextStage
  const nextRankName = rank.stripes === 0
    ? `${rank.color} belt`
    : `${rank.color} belt (${rank.stripes} ${rank.stripes === 1 ? 'stripe' : 'stripes'})`

  return (
    <div className="w-full">
      {/* Progress label */}
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">Progress to next rank</span>
        <span className="text-white font-bold">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Next rank label */}
      <div className="text-xs text-gray-500 mt-1 capitalize">
        Next: {nextRankName}
      </div>
    </div>
  )
}
