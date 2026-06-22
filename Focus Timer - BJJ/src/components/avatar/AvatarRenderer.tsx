interface AvatarRendererProps {
  state: 'idle' | 'training' | 'celebration' | 'discouraged'
  size?: number
}

export function AvatarRenderer({ state, size = 120 }: AvatarRendererProps) {
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
        <div className={`text-6xl ${state === 'training' ? 'animate-training' : ''}`}>
          {avatarDisplay[state]}
        </div>
      </div>
    </div>
  )
}
