import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  unit: string
  icon: ReactNode
  status: "normal" | "warning" | "danger"
  animationDelay?: number
}

export default function MetricCard({ title, value, unit, icon, status, animationDelay = 0 }: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 border card-hover fade-in",
        status === "normal" && "border-green-500",
        status === "warning" && "border-yellow-500",
        status === "danger" && "border-red-500 fire-animation",
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 font-medium">{title}</h3>
          <div className="flex items-end mt-2">
            <span
              className={cn(
                "text-3xl font-bold",
                status === "normal" && "text-green-500",
                status === "warning" && "text-yellow-500",
                status === "danger" && "text-red-500",
              )}
            >
              {value}
            </span>
            <span className="text-gray-400 ml-1">{unit}</span>
          </div>
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            status === "normal" && "bg-green-500/10 text-green-500",
            status === "warning" && "bg-yellow-500/10 text-yellow-500",
            status === "danger" && "bg-red-500/10 text-red-500",
            status === "danger" ? "animate-pulse" : "float",
          )}
        >
          {icon}
        </div>
      </div>

      {/* Animated background for danger state */}
      {status === "danger" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 glow"></div>}
    </div>
  )
}

