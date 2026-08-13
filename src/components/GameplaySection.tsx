import './GameplaySection.css'
import { assetUrl } from '../utils/assetUrl'

const gameplayShots = [
  {
    title: 'Power Unleashed',
    caption: 'Match tiles fast to charge brutal face-offs and swing momentum in seconds.',
    imageSrc: assetUrl('ss-5.png'),
    accent: 'VS Clash',
  },
  {
    title: 'Fight To Win',
    caption: 'Climb the leaderboard, push your rank, and turn every round into a statement.',
    imageSrc: assetUrl('ss-1.png'),
    accent: 'Ranked Rush',
  },
  {
    title: 'Infinite Powers',
    caption: 'Stack special abilities, freeze the board, and unleash chaos at the perfect time.',
    imageSrc: assetUrl('ss-3.png'),
    accent: 'Power Stack',
  },
  {
    title: 'Align Colors To Attack',
    caption: 'Build combos under pressure while the arena erupts around your fighters.',
    imageSrc: assetUrl('ss-4.png'),
    accent: 'Combo Pressure',
  },
]

function GameplaySection() {
  return (
    <section className="gameplay-section">
      <div className="gameplay-section__inner">
        <div className="gameplay-section__intro">
          <div className="gameplay-section__heading" aria-hidden="true">
            <span className="gameplay-section__heading-line" />
            <p className="gameplay-section__eyebrow">Gameplay</p>
            <span className="gameplay-section__heading-line" />
          </div>

          <h2 className="gameplay-section__title">Match Fast. Hit Hard.</h2>
        </div>

        <div className="gameplay-section__layout">
          {gameplayShots.map((shot) => (
            <article className="gameplay-section__shot" key={shot.title}>
              <div className="gameplay-section__shot-frame">
                <img className="gameplay-section__image" src={shot.imageSrc} alt={shot.title} />
              </div>
              <div className="gameplay-section__shot-copy">
                <span className="gameplay-section__accent">{shot.accent}</span>
                <h3>{shot.title}</h3>
                <p>{shot.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GameplaySection
