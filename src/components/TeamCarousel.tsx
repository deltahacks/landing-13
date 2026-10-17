"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import clsx from "clsx";

import teamMemberImages from "~/data/TeamMemberImages";
import teamMembers, { type TeamMemberType } from "~/data/TeamMembersData";

/** 82px at 1440 wide and 37px at 402, interpolated so it never jumps at a breakpoint. */
const SLOT_SIZE =
  "h-[calc(19.572px_+_4.3353cqw)] w-[calc(19.572px_+_4.3353cqw)]";
const SLOT_ADVANCE = "mr-[calc(5.829px_+_1.4355cqw)]";

const TeamSlot: React.FC<{ member: TeamMemberType }> = ({ member }) => {
  const image =
    teamMemberImages[member.fileName as keyof typeof teamMemberImages];

  return (
    <img
      src={image.src}
      alt={`${member.fullName}, ${member.team}`}
      title={`${member.fullName} — ${member.team}`}
      className={clsx(
        SLOT_SIZE,
        "shrink-0 rounded-full object-cover transition-transform duration-200 hover:scale-110",
      )}
    />
  );
};

const TeamCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ startDelay: 0, stopOnMouseEnter: true, speed: 0.5 }),
  ]);
  const track = Array.from({ length: 3 }, () => teamMembers).flat();

  const stopAutoScroll = useCallback(() => {
    emblaApi?.plugins().autoScroll?.stop();
  }, [emblaApi]);

  const resumeAutoScroll = useCallback(() => {
    emblaApi?.plugins().autoScroll?.play();
  }, [emblaApi]);

  return (
    <div
      className="w-full overflow-hidden"
      role="region"
      aria-label="DeltaHacks team photo carousel"
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
              key={`${photo.fileName}-${index}`}
              aria-hidden={index >= teamMembers.length ? "true" : undefined}
              className={clsx("shrink-0", SLOT_ADVANCE)}
            >
              <TeamSlot member={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
