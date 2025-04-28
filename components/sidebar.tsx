"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Bell, HelpCircle, Layers, List, LogOut, Map, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="w-[230px] border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center text-white">
          <span className="text-xs">A</span>
        </div>
        <span className="font-semibold">AcuteMeter</span>
      </div>

      <nav className="flex-1 p-2">
        <div className="space-y-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
              isActive("/") ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <Map size={18} />
            <span>Map View</span>
          </Link>

          <Link
            href="/list-view"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
              isActive("/list-view") ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <List size={18} />
            <span>List View</span>
          </Link>

          <Link
            href="/analytics"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
              isActive("/analytics") ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>

          <Link
            href="/alerts"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
              isActive("/alerts") ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50",
            )}
          >
            <Bell size={18} />
            <span>Alerts</span>
            <span className="ml-auto bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full">12</span>
          </Link>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ZONES</h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/zones/all"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <Layers size={18} />
              <span>All Zones</span>
            </Link>

            <Link
              href="/zone-details/adenta"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <div className="h-5 w-5 bg-gray-100 rounded flex items-center justify-center text-xs">A</div>
              <span>Adenta</span>
            </Link>

            <Link
              href="/zone-details/labadi"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <div className="h-5 w-5 bg-gray-100 rounded flex items-center justify-center text-xs">L</div>
              <span>Labadi</span>
            </Link>

            <Link
              href="/zone-details/osu"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <div className="h-5 w-5 bg-gray-100 rounded flex items-center justify-center text-xs">O</div>
              <span>Osu</span>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SETTINGS</h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>

            <Link
              href="/preferences"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <Settings size={18} />
              <span>Preferences</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <HelpCircle size={18} />
              <span>Help</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">Kofi Mensah</p>
          <p className="text-xs text-gray-500 truncate">Xpress Gas Admin</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <LogOut size={18} />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
