'use client'

import { useEffect, useState } from 'react'

const NAV_LOGO_ICON = '/img/nav/logo_icon.png'
const NAV_LOGO_WORDMARK = '/img/nav/logo_wordmark.png'

const GLASS_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.78)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderBottomColor: 'rgba(15, 23, 42, 0.08)',  // only color transitions, width stays 1px
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',  // same structure as base, only alpha changes
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize theme from system preference or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <nav
      className="nav"
      id="nav"
      style={scrolled ? GLASS_STYLE : undefined}
    >
      <a href="#" className="nav-brand">
        <img className="nav-brand-icon" src={NAV_LOGO_ICON} alt="JobNova icon" />
        <img className="nav-brand-wordmark" src={NAV_LOGO_WORDMARK} alt="JobNova" />
      </a>

      <div className="nav-tabs">
        <a href="#features" className="nav-link">Feature</a>
        <a href="#pricing"  className="nav-link">Pricing</a>
        <a href="#faq"      className="nav-link">FAQs</a>
        <div className="nav-affiliate">
          <a href="#" className="nav-link">Affiliate</a>
          <span className="nav-badge">30%</span>
        </div>
      </div>

      <div className="nav-actions">
        {/* Modern Interactive Theme Switcher */}
        <button 
          onClick={toggleTheme} 
          className="btn btn-ghost" 
          style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '8px',
            border: '1px solid var(--color-border-default)',
            background: 'var(--color-surface)'
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            // Moon Icon (Switch to Dark)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun Icon (Switch to Light)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.07" x2="5.64" y2="17.64" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        <a href="#" className="btn btn-dark">Find Talents</a>
        <div className="nav-divider" />
        <a href="/jobs" className="btn btn-ghost">Login</a>
        <a href="#" className="btn btn-primary">
          Sign Up
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <button className="nav-hamburger" aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
