import { useEffect, useRef, useState } from 'react'
import HeroHeader from './HeroHeader'
import './HeroSection.css'
import { assetUrl } from '../utils/assetUrl'

const launchDate = new Date('2026-08-11T00:00:00')

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

function HeroSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [countdownItems, setCountdownItems] = useState(() =>
    getTimeRemaining(launchDate),
  )
  const [showScrollButton, setShowScrollButton] = useState(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const playAudio = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.currentTime = 0
    void audio.play()
  }

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

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const handlePlay = () => {
      setIsAudioPlaying(true)
    }

    const handleStop = () => {
      setIsAudioPlaying(false)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handleStop)
    audio.addEventListener('ended', handleStop)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handleStop)
      audio.removeEventListener('ended', handleStop)
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
    <section className="hero-section">
      <audio ref={audioRef} preload="auto" src={assetUrl('voice.mp3')} />

      <div className="hero-section__shell">
        <HeroHeader onPreRegisterClick={focusPreRegisterField} />

        <div className="hero-section__content">
          <p className="hero-section__kicker" data-text="Welcome to">
            <span>Welcome to</span>
          </p>
          <h1 className="hero-section__title" data-text="The Hustle">
            <span>The Hustle</span>
          </h1>
          <p className="hero-section__subtitle">
            Play as Paul Heyman.
            <br />
            Doing what he does best.
          </p>

          <div className="hero-section__countdown" aria-label="Launch countdown">
            {countdownItems.map((item) => (
              <div className="hero-section__time-card" key={item.label}>
                <span className="hero-section__time-value">{item.value}</span>
                <span className="hero-section__time-label">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="hero-section__launch-note">Launching August 11</p>

          <button
            type="button"
            className={`hero-section__audio-card${isAudioPlaying ? ' hero-section__audio-card--playing' : ''}`}
            onClick={playAudio}
            aria-pressed={isAudioPlaying}
          >
            <span className="hero-section__audio-icon-wrap">
              <span className="hero-section__audio-wave hero-section__audio-wave--outer" aria-hidden="true" />
              <span className="hero-section__audio-wave hero-section__audio-wave--inner" aria-hidden="true" />
              <img className="hero-section__icon-svg" src={assetUrl('microphone.png')} alt="" />
            </span>

            <span className="hero-section__audio-copy">
              <span className="hero-section__audio-title">
                Paul knows your name
              </span>
              <span className="hero-section__audio-text">
                Sign up to get trash-talked by name by Paul at launch.
              </span>
            </span>
          </button>
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
