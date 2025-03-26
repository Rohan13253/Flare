"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import DashboardSidebar from "./dashboard-sidebar"
import DashboardContent from "./dashboard-content"
import Alerts from "./alerts"
import MapView from "./map-view"
import Settings from "./settings"

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Mock sensor data
  const [sensorData, setSensorData] = useState({
    temperature: 38,
    humidity: 25,
    smokeLevel: 150,
    sensors: [
      {
        id: 1,
        name: "Sensor 1",
        lat: 34.052235,
        lng: -118.243683,
        status: "normal",
        temp: 32,
        humidity: 45,
        smoke: 50,
      },
      {
        id: 2,
        name: "Sensor 2",
        lat: 34.052835,
        lng: -118.253683,
        status: "warning",
        temp: 42,
        humidity: 20,
        smoke: 250,
      },
      {
        id: 3,
        name: "Sensor 3",
        lat: 34.059235,
        lng: -118.233683,
        status: "critical",
        temp: 48,
        humidity: 15,
        smoke: 350,
      },
      {
        id: 4,
        name: "Sensor 4",
        lat: 34.045235,
        lng: -118.263683,
        status: "normal",
        temp: 30,
        humidity: 50,
        smoke: 30,
      },
    ],
  })

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Render the appropriate content based on the current path
  const renderContent = () => {
    if (pathname === "/alerts") {
      return <Alerts />
    } else if (pathname === "/map") {
      return <MapView />
    } else if (pathname === "/settings") {
      return <Settings />
    } else {
      return (
        <div className="flex h-screen bg-gray-900 text-white">
          <DashboardSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
          <DashboardContent sensorData={sensorData} collapsed={collapsed} />
        </div>
      )
    }
  }

  return renderContent()
}

