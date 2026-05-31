/**
 * Timer display component - shows the countdown
 */

interface TimerDisplayProps {
  seconds: number  // Time remaining in seconds
  isRunning: boolean
}

export function TimerDisplay({ seconds, isRunning }: TimerDisplayProps) {
  // Format seconds as MM:SS
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div className="text-center">
      <div className="text-6xl font-pixel mb-4 tracking-wider">
        {formatted}
      </div>
      <div className="text-sm text-gray-400">
        {isRunning ? '🔒 Lock your phone now' : '⏸️ Ready to focus'}
      </div>
    </div>
  )
}
