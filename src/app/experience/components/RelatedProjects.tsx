import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface RelatedProject {
  id: number;
  title: string;
  industry: string;
  image: string;
  imageAlt: string;
  completionDate: string;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  return (
    <div className="bg-surface rounded-lg p-8 border border-border">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
        <Icon name="RectangleStackIcon" size={24} className="text-primary" />
        Proyectos Relacionados
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/experience#case-${project.id}`}
            className="group bg-card rounded-lg overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-border"
          >
            <div className="relative h-48 overflow-hidden">
              <AppImage
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-heading font-semibold rounded-full backdrop-blur-sm mb-2">
                  {project.industry}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="CalendarIcon" size={16} />
                <span>{project.completionDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;