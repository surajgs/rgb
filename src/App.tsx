import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileStickyBar from './components/MobileStickyBar'
import Home from './pages/Home'
import Builder from './pages/Builder'
import Calculator from './pages/Calculator'
import Track from './pages/Track'
import Quote from './pages/Quote'
import Solution from './pages/Solution'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/track" element={<Track />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/solutions/:slug" element={<Solution />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  )
}
