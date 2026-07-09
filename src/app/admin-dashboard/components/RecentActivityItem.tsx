import Icon from '@/components/ui/AppIcon';

interface RecentActivityItemProps {
  action: string;
  user: string;
  timestamp: string;
  type: 'create' | 'edit' | 'delete' | 'upload';
}

export default function RecentActivityItem({
  action,
  user,
  timestamp,
  type,
}: RecentActivityItemProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'create':
        return { icon: 'PlusCircleIcon', color: 'text-success' };
      case 'edit':
        return { icon: 'PencilSquareIcon', color: 'text-warning' };
      case 'delete':
        return { icon: 'TrashIcon', color: 'text-error' };
      case 'upload':
        return { icon: 'ArrowUpTrayIcon', color: 'text-primary' };
      default:
        return { icon: 'DocumentIcon', color: 'text-text-secondary' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-border last:border-b-0">
      <div className={`flex-shrink-0 ${color}`}>
        <Icon name={icon as any} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-heading font-medium text-text-primary">
          {action}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-text-secondary">{user}</span>
          <span className="text-xs text-text-secondary">•</span>
          <span className="text-xs text-text-secondary">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}