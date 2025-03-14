interface ProgressBarProps {
    value: number
    max: number
    label?: string
    showPercentage?: boolean
    inverted?: boolean
  }
  
  export default function ProgressBar({
    value,
    max,
    label,
    showPercentage = true,
    inverted = true, // Default to inverted logic
  }: ProgressBarProps) {
    // Calculate sold/reserved percentage instead of available percentage
    const soldAmount = max - value
    const soldPercentage = Math.round((soldAmount / max) * 100)
  
    // Determine color based on inverted percentage (how much is sold)
    const getColorClass = () => {
      if (soldPercentage >= 80) return "bg-green-500" // High demand (>80% sold)
      if (soldPercentage >= 50) return "bg-yellow-500" // Medium demand (50-80% sold)
      return "bg-red-500" // Low demand (<50% sold)
    }
  
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, soldPercentage))
  
    return (
      <div className="w-full">
        {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full ${getColorClass()} transition-all duration-300`}
            style={{ width: `${clampedPercentage}%` }}
          ></div>
        </div>
        {showPercentage && (
          <div className="text-xs text-gray-600 mt-1 flex justify-between">
            <span>Demanda: {clampedPercentage}%</span>
            <span>
              {value} de {max} disponibles
            </span>
          </div>
        )}
      </div>
    )
  }
  
  