interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  bgColor: string;
}

export default function StatsCard({ title, value, icon, trend, bgColor }: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-brand`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-heading font-medium text-white mb-1">
            {title}
          </p>
          <p className="text-3xl font-heading font-bold text-white mb-2">
            {value}
          </p>
          {/*
          {trend && (
            <div className="flex items-center space-x-1">
              <span
                className={`text-xs font-heading font-semibold ${
                  trend.isPositive ? 'text-success' : 'text-error'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-text-secondary">vs last month</span>
            </div>
          )}
          */}
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}