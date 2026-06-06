import type { BJJLesson } from '@/constants/bjjLessons'

interface LessonCardProps {
  lesson: BJJLesson
}

/**
 * LessonCard - Displays a BJJ technique lesson
 *
 * Shown after a successful focus session to teach the user a new concept.
 */
export function LessonCard({ lesson }: LessonCardProps) {
  // Category badge colors
  const categoryColors = {
    mindset: 'bg-purple-500',
    strategy: 'bg-blue-500',
    technique: 'bg-green-500',
  }

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold px-2 py-1 rounded ${categoryColors[lesson.category]} text-white uppercase`}
            >
              {lesson.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-300 leading-relaxed">{lesson.content}</div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          💡 This lesson has been saved to your journal
        </p>
      </div>
    </div>
  )
}
