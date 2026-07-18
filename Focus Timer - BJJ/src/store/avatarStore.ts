import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AvatarConfig } from '@/types/avatar'

interface AvatarStore {
  avatarConfig: AvatarConfig
  setAvatarConfig: (config: Partial<AvatarConfig>) => void
}

const initialConfig: AvatarConfig = {
  presetId: 'base',
  skinTone: 3,
}

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      avatarConfig: initialConfig,

      setAvatarConfig: (config) => {
        set({ avatarConfig: { ...get().avatarConfig, ...config } })
      },
    }),
    {
      name: 'fightfocus-avatar',
    }
  )
)
