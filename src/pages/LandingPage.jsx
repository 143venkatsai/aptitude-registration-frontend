import React from "react";
import Hero from "../components/Hero";
import VideoSection from "../components/VideoSection";
import LeadForm from "../components/LeadForm";

function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />

      <section className="content-section">
        <div className="content-container">
          <LeadForm />
          <VideoSection />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="logo-mark">?</span>
          <span>AptiMaster</span>
        </div>
        <p>
          Empowering students with the logical and quantitative skills needed to
          excel in competitive exams and professional careers.
        </p>
        <div className="footer-icons">
          <span>F</span>
          <span>I</span>
          <span>L</span>
        </div>
        <small>? 2023 AptiMaster Coaching. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default LandingPage;
