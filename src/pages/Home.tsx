import Hero from '../sections/Hero'
import Segments from '../sections/Segments'
import WhyChoose from '../sections/WhyChoose'
import Sustainability from '../sections/Sustainability'
import Factory from '../sections/Factory'
import Fabric from '../sections/Fabric'
import CaseStudies from '../sections/CaseStudies'
import Testimonials from '../sections/Testimonials'
import Investors from '../sections/Investors'
import Insights from '../sections/Insights'
import RFQTeaser from '../sections/RFQTeaser'

// Trimmed from 20 to 11 sections. Removed:
//   Businesses/Industries/CustomBrand/Events — all duplicated by Segments' 4 chapters
//   Capability — folded into Factory
//   Newsroom — folded into Insights
//   Careers/Clients/GroupWebsites — nice-to-have, not essential on the homepage
export default function Home() {
  return (
    <>
      <Hero />
      <Segments />
      <WhyChoose />
      <Sustainability />
      <Factory />
      <Fabric />
      <CaseStudies />
      <Testimonials />
      <Investors />
      <Insights />
      <RFQTeaser />
    </>
  )
}
