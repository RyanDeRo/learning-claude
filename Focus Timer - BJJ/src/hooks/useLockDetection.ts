import { useEffect, useCallback } from 'react'

/**
 * Hook that detects when the user leaves/returns to the app
 * Uses Page Visibility API to track tab visibility
 *
 * 🎓 HOW IT WORKS:
 * - When user switches tabs or locks phone → document.hidden becomes true
 * - When user returns → document.hidden becomes false
 * - We fire callbacks on these state changes
 */
export function useLockDetection(
  onLeave: () => void,
  onReturn: () => void,
  enabled: boolean = true
) {
  const handleVisibilityChange = useCallback(() => {
    if (!enabled) return

    if (document.hidden) {
      // User left the app (switched tab or locked phone)
      console.log('📱 User left app - phone locked or tab hidden')
      onLeave()
    } else {
      // User returned to the app
      console.log('👀 User returned to app')
      onReturn()
    }
  }, [onLeave, onReturn, enabled])

  useEffect(() => {
    if (!enabled) return

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange, enabled])

  // Return current visibility state
  return {
    isVisible: !document.hidden,
    isHidden: document.hidden,
  }
}
