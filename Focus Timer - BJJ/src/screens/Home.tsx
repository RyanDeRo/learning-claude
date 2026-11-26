import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTimer } from '@/hooks/useTimer'
import { useLockDetection } from '@/hooks/useLockDetection'
import { TimerDisplay } from '@/components/timer/TimerDisplay'
import { TimerControls } from '@/components/timer/TimerControls'
import { DurationSelector } from '@/components/timer/DurationSelector'
import { RevealScreen } from '@/components/session/RevealScreen'
import { BrokenScreen } from '@/components/session/BrokenScreen'
import { DojoScene } from '@/components/gym/DojoScene'
import { AvatarPicker } from '@/components/avatar/AvatarPicker'
import { BeltDisplay } from '@/components/progression/BeltDisplay'
import { XPBar } from '@/components/progression/XPBar'
import { CompletionToast } from '@/components/ui/CompletionToast'
import { useProgressionStore } from '@/store/progressionStore'

export default function Home() {
  const {
    session,
    remainingTime,
    startSession,
    checkSession,
    resetSession,
    isRunning,
  } = useTimer()

  // Get progression state
  const { totalXP, currentBelt, completedSessions, receivedLessons, lastDuration } = useProgressionStore()

  // Duration selector expanded/collapsed state
  const [selectorExpanded, setSelectorExpanded] = useState(false)

  // Toast notification state
  const [showToast, setShowToast] = useState(false)

  // Avatar customization picker state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  // Show toast briefly when session completes, then hide it
  useEffect(() => {
    if (session?.state === 'session_complete' || session?.state === 'session_broken') {
      setShowToast(true)
      const timer = setTimeout(() => setShowToast(false), 1500)
      return () => clearTimeout(timer)
    } else {
      setShowToast(false)
    }
  }, [session?.state])

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

  // Handle duration selection
  const handleDurationSelect = () => {
    setSelectorExpanded(false)  // Collapse selector after selection
  }

  // Handle starting a session with selected duration
  const handleStart = () => {
    startSession(lastDuration)  // Use lastDuration from store
  }

  const handleContinue = () => {
    resetSession()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gym-bg">
      {/* Completion notification toast */}
      <CompletionToast show={showToast && remainingTime === 0} />

      {/* relative z-10 lifts the content above the .gym-bg::before dark overlay */}
      <div className="relative z-10 text-center max-w-md w-full">
        <h1 className="font-pixel text-2xl mb-2 text-pixel-accent">
          FightFocus
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          Lock your phone. Train your fighter.
        </p>

        <div className="bg-pixel-panel p-8 rounded-lg shadow-2xl overflow-hidden">
          {/* Dojo scene - fighter on the mat. Full-bleed to the card edges. Tap fighter to change. */}
          <div className="-mx-8 -mt-8 mb-6">
            <DojoScene
              state={isRunning ? 'training' : 'idle'}
              onFighterClick={() => setShowAvatarPicker(true)}
              fighterDisabled={isRunning}
            />
          </div>

          {showAvatarPicker && (
            <AvatarPicker onClose={() => setShowAvatarPicker(false)} />
          )}

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

          {/* Duration Selector - expanded or compact */}
          {!isRunning && (
            <div className="mb-6">
              <DurationSelector
                onSelect={handleDurationSelect}
                compact={!selectorExpanded}
                onExpand={() => setSelectorExpanded(true)}
              />
            </div>
          )}

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

          {/* Session stats & Journal link */}
          <div className="mt-6 pt-4 border-t border-gray-700 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <div>
                {completedSessions} {completedSessions === 1 ? 'session' : 'sessions'} completed
              </div>
              <div>
                📚 {receivedLessons.length} techniques learned
              </div>
            </div>

            {/* Journal Button */}
            <Link
              to="/journal"
              className="block w-full px-4 py-3 bg-amber-800 hover:bg-amber-700 text-amber-50 font-bold border-4 border-amber-900 transition-all hover:scale-105"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <img src="/scroll/scroll-tied.png" alt="" className="w-7 h-auto" />
                View Training Manual
              </span>
            </Link>
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
