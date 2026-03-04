import React from "react";

function VideoSection() {
  return (
    <section className="video-only">
      <iframe
        className="video-frame"
        src="https://www.youtube.com/embed/fEMn2WBXcQ8?autoplay=1&mute=1&rel=0"
        title="Aptitude Crash Course Introduction"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />

      <div className="stats-grid">
        <div>
          <h3>15k+</h3>
          <span>STUDENTS</span>
        </div>
        <div>
          <h3>150+</h3>
          <span>RESOURCES</span>
        </div>
        <div>
          <h3>4.9/5</h3>
          <span>RATING</span>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;

