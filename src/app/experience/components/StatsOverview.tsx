import Icon from '@/components/ui/AppIcon';

interface Stat {
  icon: string;
  value: string;
  label: string;
  description: string;
}

interface StatsOverviewProps {
  stats: Stat[];
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-brand p-6 border border-border hover:shadow-brand-lg transition-shadow duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name={stat.icon as any} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-3xl font-heading font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-heading font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;