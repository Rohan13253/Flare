"use client"

import type React from "react"

import { useState } from "react"
import { Bell, AlertTriangle, CheckCircle, X, Filter, ChevronDown, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardSidebar from "./dashboard-sidebar"

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: "danger",
    title: "Critical Temperature Alert",
    message: "Sensor 3 detected temperature of 48°C, exceeding critical threshold.",
    timestamp: "2023-07-15T08:23:11",
    read: false,
  },
  {
    id: 2,
    type: "danger",
    title: "Critical Smoke Level Alert",
    message: "Sensor 3 detected smoke level of 350 PPM, exceeding critical threshold.",
    timestamp: "2023-07-15T08:22:45",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Elevated Temperature Warning",
    message: "Sensor 2 detected temperature of 42°C, approaching critical threshold.",
    timestamp: "2023-07-15T07:45:22",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Low Humidity Warning",
    message: "Sensor 2 detected humidity of 20%, approaching critical threshold.",
    timestamp: "2023-07-15T07:44:18",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "System Update",
    message: "System successfully updated to version 2.3.0.",
    timestamp: "2023-07-14T16:30:00",
    read: true,
  },
  {
    id: 6,
    type: "info",
    title: "Sensor Maintenance",
    message: "Scheduled maintenance for Sensor 4 completed.",
    timestamp: "2023-07-14T14:15:30",
    read: true,
  },
]

export default function Alerts() {
  const [collapsed, setCollapsed] = useState(false)
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState("all")

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Format timestamp to readable date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Mark alert as read
  const markAsRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  // Delete alert
  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  // Filter alerts
  const filteredAlerts =
    filter === "all"
      ? alerts
      : filter === "unread"
        ? alerts.filter((alert) => !alert.read)
        : alerts.filter((alert) => alert.type === filter)

  // Create particles for background effect
  const renderParticles = () => {
    const particles = []
    const count = 20

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 5
      const duration = Math.random() * 20 + 10
      const xPos = Math.random() * 100
      const xDrift = (Math.random() - 0.5) * 200

      particles.push(
        <div
          key={i}
          className="particle"
          style={
            {
              width: `${size}px`,
              height: `${size}px`,
              left: `${xPos}%`,
              opacity: Math.random() * 0.5,
              "--x-drift": `${xDrift}px`,
              animation: `rise ${duration}s linear infinite`,
              animationDelay: `${Math.random() * duration}s`,
            } as React.CSSProperties
          }
        />,
      )
    }

    return particles
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <DashboardSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main
        className={cn("relative flex-1 overflow-auto transition-all duration-300 p-6", collapsed ? "ml-20" : "ml-64")}
      >
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient z-0"></div>
        <div className="absolute inset-0 bg-gray-900/90 z-0"></div>

        {/* Particle effect */}
        <div className="particles z-0">{renderParticles()}</div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="mr-4 p-2 rounded-full bg-red-500/10">
                <Bell className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Alerts Center
                </h1>
                <p className="text-gray-400">Monitor and manage system notifications</p>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  className="bg-transparent text-white border-none focus:outline-none pr-8"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all" className="bg-gray-800">
                    All Alerts
                  </option>
                  <option value="unread" className="bg-gray-800">
                    Unread
                  </option>
                  <option value="danger" className="bg-gray-800">
                    Critical
                  </option>
                  <option value="warning" className="bg-gray-800">
                    Warnings
                  </option>
                  <option value="info" className="bg-gray-800">
                    Information
                  </option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700 shadow-xl fade-in">
                <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-300">No alerts to display</h2>
                <p className="text-gray-400 mt-2">All clear! There are no alerts matching your filter criteria.</p>
              </div>
            ) : (
              filteredAlerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className={cn(
                    "relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border shadow-lg transition-all duration-300 hover:translate-x-1 slide-in",
                    alert.type === "danger" && "border-red-500",
                    alert.type === "warning" && "border-yellow-500",
                    alert.type === "info" && "border-blue-500",
                    !alert.read && "bg-gray-800/90",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <div
                      className={cn(
                        "p-2 rounded-lg mr-4",
                        alert.type === "danger" && "bg-red-500/10 text-red-500",
                        alert.type === "warning" && "bg-yellow-500/10 text-yellow-500",
                        alert.type === "info" && "bg-blue-500/10 text-blue-500",
                      )}
                    >
                      {alert.type === "danger" && <Flame className="h-6 w-6 animate-pulse" />}
                      {alert.type === "warning" && <AlertTriangle className="h-6 w-6" />}
                      {alert.type === "info" && <Bell className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3
                          className={cn(
                            "font-bold text-lg",
                            alert.type === "danger" && "text-red-500",
                            alert.type === "warning" && "text-yellow-500",
                            alert.type === "info" && "text-blue-500",
                          )}
                        >
                          {alert.title}
                          {!alert.read && (
                            <span className="ml-2 bg-red-500 rounded-full h-2 w-2 inline-block animate-pulse"></span>
                          )}
                        </h3>
                        <div className="flex space-x-2">
                          {!alert.read && (
                            <button
                              onClick={() => markAsRead(alert.id)}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete alert"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-1">{alert.message}</p>
                      <p className="text-gray-400 text-sm mt-2">{formatDate(alert.timestamp)}</p>
                    </div>
                  </div>

                  {/* Animated border for danger alerts */}
                  {alert.type === "danger" && !alert.read && (
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500 animate-pulse"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

