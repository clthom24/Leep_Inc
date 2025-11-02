import { useState } from 'react';
import styles from './styles.module.css';
import { supabase } from "../../supabaseClient";
import { FaThumbsUp, FaRandom, FaPlus, FaPencilAlt, FaRegEnvelope  } from "react-icons/fa";

export default function MyMusicPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeNetworkTab, setActiveNetworkTab] = useState('Followers');

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);

  const [uploadData, setUploadData] = useState({
    audioFiles: [],
    coverArt: null,
    title: '',
    description: '',
    tags: '',
    privacy: 'Public',
  });

  const tabs = ['Overview', 'Your Network', 'Manage Tracks', 'Albums', 'Remixes'];
  const networkTabs = ['Followers', 'Following', 'Collaborators'];

  // Keep accounts in state so we can update them
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Example Artist #1', follower: true, following: true, collaborator: false },
    { id: 2, name: 'Example Artist #2', follower: true, following: false, collaborator: false },
    { id: 3, name: 'Example Artist #3', follower: false, following: true, collaborator: false },
    { id: 4, name: 'Example Artist #4', follower: true, following: true, collaborator: true },
    { id: 5, name: 'Example Artist #5', follower: false, following: false, collaborator: true },
    { id: 6, name: 'Example Artist #6', follower: false, following: true, collaborator: false },
  ]);

  // Filter accounts by active sub-tab
  function getFilteredAccounts() {
    switch (activeNetworkTab) {
      case 'Followers':
        return accounts.filter((acc) => acc.follower);
      case 'Following':
        return accounts.filter((acc) => acc.following);
      case 'Collaborators':
        return accounts.filter((acc) => acc.collaborator);
      default:
        return accounts;
    }
  }

  // Toggle follow/unfollow
  function toggleFollow(id) {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, following: !acc.following } : acc
      )
    );
  }

  async function handleUpload() {
      if (uploadData.audioFiles.length === 0) {
        alert("Please select at least one song file.");
        return;
      }
  
      try {
        // 🔑 Get logged-in user (for artist_id)
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error("You must be logged in to upload songs.");
        
        let artworkUrl = null;
  
        // 1️⃣ Upload artwork (if any)
        if (uploadData.coverArt) {
          const safeFileName = uploadData.coverArt.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          const artworkPath = `${user.id}/${Date.now()}_${safeFileName}`;
          const { error: artworkError } = await supabase.storage
            .from("artwork") // your Supabase bucket name for cover art
            .upload(artworkPath, uploadData.coverArt);
  
          if (artworkError) throw artworkError;
  
          const { data: publicArtwork } = supabase.storage
            .from("artwork")
            .getPublicUrl(artworkPath);
  
          artworkUrl = publicArtwork.publicUrl;
        }
        
        // 2️⃣ Upload each audio file
        for (const file of uploadData.audioFiles) {
          const audioPath = `${user.id}/${Date.now()}_${file.name}`;
          const { error: audioError } = await supabase.storage
            .from("audio") // your Supabase bucket for audio files
            .upload(audioPath, file);
          if (audioError) throw audioError;
          
          
          const { data: publicAudio } = supabase.storage
            .from("audio")
            .getPublicUrl(audioPath);
  
          const audioUrl = publicAudio.publicUrl;
  
          // 3️⃣ Insert row into `songs` table
          const { error: dbError } = await supabase.from("songs").insert([
            {
              artist_id: user.id,          // must equal auth.uid()
              title: uploadData.title || file.name,
              audio_url: audioUrl,
              artwork_url: artworkUrl,
              is_published: true,
            },
          ]);
  
          if (dbError) throw dbError;
        }
        
        alert("Upload successful!");
      } catch (err) {
        console.error("Upload error:", err.message);
        alert(`Upload failed: ${err.message}`);
      } finally {
        // Reset modal
        setShowUploadModal(false);
        setUploadStep(1);
        setUploadData({
          audioFiles: [],
          coverArt: null,
          title: "",
          description: "",
          tags: "",
          privacy: "Public",
        });
      }
    }

  const filteredAccounts = getFilteredAccounts();

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
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => (
                    <div className={styles.accountCard}>
                      {/* Left side */}
                      <div className={styles.leftGroup}>
                        <div className={styles.avatar}></div>
                        <div className={styles.artistName}>{acc.name}</div>
                      </div>

                      {/* Right side */}
                      <div className={styles.rightGroup}>
                        <button
                          className={`${styles.followButton} ${acc.following ? styles.following : ''}`}
                          onClick={() => toggleFollow(acc.id)}
                        >
                          {acc.following ? 'Following' : 'Follow'}
                        </button>
                        
                        <button
                          className={styles.messageButton}
                          onClick={() => alert('Link to direct message with artist.')}
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
                        <button className={styles.linkButton}>Remix</button>
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
                      000

                      <FaRandom className={styles.icon} style={{fontSize: '1.375rem'}}/>
                      000
                      
                      <FaPlus className={styles.icon} style={{fontSize: '1.5rem', marginLeft: '-0.25rem'}}/>
                      000
                    </div>
                </div>
              ))}
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
                {[1, 2, 3, 4].map((num) => (
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
                    {num < 4 && (
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
                    Choose Audio File(s)
                    <label htmlFor="audioUpload" className={styles.fileUploadButton}>
                      <FaPlus className={styles.plusIcon} />
                    </label>

                    <input
                      id="audioUpload"
                      type="file"
                      multiple
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


              {uploadStep === 3 && (
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

              {uploadStep === 4 && (
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
                {uploadStep < 4 ? (
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