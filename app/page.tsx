// app/page.tsx
import Hero from '@/src/components/sections/Hero'
import AboutPreview from '@/src/components/sections/AboutPreview'
import ProjectsPreview from '@/src/components/sections/ProjectsPreview'
import ContactPreview from '@/src/components/sections/ContactPreview'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* <AboutPreview />
      <ProjectsPreview />
      <ContactPreview /> */}
    </div>
  )
}