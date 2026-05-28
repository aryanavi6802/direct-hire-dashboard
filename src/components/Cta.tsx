export default function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-card">
          {/* Animated background orbs */}
          <div className="cta-orb cta-orb--1" aria-hidden="true" />
          <div className="cta-orb cta-orb--2" aria-hidden="true" />
          <div className="cta-orb cta-orb--3" aria-hidden="true" />
          
          {/* Grid pattern overlay */}
          <div className="cta-grid-pattern" aria-hidden="true" />
          
          <div className="cta-content">
            <div className="cta-badge">
              <span className="cta-badge-dot" />
              AI Agent Active — Ready to Apply
            </div>
            <h2 className="cta-heading">
              Stop applying.<br />Start getting hired.
            </h2>
            <p className="cta-body">
              Your AI agent is already searching. Join professionals who let JobNova do the work.
            </p>
            <div className="cta-actions">
              <a href="#" className="cta-btn cta-btn--primary">Let AI Apply for Me</a>
              <a href="#pricing" className="cta-btn cta-btn--ghost">View Plans</a>
            </div>
            <div className="cta-trust">
              <div className="cta-trust-avatars">
                <div className="cta-trust-av" style={{background: '#6366f1'}}>S</div>
                <div className="cta-trust-av" style={{background: '#ec4899'}}>E</div>
                <div className="cta-trust-av" style={{background: '#f97316'}}>M</div>
                <div className="cta-trust-av" style={{background: '#14b8a6'}}>A</div>
              </div>
              <span className="cta-trust-text">Joined by 2,400+ professionals this month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
