import { Link } from 'react-router-dom'

export default function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-mist bg-paper/95 backdrop-blur">
      <div className="grid grid-cols-3 text-[11px] font-semibold tracking-micro uppercase">
        <a href="tel:+917305160327" className="flex flex-col items-center justify-center py-2.5 border-r border-mist">
          <PhoneIcon /> Call
        </a>
        <a href="https://wa.me/917305160327" className="flex flex-col items-center justify-center py-2.5 border-r border-mist">
          <ChatIcon /> WhatsApp
        </a>
        <Link to="/quote" className="flex flex-col items-center justify-center py-2.5 bg-ink text-paper">
          <QuoteIcon /> Get a Quote
        </Link>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>
}
function ChatIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12a8 8 0 0 1-11.9 7L3 21l2-6a8 8 0 1 1 16-3Z"/></svg>
}
function QuoteIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h12l4 4v12H4z"/><path d="M8 12h8M8 16h5"/></svg>
}
