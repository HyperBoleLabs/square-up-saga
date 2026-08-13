type HeroHeaderProps = {
  onPreRegisterClick: () => void
}

function HeroHeader({ onPreRegisterClick }: HeroHeaderProps) {
  return (
    <header className="hero-section__topbar">
      <div className="hero-section__brand" aria-label="Square Up Saga">
        <span className="hero-section__brand-top">
          <span className="hero-section__brand-square">Square</span>
          <span className="hero-section__brand-up">Up</span>
        </span>
        <span className="hero-section__brand-saga">Saga</span>
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
