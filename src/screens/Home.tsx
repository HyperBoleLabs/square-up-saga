import HeroSection from '../components/HeroSection'
import FighterSelectSection from '../components/FighterSelectSection'
import GameplaySection from '../components/GameplaySection'
import LaunchSignupSection from '../components/LaunchSignupSection'
import FeaturesSection from '../components/FeaturesSection'

function Home() {
  return (
    <main className="page-shell">
      <HeroSection />
      <FighterSelectSection />
      <GameplaySection />
      <FeaturesSection />
      <LaunchSignupSection />
    </main>
  )
}

export default Home
