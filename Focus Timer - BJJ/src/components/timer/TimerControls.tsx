/**
 * Timer controls - start/reset buttons
 */

interface TimerControlsProps {
  onStart: () => void
  onReset: () => void
  isRunning: boolean
  disabled?: boolean
}

export function TimerControls({ onStart, onReset, isRunning, disabled }: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      {!isRunning && (
        <button
          onClick={onStart}
          disabled={disabled}
          className="px-8 py-3 bg-pixel-accent text-white font-pixel text-sm rounded hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          START
        </button>
      )}

      {isRunning && (
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-600 text-white font-pixel text-sm rounded hover:bg-opacity-80 transition-all"
        >
          RESET
        </button>
      )}
    </div>
  )
}
