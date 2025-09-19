// =============================================
// File: src/pages/Playlists/index.jsx
// Purpose: Playlists page with inline Tailwind styling applied.
// =============================================
import { Routes, Route, Link, useParams } from "react-router-dom";

function PlaylistList() {
  const mockPlaylists = [
    { id: "1", name: "Chill Vibes", trackCount: 24 },
    { id: "2", name: "Studio Session", trackCount: 12 },
  ];

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Playlists</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {mockPlaylists.map((p) => (
          <Link
            key={p.id}
            to={p.id}
            className="rounded-xl bg-muted hover:bg-border p-6 text-white flex flex-col gap-1 shadow-card"
          >
            <span className="text-xl font-semibold">{p.name}</span>
            <span className="text-sm text-gray-400">{p.trackCount} tracks</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PlaylistDetail() {
  const { playlistId } = useParams();
  const mock = {
    title: `Playlist ${playlistId}`,
    author: "Playlist Author",
    tracks: [
      { id: 1, title: "Song Title", artist: "Artist Name", duration: "6:43" },
      { id: 2, title: "Song Title", artist: "Artist Name", duration: "6:43" },
    ],
  };

  return (
    <section className="border rounded-xl p-6 bg-muted text-white shadow-card">
      <div className="flex items-center gap-6">
        <div className="h-28 w-28 bg-gray-500 rounded-full" aria-hidden />
        <div>
          <h2 className="text-2xl font-semibold">{mock.title}</h2>
          <p className="text-sm text-gray-400">by {mock.author}</p>
        </div>
      </div>

      <div className="mt-6">
        <ul className="space-y-3 max-h-[50vh] overflow-auto pr-2">
          {mock.tracks.map((t) => (
            <li key={t.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary hover:shadow-card">
              <div className="h-12 w-12 bg-gray-500 rounded-md" aria-hidden />
              <div className="flex-1 text-lg">{t.title} — {t.artist}</div>
              <div className="text-sm text-gray-300">{t.duration}</div>
              <button className="ml-2 hover:text-primary" aria-label="Like">❤️</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function PlaylistsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary text-white">
      <header className="p-4 border-b border-border font-bold text-xl bg-muted">Playlists</header>
      <div className="flex flex-1">
        <aside className="w-48 shrink-0 bg-muted border-r border-border p-4 space-y-2">
          <a className="block rounded px-3 py-2 hover:bg-border" href="/">Home</a>
          <a className="block rounded px-3 py-2 hover:bg-border" href="/liked">Liked Songs</a>
          <a className="block rounded px-3 py-2 hover:bg-border" href="/playlists">Playlists</a>
        </aside>
        <main className="flex-1 p-6">
          <Routes>
            <Route index element={<PlaylistList />} />
            <Route path=":playlistId" element={<PlaylistDetail />} />
          </Routes>
        </main>
      </div>
      <footer className="border-t border-border p-4 text-center text-sm text-gray-400 bg-muted">
        © {new Date().getFullYear()} Leep Audio
      </footer>
    </div>
  );
}