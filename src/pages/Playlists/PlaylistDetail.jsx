// =============================================
// File: src/pages/Playlists/PlaylistDetail.jsx
// Purpose: Detail view with circular cover, title/author, and a scrollable track list.
// Notes: Replace mock with usePlaylist(playlistId) later.
// =============================================
import { useParams } from "react-router-dom";

const mock = {
  title: "Playlist Title",
  author: "Playlist Author",
  cover: null,
  tracks: [
    { id: 1, title: "Song Title", artist: "Artist Name", duration: "6:43" },
    { id: 2, title: "Song Title", artist: "Artist Name", duration: "6:43" },
  ],
};

export default function PlaylistDetail() {
  const { playlistId } = useParams();
  // In production, fetch via a hook: const { data: playlist } = usePlaylist(playlistId)
  const playlist = mock;

  return (
    <section className="border rounded-xl p-6">
      {/* Header with circular cover and text meta */}
      <div className="flex items-center gap-6">
        <div className="h-28 w-28 bg-gray-200 rounded-full" aria-hidden />
        <div>
          <h2 className="text-xl font-semibold">{playlist.title}</h2>
          <p className="text-sm text-gray-500">by {playlist.author}</p>
        </div>
      </div>

      {/* Scrollable tracks window */}
      <div className="mt-6">
        <ul className="space-y-3 max-h-[50vh] overflow-auto pr-2">
          {playlist.tracks.map((t) => (
            <TrackRow key={t.id} track={t} onLike={() => {}} />
          ))}
        </ul>
      </div>
    </section>
  );
}