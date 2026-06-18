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

  // Get category class name
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'mindset': return 'category-mindset'
      case 'strategy': return 'category-strategy'
      case 'technique': return 'category-technique'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 p-4 md:p-8">
      {/* Parchment Container */}
      <div className="max-w-5xl mx-auto scroll-unfurl">
        {/* Header */}
        <div className="text-center mb-10 ink-reveal">
          <h1 className="text-6xl md:text-7xl mb-3 dojo-title">
            Training Manual
          </h1>
          <div className="inline-block relative">
            <p className="text-amber-200 text-xl calligraphy-accent tracking-wide">
              {receivedLessons.length} of {BJJ_LESSONS.length} techniques mastered
            </p>
            {/* Decorative underline */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="parchment-scroll relative">
          {/* Search Bar */}
          <div className="mb-8 ink-reveal">
            <input
              type="text"
              placeholder="Search ancient wisdom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 manuscript-input rounded-none focus:outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8 ink-reveal">
            {(['all', 'mindset', 'strategy', 'technique'] as FilterCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`filter-button ${
                  filterCategory === category ? 'filter-button-active' : 'filter-button-inactive'
                }`}
              >
                {category === 'all' ? '◈ All' :
                 category === 'mindset' ? '☯ Mindset' :
                 category === 'strategy' ? '⚔ Strategy' : '🥋 Technique'}
              </button>
            ))}
          </div>

          {/* Lesson List or Detail View */}
          {selectedLesson ? (
            // Detail View - Single Lesson with Page Turn Animation
            <div className="page-turn-in">
              <button
                onClick={() => setSelectedLessonId(null)}
                className="mb-6 dojo-button"
              >
                ← Return to Index
              </button>

              <div className="parchment-page p-8 md:p-12">
                {/* Category Badge */}
                <div className="mb-6 ink-reveal">
                  <span className={`category-badge ${getCategoryClass(selectedLesson.category)}`}>
                    {selectedLesson.category === 'mindset' ? '☯ ' :
                     selectedLesson.category === 'strategy' ? '⚔ ' : '🥋 '}
                    {selectedLesson.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl mb-8 leading-tight calligraphy-accent text-amber-900 ink-reveal">
                  {selectedLesson.title}
                </h2>

                {/* Content - Split into paragraphs with ink reveal animation */}
                <div className="manuscript-text text-xl leading-loose space-y-6">
                  {selectedLesson.content.split('. ').map((sentence, idx) => (
                    sentence.trim() && (
                      <p key={idx} className="ink-reveal first-letter:text-5xl first-letter:font-bold first-letter:text-amber-900 first-letter:mr-2 first-letter:float-left">
                        {sentence.trim()}{sentence.includes('.') ? '' : '.'}
                      </p>
                    )
                  ))}
                </div>

                {/* Decorative Border */}
                <div className="mt-12 pt-6 border-t-4 border-double border-amber-900 text-center ink-reveal">
                  <p className="manuscript-text text-amber-700 italic text-base">
                    "The path to mastery is walked one step at a time."
                  </p>
                  <div className="mt-3 text-2xl">🥋</div>
                </div>
              </div>
            </div>
          ) : (
            // List View - All Lessons
            <div className="space-y-4">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-16 ink-reveal">
                  <p className="manuscript-text text-amber-600 text-2xl mb-3">
                    No techniques found in your search.
                  </p>
                  <p className="text-amber-500 text-lg italic">
                    Try adjusting your search or filters...
                  </p>
                </div>
              ) : (
                filteredLessons.map((lesson) => {
                  const unlocked = isUnlocked(lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => unlocked && setSelectedLessonId(lesson.id)}
                      disabled={!unlocked}
                      className={`w-full text-left p-5 md:p-6 border-4 border-double lesson-card ${
                        unlocked
                          ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-900 cursor-pointer wax-seal'
                          : 'bg-gradient-to-br from-amber-200 to-amber-300 border-amber-700 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 relative">
                        <div className="flex-1">
                          {/* Category Badge */}
                          <span className={`category-badge ${getCategoryClass(lesson.category)} mb-3 inline-block`}>
                            {lesson.category === 'mindset' ? '☯ ' :
                             lesson.category === 'strategy' ? '⚔ ' : '🥋 '}
                            {lesson.category}
                          </span>

                          {/* Title */}
                          <h3 className={`text-2xl md:text-3xl mb-3 calligraphy-accent ${
                            unlocked ? 'text-amber-900' : 'text-amber-600'
                          }`}>
                            {unlocked ? lesson.title : '🔒 ' + lesson.title}
                          </h3>

                          {/* Preview or Locked Message */}
                          <p className={`text-base md:text-lg manuscript-text ${
                            unlocked ? 'text-amber-800' : 'text-amber-600 italic'
                          }`}>
                            {unlocked
                              ? lesson.content.slice(0, 120) + '...'
                              : 'Complete more training sessions to unlock this ancient wisdom'
                            }
                          </p>
                        </div>

                        {/* Arrow indicator for unlocked */}
                        {unlocked && (
                          <div className="text-3xl text-amber-900 calligraphy-accent">→</div>
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
        <div className="text-center mt-10 ink-reveal">
          <a
            href="/"
            className="dojo-button inline-block text-xl"
          >
            ◈ Return to Dojo
          </a>
        </div>
      </div>
    </div>
  )
}
