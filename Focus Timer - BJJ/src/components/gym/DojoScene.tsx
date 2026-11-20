import { AvatarRenderer } from '@/components/avatar/AvatarRenderer'

type AvatarState = 'idle' | 'training' | 'celebration' | 'discouraged'

interface DojoSceneProps {
  state: AvatarState
  onFighterClick?: () => void
  fighterDisabled?: boolean
}

/**
 * The dojo "stage": background image with the fighter standing on the mat.
 *
 * Layout notes (tuned to /dojo-background.jpg, 1672×941):
 * - The scene is a 4:3 crop of a wide image (4:3 not square, so the Start
 *   button stays above the fold on phones). `background-size: cover` keeps
 *   the full height and trims the sides, so the scroll, bench and mat stay centered.
 * - The mat starts ~67% down the image. The fighter's feet sit at ~10% from the
 *   bottom, so they stand mid-mat instead of floating at the wall.
 * - The fighter is ~48% of scene height, roughly human-scale next to the bench.
 * Change FEET_FROM_BOTTOM / FIGHTER_HEIGHT if you swap the background.
 */
const FEET_FROM_BOTTOM = '10%'
const FIGHTER_HEIGHT = '48%'
const SPRITE_ASPECT = 512 / 640 // width / height of the current sprite canvas

export function DojoScene({ state, onFighterClick, fighterDisabled }: DojoSceneProps) {
  return (
    <div className="dojo-scene relative w-full aspect-[4/3] overflow-hidden">
      {/* Ambient dust motes, floating in the light from the windows */}
      <div className="dust-mote" style={{ left: '15%', bottom: '35%', animationDuration: '7s', animationDelay: '0s' }} />
      <div className="dust-mote" style={{ left: '35%', bottom: '45%', animationDuration: '9s', animationDelay: '2.5s' }} />
      <div className="dust-mote" style={{ left: '62%', bottom: '40%', animationDuration: '6s', animationDelay: '1s' }} />
      <div className="dust-mote" style={{ left: '82%', bottom: '30%', animationDuration: '11s', animationDelay: '4s' }} />

      {/* Contact shadow: grounds the fighter on the mat so they don't look pasted on */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/35 blur-[3px]"
        style={{ bottom: `calc(${FEET_FROM_BOTTOM} - 1.5%)`, width: '22%', height: '4%' }}
      />

      {/* The fighter. Tap to change fighter. */}
      <button
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: FEET_FROM_BOTTOM, height: FIGHTER_HEIGHT, aspectRatio: SPRITE_ASPECT }}
        onClick={onFighterClick}
        disabled={fighterDisabled}
        aria-label="Change fighter"
      >
        <AvatarRenderer state={state} size="fill" />
      </button>
    </div>
  )
}
