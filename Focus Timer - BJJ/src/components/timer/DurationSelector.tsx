/**
 * Duration selector for focus sessions
 * Allows preset buttons or custom input
 * Persists last selection to localStorage via progressionStore
 */

import { useState } from 'react'
import { useProgressionStore } from '@/store/progressionStore'

interface DurationSelectorProps {
  onSelect: (durationInSeconds: number) => void
  compact?: boolean // If true, shows compact "X min [Change]" view
  onExpand?: () => void
}

export function DurationSelector({ onSelect, compact = false, onExpand }: DurationSelectorProps) {
  const { lastDuration, setLastDuration } = useProgressionStore()
  const [customMinutes, setCustomMinutes] = useState('')

  // Preset durations in minutes
  const presets = [15, 25, 45, 60]

  // Test mode (60 seconds) - only show in development
  const isDev = import.meta.env.DEV

  const handlePresetClick = (minutes: number) => {
    const seconds = minutes * 60
    setLastDuration(seconds)
    onSelect(seconds)
  }

  const handleTestMode = () => {
    const seconds = 60
    setLastDuration(seconds)
    onSelect(seconds)
  }

  const handleCustomSubmit = () => {
    const minutes = parseInt(customMinutes)
    if (isNaN(minutes)) return

    // Enforce limits: 1 min minimum, 1440 min (24 hours) maximum
    const clampedMinutes = Math.max(1, Math.min(1440, minutes))
    const seconds = clampedMinutes * 60

    setLastDuration(seconds)
    onSelect(seconds)
    setCustomMinutes('') // Clear input
  }

  // Compact view: "X min [Change]"
  if (compact) {
    const displayMinutes = Math.floor(lastDuration / 60)
    return (
      <div className="flex items-center gap-3 text-gray-300 mb-4">
        <span className="text-sm">
          Focus duration: <span className="font-bold text-white">{displayMinutes} min</span>
        </span>
        <button
          onClick={onExpand}
          className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full border-2 border-blue-400 transition-colors"
        >
          Change
        </button>
      </div>
    )
  }

  // Full selector view
  return (
    <div className="bg-gray-800 rounded-lg p-6 border-4 border-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        How long do you want to focus?
      </h2>

      {/* Preset buttons */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Quick Start:</p>
        <div className="grid grid-cols-4 gap-2">
          {presets.map((minutes) => (
            <button
              key={minutes}
              onClick={() => handlePresetClick(minutes)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded border-2 border-blue-400 transition-colors"
            >
              {minutes}m
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Custom (1-1440 min):</p>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="1440"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder="Enter minutes"
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded border-2 border-gray-600 focus:border-blue-400 focus:outline-none"
          />
          <button
            onClick={handleCustomSubmit}
            disabled={!customMinutes}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded border-2 border-green-400 disabled:border-gray-500 transition-colors"
          >
            Set
          </button>
        </div>
      </div>

      {/* Test mode (dev only) */}
      {isDev && (
        <div className="pt-4 border-t-2 border-gray-700">
          <p className="text-xs text-gray-500 mb-2">Dev Mode:</p>
          <button
            onClick={handleTestMode}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded border-2 border-purple-400 transition-colors text-sm"
          >
            🧪 Test Mode (60 seconds)
          </button>
        </div>
      )}
    </div>
  )
}
