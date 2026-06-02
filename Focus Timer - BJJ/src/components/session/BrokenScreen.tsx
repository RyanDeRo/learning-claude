import { Session } from '@/types/session'
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'

/**
 * Broken session screen - shown when user returns early
 */

interface BrokenScreenProps {
  session: Session
  onTryAgain: () => void
}

export function BrokenScreen({ session, onTryAgain }: BrokenScreenProps) {
  const timeCompleted = Math.floor((session.timeCompleted || 0) / 60)
  const goalMinutes = Math.floor(session.goalDuration / 60)
  const percentage = Math.floor(((session.timeCompleted || 0) / session.goalDuration) * 100)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-pixel-panel p-8 rounded-lg max-w-md w-full text-center animate-slideUp">
        {/* Avatar discouraged */}
        <div className="mb-6 flex justify-center">
          <AvatarRenderer state="discouraged" size={160} />
        </div>

        <h2 className="font-pixel text-xl mb-4 text-gray-300">
          Session Broken
        </h2>

        <div className="space-y-4 mb-6 text-gray-400">
          <p>You made it <span className="text-white font-bold">{timeCompleted} of {goalMinutes} minutes</span></p>
          <p className="text-lg text-gray-500">{percentage}% complete</p>
          <p className="text-sm italic">
            "Your fighter is waiting. Try again."
          </p>
        </div>

        <button
          onClick={onTryAgain}
          className="px-8 py-3 bg-pixel-accent text-white font-pixel text-sm rounded hover:bg-opacity-80 transition-all"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  )
}
