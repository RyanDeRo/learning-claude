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
    <div className="bg-[#F4E7B5] border-4 border-double border-amber-900 p-6 space-y-4 text-left">
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
          <h3 className="text-xl font-bold text-amber-950">{lesson.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="text-amber-900 leading-relaxed">{lesson.content}</div>

      {/* Footer */}
      <div className="pt-4 border-t border-amber-800/40">
        <p className="text-sm text-amber-800">
          Saved to your Training Manual
        </p>
      </div>
    </div>
  )
}
