import { useEffect, useState, type CSSProperties } from 'react'
import HeroHeader from './HeroHeader'
import './HeroSection.css'
import { assetUrl } from '../utils/assetUrl'

const launchDate = new Date('2026-09-14T00:00:00')

function getTimeRemaining(targetDate: Date) {
  const now = new Date()
  const difference = Math.max(targetDate.getTime() - now.getTime(), 0)

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return [
    { value: String(days).padStart(2, '0'), label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(minutes).padStart(2, '0'), label: 'Minutes' },
    { value: String(seconds).padStart(2, '0'), label: 'Seconds' },
  ]
}

type HeroSectionProps = {
  showMike: boolean
}

function HeroSection({ showMike }: HeroSectionProps) {
  const [countdownItems, setCountdownItems] = useState(() =>
    getTimeRemaining(launchDate),
  )
  const [showScrollButton, setShowScrollButton] = useState(true)
  const heroStyle = {
    '--hero-foreground-desktop-image': `url("${assetUrl(
      showMike
        ? 'hero-foreground-mike-desktop.png'
        : 'hero-foreground-no-mike-desktop.png',
    )}")`,
    '--hero-foreground-tablet-image': `url("${assetUrl(
      showMike
        ? 'hero-foreground-mike-tablet.png'
        : 'hero-foreground-no-mike-tablet.png',
    )}")`,
    '--hero-foreground-mobile-image': `url("${assetUrl(
      showMike
        ? 'hero-foreground-mike-mobile.png'
        : 'hero-foreground-no-mike-mobile.png',
    )}")`,
  } as CSSProperties

  useEffect(() => {
    const updateCountdown = () => {
      setCountdownItems(getTimeRemaining(launchDate))
    }

    updateCountdown()

    const intervalId = window.setInterval(updateCountdown, 1_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY < 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const focusPreRegisterField = () => {
    document.getElementById('launch-signup')?.scrollIntoView({ behavior: 'smooth' })

    window.setTimeout(() => {
      const input = document.getElementById(
        'pre-register-email',
      ) as HTMLInputElement | null

      input?.focus()
    }, 350)
  }

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-section__background" aria-hidden="true">
        <div className="hero-section__sky" />
        <div className="hero-section__clouds">
          <div className="hero-section__cloud-track">
            <span className="hero-section__cloud-panel" />
            <span className="hero-section__cloud-panel" />
          </div>
        </div>
        <div className="hero-section__foreground" />
        <div className="hero-section__overlay" />
      </div>

      <div className="hero-section__shell">
        <HeroHeader onPreRegisterClick={focusPreRegisterField} />

        <div className="hero-section__content">
          <p className="hero-section__kicker" data-text="Welcome to">
            <span>Welcome to</span>
          </p>
          <h1 className="hero-section__title" data-text="The Square Up Saga">
            <span>The Square Up Saga</span>
          </h1>
          <p className="hero-section__subtitle">
            Jump into fast-paced battles, unlock powerful fighters, and dominate
            the arena in Square Up Saga.
          </p>

          <p className="hero-section__launch-note">Launching September 14</p>

          <div className="hero-section__countdown" aria-label="Launch countdown">
            {countdownItems.map((item) => (
              <div className="hero-section__time-card" key={item.label}>
                <span className="hero-section__time-value">{item.value}</span>
                <span className="hero-section__time-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showScrollButton ? (
        <button
          className="hero-section__scroll-button"
          type="button"
          onClick={focusPreRegisterField}
          aria-label="Scroll to signup"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M6 13L12 19L18 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </section>
  )
}

export default HeroSection
