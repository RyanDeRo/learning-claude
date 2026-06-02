/**
 * Toast notification shown when timer completes
 * Appears briefly before the reveal screen
 */

interface CompletionToastProps {
  show: boolean
}

export function CompletionToast({ show }: CompletionToastProps) {
  if (!show) return null

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 animate-slideUp">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl font-pixel text-xs">
        ✅ TIME'S UP!
      </div>
    </div>
  )
}
