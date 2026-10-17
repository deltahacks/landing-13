"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import clsx from "clsx";

import {
  TEAM_PHOTO_PLACEHOLDER_FILL,
  teamPhotos,
  type TeamPhoto,
} from "~/data/FooterData";

/** 82px at 1440 wide and 37px at 402, interpolated so it never jumps at a breakpoint. */
const SLOT_SIZE =
  "h-[calc(19.572px_+_4.3353cqw)] w-[calc(19.572px_+_4.3353cqw)]";
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

const TeamCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ startDelay: 0, stopOnMouseEnter: true, speed: 0.5 }),
  ]);
  const hasPhotos = teamPhotos.some((photo) => photo.src);
  const track = Array.from({ length: 3 }, () => teamPhotos).flat();

  const stopAutoScroll = useCallback(() => {
    emblaApi?.plugins().autoScroll?.stop();
  }, [emblaApi]);

  const resumeAutoScroll = useCallback(() => {
    emblaApi?.plugins().autoScroll?.play();
  }, [emblaApi]);

  return (
    <div
      className="w-full overflow-hidden"
      role={hasPhotos ? "region" : undefined}
      aria-label={hasPhotos ? "DeltaHacks team photo carousel" : undefined}
      aria-hidden={hasPhotos ? undefined : "true"}
    >
      <div
        ref={emblaRef}
        className="cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing"
        onPointerDown={stopAutoScroll}
        onPointerLeave={resumeAutoScroll}
      >
        <div className="flex items-center">
          {track.map((photo, index) => (
            <div
              key={index}
              aria-hidden={index >= teamPhotos.length ? "true" : undefined}
              className={clsx("shrink-0", SLOT_ADVANCE)}
            >
              <TeamSlot photo={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
