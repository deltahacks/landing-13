import clsx from "clsx";

import {
  TEAM_PHOTO_PLACEHOLDER_FILL,
  teamPhotos,
  type TeamPhoto,
} from "~/data/FooterData";

/** 82px at 1440 wide and 37px at 402, interpolated so it never jumps at a breakpoint. */
const SLOT_SIZE =
  "h-[calc(19.572px_+_4.3353cqw)] w-[calc(19.572px_+_4.3353cqw)]";
// Per-item margin, not a flex `gap`: `gap` leaves the last slot without
// trailing space, so the -50% loop would drift half a gap per cycle.
const SLOT_ADVANCE = "mr-[calc(5.829px_+_1.4355cqw)]";

const TeamSlot: React.FC<{ photo: TeamPhoto }> = ({ photo }) =>
  photo.src ? (
    <img
      src={photo.src}
      alt={photo.name}
      className={clsx(SLOT_SIZE, "shrink-0 rounded-full object-cover")}
    />
  ) : (
    <div
      aria-hidden="true"
      style={{ backgroundColor: TEAM_PHOTO_PLACEHOLDER_FILL }}
      className={clsx(SLOT_SIZE, "shrink-0 rounded-full")}
    />
  );

/**
 * The footer's one required animation. No photography exists yet, so every slot
 * renders as the grey circle the design shows; the motion is already wired.
 */
const TeamCarousel: React.FC = () => {
  const hasPhotos = teamPhotos.some((photo) => photo.src);
  // Twice over, so the -50% translation wraps seamlessly.
  const track = [...teamPhotos, ...teamPhotos];

  return (
    <div
      className="w-full overflow-hidden"
      role={hasPhotos ? "group" : undefined}
      aria-label={hasPhotos ? "DeltaHacks team" : undefined}
      aria-hidden={hasPhotos ? undefined : "true"}
    >
      <ul className="flex w-max animate-(--animate-team-marquee) motion-reduce:animate-none">
        {track.map((photo, index) => (
          <li
            key={index}
            aria-hidden={index >= teamPhotos.length ? "true" : undefined}
            className={clsx("shrink-0", SLOT_ADVANCE)}
          >
            <TeamSlot photo={photo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCarousel;
