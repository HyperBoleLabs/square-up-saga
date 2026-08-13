import HeroSection from '../components/HeroSection'
import FighterSelectSection from '../components/FighterSelectSection'
import GameplaySection from '../components/GameplaySection'
import FeaturesSection from '../components/FeaturesSection'

function Home() {
  return (
    <main className="page-shell">
      <HeroSection />
      <FighterSelectSection />
      <GameplaySection />
      <FeaturesSection />
    </main>
  )
}

export default Home
