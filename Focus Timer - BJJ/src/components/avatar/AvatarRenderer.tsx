import { useAvatarStore } from '@/store/avatarStore'

type AvatarState = 'idle' | 'training' | 'celebration' | 'discouraged'

interface AvatarRendererProps {
  state: AvatarState
  /** Width in px, or 'fill' to stretch to the parent's size (used inside DojoScene) */
  size?: number | 'fill'
}

const STATES: AvatarState[] = ['idle', 'training', 'celebration', 'discouraged']

// Sprite canvases are 512×640, so height is width × 1.25
const ASPECT = 640 / 512

export function AvatarRenderer({ state, size = 120 }: AvatarRendererProps) {
  const { presetId, skinTone } = useAvatarStore((s) => s.avatarConfig)
  const spritePath = (s: AvatarState) => `/sprites/${presetId}/tone-${skinTone}/${s}.png`

  return (
    <div
      className="relative"
      style={
        size === 'fill'
          ? { width: '100%', height: '100%' }
          : { width: size, height: size * ASPECT }
      }
    >
      {STATES.map((s) => (
        <img
          key={s}
          src={spritePath(s)}
          alt={s === state ? `Your fighter, ${s}` : ''}
          aria-hidden={s !== state}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-300 ${
            s === state ? 'opacity-100' : 'opacity-0'
          } ${s === state && s === 'training' ? 'animate-training' : ''}`}
        />
      ))}
    </div>
  )
}
