import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const modules = [
  { icon: "⚙️", tone: "blue", title: "Machine Management", text: "Maintain a structured digital record of every machine, including specifications, location, condition and service history." },
  { icon: "🛠️", tone: "green", title: "Maintenance Management", text: "Plan preventive maintenance, record breakdowns and keep service activities visible to the right people." },
  { icon: "📋", tone: "orange", title: "Work Order Management", text: "Create, assign and track maintenance jobs from request to completion with clear ownership." },
  { icon: "📦", tone: "blue", title: "Spare Parts & Inventory", text: "Organise spare parts, monitor stock levels and make parts information easier to find when work is scheduled." },
  { icon: "👷", tone: "green", title: "Team Management", text: "Coordinate technicians, responsibilities and maintenance activities across your operation." },
  { icon: "📅", tone: "orange", title: "Maintenance Scheduling", text: "Build recurring maintenance plans and keep upcoming service tasks from getting overlooked." },
  { icon: "📊", tone: "blue", title: "Reports & Analytics", text: "Review maintenance activity, machine history and operational trends through organised reports." },
  { icon: "🔔", tone: "green", title: "Alerts & Notifications", text: "Keep teams informed about upcoming tasks, open work orders and important maintenance updates." },
];

const industries = [
  ["🚗", "Automotive", "Production equipment, assembly lines and workshop assets."],
  ["🧵", "Textile", "Spinning, weaving, processing and finishing machinery."],
  ["🥫", "Food Processing", "Processing, packaging, refrigeration and utility equipment."],
  ["💊", "Pharmaceutical", "Production assets and supporting facility equipment."],
  ["🏭", "Engineering", "Machine shops, fabrication and precision manufacturing."],
  ["⚡", "Other Manufacturing", "Adaptable workflows for a wide range of factory environments."],
];

const steps = [
  ["01", "Set up your factory", "Create your workspace and organise your factory locations, departments and teams."],
  ["02", "Register your machines", "Build a central machine register with the details your maintenance team needs."],
  ["03", "Plan and assign work", "Schedule preventive tasks, raise work orders and assign responsibility."],
  ["04", "Track and improve", "Record completed work, review machine history and use reports to guide decisions."],
];

const faqs = [
  ["What is a factory maintenance management system?", "It is a central platform for organising machine information, maintenance schedules, work orders, service history, spare parts and maintenance reporting."],
  ["Can this platform support different types of factories?", "The platform is designed around configurable machine and maintenance workflows. The exact setup should be adapted to each factory's processes, departments and equipment."],
  ["Can I manage preventive and breakdown maintenance?", "The platform's intended workflow covers planned preventive tasks as well as maintenance requests and breakdown-related work orders."],
  ["Can multiple employees use the system?", "A production deployment can support role-based access for administrators, maintenance managers and technicians, depending on the permissions implemented in your application."],
  ["How can I request a product demonstration?", "Use the Request a Demo option in the enquiry form. Share your company and requirements, and your team can follow up to arrange a walkthrough."],
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  industry: "",
  enquiryType: "Request a product demo",
  message: "",
};

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const goTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setFormStatus({ type: "", message: "" });
    setSubmitting(true);

    try {
      // Update this URL to match the contact endpoint implemented by your backend.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("We couldn't submit your enquiry. Please try again.");
      }

      setFormStatus({
        type: "success",
        message: "Thank you! Your enquiry has been submitted successfully.",
      });
      setForm(initialForm);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="factory-home">
      <header className="ff-header">
        <div className="ff-container ff-nav">
          <button className="ff-brand" onClick={() => goTo("home")} aria-label="Go to homepage">
            <span className="ff-brand-icon">✣</span>
            <span>FACTORY<span className="ff-brand-accent">FLOW</span></span>
          </button>

          <button
            className="ff-menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>

          <nav className={`ff-nav-links ${mobileMenuOpen ? "is-open" : ""}`}>
            <button onClick={() => goTo("home")}>Home</button>
            <button onClick={() => goTo("platform")}>Platform</button>
            <button onClick={() => goTo("how-it-works")}>How It Works</button>
            <button onClick={() => goTo("industries")}>Industries</button>
            <button onClick={() => goTo("faq")}>FAQ</button>
            <button onClick={() => goTo("contact")}>Contact</button>
          </nav>

          <div className="ff-nav-actions">
            <button className="ff-login" onClick={() => navigate("/login")}>Log in</button>
            <button className="ff-button ff-button-primary ff-nav-cta" onClick={() => goTo("contact")}>Request a Demo <span>↗</span></button>
          </div>
        </div>
      </header>

      <section className="ff-hero" id="home">
        <div className="ff-hero-overlay" />
        <div className="ff-container ff-hero-content">
          <div className="ff-hero-copy">
            <span className="ff-eyebrow"><i /> SMARTER INDUSTRIAL OPERATIONS</span>
            <h1>Take control of your factory. <span>Keep every machine moving.</span></h1>
            <p className="ff-hero-description">
              Bring machine records, maintenance schedules, work orders, spare parts and reporting together in one organised factory maintenance platform.
            </p>
            <div className="ff-hero-highlights">
              <div className="ff-highlight"><span className="ff-highlight-icon">✓</span><span>Centralised machine records</span></div>
              <div className="ff-highlight"><span className="ff-highlight-icon">✓</span><span>Structured maintenance workflows</span></div>
              <div className="ff-highlight"><span className="ff-highlight-icon">✓</span><span>Clear operational visibility</span></div>
            </div>
            <div className="ff-hero-actions">
              <button className="ff-button ff-button-primary ff-hero-cta" onClick={() => goTo("contact")}>Request a Demo <span>→</span></button>
              <button className="ff-button ff-button-video" onClick={() => goTo("platform")}>Explore the Platform <span>↓</span></button>
            </div>
            <p className="ff-hero-note"><span>●</span> One connected workspace for your maintenance team.</p>
          </div>

          <div className="ff-hero-visual" aria-label="Illustrative factory maintenance dashboard preview">
            <div className="ff-dashboard-glow" />
            <div className="ff-dashboard">
              <aside className="ff-dashboard-sidebar">
                <div className="ff-dashboard-brand"><span>✣</span> FACTORYFLOW</div>
                <div className="ff-sidebar-label">WORKSPACE</div>
                {["▦  Overview", "⚙  Machines", "▤  Work Orders", "◷  Schedules", "▧  Inventory", "▥  Reports"].map((item, index) => (
                  <div className={`ff-sidebar-item ${index === 0 ? "selected" : ""}`} key={item}>{item}</div>
                ))}
                <div className="ff-sidebar-bottom">● System workspace</div>
              </aside>
              <div className="ff-dashboard-main">
                <div className="ff-dashboard-topbar">
                  <div><strong className="ff-dashboard-greeting">Maintenance overview</strong><span className="ff-dashboard-subtitle">A snapshot of your factory operations</span></div>
                  <span className="ff-admin-pill">Workspace preview</span>
                </div>
                <div className="ff-stat-grid">
                  <div className="ff-stat-card"><span className="ff-stat-icon stat-blue">⚙</span><span className="ff-stat-label">Registered machines</span><strong>128</strong><small>Illustrative data</small></div>
                  <div className="ff-stat-card"><span className="ff-stat-icon stat-green">✓</span><span className="ff-stat-label">Operational</span><strong>112</strong><small>Illustrative data</small></div>
                  <div className="ff-stat-card"><span className="ff-stat-icon stat-orange">◷</span><span className="ff-stat-label">Open work orders</span><strong>09</strong><small>Illustrative data</small></div>
                  <div className="ff-stat-card"><span className="ff-stat-icon stat-red">!</span><span className="ff-stat-label">Attention needed</span><strong>07</strong><small>Illustrative data</small></div>
                </div>
                <div className="ff-dashboard-bottom">
                  <div className="ff-chart-card">
                    <div className="ff-card-heading"><div><strong>Maintenance activity</strong><span>Sample weekly overview</span></div><span className="ff-period">This week</span></div>
                    <div className="ff-chart">
                      <div className="ff-chart-labels"><span>12</span><span>8</span><span>4</span><span>0</span></div>
                      <div className="ff-chart-bars">{[42, 68, 54, 82, 61, 92, 73].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div>
                    </div>
                    <div className="ff-chart-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                  </div>
                  <div className="ff-activity-card">
                    <strong className="ff-activity-title">Recent activity</strong>
                    <div className="ff-activity"><span className="ff-activity-icon green">✓</span><div><strong>Work order completed</strong><span>Sample activity · 10:25 AM</span></div></div>
                    <div className="ff-activity"><span className="ff-activity-icon blue">⚙</span><div><strong>Machine record updated</strong><span>Sample activity · 09:40 AM</span></div></div>
                    <div className="ff-activity"><span className="ff-activity-icon orange">◷</span><div><strong>Service task scheduled</strong><span>Sample activity · Yesterday</span></div></div>
                  </div>
                </div>
                <div className="ff-dashboard-disclaimer">Illustrative interface · Not live factory data</div>
              </div>
            </div>
            <div className="ff-floating-status"><span className="ff-floating-check">✓</span><div><strong>Maintenance, organised.</strong><span>One place for your team's workflow</span></div></div>
          </div>
        </div>
        <div className="ff-hero-bottom-line" />
      </section>

      <section className="ff-trust-strip">
        <div className="ff-container ff-trust-inner">
          <span>BUILT FOR THE REALITIES OF</span>
          <strong>PRODUCTION</strong><i /><strong>MAINTENANCE</strong><i /><strong>ENGINEERING</strong><i /><strong>OPERATIONS</strong>
        </div>
      </section>

      <section className="ff-features-section" id="platform">
        <div className="ff-container">
          <div className="ff-section-heading">
            <span className="ff-section-eyebrow">ONE CONNECTED PLATFORM</span>
            <h2>Everything your maintenance team needs. <span>In one place.</span></h2>
            <p>Replace scattered records and disconnected processes with a structured workspace for managing the maintenance lifecycle.</p>
          </div>
          <div className="ff-feature-grid">
            {modules.map((module) => (
              <article className="ff-feature-card" key={module.title}>
                <div className={`ff-feature-icon ${module.tone}`}>{module.icon}</div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <button className="ff-text-link" onClick={() => goTo("contact")}>Discuss this module <span>→</span></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ff-problem-section">
        <div className="ff-container ff-problem-grid">
          <div className="ff-problem-copy">
            <span className="ff-section-eyebrow">FROM REACTIVE TO ORGANISED</span>
            <h2>Maintenance shouldn't depend on scattered spreadsheets and memory.</h2>
            <p>When machine information, service notes and task updates live in different places, it becomes harder to coordinate work and understand what needs attention.</p>
            <button className="ff-button ff-button-primary" onClick={() => goTo("contact")}>Talk to our team <span>→</span></button>
          </div>
          <div className="ff-compare-card">
            <div className="ff-compare-column old">
              <span className="ff-compare-label">WITHOUT A CENTRAL SYSTEM</span>
              <h3>Disconnected processes</h3>
              {["Machine details across multiple files", "Maintenance dates tracked manually", "Unclear work order ownership", "Difficult-to-find service history"].map((item) => <p key={item}><b>−</b>{item}</p>)}
            </div>
            <div className="ff-compare-divider">→</div>
            <div className="ff-compare-column new">
              <span className="ff-compare-label">WITH A CONNECTED WORKSPACE</span>
              <h3>Structured operations</h3>
              {["Centralised machine information", "Organised maintenance schedules", "Visible work order progress", "Accessible maintenance records"].map((item) => <p key={item}><b>✓</b>{item}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ff-workflow-section" id="how-it-works">
        <div className="ff-container">
          <div className="ff-section-heading">
            <span className="ff-section-eyebrow">A CLEARER WAY TO WORK</span>
            <h2>From machine registration to maintenance insights.</h2>
            <p>Bring the key steps of your maintenance process into a consistent workflow.</p>
          </div>
          <div className="ff-workflow-grid">
            {steps.map(([number, title, text], index) => (
              <article className="ff-workflow-card" key={number}>
                <div className="ff-workflow-number">{number}</div>
                {index !== steps.length - 1 && <div className="ff-workflow-connector" />}
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ff-industries-section" id="industries">
        <div className="ff-container">
          <div className="ff-section-heading">
            <span className="ff-section-eyebrow">DESIGNED FOR DIVERSE OPERATIONS</span>
            <h2>One platform. Different factory environments.</h2>
            <p>Every industry has its own equipment and processes. Organise your maintenance workflows around the way your factory operates.</p>
          </div>
          <div className="ff-industry-grid">
            {industries.map(([icon, title, text]) => (
              <article className="ff-industry-card" key={title}>
                <span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ff-benefits-section">
        <div className="ff-container ff-benefits-layout">
          <div className="ff-benefits-copy">
            <span className="ff-section-eyebrow">WHY A CONNECTED SYSTEM</span>
            <h2>Give your team the clarity to stay ahead of maintenance.</h2>
            <p>A shared source of information helps maintenance teams coordinate daily work, keep records consistent and make better-informed operational decisions.</p>
          </div>
          <div className="ff-benefit-list-grid">
            <div className="ff-benefit-item"><span>01</span><div><h3>Better machine visibility</h3><p>Keep machine information and service history organised.</p></div></div>
            <div className="ff-benefit-item"><span>02</span><div><h3>More consistent planning</h3><p>Bring recurring tasks and maintenance schedules together.</p></div></div>
            <div className="ff-benefit-item"><span>03</span><div><h3>Clear task ownership</h3><p>Make work order assignments and progress easier to follow.</p></div></div>
            <div className="ff-benefit-item"><span>04</span><div><h3>Useful operational records</h3><p>Build a clearer history to support reviews and decisions.</p></div></div>
          </div>
        </div>
      </section>

      <section className="ff-cta-section">
        <div className="ff-cta-decoration" /><div className="ff-cta-decoration ff-cta-decoration-two" />
        <div className="ff-container ff-cta-content">
          <div><span className="ff-cta-eyebrow">READY TO GET ORGANISED?</span><h2>Make maintenance a connected part of your operation.</h2><p>See how a central factory maintenance workspace could fit your machines, people and processes.</p></div>
          <div className="ff-cta-actions"><button className="ff-button ff-button-primary ff-cta-button" onClick={() => goTo("contact")}>Request a Demo <span>→</span></button><button className="ff-cta-login" onClick={() => navigate("/register")}>Already have an account? <span>Create account</span></button></div>
        </div>
      </section>

      <section className="ff-faq-section" id="faq">
        <div className="ff-container ff-faq-layout">
          <div className="ff-faq-intro"><span className="ff-section-eyebrow">NEED TO KNOW MORE?</span><h2>Frequently asked questions.</h2><p>Some quick answers about bringing factory maintenance into one workspace.</p><button className="ff-text-link" onClick={() => goTo("contact")}>Still have a question? Contact us <span>→</span></button></div>
          <div className="ff-faq-list">
            {faqs.map(([question, answer], index) => (
              <article className={`ff-faq-item ${activeFaq === index ? "is-active" : ""}`} key={question}>
                <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{question}</span><b>{activeFaq === index ? "−" : "+"}</b></button>
                {activeFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ff-contact-section" id="contact">
        <div className="ff-container ff-contact-layout">
          <div className="ff-contact-copy">
            <span className="ff-section-eyebrow">LET'S TALK FACTORY OPERATIONS</span>
            <h2>Tell us what your factory needs.</h2>
            <p>Request a product demonstration or send a general enquiry. Share a few details and your team can follow up with the right conversation.</p>
            <div className="ff-contact-promise"><span>✓</span><div><strong>Product demonstration</strong><p>Explore the platform and its maintenance workflows.</p></div></div>
            <div className="ff-contact-promise"><span>✓</span><div><strong>General enquiries</strong><p>Ask about features, implementation or your requirements.</p></div></div>
            <div className="ff-contact-note">Please do not include confidential production data in this form.</div>
          </div>

          <form className="ff-contact-form" onSubmit={submitEnquiry}>
            <div className="ff-form-heading"><span>GET IN TOUCH</span><h3>How can we help?</h3><p>Fields marked with * are required.</p></div>
            <div className="ff-form-grid">
              <label>Full name *<input name="name" value={form.name} onChange={updateForm} placeholder="Your full name" autoComplete="name" required /></label>
              <label>Work email *<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="name@company.com" autoComplete="email" required /></label>
              <label>Company name *<input name="company" value={form.company} onChange={updateForm} placeholder="Your company" autoComplete="organization" required /></label>
              <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={updateForm} placeholder="+91 XXXXX XXXXX" autoComplete="tel" /></label>
              <label>Industry<select name="industry" value={form.industry} onChange={updateForm}><option value="">Select your industry</option>{industries.map(([, title]) => <option key={title} value={title}>{title}</option>)}</select></label>
              <label>Enquiry type *<select name="enquiryType" value={form.enquiryType} onChange={updateForm} required><option>Request a product demo</option><option>General contact enquiry</option><option>Product information</option><option>Pricing enquiry</option><option>Partnership enquiry</option><option>Technical question</option></select></label>
              <label className="ff-form-full">Tell us about your requirements<textarea name="message" value={form.message} onChange={updateForm} rows="4" placeholder="What would you like to manage or improve in your factory?" /></label>
            </div>
            {formStatus.message && <div className={`ff-form-status ${formStatus.type}`} role="status">{formStatus.message}</div>}
            <button className="ff-button ff-button-primary ff-submit-button" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Send enquiry"} <span>→</span></button>
            <p className="ff-form-privacy">By submitting, you agree that your details may be used to respond to this enquiry.</p>
          </form>
        </div>
      </section>

      <footer className="ff-footer">
        <div className="ff-container ff-footer-main">
          <div className="ff-footer-about"><div className="ff-footer-brand"><span>✣</span> FACTORYFLOW</div><p>A connected workspace for machine information, maintenance planning and factory operations.</p></div>
          <div className="ff-footer-links"><strong>Explore</strong><button onClick={() => goTo("platform")}>Platform</button><button onClick={() => goTo("how-it-works")}>How it works</button><button onClick={() => goTo("industries")}>Industries</button></div>
          <div className="ff-footer-links"><strong>Support</strong><button onClick={() => goTo("faq")}>FAQs</button><button onClick={() => goTo("contact")}>Contact us</button><button onClick={() => navigate("/login")}>Log in</button></div>
          <div className="ff-footer-links"><strong>Get started</strong><button onClick={() => goTo("contact")}>Request a demo</button><button onClick={() => navigate("/register")}>Create account</button></div>
        </div>
        <div className="ff-container ff-footer-bottom"><span>© {new Date().getFullYear()} FactoryFlow. All rights reserved.</span><span>Built for smarter factory maintenance.</span></div>
      </footer>
    </main>
  );
};

export default Home;
