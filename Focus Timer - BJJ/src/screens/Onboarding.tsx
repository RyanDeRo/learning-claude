import { useState } from 'react'
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'
import { AvatarConfigFields } from '@/components/avatar/AvatarConfigFields'
import { useOnboardingStore } from '@/store/onboardingStore'

const STEP_COUNT = 3

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding)

  return (
    <div className="min-h-screen bg-pixel-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center gap-2">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${i === step ? 'bg-pixel-accent' : 'bg-gray-700'}`}
            />
          ))}
        </div>

        <div className="bg-pixel-panel p-8 rounded-lg shadow-2xl text-center">
          {step === 0 && <WelcomeStep />}
          {step === 1 && <AvatarStep />}
          {step === 2 && <LockMechanicStep />}

          <button
            onClick={() => (step < STEP_COUNT - 1 ? setStep(step + 1) : completeOnboarding())}
            className="mt-8 w-full px-8 py-3 bg-pixel-accent text-white font-pixel text-sm rounded hover:bg-opacity-80 transition-all"
          >
            {step < STEP_COUNT - 1 ? 'CONTINUE' : "LET'S TRAIN"}
          </button>
        </div>
      </div>
    </div>
  )
}

function WelcomeStep() {
  return (
    <>
      <h1 className="font-pixel text-2xl mb-2 text-pixel-accent">FightFocus</h1>
      <p className="text-gray-400 mb-8 text-sm">Lock your phone. Train on the mats.</p>
      <div className="mb-6 flex justify-center">
        <AvatarRenderer state="idle" size={140} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        Every time you lock your phone to focus, your fighter trains while you're away.
        Come back to discover the belt progress and BJJ techniques you unlocked.
      </p>
    </>
  )
}

function AvatarStep() {
  return (
    <>
      <h2 className="font-pixel text-lg mb-2 text-pixel-accent">Your Fighter</h2>
      <p className="text-gray-400 mb-6 text-sm">Pick how they look. You can change this later.</p>
      <div className="mb-6 flex justify-center">
        <AvatarRenderer state="idle" size={140} />
      </div>
      <AvatarConfigFields />
    </>
  )
}

function LockMechanicStep() {
  return (
    <>
      <h2 className="font-pixel text-lg mb-2 text-pixel-accent">How It Works</h2>
      <div className="mb-6 flex justify-center">
        <AvatarRenderer state="training" size={140} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        Start a session, then lock your phone. Your fighter trains on the mats while
        you're away — the app does nothing else in the background.
      </p>
      <p className="text-gray-300 text-sm leading-relaxed">
        Come back before the timer ends and it's a broken session — no XP, but no shame
        either. Make it the whole way and you'll see what you earned.
      </p>
    </>
  )
}
