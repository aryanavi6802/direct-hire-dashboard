'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
)

type Feature = {
  id: string
  label: string
  title: string
  body: string
  duration: number   // ms
  lottie?: string
}

const FEATURES: Feature[] = [
  {
    id: 'notification',
    label: 'Instant Job Notification',
    title: 'Be first before the listing goes public',
    body: 'Our neural network scans 50,000+ sources per second. Precision-matched alerts arrive before the job hits public boards — giving you a critical head start every time.',
    duration: 8620,
    lottie: '/animations/Instant Job Notification.json',
  },
  {
    id: 'agent',
    label: 'AI Agent Support',
    title: 'A career advocate that never clocks out',
    body: 'A persistent AI agent that learns your goals, handles recruiter outreach, and manages your entire pipeline — all while you focus on life.',
    duration: 5000,
  },
  {
    id: 'resume',
    label: 'AI Resume Customizer',
    title: '100% ATS-optimized, 0% effort',
    body: 'Instantly re-tune your resume for every role. Tailored keywords and perfect formatting — automatically adapted to pass every ATS filter.',
    duration: 5000,
  },
  {
    id: 'auto-apply',
    label: 'AI Auto Apply',
    title: '300+ jobs applied while you live your life',
    body: 'Set your criteria once. Our agent automatically applies to matching positions around the clock — no forms, no repetition, no burnout.',
    duration: 5000,
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Start animations when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false

    const updateByScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight || 1
      const lastIndex = FEATURES.length - 1

      if (rect.top < viewportH && rect.bottom > 0) {
        setStarted(true)
      }

      // 进入区段初期优先稳定展示第一条，避免因滚动位置抖动被过早切走
      if (rect.top >= viewportH * 0.12) {
        setActive(prev => (prev === 0 ? prev : 0))
        return
      }

      // 离开区段前固定最后一条，避免尾段回跳
      if (rect.bottom <= viewportH * 0.42) {
        setActive(prev => (prev === lastIndex ? prev : lastIndex))
        return
      }

      const start = viewportH * 0.12
      const end = -(rect.height - viewportH * 0.42)
      const progress = (start - rect.top) / (start - end)
      const clamped = Math.min(1, Math.max(0, progress))
      const nextActive = Math.min(lastIndex, Math.floor(clamped * FEATURES.length))

      setActive(prev => (prev === nextActive ? prev : nextActive))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateByScroll()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleProgressEnd = () => {
    setActive(prev => (prev + 1) % FEATURES.length)
  }

  return (
    <section ref={sectionRef} className="features" id="features">
      <div className="features-pin">
        {/* Section header */}
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-label">✦ How It Works</p>
            <h2 className="section-title">Discover. Optimize. Apply.</h2>
            <p className="section-body">
              Your AI agent handles every step — you just show up to interviews.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container features-body">

          {/* Left: feature list */}
          <div className="features-list">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className={`features-item${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="features-item-content">
                  <p className="features-item-label">{f.label}</p>
                  <h3 className="features-item-title">{f.title}</h3>
                  <div className="features-item-desc">
                    <div className="features-item-desc-inner">
                      <p>{f.body}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar — mounts fresh each time active changes */}
                <div className="features-progress">
                  {started && i === active && (
                    <div
                      key={`pb-${active}`}
                      className="features-progress-bar"
                      style={{ animationDuration: `${f.duration}ms` }}
                      onAnimationEnd={handleProgressEnd}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: preview */}
          <div className="features-preview-wrap">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className={`features-preview${i === active ? ' is-active' : ''}`}
              >
                {f.lottie ? (
                  <LottiePlayer
                    autoplay
                    loop
                    src={f.lottie}
                    className="features-lottie"
                  />
                ) : f.id === 'agent' ? (
                  <div className="features-preview-card features-preview-card--agent">
                    <div className="fp-agent">
                      <div className="fp-agent-header">
                        <div className="fp-agent-avatar">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 8V4H8"/><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M2 12h20"/><path d="M12 2v20"/></svg>
                        </div>
                        <div className="fp-agent-meta">
                          <span className="fp-agent-name">Nova AI Agent</span>
                          <span className="fp-agent-status"><span className="fp-agent-dot" />Always active</span>
                        </div>
                      </div>
                      <div className="fp-agent-chat">
                        <div className="fp-agent-bubble fp-agent-bubble--bot">
                          <p>Found 12 new positions matching your profile. 3 are from companies you follow.</p>
                        </div>
                        <div className="fp-agent-bubble fp-agent-bubble--bot fp-agent-bubble--highlight">
                          <p>🎯 High match: <strong>Senior Frontend Engineer</strong> at Linear — 92% fit</p>
                        </div>
                        <div className="fp-agent-bubble fp-agent-bubble--user">
                          <p>Apply to the top 5 matches</p>
                        </div>
                        <div className="fp-agent-bubble fp-agent-bubble--bot fp-agent-typing">
                          <span /><span /><span />
                        </div>
                      </div>
                      <div className="fp-agent-tasks">
                        <div className="fp-agent-task fp-agent-task--done"><span className="fp-agent-task-check">✓</span>Scanned 2,400 listings</div>
                        <div className="fp-agent-task fp-agent-task--done"><span className="fp-agent-task-check">✓</span>Filtered by preferences</div>
                        <div className="fp-agent-task fp-agent-task--active"><span className="fp-agent-task-spinner" />Reaching out to recruiters…</div>
                      </div>
                    </div>
                  </div>
                ) : f.id === 'resume' ? (
                  <div className="features-preview-card features-preview-card--resume">
                    <div className="fp-resume">
                      <div className="fp-resume-doc">
                        <div className="fp-resume-header-bar">
                          <div className="fp-resume-name-block">
                            <div className="fp-resume-avatar-sm" />
                            <div>
                              <div className="fp-resume-line fp-resume-line--name" />
                              <div className="fp-resume-line fp-resume-line--role" />
                            </div>
                          </div>
                          <div className="fp-resume-ats-badge">ATS Score: 96%</div>
                        </div>
                        <div className="fp-resume-section">
                          <div className="fp-resume-section-title">Experience</div>
                          <div className="fp-resume-line fp-resume-line--long" />
                          <div className="fp-resume-line fp-resume-line--med" />
                          <div className="fp-resume-line fp-resume-line--long" />
                        </div>
                        <div className="fp-resume-section">
                          <div className="fp-resume-section-title">Skills</div>
                          <div className="fp-resume-skills">
                            <span className="fp-resume-skill fp-resume-skill--match">React</span>
                            <span className="fp-resume-skill fp-resume-skill--match">TypeScript</span>
                            <span className="fp-resume-skill fp-resume-skill--match">Node.js</span>
                            <span className="fp-resume-skill fp-resume-skill--new">+GraphQL</span>
                            <span className="fp-resume-skill fp-resume-skill--new">+AWS</span>
                          </div>
                        </div>
                        <div className="fp-resume-keywords">
                          <div className="fp-resume-keyword-title">✦ AI-Added Keywords</div>
                          <div className="fp-resume-keyword-list">
                            <span>CI/CD</span><span>Agile</span><span>REST APIs</span><span>Microservices</span>
                          </div>
                        </div>
                      </div>
                      <div className="fp-resume-side">
                        <div className="fp-resume-score-ring">
                          <svg viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(176,248,9,0.15)" strokeWidth="6" />
                            <circle cx="40" cy="40" r="34" fill="none" stroke="#b0f809" strokeWidth="6" strokeDasharray="214" strokeDashoffset="8.5" strokeLinecap="round" className="fp-resume-ring-fill" />
                          </svg>
                          <span className="fp-resume-score-text">96%</span>
                        </div>
                        <span className="fp-resume-score-label">ATS Optimized</span>
                        <div className="fp-resume-improvements">
                          <div className="fp-resume-imp"><span className="fp-resume-imp-icon">↑</span>Added 5 keywords</div>
                          <div className="fp-resume-imp"><span className="fp-resume-imp-icon">↑</span>Optimized format</div>
                          <div className="fp-resume-imp"><span className="fp-resume-imp-icon">↑</span>Tailored to role</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="features-preview-card features-preview-card--auto-apply">
                    <div className="fp-autoapply">
                      <div className="fp-aa-header">
                        <div className="fp-aa-header-left">
                          <span className="fp-aa-live-dot" />
                          <span className="fp-aa-title">Auto Apply Active</span>
                        </div>
                        <span className="fp-aa-counter">312 applied</span>
                      </div>
                      <div className="fp-aa-stream">
                        <div className="fp-aa-item fp-aa-item--done" style={{animationDelay: '0s'}}>
                          <div className="fp-aa-item-icon fp-aa-item-icon--done">✓</div>
                          <div className="fp-aa-item-info">
                            <span className="fp-aa-item-role">Frontend Engineer</span>
                            <span className="fp-aa-item-company">Vercel · Just now</span>
                          </div>
                          <span className="fp-aa-item-match">94%</span>
                        </div>
                        <div className="fp-aa-item fp-aa-item--done" style={{animationDelay: '0.1s'}}>
                          <div className="fp-aa-item-icon fp-aa-item-icon--done">✓</div>
                          <div className="fp-aa-item-info">
                            <span className="fp-aa-item-role">Product Designer</span>
                            <span className="fp-aa-item-company">Figma · 3m ago</span>
                          </div>
                          <span className="fp-aa-item-match">91%</span>
                        </div>
                        <div className="fp-aa-item fp-aa-item--active" style={{animationDelay: '0.2s'}}>
                          <div className="fp-aa-item-icon fp-aa-item-icon--active"><span className="fp-aa-spinner" /></div>
                          <div className="fp-aa-item-info">
                            <span className="fp-aa-item-role">React Developer</span>
                            <span className="fp-aa-item-company">Stripe · Applying…</span>
                          </div>
                          <span className="fp-aa-item-match">88%</span>
                        </div>
                        <div className="fp-aa-item fp-aa-item--queued" style={{animationDelay: '0.3s'}}>
                          <div className="fp-aa-item-icon fp-aa-item-icon--queued">⏳</div>
                          <div className="fp-aa-item-info">
                            <span className="fp-aa-item-role">UI Engineer</span>
                            <span className="fp-aa-item-company">Notion · Queued</span>
                          </div>
                          <span className="fp-aa-item-match">85%</span>
                        </div>
                        <div className="fp-aa-item fp-aa-item--queued" style={{animationDelay: '0.4s'}}>
                          <div className="fp-aa-item-icon fp-aa-item-icon--queued">⏳</div>
                          <div className="fp-aa-item-info">
                            <span className="fp-aa-item-role">Full Stack Dev</span>
                            <span className="fp-aa-item-company">Railway · Queued</span>
                          </div>
                          <span className="fp-aa-item-match">82%</span>
                        </div>
                      </div>
                      <div className="fp-aa-stats">
                        <div className="fp-aa-stat"><strong>12</strong><span>Today</span></div>
                        <div className="fp-aa-stat"><strong>312</strong><span>Total</span></div>
                        <div className="fp-aa-stat"><strong>87%</strong><span>Avg Match</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
