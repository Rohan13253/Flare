"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Thermometer, Droplets, Wind, Activity, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import MetricCard from "./metric-card"
import AlertBox from "./alert-box"
import SensorMap from "./sensor-map"

interface SensorData {
  temperature: number
  humidity: number
  smokeLevel: number
  sensors: {
    id: number
    name: string
    lat: number
    lng: number
    status: string
    temp: number
    humidity: number
    smoke: number
  }[]
}

interface DashboardContentProps {
  sensorData: SensorData
  collapsed: boolean
}

export default function DashboardContent({ sensorData, collapsed }: DashboardContentProps) {
  const [alertStatus, setAlertStatus] = useState<"safe" | "warning" | "danger">("safe")

  // Update alert status based on sensor data
  useEffect(() => {
    if (sensorData.temperature > 45 || sensorData.smokeLevel > 300) {
      setAlertStatus("danger")
    } else if (sensorData.temperature > 40 || sensorData.smokeLevel > 200) {
      setAlertStatus("warning")
    } else {
      setAlertStatus("safe")
    }
  }, [sensorData])

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
    <main
      className={cn("relative flex-1 overflow-auto transition-all duration-300 p-6", collapsed ? "ml-20" : "ml-64")}
    >
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient z-0"></div>
      <div className="absolute inset-0 bg-gray-900/90 z-0"></div>

      {/* Particle effect */}
      <div className="particles z-0">{renderParticles()}</div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="mr-4 p-2 rounded-full bg-red-500/10">
            <Activity className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              Flare Dashboard
            </h1>
            <p className="text-gray-400">Real-time forest fire monitoring system</p>
          </div>
        </div>

        {/* Alert Box */}
        <div className="mb-8 fade-in">
          <AlertBox status={alertStatus} temperature={sensorData.temperature} smokeLevel={sensorData.smokeLevel} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°C"
            icon={<Thermometer className="h-8 w-8" />}
            status={sensorData.temperature > 45 ? "danger" : sensorData.temperature > 40 ? "warning" : "normal"}
            animationDelay={0}
          />
          <MetricCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            icon={<Droplets className="h-8 w-8" />}
            status={sensorData.humidity < 20 ? "danger" : sensorData.humidity < 30 ? "warning" : "normal"}
            animationDelay={100}
          />
          <MetricCard
            title="Smoke Level"
            value={sensorData.smokeLevel}
            unit="PPM"
            icon={<Wind className="h-8 w-8" />}
            status={sensorData.smokeLevel > 300 ? "danger" : sensorData.smokeLevel > 200 ? "warning" : "normal"}
            animationDelay={200}
          />
        </div>

        {/* Map */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 h-[500px] border border-gray-700 shadow-xl fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Map className="h-5 w-5 mr-2 text-red-400" />
            Sensor Network Map
          </h2>
          <div className="h-[calc(100%-2rem)] w-full rounded-lg overflow-hidden">
            <SensorMap sensors={sensorData.sensors} />
          </div>
        </div>
      </div>
    </main>
  )
}

