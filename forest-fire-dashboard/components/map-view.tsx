"use client"

import type React from "react"

import { useState } from "react"
import { Filter, ChevronDown, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardSidebar from "./dashboard-sidebar"
import SensorMap from "./sensor-map"

// Mock sensors data
const mockSensors = [
  { id: 1, name: "Sensor 1", lat: 34.052235, lng: -118.243683, status: "normal", temp: 32, humidity: 45, smoke: 50 },
  { id: 2, name: "Sensor 2", lat: 34.052835, lng: -118.253683, status: "warning", temp: 42, humidity: 20, smoke: 250 },
  { id: 3, name: "Sensor 3", lat: 34.059235, lng: -118.233683, status: "critical", temp: 48, humidity: 15, smoke: 350 },
  { id: 4, name: "Sensor 4", lat: 34.045235, lng: -118.263683, status: "normal", temp: 30, humidity: 50, smoke: 30 },
  { id: 5, name: "Sensor 5", lat: 34.048235, lng: -118.273683, status: "normal", temp: 28, humidity: 55, smoke: 20 },
  { id: 6, name: "Sensor 6", lat: 34.062235, lng: -118.223683, status: "warning", temp: 41, humidity: 22, smoke: 220 },
]

export default function MapView() {
  const [collapsed, setCollapsed] = useState(false)
  const [sensors, setSensors] = useState(mockSensors)
  const [filter, setFilter] = useState("all")

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Filter sensors
  const filteredSensors = filter === "all" ? sensors : sensors.filter((sensor) => sensor.status === filter)

  // Create particles for background effect
  const renderParticles = () => {
    const particles = []
    const count = 10

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
        className={cn("relative flex-1 overflow-hidden transition-all duration-300", collapsed ? "ml-20" : "ml-64")}
      >
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient z-0"></div>
        <div className="absolute inset-0 bg-gray-900/90 z-0"></div>

        {/* Particle effect */}
        <div className="particles z-0">{renderParticles()}</div>

        <div className="h-full flex flex-col relative z-10">
          {/* Map Header */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-4 border-b border-gray-700 shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-4 p-2 rounded-full bg-red-500/10">
                  <Compass className="h-6 w-6 text-red-500 spin-slow" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                    Sensor Network Map
                  </h1>
                  <p className="text-gray-400 text-sm">Interactive map of all sensor locations</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="flex items-center bg-gray-700/80 rounded-lg p-2 border border-gray-600">
                    <Filter className="h-4 w-4 text-gray-400 mr-2" />
                    <select
                      className="bg-transparent text-white border-none focus:outline-none pr-8 text-sm"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all" className="bg-gray-700">
                        All Sensors
                      </option>
                      <option value="normal" className="bg-gray-700">
                        Normal
                      </option>
                      <option value="warning" className="bg-gray-700">
                        Warning
                      </option>
                      <option value="critical" className="bg-gray-700">
                        Critical
                      </option>
                    </select>
                    <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative p-4">
            <SensorMap sensors={filteredSensors} />
          </div>
        </div>
      </main>
    </div>
  )
}

