import { lazy, Suspense } from 'react'
import DeferredSection from '../components/DeferredSection'
import HeroSection from '../components/HeroSection'

const FighterSelectSection = lazy(() => import('../components/FighterSelectSection'))
const GameplaySection = lazy(() => import('../components/GameplaySection'))
const FeaturesSection = lazy(() => import('../components/FeaturesSection'))

type HomeProps = {
  showMike: boolean
}

function Home({ showMike }: HomeProps) {
  return (
    <main className="page-shell">
      <HeroSection showMike={showMike} />
      <DeferredSection minHeight="72rem" rootMargin="0px 0px">
        <Suspense fallback={<div className="deferred-section-placeholder" aria-hidden="true" />}>
          <FighterSelectSection showMike={showMike} />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="88rem">
        <Suspense fallback={<div className="deferred-section-placeholder" aria-hidden="true" />}>
          <GameplaySection showMike={showMike} />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="40rem">
        <Suspense fallback={<div className="deferred-section-placeholder" aria-hidden="true" />}>
          <FeaturesSection />
        </Suspense>
      </DeferredSection>
    </main>
  )
}

export default Home
