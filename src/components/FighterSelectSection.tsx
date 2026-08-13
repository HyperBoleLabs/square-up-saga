import { useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
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

function FighterSelectSection() {
  const [activeIndex, setActiveIndex] = useState(
    defaultFighterIndex >= 0 ? defaultFighterIndex : 0,
  )
  const activeFighter = fighters[activeIndex]
  const [pointerStartX, setPointerStartX] = useState<number | null>(null)
  const [pointerDragging, setPointerDragging] = useState(false)

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

  return (
    <section className="fighter-select-section" aria-labelledby="fighter-select-title">
      <div className="fighter-select-section__inner">
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
    </section>
  )
}

export default FighterSelectSection
