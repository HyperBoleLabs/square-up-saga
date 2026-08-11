import HeroSection from '../components/HeroSection'
import FighterSelectSection from '../components/FighterSelectSection'
import LaunchSignupSection from '../components/LaunchSignupSection'
import FeaturesSection from '../components/FeaturesSection'

function Home() {
  return (
    <main className="page-shell">
      <HeroSection />
      <FighterSelectSection />
      <LaunchSignupSection />
      <FeaturesSection />
    </main>
  )
}

export default Home
