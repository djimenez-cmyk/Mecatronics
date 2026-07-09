import Icon from '@/components/ui/AppIcon';

interface ContentManagementCardProps {
  title: string;
  count: number;
  iconName: string;
  lastUpdated: string;
  onManage: () => void;
}

export default function ContentManagementCard({
  title,
  count,
  iconName,
  lastUpdated,
  onManage,
}: ContentManagementCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-brand border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={iconName as any} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-text-primary">
              {title}
            </h3>
            <p className="text-sm text-text-secondary">{count} items</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">
          Updated: {lastUpdated}
        </span>
        <button
          onClick={onManage}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          Manage
        </button>
      </div>
    </div>
  );
}