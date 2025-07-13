import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="animate-fade-in">
            <span> Welcome to Enterprise Work Management</span>
          </h1>
          <p className="animate-fade-in animate-delay-1">
            Simplify your projects, tasks, and team management in one powerful
            platform.
          </p>
          <Link
            to="/login"
            className="get-started-btn animate-fade-in animate-delay-2"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card animate-slide-up">
            <div className="feature-icon">📊</div>
            <h3>Real-time Analytics</h3>
            <p>
              Get instant insights into your team's performance and project
              progress with our comprehensive dashboard.
            </p>
          </div>
          <div className="feature-card animate-slide-up animate-delay-1">
            <div className="feature-icon">🤝</div>
            <h3>Team Collaboration</h3>
            <p>
              Seamless communication with built-in chat, file sharing, and
              comment threads on every task.
            </p>
          </div>
          <div className="feature-card animate-slide-up animate-delay-2">
            <div className="feature-icon">⚡</div>
            <h3>Automated Workflows</h3>
            <p>
              Save time with customizable automation rules for repetitive tasks
              and approvals.
            </p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>Trusted by Leading Companies</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card animate-fade-in">
            <p>
              "This platform transformed how we manage our global teams.
              Productivity increased by 40% in just 3 months."
            </p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>CTO, TechCorp</span>
            </div>
          </div>
          <div className="testimonial-card animate-fade-in animate-delay-1">
            <p>
              "The intuitive interface made adoption effortless across all
              departments. Our project completion rate is now at 98%."
            </p>
            <div className="testimonial-author">
              <strong>Michael Chen</strong>
              <span>Operations Director, Global Inc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="animate-fade-in">Ready to Transform Your Workflow?</h2>
        <Link
          to="/login"
          className="get-started-btn animate-fade-in animate-delay-1"
        >
          Start Your Free Trial
        </Link>
        <p className="animate-fade-in animate-delay-2">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
