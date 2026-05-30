/**
 * Progress Indicator Component
 * Shows the learner's progress through the 30-day journey
 * Design: Warm minimalist with subtle animations
 */

interface ProgressIndicatorProps {
  completedDays: number;
  totalDays?: number;
}

export default function ProgressIndicator({ completedDays, totalDays = 30 }: ProgressIndicatorProps) {
  const percentage = (completedDays / totalDays) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Your Progress</span>
        <span className="text-sm text-muted-foreground">{completedDays} of {totalDays} days</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Week Indicators */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[1, 2, 3, 4].map((week) => {
          const weekStart = (week - 1) * 7 + 1;
          const weekEnd = week * 7;
          const isCompleted = completedDays >= weekEnd;
          const isInProgress = completedDays >= weekStart && completedDays < weekEnd;

          return (
            <div
              key={week}
              className={`p-3 rounded-lg text-center transition-all ${
                isCompleted
                  ? "bg-primary text-primary-foreground"
                  : isInProgress
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-border text-muted-foreground"
              }`}
            >
              <div className="text-xs font-semibold">Week {week}</div>
              <div className="text-xs opacity-75">Days {weekStart}-{weekEnd}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
