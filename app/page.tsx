import Link from 'next/link'
import { Building2 } from 'lucide-react'
import Hero from '@/components/landing/Hero'
import Trust from '@/components/landing/Trust'
import Features from '@/components/landing/Features'
import ProductShowcase from '@/components/landing/ProductShowcase'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col overflow-x-hidden relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-zinc-900/50 absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-400 select-none">
          <Building2 className="h-6 w-6" />
          <span>ApexBank</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-zinc-400 hover:text-white text-sm font-medium transition-all">
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            Open Account
          </Link>
        </div>
      </header>

      <Hero />
      <Trust />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}


