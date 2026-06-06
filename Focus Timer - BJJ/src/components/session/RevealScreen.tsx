import { useState, useEffect } from 'react'
import { Session } from '@/types/session'
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'
import { LessonCard } from '@/components/journal/LessonCard'
import { useProgressionStore } from '@/store/progressionStore'
import type { BJJLesson } from '@/constants/bjjLessons'

/**
 * Success screen - shown when user completes a session
 *
 * Shows XP earned and awards the next BJJ lesson
 */

interface RevealScreenProps {
  session: Session
  onContinue: () => void
}

export function RevealScreen({ session, onContinue }: RevealScreenProps) {
  const minutes = Math.floor((session.timeCompleted || 0) / 60)
  const getNextLesson = useProgressionStore((state) => state.getNextLesson)
  const [newLesson, setNewLesson] = useState<BJJLesson | null>(null)

  // Award lesson when screen appears
  useEffect(() => {
    const lesson = getNextLesson()
    setNewLesson(lesson)
  }, [getNextLesson])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-pixel-panel p-8 rounded-lg max-w-2xl w-full text-center animate-slideUp my-8">
        {/* Avatar celebrating */}
        <div className="mb-6 flex justify-center animate-celebrationBounce">
          <AvatarRenderer state="celebration" size={160} />
        </div>

        <h2 className="font-pixel text-xl mb-4 text-pixel-accent">
          SESSION COMPLETE!
        </h2>

        <div className="space-y-4 mb-6 text-gray-300">
          <p>You focused for <span className="text-white font-bold">{minutes} minutes</span></p>
          <p className="text-2xl font-bold text-green-400 animate-pulse">+{session.xpEarned} XP</p>
        </div>

        {/* Lesson Card */}
        {newLesson ? (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4">🥋 New Technique Unlocked</h3>
            <LessonCard lesson={newLesson} />
          </div>
        ) : (
          <div className="mb-6 p-6 bg-gray-800 border-2 border-gray-700 rounded-lg">
            <p className="text-gray-400">
              🎉 You've completed all available lessons! More coming soon.
            </p>
          </div>
        )}

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
