'use client'

import { useState } from 'react'
import Link from 'next/link' 
import { register } from "./action" 

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage('')
    try {
      await register(formData) 
      setMessage('Registration successful! Please check your email.')
    } catch{ 
      setMessage('Something went wrong');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#000000] p-4">
      <div className="w-full max-w-sm p-6 bg-[#09090b] text-white border border-[#27272a] rounded-xl shadow-lg">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Register Form</h1>
          <p className="text-sm text-[#a1a1aa]">Create a new account</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fullname</label>
            <input
              name="fullname"
              type="text"
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 bg-transparent border border-[#27272a] rounded-md focus:outline-none focus:ring-1 focus:ring-[#a1a1aa] placeholder:text-[#3f3f46]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full px-3 py-2 bg-transparent border border-[#27272a] rounded-md focus:outline-none focus:ring-1 focus:ring-[#a1a1aa] placeholder:text-[#3f3f46]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="tel"
              type="tel"
              required
              placeholder="081-234-xxxx"
              className="w-full px-3 py-2 bg-transparent border border-[#27272a] rounded-md focus:outline-none focus:ring-1 focus:ring-[#a1a1aa] placeholder:text-[#3f3f46]"
            />
          </div>



          {message && <p className="text-xs text-blue-400">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-white text-black font-medium rounded-md hover:bg-[#e4e4e7] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-[#a1a1aa]">Already have an account? </span>
          <Link href="/" className="text-white underline underline-offset-4 hover:text-[#e4e4e7]">
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}
