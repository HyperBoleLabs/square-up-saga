import { useState } from 'react'
import type { FormEvent, PointerEvent as ReactPointerEvent } from 'react'
import './FighterSelectSection.css'
import { assetUrl } from '../utils/assetUrl'

type Fighter = {
  name: string
  gifSrc: string
  tag: string
  description: string
  stats: Array<{ label: string; value: number }>
}

const fighters: Fighter[] = [
  {
    name: 'Akino',
    gifSrc: assetUrl('gifs/akino.gif'),
    tag: 'Power Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 88 },
      { label: 'Defense', value: 76 },
      { label: 'Speed', value: 81 },
      { label: 'Special', value: 92 },
    ],
  },
  {
    name: 'Bruce',
    gifSrc: assetUrl('gifs/bruce.gif'),
    tag: 'Brawler Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 91 },
      { label: 'Defense', value: 84 },
      { label: 'Speed', value: 67 },
      { label: 'Special', value: 70 },
    ],
  },
  {
    name: 'Cage',
    gifSrc: assetUrl('gifs/cage.gif'),
    tag: 'Tank Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 72 },
      { label: 'Defense', value: 94 },
      { label: 'Speed', value: 58 },
      { label: 'Special', value: 63 },
    ],
  },
  {
    name: 'George',
    gifSrc: assetUrl('gifs/george.gif'),
    tag: 'Balanced Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 79 },
      { label: 'Defense', value: 74 },
      { label: 'Speed', value: 78 },
      { label: 'Special', value: 77 },
    ],
  },
  {
    name: 'Mike',
    gifSrc: assetUrl('gifs/mike.gif'),
    tag: 'Striker Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 86 },
      { label: 'Defense', value: 68 },
      { label: 'Speed', value: 89 },
      { label: 'Special', value: 71 },
    ],
  },
  {
    name: 'Mummy',
    gifSrc: assetUrl('gifs/mummy.gif'),
    tag: 'Curse Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 69 },
      { label: 'Defense', value: 82 },
      { label: 'Speed', value: 61 },
      { label: 'Special', value: 90 },
    ],
  },
  {
    name: 'Storm',
    gifSrc: assetUrl('gifs/storm.gif'),
    tag: 'Rush Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 83 },
      { label: 'Defense', value: 65 },
      { label: 'Speed', value: 95 },
      { label: 'Special', value: 80 },
    ],
  },
  {
    name: 'Violet',
    gifSrc: assetUrl('gifs/violet.gif'),
    tag: 'Shadow Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 77 },
      { label: 'Defense', value: 70 },
      { label: 'Speed', value: 87 },
      { label: 'Special', value: 93 },
    ],
  },
  {
    name: 'Agent Cipher',
    gifSrc: assetUrl('gifs/agent cipher.gif'),
    tag: 'Tech Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 74 },
      { label: 'Defense', value: 72 },
      { label: 'Speed', value: 85 },
      { label: 'Special', value: 96 },
    ],
  },
  {
    name: 'Labubu',
    gifSrc: assetUrl('gifs/labubu.gif'),
    tag: 'Wild Type',
    description:
      'Placeholder copy for this fighter. Swap in the final story, style, and ability notes later.',
    stats: [
      { label: 'Attack', value: 84 },
      { label: 'Defense', value: 79 },
      { label: 'Speed', value: 74 },
      { label: 'Special', value: 88 },
    ],
  },
]

const stageSrc = assetUrl('stage.png')
const defaultFighterIndex = fighters.findIndex((fighter) => fighter.name === 'Mike')
const swipeThreshold = 45
const klaviyoSiteId = import.meta.env.VITE_KLAVIYO_SITE_ID
const klaviyoListId = import.meta.env.VITE_KLAVIYO_LIST_ID
const subscribedEmailsStorageKey = 'square-up-saga.notifyMe.subscribedEmails'

function getStoredEmails() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(subscribedEmailsStorageKey)

    if (!rawValue) {
      return []
    }

    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

function storeEmail(email: string) {
  if (typeof window === 'undefined') {
    return
  }

  const storedEmails = getStoredEmails()

  if (storedEmails.includes(email)) {
    return
  }

  window.localStorage.setItem(
    subscribedEmailsStorageKey,
    JSON.stringify([...storedEmails, email]),
  )
}

function FighterSelectSection() {
  const [activeIndex, setActiveIndex] = useState(
    defaultFighterIndex >= 0 ? defaultFighterIndex : 0,
  )
  const activeFighter = fighters[activeIndex]
  const [pointerStartX, setPointerStartX] = useState<number | null>(null)
  const [pointerDragging, setPointerDragging] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [messageTone, setMessageTone] = useState<'error' | 'success' | 'info'>('info')

  const handlePrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? fighters.length - 1 : currentIndex - 1,
    )
  }

  const handleNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === fighters.length - 1 ? 0 : currentIndex + 1,
    )
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    setPointerStartX(event.clientX)
    setPointerDragging(true)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (!pointerDragging || pointerStartX === null) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const deltaX = event.clientX - pointerStartX

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX > 0) {
        handlePrevious()
      } else {
        handleNext()
      }
    }

    setPointerStartX(null)
    setPointerDragging(false)
  }

  const handlePointerCancel = () => {
    setPointerStartX(null)
    setPointerDragging(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setMessageTone('error')
      setFormMessage('Enter your email first.')
      return
    }

    if (getStoredEmails().includes(normalizedEmail)) {
      setMessageTone('info')
      setFormMessage('You have already subscribed with this email.')
      return
    }

    if (!klaviyoSiteId || !klaviyoListId) {
      setMessageTone('error')
      setFormMessage('We could not save your signup right now. Please try again.')
      return
    }

    setIsSubmitting(true)
    setFormMessage('')

    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(klaviyoSiteId)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            revision: '2026-07-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                profile: {
                  data: {
                    type: 'profile',
                    attributes: {
                      email: normalizedEmail,
                    },
                  },
                },
                custom_source: 'Hustle Landing Page',
              },
              relationships: {
                list: {
                  data: {
                    type: 'list',
                    id: klaviyoListId,
                  },
                },
              },
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      storeEmail(normalizedEmail)
      setEmail('')
      setMessageTone('success')
      setFormMessage('You are in.')
    } catch {
      setMessageTone('error')
      setFormMessage('We could not save your signup right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="fighter-select-section" aria-labelledby="fighter-select-title">
      <div className="fighter-select-section__inner">
        <div className="fighter-select-section__content">
          <div className="fighter-select-section__signup-card">
            <div className="fighter-select-section__signup-content">
              <h2 className="fighter-select-section__signup-title">Be The First To Fight!</h2>

              <form className="fighter-select-section__signup-form" onSubmit={handleSubmit}>
                <label className="fighter-select-section__signup-field">
                  <span className="fighter-select-section__sr-only">Email address</span>
                  <span className="fighter-select-section__signup-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 7H20V17H4V7Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 8L12 13L20 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    id="pre-register-email"
                    className="fighter-select-section__signup-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </label>
                <button
                  className="fighter-select-section__signup-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Notify Me'}
                </button>
              </form>

              {formMessage ? (
                <p
                  className={`fighter-select-section__signup-message fighter-select-section__signup-message--${messageTone}`}
                  role="status"
                  aria-live="polite"
                >
                  {formMessage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="fighter-select-section__selector">
            <button
              className="fighter-select-section__nav fighter-select-section__nav--left"
              type="button"
              onClick={handlePrevious}
              aria-label="Show previous fighter"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <div className="fighter-select-section__copy">
              <p className="fighter-select-section__eyebrow">Choose</p>
              <h2 className="fighter-select-section__title" id="fighter-select-title">
                Your Fighter
              </h2>

              <div className="fighter-select-section__card">
                <h3 className="fighter-select-section__name">{activeFighter.name}</h3>
                <span className="fighter-select-section__tag">{activeFighter.tag}</span>
                <p className="fighter-select-section__description">
                  {activeFighter.description}
                </p>

                <div className="fighter-select-section__stats" aria-label={`${activeFighter.name} stats`}>
                  {activeFighter.stats.map((stat) => (
                    <div className="fighter-select-section__stat" key={stat.label}>
                      <span className="fighter-select-section__stat-label">{stat.label}</span>
                      <div className="fighter-select-section__stat-bar">
                        <span
                          className="fighter-select-section__stat-fill"
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fighter-select-section__visual">
              <button
                className="fighter-select-section__nav fighter-select-section__nav--mobile fighter-select-section__nav--left"
                type="button"
                onClick={handlePrevious}
                aria-label="Show previous fighter"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <div
                className="fighter-select-section__stage-wrap"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onLostPointerCapture={handlePointerCancel}
              >
                <div className="fighter-select-section__glow" aria-hidden="true" />
                <img
                  className="fighter-select-section__fighter"
                  src={activeFighter.gifSrc}
                  alt={activeFighter.name}
                />
                <img
                  className="fighter-select-section__stage"
                  src={stageSrc}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <button
                className="fighter-select-section__nav fighter-select-section__nav--mobile fighter-select-section__nav--right"
                type="button"
                onClick={handleNext}
                aria-label="Show next fighter"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <button
              className="fighter-select-section__nav fighter-select-section__nav--right"
              type="button"
              onClick={handleNext}
              aria-label="Show next fighter"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FighterSelectSection
