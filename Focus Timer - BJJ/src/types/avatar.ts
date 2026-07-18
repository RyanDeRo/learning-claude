export type AvatarPresetId = 'base' | 'woman'
export type SkinTone = 1 | 2 | 3 | 4 | 5 | 6

export interface AvatarConfig {
  presetId: AvatarPresetId
  skinTone: SkinTone
}
