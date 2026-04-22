'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface UserData {
  id: number
  fullname: string
  email: string
  tel: string
  attachments: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error.message)
      } else {
        setUsers(data || [])
      }
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  if (isLoading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen w-full bg-[#000000] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-[#a1a1aa] text-sm mt-2">Managing {users.length} members in database</p>
        </div>
        <Link href="/register" className="bg-white text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-200 transition-all">
          + Add User
        </Link>
      </div>

      {/* Grid Layout: แถวละ 3 การ์ด */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="relative w-full p-6 bg-[#09090b] text-white border border-[#27272a] rounded-xl shadow-lg hover:border-[#3f3f46] transition-all">
            
            {/* Avatar สี่เหลี่ยมขอบมน */}
            <div className="absolute top-6 right-6">
              <div className="w-14 h-14 rounded-xl border border-[#27272a] overflow-hidden bg-[#18181b]">
                <img 
                  src={`https://dicebear.com{user.fullname}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover text-[10px]"
                />
              </div>
            </div>

            {/* User Details Title */}
            <div className="space-y-1 mb-6 border-b border-[#27272a] pb-4 pr-16">
              <h2 className="text-xl font-semibold tracking-tight">User Details</h2>
              <p className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-mono">UID: {user.id}</p>
            </div>

            {/* ข้อมูลแสดงผล */}
            <div className="space-y-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f46] font-bold tracking-widest">Fullname</span>
                <p className="text-sm font-medium">{user.fullname}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f46] font-bold tracking-widest">Email</span>
                <p className="text-sm font-medium text-[#a1a1aa] truncate">{user.email}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f46] font-bold tracking-widest">Tel</span>
                <p className="text-sm font-medium text-[#a1a1aa]">{user.tel}</p>
              </div>

              {/* ส่วนไฟล์แนบพร้อมปุ่ม Download */}
              <div className="flex items-center justify-between mt-6 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase text-[#3f3f46] font-bold tracking-widest">Attachment</span>
                  <p className="text-[10px] text-white truncate max-w-[80px]">{user.attachments || 'No file'}</p>
                </div>
                <button 
                  onClick={() => window.open(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${user.attachments}`)}
                  className="px-3 py-1.5 bg-white text-black text-[10px] font-black rounded-md hover:bg-[#e4e4e7] transition-all uppercase"
                >
                  Download
                </button>
              </div>
            </div>

            {/* Footer: Edit Profile */}
            <div className="mt-6 pt-4 border-t border-[#27272a]">
              <Link href={`/edit/${user.id}`} className="text-xs text-[#a1a1aa] hover:text-white transition-colors flex items-center justify-center gap-2">
                <span>Edit Profile</span>
                <svg xmlns="http://w3.org" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </main>
  )
}
