'use client'

import { useState } from 'react'

const NOVA_CHIPS = ['Explore Company Questions', 'Analyze My Resume', 'Connect with Employees']

export default function FloatingNovaChat() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  return (
    <div className="nova-float">
      {open && (
        <div className="nova-float-panel">
          <div className="nova-float-hd">
            <div className="nova-float-av">
              <img src="https://www.figma.com/api/mcp/asset/ba1b2d6c-a0cd-4a03-a34c-87e122c90c3b" alt="" width={20} height={20} />
            </div>
            <div>
              <p className="nova-float-name">Nova</p>
              <p className="nova-float-sub">AI Career Assistant</p>
            </div>
            <span className="nova-float-online" />
            <button className="nova-float-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="nova-float-body">
            <div className="nova-float-bubble">
              <p><strong>Hi! 👋 I&apos;m Nova.</strong></p>
              <p>Your personal AI career assistant. Let&apos;s get started!</p>
            </div>
            <div className="nova-float-chips">
              {NOVA_CHIPS.map(c => (
                <button key={c} className="nova-float-chip">{c}</button>
              ))}
            </div>
          </div>
          <div className="nova-float-input-row">
            <input
              className="nova-float-input"
              placeholder="Ask me anything…"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') setMsg('') }}
            />
            <button className={`nova-float-send${msg ? ' is-ready' : ''}`} aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      <button className={`nova-float-btn${open ? ' is-open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Open Nova AI chat">
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <img src="https://www.figma.com/api/mcp/asset/ba1b2d6c-a0cd-4a03-a34c-87e122c90c3b" alt="Nova" width={24} height={24} />
        )}
        {!open && <span className="nova-float-pip" />}
      </button>
    </div>
  )
}
