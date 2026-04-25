import Icon from '@/components/ui/AppIcon';

interface QuickActionCardProps {
  title: string;
  description: string;
  iconName: string;
  onClick: () => void;
  color: string;
}

export default function QuickActionCard({
  title,
  description,
  iconName,
  onClick,
  color,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-lg p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 text-left border border-border"
    >
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 ${color} rounded-lg flex-shrink-0`}>
          <Icon name={iconName as any} size={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-heading font-bold text-text-primary mb-1">
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}