// =============================================
// File: src/pages/Playlists/PlaylistList.jsx
// Purpose: Grid of playlists that link to detail pages.
// Notes: Replace mock data with usePlaylists() later.
// =============================================
import { Link } from "react-router-dom";

const mockPlaylists = [
  { id: "1", name: "Chill Vibes", trackCount: 24 },
  { id: "2", name: "Studio Session", trackCount: 12 },
];

export default function PlaylistList() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Playlists</h1>

      {/* Outer frame to match wireframe container */}
      <div className="border rounded-xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {mockPlaylists.map((p) => (
            <Link
              key={p.id}
              to={p.id}
              className="rounded-lg border p-4 hover:shadow-sm"
            >
              <div className="text-lg font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.trackCount} tracks</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}