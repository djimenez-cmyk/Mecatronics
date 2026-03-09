interface SystemHealthCardProps {
  metric: string;
  value: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
}

export default function SystemHealthCard({
  metric,
  value,
  status,
  description,
}: SystemHealthCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
        return 'bg-success/10 text-success border-success/20';
      case 'good':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'critical':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <div className={`rounded-lg p-4 border ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-heading font-semibold">{metric}</span>
        <span className="text-2xl font-heading font-bold">{value}</span>
      </div>
      <p className="text-xs opacity-80">{description}</p>
    </div>
  );
}