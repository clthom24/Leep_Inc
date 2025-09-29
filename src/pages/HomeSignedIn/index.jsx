import React, { useMemo } from "react";
import CarouselRow from "../../components/CarouselRow";
import "../../styles/home-carousels.css";

/** helper to generate placeholder content */
const makeItems = (label, count = 12) =>
  Array.from({ length: count }).map((_, i) => ({
    title: `${label} ${i + 1}`,
    subtitle: i % 2 ? "Artist Name" : "Playlist • Mixed",
    artUrl: `https://picsum.photos/seed/${label}-${i}/400/400`,
    badge: i === 0 && label === "Continue" ? "Resume" : undefined,
  }));

export default function HomeSignedIn() {
  const continueListening = useMemo(() => makeItems("Continue", 18), []);
  const forYou            = useMemo(() => makeItems("ForYou", 15), []);
  const trendingArtists   = useMemo(() => makeItems("TrendingArtist", 14), []);

  return (
    <div className="home-wrap">
      <CarouselRow title="Continue Listening" items={continueListening} />
      <CarouselRow title="Recommended For You" items={forYou} />
      <CarouselRow title="Trending Artists" items={trendingArtists} />
    </div>
  );
}
