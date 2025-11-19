import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { supabase } from "../../supabaseClient";
import { FaThumbsUp, FaRandom, FaPlus, FaPencilAlt, FaRegEnvelope, FaPlay, FaPause } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function MyMusicPage() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "Overview"
  );

  const [activeNetworkTab, setActiveNetworkTab] = useState(
    location.state?.activeNetworkTab || "Followers"
  );

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);

  const [uploadData, setUploadData] = useState({
    audioFiles: [],
    stemFiles: [],
    coverArt: null,
    title: '',
    description: '',
    tags: '',
    privacy: 'Public',
  });

  // NEW: acknowledgements state
  const [acks, setAcks] = useState({
    ownership: false,
    enforcement: false,
    remix: false,
  });

  const allAcksChecked = acks.ownership && acks.enforcement && acks.remix;

  const tabs = ['Overview', 'Your Network', 'Manage Tracks', 'Albums', 'Remixes'];
  const networkTabs = ['Followers', 'Following', 'Collaborators'];
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loadingNetwork, setLoadingNetwork] = useState(true);

  useEffect(() => {
    async function loadNetwork() {
      setLoadingNetwork(true);
      try {
        const { data, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const user = data?.user;
        if (!user) {
          console.warn("No authenticated user found — skipping network load.");
          setLoadingNetwork(false);
          return;
        }

        // Who follows ME
        const { data: followersData, error: followersError } = await supabase
          .from("follows")
          .select("follower_id, profiles!follower_id(display_name, id)")
          .eq("following_id", user.id);

        if (followersError) throw followersError;

        // Who I am following
        const { data: followingData, error: followingError } = await supabase
          .from("follows")
          .select("following_id, profiles!following_id(display_name, id)")
          .eq("follower_id", user.id);

        if (followingError) throw followingError;

        const followersList =
          followersData?.map((f) => ({
            id: f.profiles?.id ?? f.follower_id,
            name: f.profiles?.display_name ?? "Unknown User",
            follower: true,
            following: false,
          })) ?? [];

        const followingList =
          followingData?.map((f) => ({
            id: f.profiles?.id ?? f.following_id,
            name: f.profiles?.display_name ?? "Unknown User",
            follower: false,
            following: true,
          })) ?? [];

        const merged = [...followersList];
        followingList.forEach((f) => {
          const existing = merged.find((m) => m.id === f.id);
          if (existing) existing.following = true;
          else merged.push(f);
        });

        setFollowers(followersList);
        setFollowing(followingList);
        setAccounts(merged);
      } catch (err) {
        console.error("Error loading network:", err.message);
      } finally {
        setLoadingNetwork(false);
      }
    }

    loadNetwork();
  }, []);

  function getFilteredAccounts() {
    if (activeNetworkTab === "Followers") return followers;
    if (activeNetworkTab === "Following") return following;
    return []; // Collaborators can be added later
  }

  const filteredAccounts = getFilteredAccounts();

  async function toggleFollow(targetId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const isAlreadyFollowing = following.some((f) => f.id === targetId);

    try {
      if (isAlreadyFollowing) {
        // ---- UNFOLLOW ----
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetId);
        if (error) throw error;

        // Remove from following list
        setFollowing((prev) => prev.filter((f) => f.id !== targetId));

        // Update both followers & accounts lists
        setFollowers((prev) =>
          prev.map((f) =>
            f.id === targetId ? { ...f, following: false } : f
          )
        );
        setAccounts((prev) =>
          prev.map((a) =>
            a.id === targetId ? { ...a, following: false } : a
          )
        );

      } else {
        // ---- FOLLOW ----
        const { error } = await supabase
          .from("follows")
          .insert([{ follower_id: user.id, following_id: targetId }]);
        if (error) throw error;

        // Find that user's profile so we can store their name too
        const { data: profileData } = await supabase
          .from("profiles")
          .select("id, display_name")
          .eq("id", targetId)
          .single();

        // Update both following and followers lists with complete info
        const newFollowEntry = {
          id: profileData?.id ?? targetId,
          name: profileData?.display_name ?? "Unknown User",
          follower: false,
          following: true,
        };

        setFollowing((prev) => [...prev, newFollowEntry]);

        setFollowers((prev) =>
          prev.map((f) =>
            f.id === targetId ? { ...f, following: true } : f
          )
        );

        setAccounts((prev) =>
          prev.map((a) =>
            a.id === targetId ? { ...a, following: true } : a
          )
        );
      }
    } catch (err) {
      console.error("Error toggling follow:", err.message);
    }
  }

  const [tracks, setTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(true);

  useEffect(() => {
    async function loadTracks() {
      setLoadingTracks(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setTracks([]);
        setLoadingTracks(false);
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from("songs")
        .select("id, title, audio_url, artwork_url, is_published")
        .eq("artist_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching songs:", error);
        setTracks([]);
        setLoadingTracks(false);
        return;
      }

      const rawTracks = data || [];

      // 🔹 Compute durations right here
      const tracksWithDurations = await Promise.all(
        rawTracks.map(async (track) => {
          const duration = await getAudioDuration(track.audio_url);
          return { ...track, duration };
        })
      );

      setTracks(tracksWithDurations);
      setLoadingTracks(false);
    }

    loadTracks();
  }, []);


  async function getAudioDuration(url) {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.src = url + `?t=${Date.now()}`; // cache-buster so stale 404s don't stick

      audio.addEventListener("loadedmetadata", () => {
        // Some browsers can give NaN briefly
        if (isNaN(audio.duration)) {
          resolve(0);
        } else {
          resolve(audio.duration || 0);
        }
        audio.remove(); // cleanup
      });

      audio.addEventListener("error", () => {
        console.warn("Error loading audio metadata for:", url);
        resolve(0);
        audio.remove();
      });
    });
  }

  function formatTime(seconds) {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);

  function handlePlayPause(track) {
    if (currentTrackId === track.id && audio) {
      if (audio.paused) audio.play();
      else audio.pause();
      return;
    }

    if (audio) audio.pause();

    const newAudio = new Audio(track.audio_url);
    setAudio(newAudio);
    setCurrentTrackId(track.id);

    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });

    newAudio.addEventListener("timeupdate", () => {
      if (!isDragging) {
        setCurrentTime(newAudio.currentTime);
        setProgress(newAudio.currentTime / newAudio.duration);
      }
    });

    newAudio.addEventListener("ended", () => {
      setCurrentTrackId(null);
      setProgress(0);
      setCurrentTime(0);
    });

    newAudio.play();
  }

  function handleBarClick(e, track) {
    if (!audio || currentTrackId !== track.id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;

    audio.currentTime = newProgress * duration;
    setCurrentTime(audio.currentTime);
    setProgress(newProgress);
  }

  function handleDragStart() {
    if (audio) {
      setWasPlayingBeforeDrag(!audio.paused); // true if it was playing
      audio.pause();
    }
    setIsDragging(true);
  }

  function handleDragMove(e, barRef) {
    if (!isDragging || !audio) return;

    const rect = barRef.current.getBoundingClientRect();
    let pos = e.clientX - rect.left;
    pos = Math.max(0, Math.min(pos, rect.width)); // clamp
    const newProgress = pos / rect.width;

    setProgress(newProgress);
    setCurrentTime(newProgress * duration);
  }

  function handleDragEnd() {
    if (!audio) {
      setIsDragging(false);
      return;
    }

    // Seek to new position
    audio.currentTime = progress * duration;

    // Resume playback ONLY if it was playing before drag
    if (wasPlayingBeforeDrag) {
      audio.play();
    }

    setIsDragging(false);
  }

  const barRef = useRef(null);
  
  async function handleUpload() {
    if (uploadData.audioFiles.length === 0) {
      alert("Please select at least one song file.");
      return;
    }

    try {
      // 🔑 Get logged-in user (artist_id)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to upload songs.");

      let artworkUrl = null;

      // ================================
      // 1️⃣ Upload Artwork (if provided)
      // ================================
      if (uploadData.coverArt) {
        const safeFileName = uploadData.coverArt.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const artworkPath = `${user.id}/${Date.now()}_${safeFileName}`;

        const { error: artworkError } = await supabase.storage
          .from("artwork")
          .upload(artworkPath, uploadData.coverArt);

        if (artworkError) throw artworkError;

        const { data: publicArtwork } = supabase.storage
          .from("artwork")
          .getPublicUrl(artworkPath);

        artworkUrl = publicArtwork.publicUrl;
      }

      // 2️⃣ Upload Main Audio + Insert Single Song
      const file = uploadData.audioFiles[0]; // we already know length > 0 from earlier check
      const audioPath = `${user.id}/${Date.now()}_${file.name}`;

      const { error: audioError } = await supabase.storage
        .from("audio")
        .upload(audioPath, file);

      if (audioError) throw audioError;

      const { data: publicAudio } = supabase.storage
        .from("audio")
        .getPublicUrl(audioPath);

      const audioUrl = publicAudio.publicUrl;

      // Insert into songs table and get song_id
      const { data: insertedSong, error: dbError } = await supabase
        .from("songs")
        .insert([
          {
            artist_id: user.id,
            title: uploadData.title || file.name,
            audio_url: audioUrl,
            artwork_url: artworkUrl,
            is_published: true,
          },
        ])
        .select("id")
        .single();

      if (dbError) throw dbError;

      const songId = insertedSong.id;

      // ======================================
      // 3️⃣ Upload Optional Stems (NEW STEP 2)
      // ======================================
      if (uploadData.stemFiles && uploadData.stemFiles.length > 0) {
        for (const stem of uploadData.stemFiles) {
          const safeName = stem.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
          const stemPath = `${user.id}/${Date.now()}_${safeName}`;

          // Upload stem file to storage
          const { error: storageError } = await supabase.storage
            .from("audio_stems") // your stems bucket
            .upload(stemPath, stem);

          if (storageError) {
            console.error("Stem upload error:", storageError);
            continue;
          }

          const { data: publicStem } = supabase.storage
            .from("audio_stems")
            .getPublicUrl(stemPath);

          // Insert metadata into song_stems table, linked to this one songId
          const { error: stemDbError } = await supabase
            .from("song_stems")
            .insert({
              song_id: songId,      // 👈 single song
              uploader_id: user.id,
              name: stem.name,
              file_url: publicStem.publicUrl,
            });

          if (stemDbError) {
            console.error("Stem DB insert error:", stemDbError);
          }
        }
      }

      // Success!
      alert("Upload successful!");

    } catch (err) {
      console.error("Upload error:", err.message);
      alert(`Upload failed: ${err.message}`);
    } finally {
      // Modal reset
      setShowUploadModal(false);
      setUploadStep(1);
      setUploadData({
        audioFiles: [],
        stemFiles: [],
        coverArt: null,
        title: "",
        description: "",
        tags: "",
        privacy: "Public",
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Your Music</div>
      {/* Top-level Tabs */}
      <div className={styles.tabsWrapper}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={styles.mainContentBox}>
        <div className={styles.scrollArea}>
          {activeTab === 'Overview' && (
            <>
              <div className={styles.tracksList}>
                <div className={styles.overviewStats}>Recently Uploaded Tracks</div>
                {[
                  { id: 1, title: 'New Track 1', duration: '03:22' },
                  { id: 2, title: 'New Track 2', duration: '04:05' },
                ].map((song) => (
                  <div key={song.id} className={styles.trackCard}>
                    {/* Cover */}
                    <div className={styles.trackCover}>Cover</div>

                    {/* Details */}
                    <div className={styles.trackDetails}>
                      {/* Title + actions */}
                      <div className={styles.trackHeader}>
                        <div className={styles.trackTitle}>{song.title}</div>
                        <div className={styles.trackActions}>
                          <button className={styles.linkButton}>Share</button>
                          <button className={styles.linkButton}>Change Privacy</button>
                          <button className={styles.linkButton}>Remix</button>
                          <button className={styles.linkButton}>Delete</button>
                      </div>
                      </div>

                      {/* Play bar */}
                      <div className={styles.trackTime}>
                        <span>00:00</span>
                        <button className={styles.playButton}>▶</button>
                        <div className={styles.progressBar}>
                          <div className={styles.progress}></div>
                        </div>
                        <span>{song.duration}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={styles.trackStats}>
                      <FaThumbsUp className={styles.icon} style={{marginTop: 'none'}}/>
                      <span className={styles.trackStat}>000</span>

                      <FaRandom className={styles.icon} style={{fontSize: '1.375rem'}}/>
                      <span className={styles.trackStat}>000</span>

                      <FaPlus className={styles.icon} style={{fontSize: '1.5rem', marginLeft: '-0.25rem'}}/>
                      <span className={styles.trackStat}>000</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.tracksList}>
                <div className={styles.overviewStats} style={{marginTop: '0.75rem'}}>Recent Remixes</div>
                {[
                  { id: 1, title: 'New Remix 1', duration: '02:48' },
                  { id: 2, title: 'New Remix 2', duration: '03:21' },
                ].map((song) => (
                  <div key={song.id} className={styles.trackCard}>
                    {/* Cover */}
                    <div className={styles.trackCover}>Cover</div>

                    {/* Details */}
                    <div className={styles.trackDetails}>
                      {/* Title + actions */}
                      <div className={styles.trackHeader}>
                        <div className={styles.trackTitle}>{song.title}</div>
                        <div className={styles.trackActions}>
                          <button className={styles.linkButton}>Share</button>
                          <button className={styles.linkButton}>Change Privacy</button>
                          <button className={styles.linkButton}>Original Artist</button>
                          <button className={styles.linkButton}>Delete</button>
                      </div>
                      </div>

                      {/* Play bar */}
                      <div className={styles.trackTime}>
                        <span>00:00</span>
                        <button className={styles.playButton}>▶</button>
                        <div className={styles.progressBar}>
                          <div className={styles.progress}></div>
                        </div>
                        <span>{song.duration}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={styles.trackStats}>
                      <FaThumbsUp className={styles.icon} style={{marginTop: 'none'}}/>
                      <span className={styles.trackStat}>000</span>

                      <FaRandom className={styles.icon} style={{fontSize: '1.375rem'}}/>
                      <span className={styles.trackStat}>000</span>
                      
                      <FaPlus className={styles.icon} style={{fontSize: '1.5rem', marginLeft: '-0.25rem'}}/>
                      <span className={styles.trackStat}>000</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.overviewStats} style={{marginTop: '0.75rem'}}>Recent Followers</div>

              <div className={styles.recentFollowersGrid}>
                {[
                  { id: 1, name: 'Recent Follower #1' },
                  { id: 2, name: 'Recent Follower #2' },
                  { id: 3, name: 'Recent Follower #3' },
                ].map((follower) => (
                  <div key={follower.id} className={styles.recentFollowerCard}>
                    <div className={styles.avatar}></div>
                    <div className={styles.artistName}>{follower.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Your Network' && (
            <>
              {/* Network Tabs */}
              <div className={styles.networkTabsWrapper}>
                {networkTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.networkTab} ${
                      activeNetworkTab === tab ? styles.activeNetworkTab : ''
                    }`}
                    onClick={() => setActiveNetworkTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Accounts Grid */}
              <div className={styles.accountsGrid}>
                {loadingNetwork ? (
                  <p>Loading your network...</p>
                ) : filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => (
                    <div key={acc.id} className={styles.accountCard}>
                      <div className={styles.leftGroup}>
                        <div className={styles.avatar}></div>
                        <div className={styles.artistName}>{acc.name}</div>
                      </div>

                      <div className={styles.rightGroup}>
                        <button
                          className={`${styles.followButton} ${acc.following ? styles.following : ''}`}
                          onClick={() => toggleFollow(acc.id)}
                        >
                          {acc.following ? 'Following' : 'Follow'}
                        </button>

                        <button
                          className={styles.messageButton}
                          onClick={() => alert(`Link to message ${acc.name}`)}
                        >
                          <FaRegEnvelope className={styles.messageIcon} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No accounts found.</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'Manage Tracks' && (
            <div className={styles.tracksList}>
              <div className={styles.overviewStats}>
                Your Uploaded Tracks
              </div>
              {loadingTracks && <p>Loading songs...</p>}

              {!loadingTracks && tracks.length === 0 && (
                <p>No songs uploaded yet.</p>
              )}

              {tracks.map((track) => {
                const isActive = currentTrackId === track.id;

                return (
                  <div key={track.id} className={styles.trackCard}>
                    {/* Cover art on the left */}
                    <div className={styles.trackCover}>
                      {track.artwork_url ? (
                        <img
                          src={track.artwork_url}
                          alt={track.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        "Cover"
                      )}
                    </div>

                    {/* Details area */}
                    <div className={styles.trackDetails}>
                      {/* Row: Title + Actions */}
                      <div className={styles.trackHeader}>
                        <div className={styles.trackTitle}>
                          {track.title}
                          <FaPencilAlt
                            className={styles.Icon}
                            style={{ marginLeft: "0.25rem" }}
                          />
                        </div>

                        <div className={styles.trackActions}>
                          <button className={styles.linkButton}>Share</button>
                          <button className={styles.linkButton}>Change Privacy</button>
                          <button className={styles.linkButton}>Remix</button>
                          <button className={styles.linkButton}>Delete</button>
                        </div>
                      </div>

                      {/* Play bar row */}
                      <div className={styles.trackTime}>
                        {/* CURRENT TIME – only active track shows live time */}
                        <span>{formatTime(isActive ? currentTime : 0)}</span>

                        {/* PLAY/PAUSE BUTTON */}
                        <button
                          className={styles.playButton}
                          onClick={() => handlePlayPause(track)}
                        >
                          {isActive && audio && !audio.paused ? <FaPause /> : <FaPlay />}
                        </button>

                        {/* PROGRESS BAR (Clickable + Draggable) */}
                        <div
                          className={styles.progressBar}
                          ref={barRef}
                          onClick={(e) => handleBarClick(e, track)}
                          onMouseMove={(e) => handleDragMove(e, barRef)}
                          onMouseUp={handleDragEnd}
                          onMouseLeave={handleDragEnd}
                        >
                          <div
                            className={styles.progress}
                            style={{
                              width: isActive ? `${Math.min(progress * 100, 100)}%` : "0%",
                            }}
                          />

                          {/* DRAGGABLE WHITE CIRCLE */}
                          <div
                            className={styles.thumb}
                            style={{
                              left: isActive ? `${Math.min(progress * 100, 100)}%` : "0%",
                            }}
                            onMouseDown={handleDragStart}
                          ></div>
                        </div>

                        {/* TOTAL DURATION */}
                        <span>{formatTime(track.duration)}</span>
                      </div>
                    </div>

                    {/* Stats on the far right */}
                    <div className={styles.trackStats}>
                      <FaThumbsUp className={styles.icon} />
                      000

                      <FaRandom className={styles.icon} style={{ fontSize: "1.375rem" }} />
                      000

                      <FaPlus
                        className={styles.icon}
                        style={{ fontSize: "1.5rem", marginLeft: "-0.25rem" }}
                      />
                      000
                    </div>
                  </div>
                );
              })}

            </div>
          )}

          {activeTab === 'Albums' && (
            <div className={styles.albumsSection}>
              <div className={styles.overviewStats}>Your Albums</div>
              <div className={styles.albumsHeader}>
                <div className={styles.albumsGrid}>
                  {[
                    { id: 1, name: 'Album One' },
                    { id: 2, name: 'Album Two' },
                    { id: 3, name: 'Album Three' },
                    { id: 4, name: 'Album Four' },
                    { id: 5, name: 'Album Five' },
                    { id: 6, name: 'Album Six' },
                  ].map((album) => (
                    <div key={album.id} className={styles.albumCard}>
                      <div className={styles.albumCover}>
                        Cover
                        <FaPencilAlt className={styles.editIcon}/>
                      </div>
                      <div className={styles.albumName}>{album.name}</div>
                    </div>
                  ))}
                </div>

                <button className={styles.newAlbumButton}>+ New Album</button>
              </div>
            </div>
          )}

          {activeTab === 'Remixes' && (
            <div className={styles.tracksList}>
              <div className={styles.overviewStats}>
                Your Remixed Tracks
              </div>
              {[
                { id: 1, title: 'Song Title 1', duration: '03:45' },
                { id: 2, title: 'Song Title 2', duration: '04:12' },
                { id: 3, title: 'Song Title 3', duration: '02:58' },
                { id: 4, title: 'Song Title 4', duration: '03:49' },
                { id: 5, title: 'Song Title 5', duration: '01:54' },
                { id: 6, title: 'Song Title 6', duration: '03:04' },
              ].map((song) => (
                <div key={song.id} className={styles.trackCard}>
                  {/* Cover on the left */}
                  <div className={styles.trackCover}>Cover</div>

                  {/* Details area */}
                  <div className={styles.trackDetails}>
                    {/* Row: Title + Actions */}
                    <div className={styles.trackHeader}>
                      <div className={styles.trackTitle}>
                        {song.title} <FaPencilAlt className={styles.Icon} style={{marginLeft: '0.25rem'}}/>
                      </div>
                      <div className={styles.trackActions}>
                        <button className={styles.linkButton}>Share</button>
                        <button className={styles.linkButton}>Change Privacy</button>
                        <button className={styles.linkButton}>Original Artist</button>
                        <button className={styles.linkButton}>Delete</button>
                      </div>
                    </div>

                    {/* Play bar row */}
                    <div className={styles.trackTime}>
                      <span>00:00</span>
                      <button className={styles.playButton}>▶</button>
                      <div className={styles.progressBar}>
                        <div className={styles.progress}></div>
                      </div>
                      <span>{song.duration}</span>
                    </div>
                  </div>

                  {/* Stats on the far right */}
                  <div className={styles.trackStats}>
                      <FaThumbsUp className={styles.icon} style={{marginTop: 'none'}}/>
                      <span className={styles.trackStat}>000</span>

                      <FaRandom className={styles.icon} style={{fontSize: '1.375rem'}}/>
                      <span className={styles.trackStat}>000</span>
                      
                      <FaPlus className={styles.icon} style={{fontSize: '1.5rem', marginLeft: '-0.25rem'}}/>
                      <span className={styles.trackStat}>000</span>
                    </div>
                </div>
              ))}
            </div>
          )}

        </div>

        <button className={styles.uploadButton} onClick={() => setShowUploadModal(true)}>+</button>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.uploadModal}>
              <div className={styles.uploadTitle}>Upload a New Track</div>

              {/* Step Progress Indicator */}
              <div className={styles.progressContainer}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className={styles.progressStep}>
                    <div
                      className={`${styles.circle} ${
                        uploadStep === num
                          ? styles.activeCircle
                          : uploadStep > num
                          ? styles.completedCircle
                          : ''
                      }`}
                      onClick={() => setUploadStep(num)}
                      style={{ cursor: 'pointer' }}
                    >
                      {uploadStep > num ? '✓' : num}
                    </div>
                    {num < 6 && (
                      <div
                        className={`${styles.line} ${
                          uploadStep > num ? styles.completedLine : ''
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              {uploadStep === 1 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>
                    Choose Main Audio Track
                    <label htmlFor="audioUpload" className={styles.fileUploadButton}>
                      <FaPlus className={styles.plusIcon} />
                    </label>

                    <input
                      id="audioUpload"
                      type="file"
                      accept="audio/*"
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          audioFiles: [...uploadData.audioFiles, ...Array.from(e.target.files)],
                        })
                      }
                      className={styles.hiddenInput}
                    />
                  </h2>

                  {/* Uploaded file list */}
                  {uploadData.audioFiles.length > 0 && (
                    <div className={styles.uploadedFilesList}>
                      {uploadData.audioFiles.map((file, index) => (
                        <div key={index} className={styles.uploadedFileItem}>
                          <span className={styles.fileName}>{file.name}</span>

                          <button
                            className={styles.removeFileButton}
                            onClick={() => {
                              const updated = uploadData.audioFiles.filter((_, i) => i !== index);
                              setUploadData({ ...uploadData, audioFiles: updated });
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {uploadStep === 2 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>
                    Upload Stems (Optional)
                    <label htmlFor="stemUpload" className={styles.fileUploadButton}>
                      <FaPlus className={styles.plusIcon} />
                    </label>

                    <input
                      id="stemUpload"
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          stemFiles: [
                            ...(uploadData.stemFiles || []),
                            ...Array.from(e.target.files),
                          ],
                        })
                      }
                      className={styles.hiddenInput}
                    />
                  </h2>

                  {/* Uploaded stems list */}
                  {uploadData.stemFiles && uploadData.stemFiles.length > 0 && (
                    <div className={styles.uploadedFilesList}>
                      {uploadData.stemFiles.map((file, index) => (
                        <div key={index} className={styles.uploadedFileItem}>
                          <span className={styles.fileName}>{file.name}</span>

                          <button
                            className={styles.removeFileButton}
                            onClick={() => {
                              const updated = uploadData.stemFiles.filter((_, i) => i !== index);
                              setUploadData({ ...uploadData, stemFiles: updated });
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {uploadStep === 3 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>
                    Choose Track Cover Art
                    <label htmlFor="coverUpload" className={styles.fileUploadButton}>
                      <FaPlus className={styles.plusIcon} />
                    </label>
                    <input
                      id="coverUpload"
                      type="file"
                      accept="image/*"
                      className={styles.hiddenInput}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setUploadData({
                              ...uploadData,
                              coverArt: file,
                              coverArtPreview: event.target.result, // base64 preview
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </h2>

                  {/* Image preview */}
                  {uploadData.coverArtPreview && (
                    <div className={styles.coverArtPreviewWrapper}>
                      <img
                        src={uploadData.coverArtPreview}
                        alt="Cover Art Preview"
                        className={styles.coverArtPreview}
                      />
                    </div>
                  )}
                </div>
              )}

              {uploadStep === 4 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>Track Details</h2>
                  <input
                    type="text"
                    placeholder="Track Title"
                    value={uploadData.title}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, title: e.target.value })
                    }
                  />

                  <textarea
                    placeholder="Description: Let others know what your track is about..."
                    value={uploadData.description}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, description: e.target.value })
                    }
                  />

                </div>
              )}

              {uploadStep === 5 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>Discoverability & Privacy</h2>

                  <input
                    type="text"
                    placeholder="Search for genres or tags to add to your track..."
                    value={uploadData.tags}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, tags: e.target.value })
                    }
                  />

                  <select
                    value={uploadData.privacy}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, privacy: e.target.value })
                    }
                  >
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>
              )}

              {/* NEW STEP 5: Rights & Acknowledgements */}
              {uploadStep === 6 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepHeader}>Rights & Acknowledgements</h2>

                  <div style={{ display: 'grid', gap: 12, marginTop: 8, maxWidth: '50vw'}}>
                    <label
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '18px 1fr',
                        gap: 10,
                        alignItems: 'start',
                        padding: 12,
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        background: '#0e1115'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={acks.ownership}
                        onChange={(e) => setAcks({ ...acks, ownership: e.target.checked })}
                      />
                      <span style={{ fontSize: 14, lineHeight: 1.5 }}>
                        I confirm that I own the rights to this Content, or I have obtained all necessary licenses,
                        consents and releases (including for samples, compositions, recordings, and performances).
                        I understand Leep does not authorize copyright infringement.
                      </span>
                    </label>

                    <label
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '18px 1fr',
                        gap: 10,
                        alignItems: 'start',
                        padding: 12,
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        background: '#0e1115'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={acks.enforcement}
                        onChange={(e) => setAcks({ ...acks, enforcement: e.target.checked })}
                      />
                      <span style={{ fontSize: 14, lineHeight: 1.5 }}>
                        I agree that Leep may use automated content identification, watermarking, and human review,
                        and that Leep may remove or restrict Content subject to a valid rights-holder claim. False
                        statements may result in account suspension, termination, and legal liability.
                      </span>
                    </label>

                    <label
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '18px 1fr',
                        gap: 10,
                        alignItems: 'start',
                        padding: 12,
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        background: '#0e1115'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={acks.remix}
                        onChange={(e) => setAcks({ ...acks, remix: e.target.checked })}
                      />
                      <span style={{ fontSize: 14, lineHeight: 1.5 }}>
                        For remixes/derivatives, I represent and warrant that I hold permissions for all source material used,
                        and I will honor the owner’s settings (e.g., “No Derivatives”). I understand stems/remixes cannot be
                        downloaded without owner approval.
                      </span>
                    </label>
                  </div>

                  {!allAcksChecked && (
                    <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 8 }}>
                      Please check all acknowledgements to enable Upload.
                    </p>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className={styles.modalButtons}>
                {/* Previous (only shows after Step 1) */}
                {uploadStep > 1 ? (
                  <button style={{fontSize: '0.875rem', paddingInline: '1rem'}} onClick={() => setUploadStep(uploadStep - 1)}>
                    Previous
                  </button>
                ) : (
                  <div></div> // Empty div as spacer to keep layout balanced
                )}

                {/* Next or Finish */}
                {uploadStep < 6 ? (
                  <button style={{fontSize: '0.875rem', paddingInline: '1rem'}} onClick={() => {setUploadStep(uploadStep + 1);}}>
                    Next
                  </button>
                ) : (
                  <button
                    style={{ fontSize: "0.875rem", paddingInline: "1rem" }} onClick={() => {handleUpload();}}>
                    Upload
                  </button>
                )}
              </div>

              {/* Close button */}
              <button
                className={styles.closeButton}
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}