import './FeaturesSection.css'
import { assetUrl } from '../utils/assetUrl'

const featureItems = [
  {
    name: 'Thunder Strike',
    description: 'Charge up a lightning attack that cracks through the arena in an instant.',
    iconSrc: assetUrl('feature-thunder.png'),
  },
  {
    name: 'Super Blaster',
    description: 'Fire off a heavy hit to break momentum and swing tight matches your way.',
    iconSrc: assetUrl('feature-super-blaster.png'),
  },
  {
    name: 'Freezy Blaster',
    description: 'Freeze opponents in place and create the opening for a clean follow-up.',
    iconSrc: assetUrl('feature-freezy-blaster.png'),
  },
  {
    name: 'Mighty Hammer',
    description: 'Land a crushing smash that turns close-range clashes into instant wins.',
    iconSrc: assetUrl('feature-hammer.png'),
  },
  {
    name: 'Ground Breaker',
    description: 'Trigger a powerful ground impact that knocks back anything in your path.',
    iconSrc: assetUrl('feature-ground-breaker.png'),
  },
  {
    name: 'Sky Breaker',
    description: 'Launch an aerial blast to dominate vertical fights and surprise rivals.',
    iconSrc: assetUrl('feature-sky-breaker.png'),
  },
]

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-section__inner">
        <div className="features-section__content">
          <div className="features-section__heading" aria-hidden="true">
            <span className="features-section__heading-line" />
            <p className="features-section__label">Game Features</p>
            <span className="features-section__heading-line" />
          </div>

          <div className="features-section__grid">
            {featureItems.map((feature) => (
              <div className="features-section__card" key={feature.name}>
                <div className="features-section__card-icon">
                  <img src={feature.iconSrc} alt="" />
                </div>
                <p className="features-section__card-title">{feature.name}</p>
                <p className="features-section__card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
