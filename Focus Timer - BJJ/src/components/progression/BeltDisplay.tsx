import { BeltRank } from '@/types/progression'
import { BELT_COLORS } from '@/constants/beltSystem'

/**
 * Displays current belt rank with stripes
 */

interface BeltDisplayProps {
  rank: BeltRank
  size?: 'small' | 'large'
}

export function BeltDisplay({ rank, size = 'small' }: BeltDisplayProps) {
  const isSmall = size === 'small'
  const beltColor = BELT_COLORS[rank.color]

  return (
    <div className="flex items-center gap-3">
      {/* Belt color swatch */}
      <div
        className={`${isSmall ? 'w-12 h-8' : 'w-20 h-12'} rounded border-2 border-gray-600 flex items-center justify-center`}
        style={{ backgroundColor: beltColor }}
      >
        {/* Stripes */}
        {rank.stripes > 0 && (
          <div className="flex gap-0.5">
            {Array.from({ length: rank.stripes }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-white"
                style={{ opacity: 0.9 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text label */}
      <div>
        <div className={`${isSmall ? 'text-sm' : 'text-lg'} font-bold capitalize`}>
          {rank.color} Belt
        </div>
        {rank.stripes > 0 && (
          <div className="text-xs text-gray-400">
            {rank.stripes} {rank.stripes === 1 ? 'stripe' : 'stripes'}
          </div>
        )}
      </div>
    </div>
  )
}
