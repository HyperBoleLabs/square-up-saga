import { assetUrl } from '../utils/assetUrl'

type HeroHeaderProps = {
  onPreRegisterClick: () => void
}

function HeroHeader({ onPreRegisterClick }: HeroHeaderProps) {
  return (
    <header className="hero-section__topbar">
      <div className="hero-section__brand">
        <img
          className="hero-section__brand-image"
          src={assetUrl('logo.png')}
          alt="Square Up Saga"
        />
      </div>

      <button
        className="hero-section__cta"
        type="button"
        onClick={onPreRegisterClick}
      >
        Notify Me
      </button>
    </header>
  )
}

export default HeroHeader
