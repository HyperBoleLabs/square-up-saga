type HeroHeaderProps = {
  onPreRegisterClick: () => void
}

function HeroHeader({ onPreRegisterClick }: HeroHeaderProps) {
  return (
    <header className="hero-section__topbar">
      <div className="hero-section__brand">The Hustle</div>

      <button
        className="hero-section__cta"
        type="button"
        onClick={onPreRegisterClick}
      >
        Notify me
      </button>
    </header>
  )
}

export default HeroHeader
