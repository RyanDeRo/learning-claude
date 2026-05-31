// Session state machine types
export type SessionState =
  | 'idle'           // No session running
  | 'focus_running'  // Timer running, user should lock phone
  | 'session_complete' // Session finished successfully
  | 'session_broken'   // User returned early

// Session data structure
export interface Session {
  id: string
  startTimestamp: number      // Unix timestamp when session started
  goalDuration: number        // Duration in seconds
  returnTimestamp?: number    // Unix timestamp when user returned
  state: SessionState
  xpEarned?: number           // XP awarded if successful
  timeCompleted?: number      // Actual time completed in seconds
}

// Timer configuration
export interface TimerConfig {
  duration: number  // Duration in seconds (default 1500 = 25 min)
}
