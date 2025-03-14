import type { Metadata } from 'next'
import './globals.css'
import { BookOpen, GraduationCap, Grid3X3, Home, LogOut, Network, User, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Minga App',
  description: 'MingaApp - Hackathon BG 2025',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
      <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[252px] bg-[#0f1730] text-white flex flex-col bg-sidebar-minga">
        <div className="flex items-center gap-2 p-4 mb-6">
            <img src="/minga_logo.png" alt="Minga" />
        </div>

        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            <li>
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
              <Home className="w-5 h-5" />
                <span>Buscar</span>
              </Link>
            </li>
            <li>
              <a href="/offers" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
                <BookOpen className="w-5 h-5" />
                <span>Ofertas</span>
              </a>
            </li>
            {/* <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
                <GraduationCap className="w-5 h-5" />
                <span>Courses</span>
              </a>
            </li> */}
            {/* <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md bg-amber-300/20 text-amber-300">
                <Users className="w-5 h-5" />
                <span>People</span>
              </a>
            </li> */}
            <li>
              <a href="/directory" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
                <Grid3X3 className="w-5 h-5" />
                <span>Directorio PYMES</span>
              </a>
            </li>
            {/* <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
                <Network className="w-5 h-5" />
                <span>Org chart</span>
              </a>
            </li> */}
            {/* <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
                <User className="w-5 h-5" />
                <span>You</span>
              </a>
            </li> */}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
      </div>
    </body>

    </html>
  )
}
