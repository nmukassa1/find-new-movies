"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CastMember {
  creditId: string;
  name: string;
  character: string;
  photo: string;
}

interface CastSectionProps {
  cast: CastMember[];
  director: string;
  writers: string[];
  /**
   * When set (including `[]`), enables TV-style hiding of empty director/writer rows.
   * Non-empty lists show as "Created by" from TMDB `created_by`.
   */
  createdBy?: string[];
}

function NameList({ names }: { names: string[] }) {
  return (
    <p className="text-foreground">
      {names.map((name, index) => (
        <span key={`${name}-${index}`}>
          <span className="hover:text-primary transition-colors">{name}</span>
          {index < names.length - 1 && (
            <span className="text-foreground/40">, </span>
          )}
        </span>
      ))}
    </p>
  );
}

export function CastSection({
  cast,
  director,
  writers,
  createdBy,
}: CastSectionProps) {
  const isSeriesCredits = createdBy !== undefined;
  const showCreatedBy = Boolean(createdBy?.length);
  const showDirector = isSeriesCredits ? director !== "—" : true;
  const showWriters = isSeriesCredits ? writers.some((w) => w !== "—") : true;

  return (
    <section className="px-8 lg:px-16 py-8 bg-background">
      {/* Created by (TV) / Director / Writers */}
      <div className="flex flex-wrap gap-8 mb-8 pb-6 border-b border-border">
        {showCreatedBy ? (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-2">
              Created by
            </h3>
            <NameList names={createdBy!} />
          </div>
        ) : null}
        {showDirector ? (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-2">
              Director
            </h3>
            <p className="text-foreground font-medium hover:text-primary transition-colors">
              {director}
            </p>
          </div>
        ) : null}
        {showWriters ? (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-2">
              Writers
            </h3>
            <NameList names={writers} />
          </div>
        ) : null}
      </div>

      {/* Cast Header */}
      <div className=" mb-4">
        <h2 className="section-title text-foreground">Cast & Crew</h2>
      </div>

      {/* Cast Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {cast.map((member) => (
          <div key={member.creditId} className="flex-shrink-0 w-[140px] group">
            {/* Photo */}
            <div className="relative w-full aspect-square overflow-hidden rounded-full mb-3 bg-card border-2 border-transparent group-hover:border-foreground/40 transition-all duration-300">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="text-center">
              <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-foreground/50 truncate mt-1">
                {member.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
