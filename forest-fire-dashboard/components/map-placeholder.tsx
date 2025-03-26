"use client"

import { MapPin } from "lucide-react"

interface Sensor {
  id: number
  name: string
  lat: number
  lng: number
  status: string
  temp: number
  humidity: number
  smoke: number
}

interface MapPlaceholderProps {
  sensors: Sensor[]
}

export default function MapPlaceholder({ sensors }: MapPlaceholderProps) {
  // Count sensors by status
  const normalCount = sensors.filter((s) => s.status === "normal").length
  const warningCount = sensors.filter((s) => s.status === "warning").length
  const criticalCount = sensors.filter((s) => s.status === "critical").length

  return (
    <div className="h-full w-full bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-700/50 rounded-full p-4 mb-4">
        <MapPin className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Sensor Network Overview</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        Interactive map visualization is currently unavailable. Below is a summary of your sensor network status.
      </p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mb-2"></div>
          <span className="text-2xl font-bold text-white">{normalCount}</span>
          <span className="text-sm text-gray-400">Normal</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-500 mb-2"></div>
          <span className="text-2xl font-bold text-white">{warningCount}</span>
          <span className="text-sm text-gray-400">Warning</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mb-2 animate-pulse"></div>
          <span className="text-2xl font-bold text-white">{criticalCount}</span>
          <span className="text-sm text-gray-400">Critical</span>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h4 className="text-md font-semibold text-white mb-2 text-left">Sensor Details</h4>
        <div className="bg-gray-700/50 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="py-2 px-3 text-left text-gray-400">Name</th>
                <th className="py-2 px-3 text-left text-gray-400">Temp</th>
                <th className="py-2 px-3 text-left text-gray-400">Humidity</th>
                <th className="py-2 px-3 text-left text-gray-400">Smoke</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="border-t border-gray-700">
                  <td className="py-2 px-3 flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        sensor.status === "normal"
                          ? "bg-green-500"
                          : sensor.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    {sensor.name}
                  </td>
                  <td
                    className={`py-2 px-3 ${
                      sensor.temp > 45 ? "text-red-500" : sensor.temp > 40 ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    {sensor.temp}°C
                  </td>
                  <td
                    className={`py-2 px-3 ${
                      sensor.humidity < 20
                        ? "text-red-500"
                        : sensor.humidity < 30
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {sensor.humidity}%
                  </td>
                  <td
                    className={`py-2 px-3 ${
                      sensor.smoke > 300 ? "text-red-500" : sensor.smoke > 200 ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    {sensor.smoke} PPM
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

