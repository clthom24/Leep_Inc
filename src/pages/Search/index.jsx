// src/pages/Search/index.jsx
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  return (
    <div className="page-container">
      <h1 style={{ margin: "16px 0" }}>Search results for “{q}”</h1>
      <p style={{ opacity: 0.75 }}>
        (Wire it to real results later. This route exists in both /search and
        /home/search so the header style stays consistent.)
      </p>
    </div>
  );
}
