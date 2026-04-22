'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#27272a] bg-[#000000]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* ฝั่งซ้าย: Logo หรือชื่อโปรเจกต์ */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white font-bold text-xl tracking-tighter">
            SUPA<span className="text-[#a1a1aa]">APP</span>
          </Link>

          {/* เมนูหลัก */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/users" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
              User
            </Link>
          </div>
        </div>

        {/* ฝั่งขวา: Auth Links & Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 border-r border-[#27272a] pr-4 mr-2">
            <Link 
              href="/auth/login" 
              className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="px-3 py-1.5 bg-[#18181b] text-white text-sm rounded-md border border-[#27272a] hover:bg-[#27272a] transition-all"
            >
              Sign-up
            </Link>
          </div>        
        </div>
        
      </div>
    </nav>
  )
}
