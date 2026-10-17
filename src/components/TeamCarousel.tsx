"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import clsx from "clsx";

import teamMemberImages from "~/data/TeamMemberImages";
import teamMembers, { type TeamMemberType } from "~/data/TeamMembersData";

/** 82px at 1440 wide and 48px on mobile, interpolated above the mobile breakpoint. */
const SLOT_SIZE =
  "h-12 w-12 md:h-[calc(19.572px_+_4.3353cqw)] md:w-[calc(19.572px_+_4.3353cqw)]";
const SLOT_ADVANCE = "mr-[calc(5.829px_+_1.4355cqw)]";
const SLOT_BREATHING_ROOM = "py-1.5 md:py-[calc(1.957px_+_0.4335cqw)]";

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
        "relative shrink-0 rounded-full border border-white object-cover transition-transform duration-200 hover:z-10 hover:scale-110",
      )}
    />
  );
};

const TeamCarousel: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<TeamMemberType | null>(
    null,
  );
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

  const handleCarouselLeave = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "touch") {
        setHoveredMember(null);
      }

      resumeAutoScroll();
    },
    [resumeAutoScroll],
  );

  return (
    <div
      className="w-full overflow-x-clip"
      role="region"
      aria-label="DeltaHacks team photo carousel"
      onPointerLeave={handleCarouselLeave}
    >
      <div
        ref={emblaRef}
        className={clsx(
          SLOT_BREATHING_ROOM,
          "cursor-grab touch-pan-y overflow-x-clip select-none active:cursor-grabbing",
        )}
        onPointerDown={stopAutoScroll}
      >
        <div className="flex items-center">
          {track.map((photo, index) => (
            <div
              key={`${photo.fileName}-${index}`}
              aria-hidden={index >= teamMembers.length ? "true" : undefined}
              className={clsx("shrink-0", SLOT_ADVANCE)}
              onPointerEnter={() => setHoveredMember(photo)}
              onClick={() => setHoveredMember(photo)}
            >
              <TeamSlot member={photo} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-3 flex h-7 items-center justify-center px-4 text-center text-sm font-medium text-white md:h-10 md:text-lg"
        aria-live="polite"
      >
        {hoveredMember &&
          `${hoveredMember.fullName}, ${hoveredMember.team}, ${hoveredMember.emoji}`}
      </div>
    </div>
  );
};

export default TeamCarousel;
