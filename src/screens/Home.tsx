import HeroSection from '../components/HeroSection'
import LaunchSignupSection from '../components/LaunchSignupSection'
import FeaturesSection from '../components/FeaturesSection'

function Home() {
  return (
    <main className="page-shell">
      <HeroSection />
      <LaunchSignupSection />
      <FeaturesSection />
    </main>
  )
}

export default Home
