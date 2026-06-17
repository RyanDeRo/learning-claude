import { useState } from 'react'
import { useProgressionStore } from '@/store/progressionStore'
import { BJJ_LESSONS } from '@/constants/bjjLessons'

type FilterCategory = 'all' | 'mindset' | 'strategy' | 'technique'

export default function Journal() {
  const receivedLessons = useProgressionStore((state) => state.receivedLessons)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all')
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  // Filter lessons based on search and category
  const filteredLessons = BJJ_LESSONS.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || lesson.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Check if lesson is unlocked
  const isUnlocked = (lessonId: string) => receivedLessons.includes(lessonId)

  // Get selected lesson for detail view
  const selectedLesson = selectedLessonId ? BJJ_LESSONS.find(l => l.id === selectedLessonId) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 p-4 md:p-8">
      {/* Parchment Container */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-100 mb-2 pixel-border-text">
            Training Manual
          </h1>
          <p className="text-amber-300 text-lg">
            {receivedLessons.length} of {BJJ_LESSONS.length} techniques learned
          </p>
        </div>

        {/* Scroll Container */}
        <div className="parchment-scroll relative">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-amber-50 border-4 border-amber-900 rounded-none text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-600 font-bold pixel-input"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['all', 'mindset', 'strategy', 'technique'] as FilterCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 font-bold border-4 transition-all ${
                  filterCategory === category
                    ? 'bg-amber-900 text-amber-50 border-amber-950'
                    : 'bg-amber-100 text-amber-900 border-amber-700 hover:bg-amber-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Lesson List or Detail View */}
          {selectedLesson ? (
            // Detail View - Single Lesson with Page Turn Animation
            <div className="page-turn-in">
              <button
                onClick={() => setSelectedLessonId(null)}
                className="mb-4 px-4 py-2 bg-amber-900 text-amber-50 border-4 border-amber-950 font-bold hover:bg-amber-800"
              >
                ← Back to List
              </button>

              <div className="parchment-page p-6 md:p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-sm font-bold border-3 ${
                    selectedLesson.category === 'mindset'
                      ? 'bg-purple-200 text-purple-900 border-purple-900'
                      : selectedLesson.category === 'strategy'
                      ? 'bg-blue-200 text-blue-900 border-blue-900'
                      : 'bg-green-200 text-green-900 border-green-900'
                  }`}>
                    {selectedLesson.category.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6 leading-tight">
                  {selectedLesson.title}
                </h2>

                {/* Content */}
                <div className="text-amber-900 text-lg leading-relaxed space-y-4 font-serif">
                  {selectedLesson.content.split('. ').map((sentence, idx) => (
                    sentence.trim() && (
                      <p key={idx} className="indent-8">
                        {sentence.trim()}{sentence.includes('.') ? '' : '.'}
                      </p>
                    )
                  ))}
                </div>

                {/* Decorative Border */}
                <div className="mt-8 pt-4 border-t-4 border-amber-900 text-center">
                  <p className="text-amber-700 text-sm italic">
                    Keep training, keep learning 🥋
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // List View - All Lessons
            <div className="space-y-3">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-12 text-amber-600 text-xl">
                  No techniques found matching your search.
                </div>
              ) : (
                filteredLessons.map((lesson, index) => {
                  const unlocked = isUnlocked(lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => unlocked && setSelectedLessonId(lesson.id)}
                      disabled={!unlocked}
                      className={`w-full text-left p-4 md:p-5 border-4 transition-all lesson-card ${
                        unlocked
                          ? 'bg-amber-50 border-amber-900 hover:bg-amber-100 hover:scale-105 cursor-pointer'
                          : 'bg-amber-200 border-amber-700 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Category Badge */}
                          <span className={`inline-block px-2 py-1 text-xs font-bold border-2 mb-2 ${
                            lesson.category === 'mindset'
                              ? 'bg-purple-200 text-purple-900 border-purple-900'
                              : lesson.category === 'strategy'
                              ? 'bg-blue-200 text-blue-900 border-blue-900'
                              : 'bg-green-200 text-green-900 border-green-900'
                          }`}>
                            {lesson.category}
                          </span>

                          {/* Title */}
                          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
                            unlocked ? 'text-amber-900' : 'text-amber-600'
                          }`}>
                            {unlocked ? lesson.title : '🔒 ' + lesson.title}
                          </h3>

                          {/* Preview or Locked Message */}
                          <p className={`text-sm md:text-base ${
                            unlocked ? 'text-amber-700' : 'text-amber-500 italic'
                          }`}>
                            {unlocked
                              ? lesson.content.slice(0, 100) + '...'
                              : 'Complete more sessions to unlock this technique'
                            }
                          </p>
                        </div>

                        {/* Arrow indicator for unlocked */}
                        {unlocked && (
                          <div className="text-2xl text-amber-900">→</div>
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          )}
        </div>

        {/* Back to Training Button */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-8 py-4 bg-amber-900 text-amber-50 border-4 border-amber-950 font-bold text-xl hover:bg-amber-800 transition-all"
          >
            Back to Training
          </a>
        </div>
      </div>
    </div>
  )
}
