'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';
import StatsCard from './StatsCard';
import QuickActionCard from './QuickActionCard';
import RecentActivityItem from './RecentActivityItem';
import ContentManagementCard from './ContentManagementCard';
import SystemHealthCard from './SystemHealthCard';

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  activeUsers: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  iconName: string;
  route: string;
  color: string;
}

interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'create' | 'edit' | 'delete' | 'upload';
}

interface ContentSection {
  id: string;
  title: string;
  count: number;
  iconName: string;
  lastUpdated: string;
  route: string;
}

interface SystemMetric {
  id: string;
  metric: string;
  value: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
}

export default function DashboardInteractive() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'system'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
    activeUsers: 0,
  });
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);

  // Fetch real data from Supabase
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const supabase = createClient();
        const startTime = performance.now();

        // Fetch pages data
        const { data: pagesData, error: pagesError } = await supabase
          .from('pages')
          .select('status');

        // Fetch media files count
        const { count: mediaCount, error: mediaError } = await supabase
          .from('media_files')
          .select('*', { count: 'exact', head: true });

        const endTime = performance.now();
        const queryTime = ((endTime - startTime) / 1000).toFixed(2);

        if (pagesError || mediaError) {
          console.error('Error fetching dashboard data:', pagesError || mediaError);
          // Set system health to critical if database queries fail
          setSystemMetrics([
            {
              id: '1',
              metric: 'Conexión a Base de Datos',
              value: 'Error',
              status: 'critical',
              description: 'Failed to connect to database',
            },
            {
              id: '2',
              metric: 'Tiempo de Respuesta de Consulta',
              value: 'N/A',
              status: 'critical',
              description: 'Database queries failed',
            },
          ]);
          setIsLoadingStats(false);
          return;
        }

        // Calculate stats from real data
        const totalPages = pagesData?.length || 0;
        const publishedPages = pagesData?.filter(p => p.status === 'published').length || 0;
        const draftPages = pagesData?.filter(p => p.status === 'draft').length || 0;

        setStats({
          totalPages,
          publishedPages,
          draftPages,
          totalMedia: mediaCount || 0,
          activeUsers: 1, // Current logged-in user
        });

        // Determine system health based on query performance
        const queryTimeNum = parseFloat(queryTime);
        let queryStatus: 'excellent' | 'good' | 'warning' | 'critical' = 'excellent';
        let queryDescription = 'Consultas ejecutándose de manera óptima';

        if (queryTimeNum > 2) {
          queryStatus = 'critical';
          queryDescription = 'Rendimiento de consulta lento';
        } else if (queryTimeNum > 1) {
          queryStatus = 'warning';
          queryDescription = 'El rendimiento de las consultas necesita atención';
        } else if (queryTimeNum > 0.5) {
          queryStatus = 'good';
          queryDescription = 'Buen rendimiento de consultas';
        }

        setSystemMetrics([
          {
            id: '1',
            metric: 'Conexión a Base de Datos',
            value: 'Activo',
            status: 'excellent',
            description: 'Conexión con Supabase',
          },
          {
            id: '2',
            metric: 'Tiempo de Respuesta de Consulta',
            value: `${queryTime}s`,
            status: queryStatus,
            description: queryDescription,
          },
          {
            id: '3',
            metric: 'Total de Registros',
            value: `${totalPages + (mediaCount || 0)}`,
            status: 'good',
            description: 'Páginas y Archivos',
          },
        ]);

        setIsLoadingStats(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setSystemMetrics([
          {
            id: '1',
            metric: 'Database Connection',
            value: 'Error',
            status: 'critical',
            description: 'System error occurred',
          },
        ]);
        setIsLoadingStats(false);
      }
    };

    if (isHydrated) {
      fetchDashboardData();
    }
  }, [isHydrated]);

  // Fetch recent activities from database
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const supabase = createClient();
        const activities: Activity[] = [];

        // Fetch recent pages (created and updated)
        const { data: pagesData, error: pagesError } = await supabase
          .from('pages')
          .select('id, title, status, author, created_at, updated_at')
          .order('updated_at', { ascending: false })
          .limit(10);

        if (pagesError) {
          console.error('Error fetching pages:', pagesError);
        } else if (pagesData) {
          pagesData.forEach((page) => {
            const createdDate = new Date(page.created_at);
            const updatedDate = new Date(page.updated_at);
            const timeDiff = updatedDate.getTime() - createdDate.getTime();
            
            // If updated_at is significantly different from created_at, it's an update
            if (timeDiff > 5000) { // More than 5 seconds difference
              activities.push({
                id: `page-update-${page.id}`,
                action: `Updated page "${page.title}"`,
                user: page.author || 'Admin',
                timestamp: formatTimestamp(page.updated_at),
                type: 'edit',
              });
            }
            
            // Add creation activity
            activities.push({
              id: `page-create-${page.id}`,
              action: page.status === 'published' 
                ? `Published page "${page.title}"`
                : `Created page "${page.title}"`,
              user: page.author || 'Admin',
              timestamp: formatTimestamp(page.created_at),
              type: 'create',
            });
          });
        }

        // Fetch recent media uploads
        const { data: mediaData, error: mediaError } = await supabase
          .from('media_files')
          .select('id, file_name, file_type, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (mediaError) {
          console.error('Error fetching media:', mediaError);
        } else if (mediaData) {
          mediaData.forEach((media) => {
            const fileTypeLabel = media.file_type === 'image' ? 'image' : 
                                 media.file_type === 'video' ? 'video' : 'file';
            activities.push({
              id: `media-${media.id}`,
              action: `Uploaded ${fileTypeLabel} "${media.file_name}"`,
              user: 'Admin',
              timestamp: formatTimestamp(media.created_at),
              type: 'upload',
            });
          });
        }

        // Sort all activities by timestamp (most recent first)
        activities.sort((a, b) => {
          const timeA = parseTimestamp(a.timestamp);
          const timeB = parseTimestamp(b.timestamp);
          return timeB - timeA;
        });

        // Take top 6 most recent activities
        setRecentActivities(activities.slice(0, 6));
        setIsLoadingActivities(false);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
        setIsLoadingActivities(false);
      }
    };

    if (isHydrated) {
      fetchRecentActivities();
    }
  }, [isHydrated]);

  // Helper function to format timestamp as relative time
  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Helper function to parse relative timestamp back to milliseconds for sorting
  const parseTimestamp = (timestamp: string): number => {
    const now = Date.now();
    if (timestamp === 'Just now') return now;
    
    const match = timestamp.match(/(\d+)\s+(minute|hour|day|week)/);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      const multipliers: { [key: string]: number } = {
        minute: 60000,
        hour: 3600000,
        day: 86400000,
        week: 604800000,
      };
      return now - (value * multipliers[unit]);
    }
    
    // If it's a date string, parse it
    return new Date(timestamp).getTime();
  };

  useEffect(() => {
    setIsHydrated(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Crear Nueva Página',
      description: 'Agregue una nueva página a su sitio web con contenido y diseño personalizados',
      iconName: 'DocumentPlusIcon',
      route: '/page-management-dashboard',
      color: 'bg-primary',
    },
    {
      id: '2',
      title: 'Subir Archivos',
      description: 'Añade imágenes, vídeos y documentos a tu biblioteca multimedia',
      iconName: 'PhotoIcon',
      route: '/admin-dashboard/media-upload',
      color: 'bg-brand-secondary',
    },
    /*{
    {
      id: '3',
      title: 'Manage Menu',
      description: 'Edit navigation structure and menu items across your site',
      iconName: 'Bars3Icon',
      route: '/admin-dashboard',
      color: 'bg-accent',
    },
    
      id: '4',
      title: 'SEO Settings',
      description: 'Optimize meta tags, sitemaps, and search engine visibility',
      iconName: 'MagnifyingGlassIcon',
      route: '/admin-dashboard',
      color: 'bg-success',
    },
    {
      id: '5',
      title: 'Analytics',
      description: 'View detailed reports on traffic, conversions, and user behavior',
      iconName: 'ChartBarIcon',
      route: '/admin-dashboard',
      color: 'bg-warning',
    },
    {
      id: '6',
      title: 'Backup & Restore',
      description: 'Create backups and restore previous versions of your content',
      iconName: 'ArrowPathIcon',
      route: '/admin-dashboard',
      color: 'bg-conversion',
    },*/
  ];

  const contentSections: ContentSection[] = [
    {
      id: '1',
      title: 'Pages',
      count: 47,
      iconName: 'DocumentTextIcon',
      lastUpdated: '2 hours ago',
      route: '/admin-dashboard',
    },
    {
      id: '2',
      title: 'Media Library',
      count: 328,
      iconName: 'PhotoIcon',
      lastUpdated: '4 hours ago',
      route: '/admin-dashboard',
    },
    {
      id: '3',
      title: 'Projects',
      count: 24,
      iconName: 'BriefcaseIcon',
      lastUpdated: '1 day ago',
      route: '/admin-dashboard',
    },
    {
      id: '4',
      title: 'Downloads',
      count: 56,
      iconName: 'ArrowDownTrayIcon',
      lastUpdated: '3 days ago',
      route: '/admin-dashboard',
    },
    {
      id: '5',
      title: 'Blog Posts',
      count: 18,
      iconName: 'NewspaperIcon',
      lastUpdated: '5 days ago',
      route: '/admin-dashboard',
    },
    {
      id: '6',
      title: 'Testimonials',
      count: 32,
      iconName: 'ChatBubbleLeftRightIcon',
      lastUpdated: '1 week ago',
      route: '/admin-dashboard',
    },
  ];

  const handleQuickAction = (route: string) => {
    if (isHydrated) {
      router.push(route);
    }
  };

  const handleManageContent = (route: string) => {
    if (isHydrated) {
      router.push(route);
    }
  };

  const handleLogout = async () => {
    if (isHydrated) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin-login');
        router.refresh();
      } catch (error) {
        console.error('Error signing out:', error);
        router.push('/admin-login');
      }
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-8">
    
          {/* Texto izquierda */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Panel de Administración
            </h2>
            {/*
            <p className="text-text-secondary">
              Here's what's happening with your website today
            </p>
            */}
          </div>

          {/* Botones derecha */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/homepage')}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-heading font-semibold text-text-primary hover:text-primary transition-colors duration-200"
            >
              <Icon name="GlobeAltIcon" size={20} />
              <span className="hidden sm:inline">Ver Página</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-error text-error-foreground text-sm font-heading font-semibold rounded-md hover:bg-error/90 transition-colors duration-200"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoadingStats ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-lg shadow-brand border border-border p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <StatsCard
                title="Páginas Totales"
                value={stats.totalPages}
                icon="📄"
                trend={{ value: `${stats.publishedPages} published`, isPositive: true }}
                bgColor="bg-gradient-to-br from-[#A67C00] to-[#FFD369]"
              />
              <StatsCard
                title="Páginas Publicadas"
                value={stats.publishedPages}
                icon="✅"
                trend={{ value: `${stats.draftPages} drafts`, isPositive: false }}
                bgColor="bg-gradient-to-br from-[#059669] to-[#10B981]"
              />
              <StatsCard
                title="Páginas en Borrador"
                value={stats.draftPages}
                icon="📝"
                bgColor="bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]"
              />
              <StatsCard
                title="Archivos Subidos"
                value={stats.totalMedia}
                icon="🖼️"
                bgColor="bg-gradient-to-br from-[#2563EB] to-[#3B82F6]"
              />
            </>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-heading font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === 'overview' ?'text-primary border-primary' :'text-text-secondary border-transparent hover:text-text-primary'
            }`}
          >
            Administración
          </button>
          {/*
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 text-sm font-heading font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === 'content' ?'text-primary border-primary' :'text-text-secondary border-transparent hover:text-text-primary'
            }`}
          >
            Content Management
          </button>
          */}
          <button
            onClick={() => setActiveTab('system')}
            className={`px-6 py-3 text-sm font-heading font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === 'system' ?'text-primary border-primary' :'text-text-secondary border-transparent hover:text-text-primary'
            }`}
          >
            Salud de Sistema
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <QuickActionCard
                    key={action.id}
                    title={action.title}
                    description={action.description}
                    iconName={action.iconName}
                    onClick={() => handleQuickAction(action.route)}
                    color={action.color}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-bold text-text-primary">
                  Actividad Reciente
                </h3>
                {/*
                <button className="text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors duration-200">
                  Ver Todo
                </button>
                */}
              </div>
              <div className="bg-card rounded-lg shadow-brand border border-border p-6">
                {isLoadingActivities ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-start space-x-3 py-3 border-b border-border last:border-b-0 animate-pulse">
                        <div className="w-5 h-5 bg-muted rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <RecentActivityItem
                      key={activity.id}
                      action={activity.action}
                      user={activity.user}
                      timestamp={activity.timestamp}
                      type={activity.type}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="InformationCircleIcon" size={48} className="text-text-secondary mx-auto mb-2" />
                    <p className="text-text-secondary">No recent activities found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {/*
        {activeTab === 'content' && (
          <div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
              Content Sections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentSections.map((section) => (
                <ContentManagementCard
                  key={section.id}
                  title={section.title}
                  count={section.count}
                  iconName={section.iconName}
                  lastUpdated={section.lastUpdated}
                  onManage={() => handleManageContent(section.route)}
                />
              ))}
            </div>
          </div>
        )}
        */}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-bold text-text-primary">
                System Metrics
              </h3>
              <button
                onClick={() => {
                  setIsLoadingStats(true);
                  // Trigger re-fetch by toggling hydration
                  const currentHydrated = isHydrated;
                  setIsHydrated(false);
                  setTimeout(() => setIsHydrated(currentHydrated), 100);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-cta text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="ArrowPathIcon" size={16} />
                <span>Recargar</span>
              </button>
            </div>
            {isLoadingStats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemMetrics.map((metric) => (
                  <SystemHealthCard
                    key={metric.id}
                    metric={metric.metric}
                    value={metric.value}
                    status={metric.status}
                    description={metric.description}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}