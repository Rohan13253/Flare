import { AlertTriangle, CheckCircle, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertBoxProps {
  status: "safe" | "warning" | "danger"
  temperature: number
  smokeLevel: number
}

export default function AlertBox({ status, temperature, smokeLevel }: AlertBoxProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-500 border backdrop-blur-sm",
        status === "safe" && "bg-green-500/10 border-green-500/50",
        status === "warning" && "bg-yellow-500/10 border-yellow-500/50",
        status === "danger" && "bg-red-500/10 border-red-500/50 glow",
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/fire-pattern.png')] opacity-5"></div>

      {/* Alert content */}
      <div className="relative z-10 flex items-center">
        {status === "safe" ? (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20 mr-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        ) : status === "warning" ? (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/20 mr-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500 animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mr-4">
            <Flame className="h-8 w-8 text-red-500 animate-pulse" />
          </div>
        )}

        <div>
          <h2
            className={cn(
              "text-xl font-bold",
              status === "safe" && "text-green-500",
              status === "warning" && "text-yellow-500",
              status === "danger" && "text-red-500",
            )}
          >
            {status === "safe" && "All Systems Normal"}
            {status === "warning" && "Warning: Elevated Risk Detected"}
            {status === "danger" && "DANGER: Critical Fire Risk"}
          </h2>

          <p className="text-gray-300 mt-1">
            {status === "safe" && "All sensor readings are within normal parameters."}
            {status === "warning" &&
              `Temperature (${temperature}°C) or smoke levels (${smokeLevel} PPM) are approaching dangerous thresholds.`}
            {status === "danger" &&
              `ALERT: Temperature (${temperature}°C) or smoke levels (${smokeLevel} PPM) have exceeded safe thresholds!`}
          </p>
        </div>
      </div>

      {/* Animated border for danger state */}
      {status === "danger" && <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500 animate-pulse"></div>}
    </div>
  )
}

