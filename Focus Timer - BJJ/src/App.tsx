import { useTimer } from '@/hooks/useTimer'
import { useLockDetection } from '@/hooks/useLockDetection'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { TimerControls } from '@/components/timer/TimerControls'
import { RevealScreen } from '@/components/session/RevealScreen'
import { BrokenScreen } from '@/components/session/BrokenScreen'
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'
import { BeltDisplay } from '@/components/progression/BeltDisplay'
import { XPBar } from '@/components/progression/XPBar'
import { useProgressionStore } from '@/store/progressionStore'

/**
 * 🎓 MAIN APP COMPONENT
 *
 * This wires together:
 * 1. Timer logic (useTimer hook)
 * 2. Lock detection (useLockDetection hook)
 * 3. UI components
 *
 * The flow:
 * - User clicks START → session begins
 * - User locks phone → we detect via Page Visibility API
 * - User returns → we check if goal was reached
 * - Show success or failure screen
 */

function App() {
  const {
    session,
    remainingTime,
    startSession,
    checkSession,
    resetSession,
    isRunning,
  } = useTimer()

  // Get progression state
  const { totalXP, currentBelt, completedSessions } = useProgressionStore()

  // Lock detection - only active when session is running
  useLockDetection(
    () => {
      // User left app (locked phone or switched tab)
      console.log('🔒 User locked phone - timer continues in background')
    },
    () => {
      // User returned - check if they made it
      if (isRunning) {
        checkSession()
      }
    },
    isRunning // Only listen when session is active
  )

  // Handle starting a session (default 25 minutes = 1500 seconds)
  const handleStart = () => {
    // For testing, let's use 10 seconds instead of 25 minutes
    startSession(10) // 🎓 Change this to 1500 for real 25-min sessions
  }

  const handleContinue = () => {
    resetSession()
  }

  return (
    <div className="min-h-screen bg-pixel-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="font-pixel text-2xl mb-2 text-pixel-accent">
          FightFocus
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          Lock your phone. Train your fighter.
        </p>

        <div className="bg-pixel-panel p-8 rounded-lg shadow-2xl">
          {/* Progression info */}
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <BeltDisplay rank={currentBelt} />
              <div className="text-right">
                <div className="text-2xl font-bold">{totalXP}</div>
                <div className="text-xs text-gray-400">Total XP</div>
              </div>
            </div>
            <XPBar currentXP={totalXP} />
          </div>

          {/* Avatar - shows what your fighter is doing */}
          <div className="mb-8 flex justify-center">
            <AvatarRenderer
              state={isRunning ? 'training' : 'idle'}
              size={140}
            />
          </div>

          <TimerDisplay seconds={remainingTime} isRunning={isRunning} />

          <div className="mt-8">
            <TimerControls
              onStart={handleStart}
              onReset={resetSession}
              isRunning={isRunning}
            />
          </div>

          {isRunning && (
            <p className="mt-6 text-xs text-gray-500 italic">
              Lock your phone or switch tabs to test the mechanic
            </p>
          )}

          {/* Session stats */}
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <div className="text-sm text-gray-400">
              {completedSessions} {completedSessions === 1 ? 'session' : 'sessions'} completed
            </div>
          </div>
        </div>
      </div>

      {/* Success screen */}
      {session?.state === 'session_complete' && (
        <RevealScreen session={session} onContinue={handleContinue} />
      )}

      {/* Failure screen */}
      {session?.state === 'session_broken' && (
        <BrokenScreen session={session} onTryAgain={handleContinue} />
      )}
    </div>
  )
}

export default App
