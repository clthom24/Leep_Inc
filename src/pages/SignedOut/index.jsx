import React, { useMemo } from "react";
import CarouselRow from "../../components/CarouselRow";
import "../../styles/home-carousels.css";

/** helper to generate placeholder content */
const makeItems = (label, count = 12) =>
  Array.from({ length: count }).map((_, i) => ({
    title: `${label} ${i + 1}`,
    subtitle: i % 2 ? "Artist Name" : "Various Artists",
    // Use real art URLs if you have them, otherwise picsum placeholder:
    artUrl: `https://picsum.photos/seed/${label}-${i}/400/400`,
    badge: i < 5 && label === "Trending" ? "Hot" : undefined,
  }));

export default function HomeSignedOut() {
  const trending = useMemo(() => makeItems("Trending", 14), []);
  const latest   = useMemo(() => makeItems("Latest", 16), []);
  const nearYou  = useMemo(() => makeItems("NearYou", 12), []);

  return (
    <div className="home-wrap">
      <CarouselRow title="Today’s Trending Songs" items={trending} />
      <CarouselRow title="Latest Songs" items={latest} />
      <CarouselRow title="Artists Near You" items={nearYou} />
    </div>
  );
}
