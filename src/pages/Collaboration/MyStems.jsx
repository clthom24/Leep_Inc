import React, { useState } from "react";
import styles from "./styles/mystems.module.css";
import { FaThumbsUp, FaRandom, FaPlus, FaPlay } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

export default function MyStems({ isActive }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    audioFiles: [],
    coverArtFiles: [],
    coverArtPreviews: [],
    titles: [],
    descriptions: [],
    tags: "",
    privacy: "Public",
  });

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0); // 0 = cover art, 1 = title/desc

  const dummyTracks = [
    { id: 1, title: "My Stem 1", duration: "03:22" },
    { id: 2, title: "My Stem 2", duration: "04:05" },
    { id: 3, title: "My Stem 3", duration: "02:48" },
  ];

  async function handleUpload() {
    if (uploadData.audioFiles.length === 0) {
      alert("Please select at least one stem file.");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to upload stems.");

      for (let i = 0; i < uploadData.audioFiles.length; i++) {
        const file = uploadData.audioFiles[i];

        // Upload cover art if present
        let artworkUrl = null;
        if (uploadData.coverArtFiles[i]) {
          const safeFileName = uploadData.coverArtFiles[i].name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
          const artworkPath = `${user.id}/${Date.now()}_${safeFileName}`;
          const { error: artworkError } = await supabase.storage.from("artwork").upload(artworkPath, uploadData.coverArtFiles[i]);
          if (artworkError) throw artworkError;

          const { data: publicArtwork } = supabase.storage.from("artwork").getPublicUrl(artworkPath);
          artworkUrl = publicArtwork.publicUrl;
        }

        // Upload audio file
        const stemPath = `${user.id}/${Date.now()}_${file.name}`;
        const { error: stemError } = await supabase.storage.from("stems").upload(stemPath, file);
        if (stemError) throw stemError;

        const { data: publicStem } = supabase.storage.from("stems").getPublicUrl(stemPath);
        const stemUrl = publicStem.publicUrl;

        // Insert into DB
        const { error: dbError } = await supabase.from("stems").insert([{
          uploader_id: user.id,
          name: uploadData.titles[i] || file.name,
          file_url: stemUrl,
          artwork_url: artworkUrl,
          is_shared: true,
          project_id: 0,
        }]);
        if (dbError) throw dbError;
      }

      alert("All stems uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err.message);
      alert(`Upload failed: ${err.message}`);
    } finally {
      // Reset everything
      setShowUploadModal(false);
      setUploadData({
        audioFiles: [],
        coverArtFiles: [],
        coverArtPreviews: [],
        titles: [],
        descriptions: [],
        tags: "",
        privacy: "Public",
      });
      setCurrentFileIndex(0);
      setCurrentSubStep(0);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>My Stems</div>

      <div className={styles.mainContentBox}>
        <div className={styles.scrollArea}>
          <div className={styles.tracksList}>
            {dummyTracks.map((song) => (
              <div key={song.id} className={styles.trackCard}>
                <div className={styles.trackCover}>Cover</div>
                <div className={styles.trackDetails}>
                  <div className={styles.trackHeader}>
                    <div className={styles.trackTitle}>{song.title}</div>
                    <div className={styles.trackActions}>
                      <button className={styles.linkButton}>Share</button>
                      <button className={styles.linkButton}>Delete</button>
                    </div>
                  </div>
                  <div className={styles.trackTime}>
                    <span>00:00</span>
                    <button className={styles.playButton}><FaPlay /></button>
                    <div className={styles.progressBar}>
                      <div className={styles.progress}></div>
                    </div>
                    <span>{song.duration}</span>
                  </div>
                </div>
                <div className={styles.trackStats}>
                  <FaThumbsUp className={styles.icon} /><span>0</span>
                  <FaRandom className={styles.icon} /><span>0</span>
                  <FaPlus className={styles.icon} /><span>0</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isActive && (
          <button
            className={styles.uploadButton}
            onClick={() => setShowUploadModal(true)}
          >
            <FaPlus />
          </button>
        )}
      </div>

        {showUploadModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.uploadModal}>
              <h2>
                {uploadData.audioFiles.length === 0
                  ? "Select Files"
                  : currentFileIndex < uploadData.audioFiles.length
                  ? currentSubStep === 0
                    ? "Title & Description"
                    : "Select Cover Art"
                  : "Confirm Uploads"}
              </h2>

              {uploadData.audioFiles.length === 0 ? (
                // Step 1: Select audio files
                <div>
                  <label htmlFor="stemUpload" className={styles.fileUploadButton}>
                    Select Stem File(s) <FaPlus />
                  </label>
                  <input
                    id="stemUpload"
                    type="file"
                    multiple
                    accept="audio/*"
                    className={styles.hiddenInput}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        audioFiles: [...prev.audioFiles, ...Array.from(e.target.files)],
                      }))
                    }
                  />
                  {uploadData.audioFiles.length > 0 && (
                    <ul>
                      {uploadData.audioFiles.map((f, i) => (
                        <li key={i}>
                          {f.name}
                          <button
                            onClick={() =>
                              setUploadData((prev) => ({
                                ...prev,
                                audioFiles: prev.audioFiles.filter((_, idx) => idx !== i),
                              }))
                            }
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : currentFileIndex < uploadData.audioFiles.length ? (
                // Loop through each file
                <div>
                  <h3>
                    File {currentFileIndex + 1} of {uploadData.audioFiles.length}:{" "}
                    {currentSubStep === 0
                      ? uploadData.audioFiles[currentFileIndex].name
                      : uploadData.titles[currentFileIndex] || uploadData.audioFiles[currentFileIndex].name}
                  </h3>

                  {currentSubStep === 0 && (
                    <div className={styles.titleDescriptionStep}>
                      <label className={styles.inputLabel}>Stem Title</label>
                      <input
                        type="text"
                        placeholder="Enter stem title"
                        value={uploadData.titles[currentFileIndex] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUploadData((prev) => {
                            const titles = [...(prev.titles || [])];
                            titles[currentFileIndex] = val;
                            return { ...prev, titles };
                          });
                        }}
                        className={styles.titleInput}
                      />

                      <label className={styles.inputLabel}>Description</label>
                      <textarea
                        placeholder="Enter a description for your stem"
                        value={uploadData.descriptions[currentFileIndex] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUploadData((prev) => {
                            const descriptions = [...(prev.descriptions || [])];
                            descriptions[currentFileIndex] = val;
                            return { ...prev, descriptions };
                          });
                        }}
                        className={styles.descriptionInput}
                      />
                    </div>
                  )}

                  {currentSubStep === 1 && (
                    // Step 3: Cover Art
                    <div>
                      <label htmlFor="coverUpload" className={styles.fileUploadButton}>
                        Select Cover Art <FaPlus />
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
                            reader.onload = (ev) => {
                              setUploadData((prev) => {
                                const coverArtFiles = [...(prev.coverArtFiles || [])];
                                const coverArtPreviews = [...(prev.coverArtPreviews || [])];
                                coverArtFiles[currentFileIndex] = file;
                                coverArtPreviews[currentFileIndex] = ev.target.result;
                                return { ...prev, coverArtFiles, coverArtPreviews };
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {uploadData.coverArtPreviews?.[currentFileIndex] && (
                        <img
                          src={uploadData.coverArtPreviews[currentFileIndex]}
                          alt="Preview"
                          className={styles.coverArtPreview}
                        />
                      )}
                    </div>
                  )}

                  <div className={styles.modalButtons}>
                    {currentSubStep > 0 && (
                      <button onClick={() => setCurrentSubStep(currentSubStep - 1)}>Previous</button>
                    )}
                    {currentSubStep < 1 && (
                      <button onClick={() => setCurrentSubStep(currentSubStep + 1)}>Next</button>
                    )}
                    {currentSubStep === 1 && (
                      <button
                        onClick={() => {
                          if (currentFileIndex < uploadData.audioFiles.length - 1) {
                            setCurrentFileIndex(currentFileIndex + 1);
                            setCurrentSubStep(0); // go to Title & Description for next file
                          } else {
                            setCurrentFileIndex(uploadData.audioFiles.length); // go to confirmation step
                          }
                        }}
                      >
                        {currentFileIndex < uploadData.audioFiles.length - 1 ? "Next File" : "Review All"}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Confirmation step
                <div>
                  <h3>Confirm Your Uploads</h3>
                  <ul className={styles.confirmationList}>
                    {uploadData.audioFiles.map((file, i) => (
                      <li key={i} className={styles.confirmationItem}>
                        <img
                          src={uploadData.coverArtPreviews[i]}
                          alt="Cover"
                          className={styles.confirmationThumbnail}
                        />
                        <div className={styles.confirmationTitle}>
                          <strong>{uploadData.titles[i] || file.name}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.modalButtons}>
                    <button
                      onClick={() => {
                        setCurrentFileIndex(uploadData.audioFiles.length - 1);
                        setCurrentSubStep(1); // go back to last file's cover art
                      }}
                    >
                      Previous
                    </button>
                    <button onClick={handleUpload}>Upload All</button>
                  </div>
                </div>
              )}

              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowUploadModal(false);
                  setCurrentFileIndex(0);
                  setCurrentSubStep(0);
                  setUploadData({
                    audioFiles: [],
                    coverArtFiles: [],
                    coverArtPreviews: [],
                    titles: [],
                    descriptions: [],
                    tags: "",
                    privacy: "Public",
                  });
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

    </div>
  );
}
