/**
 * Simple placeholder avatar for Phase 2
 *
 * 🎓 WHY A PLACEHOLDER?
 * We're proving the concept works before investing time in complex sprite art.
 * This simple version shows:
 * - Avatar can display different states
 * - Avatar responds to session results
 * - UI layout works with an avatar present
 *
 * Phase 4 will replace this with the full 8-layer sprite system.
 */

interface AvatarRendererProps {
  state: 'idle' | 'training' | 'celebration' | 'discouraged'
  size?: number
}

export function AvatarRenderer({ state, size = 120 }: AvatarRendererProps) {
  // Simple emoji-based placeholder
  // In Phase 4, this becomes a canvas-based sprite compositor

  const avatarDisplay = {
    idle: '🥋',
    training: '💪',
    celebration: '🎉',
    discouraged: '😔',
  }

  const stateColors = {
    idle: 'bg-gray-700',
    training: 'bg-blue-700',
    celebration: 'bg-green-700',
    discouraged: 'bg-gray-800',
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${stateColors[state]} rounded-lg p-8 flex items-center justify-center transition-all duration-300`}
        style={{ width: size, height: size }}
      >
        <div className="text-6xl">
          {avatarDisplay[state]}
        </div>
      </div>

      {/* State indicator (for debugging) */}
      <div className="mt-2 text-xs text-gray-500 uppercase">
        {state}
      </div>
    </div>
  )
}
