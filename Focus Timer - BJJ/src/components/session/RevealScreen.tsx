import { Session } from '@/types/session'
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'

/**
 * Success screen - shown when user completes a session
 */

interface RevealScreenProps {
  session: Session
  onContinue: () => void
}

export function RevealScreen({ session, onContinue }: RevealScreenProps) {
  const minutes = Math.floor((session.timeCompleted || 0) / 60)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-pixel-panel p-8 rounded-lg max-w-md w-full text-center">
        {/* Avatar celebrating */}
        <div className="mb-6 flex justify-center">
          <AvatarRenderer state="celebration" size={160} />
        </div>

        <h2 className="font-pixel text-xl mb-4 text-pixel-accent">
          SESSION COMPLETE!
        </h2>

        <div className="space-y-4 mb-6 text-gray-300">
          <p>You focused for <span className="text-white font-bold">{minutes} minutes</span></p>
          <p className="text-2xl font-bold text-green-400">+{session.xpEarned} XP</p>
        </div>

        <button
          onClick={onContinue}
          className="px-8 py-3 bg-pixel-accent text-white font-pixel text-sm rounded hover:bg-opacity-80 transition-all"
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}
