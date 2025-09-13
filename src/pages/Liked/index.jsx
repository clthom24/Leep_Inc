// =============================================
// File: src/pages/Liked/index.jsx
// Purpose: Liked Songs page with inline Tailwind styling applied.
// =============================================

const mock = [
  { id: 1, title: "Song Title", artist: "Artist Name", duration: "6:43" },
  { id: 2, title: "Song Title", artist: "Artist Name", duration: "6:43" },
  { id: 3, title: "Song Title", artist: "Artist Name", duration: "6:43" },
];

export default function LikedPage() {
  const tracks = mock;
  const toggleLike = (id) => console.log("like/unlike", id);

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-white">
      {/* Header */}
      <header className="p-4 border-b border-border font-bold text-xl bg-muted">
        ♡ Liked Songs
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 bg-muted border-r border-border p-4 space-y-2">
          <a className="block rounded px-3 py-2 hover:bg-border" href="/">Home</a>
          <a className="block rounded px-3 py-2 hover:bg-border" href="/liked">Liked Songs</a>
          <a className="block rounded px-3 py-2 hover:bg-border" href="/playlists">Playlists</a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
            {tracks.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:shadow-card"
              >
                <div className="h-12 w-12 bg-gray-500 rounded-md" aria-hidden />
                <span className="flex-1 text-lg">{t.title} — {t.artist}</span>
                <span className="text-sm text-gray-300">{t.duration}</span>
                <button
                  className="ml-2 hover:text-primary"
                  onClick={() => toggleLike(t.id)}
                  aria-label="Like"
                >
                  ❤️
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <footer className="border-t border-border p-4 text-center text-sm text-gray-400 bg-muted">
        © {new Date().getFullYear()} Leep Audio
      </footer>
    </div>
  );
}

