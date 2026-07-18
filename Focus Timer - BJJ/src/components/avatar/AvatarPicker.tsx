import { AvatarConfigFields } from '@/components/avatar/AvatarConfigFields'

interface AvatarPickerProps {
  onClose: () => void
}

export function AvatarPicker({ onClose }: AvatarPickerProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-gray-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold text-white">Customize Fighter</h2>

        <div className="mb-6">
          <AvatarConfigFields />
        </div>

        <button
          onClick={onClose}
          className="w-full rounded bg-blue-600 py-2 text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    </div>
  )
}
