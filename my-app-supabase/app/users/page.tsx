'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function UserGrid() {
  const [users, setUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const itemPerPages = 3;
  const [maxPage, setmaxPage] = useState(1)
  const supabase = createClient()

  async function fetchUsers() {
    setIsLoading(true)
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: "exact"})
      .like('fullname', `%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .range((page - 1) * itemPerPages, page * itemPerPages - 1)

    if (error) {
      console.error('Error fetching users:', error.message)
    } else {
      setUsers(data || [])
      const calculatMaxPage = parseInt(Math.ceil(count / itemPerPages))
      setmaxPage(calculatMaxPage || 1)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [page, searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchUsers()
  }

  if (isLoading && users.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#000000] flex items-center justify-center">
        <div className="text-white flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#27272a] border-t-white rounded-full animate-spin"></div>
          <p className="text-sm uppercase tracking-widest text-[#a1a1aa]">Loading Users...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full bg-[#000000] p-8 pt-24">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Users Directory</h1>
          <p className="text-[#a1a1aa] text-sm mt-2">Manage and view members</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full md:max-w-sm flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#09090b] text-white border border-[#27272a] rounded-md focus:outline-none focus:ring-1 focus:ring-[#a1a1aa] placeholder:text-[#3f3f46] text-sm"
            />
            <svg 
              className="absolute right-3 top-2.5 text-[#3f3f46]" 
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-white text-black text-sm font-bold rounded-md hover:bg-[#e4e4e7] transition-all"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="relative w-full p-6 bg-[#09090b] text-white border border-[#27272a] rounded-xl shadow-lg hover:border-[#3f3f46] transition-all text-black">
            
            <div className="absolute top-6 right-6">
              <div className="w-14 h-14 rounded-xl border border-[#27272a] overflow-hidden bg-[#18181b] shadow-inner">
                <img 
                  src={`https://dicebear.com{encodeURIComponent(user.fullname || 'User')}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1 mb-6 border-b border-[#27272a] pb-4 pr-16 text-white">
              <h2 className="text-xl font-semibold tracking-tight">User Details</h2>
              <p className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-mono">ID: {user.id}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f46] font-bold tracking-widest">Fullname</span>
                <p className="text-sm font-medium text-white">{user.fullname || '-'}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f46] font-bold tracking-widest">Email</span>
                <p className="text-sm font-medium text-[#a1a1aa] truncate">{user.email || '-'}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-[#3f3f3f] font-bold tracking-widest">Tel</span>
                <p className="text-sm font-medium text-[#a1a1aa]">{user.tel || '-'}</p>
              </div>

              <div className="flex items-center justify-between mt-6 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase text-[#3f3f46] font-bold tracking-widest">Attachment</span>
                  <p className="text-[10px] text-white truncate max-w-[80px]">{user.attachments ? user.attachments.split('/').pop() : 'No file'}</p>
                </div>
                {user.attachments && (
                  <button 
                    onClick={() => window.open(user.attachments)}
                    className="px-3 py-1.5 bg-white text-black text-[10px] font-black rounded-md hover:bg-[#e4e4e7] transition-all uppercase active:scale-95"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#27272a]">
              <Link href={`/edit/${user.id}`} className="text-xs text-[#a1a1aa] hover:text-white transition-colors flex items-center justify-center gap-2">
                <span>Edit Profile</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-10 flex justify-center items-center gap-4">
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#09090b] text-white border border-[#27272a] rounded-md disabled:opacity-50 hover:bg-[#18181b] transition-all text-sm"
        >
          Previous
        </button>
        <span className="text-white text-sm">Page {page} / {maxPage} </span>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          disabled={users.length < itemPerPages}
          className="px-4 py-2 bg-[#09090b] text-white border border-[#27272a] rounded-md disabled:opacity-50 hover:bg-[#18181b] transition-all text-sm"
        >
          Next
        </button>
      </div>

      {users.length === 0 && !isLoading && (
        <div className="text-center py-20 text-[#3f3f46] uppercase tracking-widest text-sm">
          No users found
        </div>
      )}
    </main>
  )
}

