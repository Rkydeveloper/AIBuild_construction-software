"use client";

import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("materials");
  const [activeProjects, setActiveProjects] = useState(10);
  const estimatedSavings = activeProjects * 1.8;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State to track if "Other" is selected for designation
  const [designation, setDesignation] = useState("");
  const [otherDesignation, setOtherDesignation] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const requirements: string[] = [];
    form
      .querySelectorAll<HTMLInputElement>('input[name="requirement"]:checked')
      .forEach((item) => {
        requirements.push(item.value);
      });

    const finalDesignation =
      designation === "Other" ? otherDesignation : designation;

    const lead = {
      date: new Date().toLocaleString("en-IN"),
      name: data.get("name"),
      phone: data.get("phone"),
      company: data.get("company"),
      designation: finalDesignation,
      business_type: data.get("business_type"),
      projects: data.get("projects"),
      turnover: data.get("turnover"),
      requirements: requirements.join(", "),
      challenge: data.get("challenge"),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      // Read text first. This prevents a confusing
      // "Unexpected token <" error if Next.js returns an HTML error page.
      const responseText = await response.text();

      let result: {
        success?: boolean;
        error?: string;
        message?: string;
      };

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("/api/lead returned non-JSON response:", responseText);
        throw new Error(
          `Lead API returned an invalid response (${response.status}). Check that app/api/lead/route.ts exists and the server restarted.`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            result.message ||
            `Lead submission failed (${response.status}).`
        );
      }

      console.log("Lead saved successfully:", result);

      // Redirect only after the lead has been confirmed as saved.
      window.location.href = "https://calendly.com/your-username/demo";
    } catch (error) {
      console.error("Error submitting lead:", error);

      alert(
        error instanceof Error
          ? error.message
          : "We could not submit your details right now. Please try again."
      );
    }
  };

  return (
    <>
      <header>
        <div className="container nav">
          <div className="logo">
            AI<span>Build</span>
          </div>
          <a href="#demo" className="nav-btn">
            Book a Demo
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              AI-Powered Construction Management
            </div>

            <h1>
              Run Your Construction Business With <span>More Control.</span>
            </h1>

            <p className="hero-description">
              Manage projects, materials, manpower and costs from one AI-powered construction software — and get the visibility you need to make better business decisions.
            </p>

            <div className="hero-points">
              <div className="hero-point">Track Material & Inventory</div>
              <div className="hero-point">Control Manpower Costs</div>
              <div className="hero-point">Monitor Project Budgets</div>
              <div className="hero-point">Get AI-Powered Insights</div>
            </div>

            <a href="#demo" className="primary-btn">
              BOOK A FREE DEMO →
            </a>

            <div className="hero-small">
              Trusted by contractors, builders & infrastructure developers.
            </div>
          </div>

          <div className="dashboard">
            <div className="dash-top">
              <div className="dash-title">Business Overview</div>
              <div className="live">● LIVE DATA</div>
            </div>

            <div className="dashboard-grid">
              <div className="dash-card">
                <div className="dash-label">ACTIVE PROJECTS</div>
                <div className="dash-number">18</div>
                <div className="dash-change up">↑ 3 this month</div>
              </div>

              <div className="dash-card">
                <div className="dash-label">PROJECT VALUE</div>
                <div className="dash-number">₹8.4Cr</div>
                <div className="dash-change up">12 tracked</div>
              </div>

              <div className="dash-card">
                <div className="dash-label">MATERIAL COST</div>
                <div className="dash-number">₹2.16Cr</div>
                <div className="dash-change down">↑ 6.8% vs plan</div>
              </div>

              <div className="dash-card">
                <div className="dash-label">MANPOWER</div>
                <div className="dash-number">247</div>
                <div className="dash-change up">Across 18 sites</div>
              </div>

              <div className="dash-card ai-card">
                <div className="ai-title">✦ AI INSIGHT</div>
                <div className="ai-text">
                  Material consumption at Project #08 is 9.4% higher than planned. Review current variance before escalation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="problem">
        <div className="container">
          <div className="section-label">Diagnostic</div>
          <h2>You Can't Control What You Can't See.</h2>
          <p className="section-description">
            Managing a growing construction business through scattered spreadsheets and phone calls leads to hidden losses.
          </p>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-number">01</div>
              <h3>Material Leakage</h3>
              <p>Purchased cement and steel don't match site consumption records.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">02</div>
              <h3>Rising Manpower Costs</h3>
              <p>Lack of daily attendance and site deployment tracking leads to wage inflation.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">03</div>
              <h3>Cost Overruns</h3>
              <p>Realizing budgets are blown only after project completion.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">04</div>
              <h3>Zero Site Visibility</h3>
              <p>Constant back-and-forth phone calls just to get basic project updates.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">05</div>
              <h3>Scattered Data</h3>
              <p>Important receipts, notes, and indents lost across WhatsApp groups.</p>
            </div>
            <div className="problem-card">
              <div className="problem-number">06</div>
              <h3>Decisions on Guesswork</h3>
              <p>Making critical purchasing decisions without real-time analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER OUTCOMES */}
      <section className="owner-section">
        <div className="container">
          <div className="section-label">Built For Owners</div>
          <h2>Focus on Growth. Let Software Handle Tracking.</h2>
          <p className="section-description">
            Get complete operational clarity across your entire portfolio instantly.
          </p>

          <div className="owner-grid">
            <div className="owner-card">
              <div className="owner-icon">₹</div>
              <h3>Control Margins</h3>
              <p>Catch budget slips early before they eat into your profits.</p>
            </div>
            <div className="owner-card">
              <div className="owner-icon">M</div>
              <h3>Track Inventory</h3>
              <p>Monitor procurement, stock levels, and site issues seamlessly.</p>
            </div>
            <div className="owner-card">
              <div className="owner-icon">P</div>
              <h3>Manage Labor</h3>
              <p>Clear visibility into workforce deployment and daily attendance.</p>
            </div>
            <div className="owner-card">
              <div className="owner-icon">AI</div>
              <h3>Smart Alerts</h3>
              <p>Let AI highlight operational bottlenecks and anomalies automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI INTELLIGENCE */}
      <section className="ai-section">
        <div className="container ai-grid">
          <div>
            <div className="section-label">AI Intelligence</div>
            <h2>Your Construction Data Speaks to You.</h2>
            <p className="section-description">
              Stop digging through reports. Ask questions in plain language and get instant operational answers.
            </p>

            <ul className="ai-list">
              <li>Identify projects exceeding material budgets</li>
              <li>Detect unusual consumption patterns instantly</li>
              <li>Forecast labor shortages ahead of deadlines</li>
              <li>Summarize daily site progress without calls</li>
            </ul>
          </div>

          <div className="ai-panel">
            <div className="ai-panel-header">
              <strong>✦ AI CONSTRUCTION ASSISTANT</strong>
              <span className="live">● Online</span>
            </div>

            <div className="ai-question">Which site needs my immediate attention today?</div>
            <div className="ai-answer">
              Project #08 requires review. Cement consumption is 9.4% above budget and the site is 3 days behind schedule.
            </div>

            <div className="ai-question">What is my highest material expense this month?</div>
            <div className="ai-answer">
              Steel and Cement account for 62% of total material expenditures across active sites.
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLATFORM TABS */}
      <section className="platform-section">
        <div className="container">
          <div className="section-label center">Platform Modules</div>
          <h2 className="center">Everything You Need in One Hub</h2>
          <p className="section-description center">
            Explore our core modules designed specifically for civil engineering and construction workflows.
          </p>

          <div className="tabs-container">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
                onClick={() => setActiveTab("materials")}
              >
                Material Management
              </button>
              <button
                className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                Project Tracking
              </button>
              <button
                className={`tab-btn ${activeTab === "manpower" ? "active" : ""}`}
                onClick={() => setActiveTab("manpower")}
              >
                Manpower & Labor
              </button>
              <button
                className={`tab-btn ${activeTab === "finance" ? "active" : ""}`}
                onClick={() => setActiveTab("finance")}
              >
                Cost & Billing
              </button>
            </div>

            <div className="tab-content">
              <div className="tab-pane">
                {activeTab === "materials" && (
                  <>
                    <h3>End-to-End Material Control</h3>
                    <p>Track indents, purchase orders, vendor deliveries, warehouse stock, and direct site consumption to prevent pilferage.</p>
                    <ul>
                      <li>Indent-to-issue audit trail</li>
                      <li>Automated low-stock alerts</li>
                      <li>Vendor rate comparison</li>
                    </ul>
                  </>
                )}
                {activeTab === "projects" && (
                  <>
                    <h3>Real-Time Project Visibility</h3>
                    <p>Monitor multi-site timelines, task milestones, contractor progress, and daily site logs from your mobile or laptop.</p>
                    <ul>
                      <li>Critical milestone tracking</li>
                      <li>Daily photo & progress logs</li>
                      <li>Multi-site dashboard switcher</li>
                    </ul>
                  </>
                )}
                {activeTab === "manpower" && (
                  <>
                    <h3>Optimize Workforce Deployment</h3>
                    <p>Manage skilled and unskilled labor attendance, sub-contractor billing, and output metrics across all active jobsites.</p>
                    <ul>
                      <li>Digital muster roll & attendance</li>
                      <li>Overtime & wage calculations</li>
                      <li>Productivity vs headcount reports</li>
                    </ul>
                  </>
                )}
                {activeTab === "finance" && (
                  <>
                    <h3>Strict Cost & Budget Control</h3>
                    <p>Compare estimated project budgets against actual expenses in real-time to protect profit margins on every contract.</p>
                    <ul>
                      <li>Planned vs Actual cost variance</li>
                      <li>Expense approval workflows</li>
                      <li>Client billing & invoice tracking</li>
                    </ul>
                  </>
                )}
              </div>

              <div>
                <div className="dashboard" style={{ transform: "none" }}>
                  <div className="dash-top">
                    <div className="dash-title">Module Preview: {activeTab.toUpperCase()}</div>
                    <div className="live">ACTIVE</div>
                  </div>
                  <div className="dash-card ai-card" style={{ gridColumn: "span 1" }}>
                    <div className="ai-title">SYSTEM STATUS</div>
                    <div className="ai-text">
                      All data synced securely with cloud database. Zero discrepancy detected in recent logs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI & COST SAVINGS CALCULATOR */}
      <section className="cost-section">
        <div className="container">
          <div className="section-label">Financial Impact</div>
          <h2>Estimate Your Annual Savings</h2>
          <p className="section-description">
            See how much unnecessary leakage and overruns you can save by switching to automated AI tracking.
          </p>

          <div className="cost-grid">
            <div className="calculator-box">
              <div className="calc-group">
                <label>Active Construction Sites: {activeProjects}</label>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={activeProjects}
                  onChange={(e) => setActiveProjects(Number(e.target.value))}
                />
              </div>

              <div className="calc-output">
                <div style={{ fontSize: "12px", color: "#9ca6ae", marginBottom: "4px" }}>
                  ESTIMATED ANNUAL SAVINGS
                </div>
                <div className="saving-val">₹{estimatedSavings.toFixed(1)} Lakhs / yr</div>
              </div>
            </div>

            <div className="cost-box">
              <div className="cost-row">
                <div className="cost-name">Average Material Wastage Reduction</div>
                <div className="cost-value highlight">14%</div>
              </div>
              <div className="cost-row">
                <div className="cost-name">Administrative Time Saved</div>
                <div className="cost-value highlight">18 hrs/week</div>
              </div>
              <div className="cost-row">
                <div className="cost-name">On-Time Project Delivery Rate</div>
                <div className="cost-value highlight">+28%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADOPTION */}
      <section className="adoption">
        <div className="container">
          <div className="section-label">Adoption</div>
          <h2>Powerful for Owners. Simple for Site Teams.</h2>
          <p className="section-description">
            Designed so site engineers can log updates in under 2 minutes without complicated software training.
          </p>

          <div className="adoption-grid">
            <div className="adoption-card">
              <h3>Lightning Fast Logging</h3>
              <p>Mobile-friendly interface built for dusty site environments.</p>
            </div>
            <div className="adoption-card">
              <h3>Zero Training Needed</h3>
              <p>Simple workflows your supervisors will pick up on day one.</p>
            </div>
            <div className="adoption-card">
              <h3>Fewer Follow-Up Calls</h3>
              <p>Stop dialing site engineers for basic status checks.</p>
            </div>
            <div className="adoption-card">
              <h3>Single Truth Source</h3>
              <p>Eliminate conflicting Excel sheets across departments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="audience-section">
        <div className="container">
          <div className="section-label">Who It's For</div>
          <h2>Built for Construction Leaders</h2>
          <div className="audience-grid">
            <div className="audience">Contractors</div>
            <div className="audience">Builders</div>
            <div className="audience">Developers</div>
            <div className="audience">EPC Companies</div>
            <div className="audience">Civil Contractors</div>
            <div className="audience">Infrastructure Firms</div>
            <div className="audience">Interior Fitout</div>
            <div className="audience">Project Managers</div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <div className="section-label center">Got Questions?</div>
          <h2 className="center">Frequently Asked Questions</h2>

          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                <span>Is this software difficult for site engineers to learn?</span>
                <span>{openFaq === 1 ? "−" : "+"}</span>
              </button>
              {openFaq === 1 && (
                <div className="faq-answer">
                  Not at all. We built it specifically with mobile-first simplicity so site supervisors can update daily progress in less than 2 minutes.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                <span>Can I manage multiple construction sites simultaneously?</span>
                <span>{openFaq === 2 ? "−" : "+"}</span>
              </button>
              {openFaq === 2 && (
                <div className="faq-answer">
                  Yes! You can switch between active project dashboards instantly to check materials, labor, and budget variances in one place.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                <span>How does the AI assistant help my business?</span>
                <span>{openFaq === 3 ? "−" : "+"}</span>
              </button>
              {openFaq === 3 && (
                <div className="faq-answer">
                  The AI analyzes your incoming logs and alerts you when material consumption spikes or deadlines slip, saving you hours of manual report review.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO BOOKING FORM */}
      <section className="form-section" id="demo">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <div className="section-label">Get Started</div>
              <h2>Book Your Free Demo</h2>
              <p>See how AI-powered construction management can streamline your business operations.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Your Designation *</label>
                  <select 
                    name="designation" 
                    required 
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="" disabled>Select your designation</option>
                           <option value="Civil Engineer">Civil Engineer</option> 

<option value="Owner / Founder">Owner / Founder</option>
        <option value="Director">Director</option>
        <option value="Managing Director">Managing Director</option>
        <option value="Partner">Partner</option>
        <option value="General Manager">General Manager</option>
        <option value="Project Manager">Project Manager</option>

 <option value="Architect">Architect</option>
        <option value="Interior Designer">Interior Designer</option>
        <option value="CAD Designer">CAD Designer</option>
        <option value="BIM Engineer">BIM Engineer</option>
        <option value="BIM Manager">BIM Manager</option>
        <option value="Construction Manager">Construction Manager</option>
        <option value="Site Manager">Site Manager</option>

 <option value="Civil Engineer">Civil Engineer</option>
        <option value="Site Engineer">Site Engineer</option>
        <option value="Structural Engineer">Structural Engineer</option>
        <option value="Project Engineer">Project Engineer</option>
        <option value="Planning Engineer">Planning Engineer</option>
        <option value="Quantity Surveyor">Quantity Surveyor</option>
        <option value="Estimation Engineer">Estimation Engineer</option>
        <option value="Billing Engineer">Billing Engineer</option>
        <option value="Design Engineer">Design Engineer</option>
        <option value="MEP Engineer">MEP Engineer</option>
        <option value="Electrical Engineer">Electrical Engineer</option>
        <option value="Mechanical Engineer">Mechanical Engineer</option>

        <option value="Contractor">Contractor</option>
        <option value="Subcontractor">Subcontractor</option>
        <option value="Labour Contractor">Labour Contractor</option>
        <option value="Vendor / Supplier">Vendor / Supplier</option>
        <option>Other</option>
                  </select>

                  {/* Conditional Textbox if "Other" is chosen */}
                  {designation === "Other" && (
                    <input 
                      type="text" 
                      name="other_designation" 
                      placeholder="Please specify your designation" 
                      value={otherDesignation}
                      onChange={(e) => setOtherDesignation(e.target.value)}
                      required 
                      style={{ marginTop: "8px" }}
                    />
                  )}
                </div>

                <div>
                  <label>Full Name *</label>
                  <input type="text" name="name" placeholder="Your name" required />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div>
                  <label>Company Name *</label>
                  <input type="text" name="company" placeholder="Company name" required />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Business Type *</label>
                  <select name="business_type" required defaultValue="">
                    <option value="" disabled>Select type</option>
                    <option>Contractor</option>
                    <option>Builder</option>
                    <option>Developer</option>
                    <option>EPC Company</option>
                    <option>Civil Contractor</option>
                    <option>Infrastructure Firm</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>Active Projects *</label>
                  <select name="projects" required defaultValue="">
                    <option value="" disabled>Select count</option>
                    <option>1–5</option>
                    <option>6–20</option>
                    <option>21–50</option>
                    <option>50+</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Annual Business Turnover *</label>
                  <select name="turnover" defaultValue="">
                    <option value="">Select turnover range</option>
                    <option value="Below ₹1 Crore">Below ₹1 Crore</option>
                    <option value="₹1–5 Crore">₹1–5 Crore</option>
                    <option value="₹5–10 Crore">₹5–10 Crore</option>
                    <option value="₹10–25 Crore">₹10–25 Crore</option>
                    <option value="₹25–50 Crore">₹25–50 Crore</option>
                    <option value="₹50–100 Crore">₹50–100 Crore</option>
                    <option value="₹100+ Crore">₹100+ Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label>What do you want to improve?</label>
                <div className="checkbox-grid">
                  <label className="check"><input type="checkbox" name="requirement" value="Material" /> Material Tracking</label>
                  <label className="check"><input type="checkbox" name="requirement" value="Manpower" /> Manpower Costs</label>
                  <label className="check"><input type="checkbox" name="requirement" value="Projects" /> Project Progress</label>
                  <label className="check"><input type="checkbox" name="requirement" value="AI" /> AI Insights</label>
                </div>
              </div>

              <div>
                <label>Biggest Challenge</label>
                <textarea name="challenge" placeholder="Material wastage, cost tracking, site visibility..."></textarea>
              </div>

              <button type="submit" className="primary-btn submit-btn">
                BOOK MY FREE DEMO →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="founder-section">
        <div className="container founder-grid">
          <div className="founder-copy">
            <div className="section-label">Built With Experience</div>
            <h2>Built by someone who knows construction on-ground.</h2>
            <p>
              I’m Devendra Kumar — a Civil Engineer with 5+ years of on-site construction experience, turned construction software specialist.
            </p>
            <p>
              Having worked directly on construction sites, I understand the real-world friction contractors face daily. That’s why we built this tool to be robust yet simple.
            </p>

            <div className="founder-highlights">
              <div className="founder-highlight">Civil Engineer</div>
              <div className="founder-highlight">5+ Years On-Site</div>
              <div className="founder-highlight">Construction Software</div>
            </div>

            <a
              href="https://wa.me/919609806922?text=Hi%20Devendra%2C%20I%20want%20to%20know%20more%20about%20the%20AI%20construction%20software."
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
              style={{ background: "#fff951" }}
            >
              CHAT WITH ME ON WHATSAPP →
            </a>
          </div>

          <div className="founder-image-wrap">
            <img src="./images/image98.jpg" alt="Devendra Kumar - Civil Engineer & Founder" />
            <div className="founder-badge">
              <strong>5+ Years</strong>
              <span>On-Site Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="container">
          <div className="section-label" style={{ color: "#fff" }}>Take Control</div>
          <h2>Stop Managing Your Construction Business Blind.</h2>
          <p className="section-description center" style={{ color: "#adb5bc", marginBottom: "24px" }}>
            Get crystal-clear visibility into your projects, materials, manpower and costs today.
          </p>
          <a href="#demo" className="primary-btn">
            BOOK A FREE DEMO →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
          <div>© 2026 AI Construction Software. All rights reserved.</div>
      </footer>

      {/* FIXED SOCIAL + CTA BAR */}
      <div className="mobile-sticky-bar">
        <a
          href="https://www.instagram.com/civilengineerdk/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-instagram"
          aria-label="Instagram"
        >
          <svg className="sticky-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <radialGradient id="stickyInstagramGradient" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <path fill="url(#stickyInstagramGradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>Instagram</span>
        </a>

        <a
          href="https://www.linkedin.com/in/civil-engineer-dk/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-linkedin"
          aria-label="LinkedIn"
        >
          <svg className="sticky-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span>LinkedIn</span>
        </a>

        <a
          href="https://wa.me/919609806922"
          target="_blank"
          rel="noopener noreferrer"
          className="m-whatsapp"
          aria-label="WhatsApp"
        >
          <svg className="sticky-whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.13 1.59 5.93L.07 24l6.36-1.67a11.85 11.85 0 0 0 5.62 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.16-3.42-8.4zm-8.47 18.24h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.85 9.85 0 0 1-1.51-5.19C2.17 6.45 6.6 2.02 12.06 2.02c2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.43 9.89-9.92 9.89zm5.42-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.25-.59-.5-.51-.68-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <a href="#demo" className="m-demo">
          Book Free Demo
        </a>
      </div>
    </>
  );
}