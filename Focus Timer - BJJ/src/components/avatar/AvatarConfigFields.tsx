import { useAvatarStore } from '@/store/avatarStore'
import { AvatarPresetId, SkinTone } from '@/types/avatar'

export const AVATAR_PRESETS: { id: AvatarPresetId; label: string }[] = [
  { id: 'base', label: 'Base' },
  { id: 'woman', label: 'Woman' },
]

export const SKIN_TONES: SkinTone[] = [1, 2, 3, 4, 5, 6]

// Approximate on-screen swatches for picker UI only — not the actual sprite pixels.
export const SKIN_TONE_SWATCHES: Record<SkinTone, string> = {
  1: '#f5c9a3',
  2: '#e8ab76',
  3: '#f38f1c',
  4: '#c9711f',
  5: '#96501a',
  6: '#5e3110',
}

export function AvatarConfigFields() {
  const { avatarConfig, setAvatarConfig } = useAvatarStore()

  return (
    <>
      <div className="mb-4">
        <div className="mb-2 text-sm text-gray-400">Character</div>
        <div className="flex gap-2">
          {AVATAR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setAvatarConfig({ presetId: preset.id })}
              className={`flex-1 rounded px-3 py-2 text-sm ${
                avatarConfig.presetId === preset.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm text-gray-400">Skin Tone</div>
        <div className="flex gap-2">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone}
              aria-label={`Skin tone ${tone}`}
              onClick={() => setAvatarConfig({ skinTone: tone })}
              className={`h-8 w-8 rounded-full border-2 ${
                avatarConfig.skinTone === tone ? 'border-blue-500' : 'border-transparent'
              }`}
              style={{ backgroundColor: SKIN_TONE_SWATCHES[tone] }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
