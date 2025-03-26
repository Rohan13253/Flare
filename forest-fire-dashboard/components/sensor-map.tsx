"use client"

import MapPlaceholder from "./map-placeholder"

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

interface SensorMapProps {
  sensors: Sensor[]
}

export default function SensorMap({ sensors }: SensorMapProps) {
  return <MapPlaceholder sensors={sensors} />
}

