'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Info, LogOut, Sparkles } from 'lucide-react'

type Cycle = 'yearly' | 'quarterly' | 'monthly'

const FIG_LOGO_ICON = '/img/nav/logo_icon.png'
const FIG_LOGO_WORDMARK = '/img/nav/logo_wordmark.png'

// 订阅周期配置：perMonth 为折算后的月单价，total 为一次性支付总额
const CYCLE_OPTIONS: Record<Cycle, { label: string; perMonth: number; total: number; save?: string; popular?: boolean }> = {
  yearly: { label: 'Yearly', perMonth: 12, total: 144, save: 'Save 60%', popular: true },
  quarterly: { label: 'Quarterly', perMonth: 20, total: 60, save: 'Save 33%' },
  monthly: { label: 'Monthly', perMonth: 30, total: 30 },
}

// 人类可读的 billing 文案（单数/周期描述）
const CYCLE_BILLED_LABEL: Record<Cycle, string> = {
  yearly: 'Billed yearly',
  quarterly: 'Billed quarterly',
  monthly: 'Billed monthly',
}

const USER_EMAIL = 'shuang22.mei@gmail.com'
const USER_NAME = 'Shuang Mei'

// 未上传头像时，根据首字母稳定分配一组颜色，避免所有头像都为浅灰色
const AVATAR_TONES = [
  { bg: 'var(--color-main-tint-sm)', fg: 'var(--color-text-green-dark)', ring: 'var(--color-main-tint-md)' },
  { bg: 'var(--color-secondary-icon-bg)', fg: 'var(--color-secondary-text)', ring: 'rgba(99, 102, 241, 0.18)' },
  { bg: 'var(--color-amber-100)', fg: 'var(--color-warning-text)', ring: 'rgba(217, 119, 6, 0.18)' },
  { bg: 'var(--color-saved-pill-bg)', fg: 'var(--color-saved-pill)', ring: 'rgba(225, 29, 72, 0.16)' },
  { bg: 'var(--color-linkedin-bg)', fg: 'var(--color-linkedin)', ring: 'rgba(10, 102, 194, 0.16)' },
]

export default function UpgradePage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'Pro'
  const [cycle, setCycle] = useState<Cycle>('yearly')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const selected = useMemo(() => CYCLE_OPTIONS[cycle], [cycle])
  const userInitial = useMemo(() => USER_NAME.trim().charAt(0).toUpperCase() || 'U', [])
  const avatarTone = useMemo(() => {
    const idx = userInitial.charCodeAt(0) % AVATAR_TONES.length
    return AVATAR_TONES[idx]
  }, [userInitial])
  const avatarStyle = useMemo(
    () =>
      ({
        '--avatar-bg': avatarTone.bg,
        '--avatar-fg': avatarTone.fg,
        '--avatar-ring': avatarTone.ring,
      }) as CSSProperties,
    [avatarTone],
  )

  return (
    <div className="sub-upgrade-shell">
      <header className="sub-upgrade-topbar">
        <div className="sub-upgrade-brand">
          <img className="nav-brand-icon" src={FIG_LOGO_ICON} alt="JobNova icon" />
          <img className="nav-brand-wordmark" src={FIG_LOGO_WORDMARK} alt="JobNova" />
        </div>
        <div className="sub-upgrade-user">
          <button
            className="sub-upgrade-avatar jb-user-av"
            aria-label="User menu"
            onClick={() => setUserMenuOpen(v => !v)}
            style={avatarStyle}
          >
            {userInitial}
          </button>
          {userMenuOpen ? (
            <div className="sub-upgrade-user-menu">
              <div className="sub-upgrade-user-head">
                <span className="sub-upgrade-user-av" style={avatarStyle}>{userInitial}</span>
                <p className="sub-upgrade-user-email">{USER_EMAIL}</p>
              </div>
              <div className="sub-upgrade-user-divider" />
              <a href="/" className="sub-upgrade-user-action">
                <LogOut size={18} strokeWidth={2} />
                <span>Sign out</span>
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <main className="sub-upgrade-container">
        <div className="sub-upgrade-wrap">
          <div className="sub-upgrade-main">
            <header className="sub-upgrade-main-head">
              <h1 className="sub-upgrade-title">Choose your billing cycle</h1>
              <p className="sub-upgrade-subtitle">
                Pick the plan that fits you best. You can cancel or switch any time.
              </p>
            </header>

            <div className="sub-cycle-list">
              {(Object.keys(CYCLE_OPTIONS) as Cycle[]).map((key) => {
                const item = CYCLE_OPTIONS[key]
                const active = cycle === key
                return (
                  <button
                    key={key}
                    type="button"
                    className={`sub-cycle-row${active ? ' is-active' : ''}${item.popular ? ' has-badge' : ''}`}
                    onClick={() => setCycle(key)}
                    aria-pressed={active}
                  >
                    {item.popular ? (
                      <span className="sub-cycle-popular">
                        <Sparkles size={12} strokeWidth={2.2} />
                        Most popular
                      </span>
                    ) : null}
                    <div className="sub-cycle-left">
                      <span className={`sub-cycle-radio${active ? ' is-active' : ''}`} aria-hidden />
                      <p className="sub-cycle-label">{item.label}</p>
                      {item.save ? <span className="sub-cycle-save">{item.save}</span> : null}
                    </div>
                    <div className="sub-cycle-right">
                      <div className="sub-cycle-price">
                        <strong>${item.perMonth}</strong>
                        <span className="sub-cycle-price-unit">USD</span>
                        <span className="sub-cycle-price-period">/ month</span>
                      </div>
                      {item.total !== item.perMonth ? (
                        <p className="sub-cycle-note">
                          Billed as one payment of <strong>${item.total}</strong> USD
                        </p>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>

            <button className="sub-upgrade-next" type="button">
              <span>Next: Payment details</span>
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>

            <p className="sub-upgrade-legal">
              Renews automatically · Secured by Stripe · Cancel anytime in settings
            </p>
          </div>

          <aside className="sub-upgrade-side">
            <h2>Your order summary</h2>
            <div className="sub-upgrade-summary">
              <div className="sub-upgrade-plan-row">
                <p className="sub-upgrade-plan">JobNova {plan}</p>
                <span className="sub-upgrade-plan-tag">Upgrade</span>
              </div>
              <p className="sub-upgrade-member">
                1 member
                <Info size={13} strokeWidth={2} className="sub-upgrade-info" />
              </p>
              <p className="sub-upgrade-cycle">
                {CYCLE_BILLED_LABEL[cycle]}
                {selected.save ? (
                  <span className="sub-upgrade-cycle-save"> ({selected.save})</span>
                ) : null}
              </p>
            </div>
            <div className="sub-upgrade-total">
              <span>Total for today</span>
              <strong>${selected.total}<span className="sub-upgrade-total-unit"> USD</span></strong>
            </div>
            <p className="sub-upgrade-tax">Taxes calculated at next step if applicable.</p>
          </aside>
        </div>
      </main>
    </div>
  )
}
