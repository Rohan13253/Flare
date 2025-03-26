"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Bell, Map, Settings, ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  collapsed: boolean
  toggleSidebar: () => void
}

export default function DashboardSidebar({ collapsed, toggleSidebar }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("")

  // Update active item based on current path
  useEffect(() => {
    if (pathname === "/") {
      setActiveItem("dashboard")
    } else if (pathname === "/alerts") {
      setActiveItem("alerts")
    } else if (pathname === "/map") {
      setActiveItem("map")
    } else if (pathname === "/settings") {
      setActiveItem("settings")
    }
  }, [pathname])

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { id: "alerts", icon: Bell, label: "Alerts", path: "/alerts" },
    { id: "map", icon: Map, label: "Map", path: "/map" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  ]

  const handleNavigation = (path: string, id: string) => {
    setActiveItem(id)
    router.push(path)
  }

  return (
    <div
      className={cn(
        "relative bg-gray-800 h-full transition-all duration-300 flex flex-col overflow-hidden",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('/fire-pattern.png')] opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent z-0"></div>

      {/* Logo */}
      <div className="relative z-10 flex items-center p-4 border-b border-gray-700">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 glow">
          <Flame className="h-6 w-6 text-white" />
        </div>
        {!collapsed && (
          <div className="ml-3 slide-in">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              Flare
            </h1>
            <p className="text-xs text-gray-400">Fire Detection System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 pt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.id} className="mb-2 px-4">
              <button
                onClick={() => handleNavigation(item.path, item.id)}
                className={cn(
                  "flex items-center w-full p-3 rounded-lg transition-all duration-300",
                  "hover:bg-red-900/30 hover:shadow-lg hover:shadow-red-900/20",
                  activeItem === item.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30"
                    : "text-gray-400 hover:text-white",
                  "slide-in",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className={cn("h-5 w-5", activeItem === item.id && "animate-pulse")} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse button */}
      <div className="relative z-10 p-4 border-t border-gray-700">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-2 rounded-lg text-gray-400 hover:bg-red-900/30 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </div>
  )
}

