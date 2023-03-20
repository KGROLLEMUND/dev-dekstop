import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} />
      <div className="info">
        <div>{track.title}</div>
        <div className="artist">{track.artist}</div>
      </div>
    </div>
  )
}
