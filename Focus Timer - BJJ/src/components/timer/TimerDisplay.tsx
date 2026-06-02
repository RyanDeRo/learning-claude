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

  const isComplete = isRunning && seconds === 0

  return (
    <div className="text-center">
      <div
        className={`text-6xl font-pixel mb-4 tracking-wider transition-all duration-300 ${
          isComplete ? 'text-green-400 animate-pulse' : ''
        }`}
      >
        {formatted}
      </div>
      <div className="text-sm text-gray-400">
        {isRunning && seconds > 0 && '🔒 Lock your phone now'}
        {isRunning && seconds === 0 && '✅ Complete!'}
        {!isRunning && '⏸️ Ready to focus'}
      </div>
    </div>
  )
}
