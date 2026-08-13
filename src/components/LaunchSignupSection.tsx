import { useState } from 'react'
import type { FormEvent } from 'react'
import './LaunchSignupSection.css'

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

function LaunchSignupSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [messageTone, setMessageTone] = useState<'error' | 'success' | 'info'>('info')

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
    <section className="launch-signup-section" id="launch-signup">
      <div className="launch-signup-section__inner">
        <div className="launch-signup-section__card">
          <div className="launch-signup-section__header">
            <h2 className="launch-signup-section__title">Be The First To Fight!</h2>
            <p className="launch-signup-section__copy">
              Pre-register now and get exclusive rewards at launch.
            </p>
          </div>

          <form className="launch-signup-section__form" onSubmit={handleSubmit}>
            <label className="launch-signup-section__field">
              <span className="launch-signup-section__sr-only">Email address</span>
              <span className="launch-signup-section__field-icon">
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
                className="launch-signup-section__input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isSubmitting}
              />
            </label>
            <button className="launch-signup-section__notify" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Pre-Register Now'}
            </button>
          </form>

          {formMessage ? (
            <p
              className={`launch-signup-section__message launch-signup-section__message--${messageTone}`}
              role="status"
              aria-live="polite"
            >
              {formMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default LaunchSignupSection
