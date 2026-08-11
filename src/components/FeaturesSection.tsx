import './FeaturesSection.css'
import { assetUrl } from '../utils/assetUrl'

const featureItems = [
  {
    name: 'Runner',
    iconSrc: assetUrl('feature-runner.png'),
  },
  {
    name: 'Bike',
    iconSrc: assetUrl('feature-motor.png'),
  },
  {
    name: 'Car mode',
    iconSrc: assetUrl('feature-car.png'),
  },
  {
    name: 'Helicopter',
    iconSrc: assetUrl('feature-helicopter.png'),
  },
  {
    name: 'Missions',
    iconSrc: assetUrl('feature-clipboard.png'),
  },
]

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-section__inner">
        <div className="features-section__content">
          <p className="features-section__label">Features</p>

          <div className="features-section__grid">
            {featureItems.map((feature) => (
              <div className="features-section__card" key={feature.name}>
                <div className="features-section__card-icon">
                  <img src={feature.iconSrc} alt="" />
                </div>
                <p className="features-section__card-title">{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
