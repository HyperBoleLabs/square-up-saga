import HeroSection from '../components/HeroSection'
import FighterSelectSection from '../components/FighterSelectSection'
import GameplaySection from '../components/GameplaySection'
import FeaturesSection from '../components/FeaturesSection'

type HomeProps = {
  showMike: boolean
}

function Home({ showMike }: HomeProps) {
  return (
    <main className="page-shell">
      <HeroSection />
      <FighterSelectSection showMike={showMike} />
      <GameplaySection showMike={showMike} />
      <FeaturesSection />
    </main>
  )
}

export default Home
