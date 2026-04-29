import Hero from '@/src/components/sections/Hero'
import AboutPreview from '@/src/components/sections/AboutPreview'
import ContactPreview from '@/src/components/sections/ContactPreview'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutPreview />
      <ContactPreview />
    </div>
  )
}