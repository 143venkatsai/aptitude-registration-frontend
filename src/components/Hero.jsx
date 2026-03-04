import React from "react";
import poster1 from "../assets/poster1.png";

function Hero() {
  return (
    <header className="hero-wrap">
      <nav className="top-nav">
        <div className="brand">
          <span className="logo-mark">?</span>
          <span>AptiMaster</span>
        </div>

        <div className="nav-links">
          <a href="#">Courses</a>
          <a href="#">Testimonials</a>
          <a className="nav-cta" href="#register">
            Enroll Now
          </a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              <span>NEW</span>
              <p>Live Batch Starting Soon</p>
            </div>

            <h1>
              Ultimate <span>Aptitude</span>
              <br />
              <span>Crash Course</span>
            </h1>

            <ul>
              <li>Learn How to Solve Aptitude Problems the Right Way</li>
              <li>Practice 150+ Interview Questions & Company Specific Sheets</li>
              <li>Expert Preparation for 10th & 12th Class Students</li>
            </ul>

            <a href="#register" className="hero-cta">
              Enroll Today
            </a>
          </div>

          <div className="hero-right">
            <div className="hero-image-card">
              <img src={poster1} alt="Students learning" />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Hero;
