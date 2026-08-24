import type { Project } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

type ProjectMetaChipsProps = {
  project: Project;
};

export default function ProjectMetaChips({ project }: ProjectMetaChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {project.category && (
        <span className={`${monoStyles.label} border border-rule px-2 py-1 text-muted`}>
          {project.category}
        </span>
      )}
      {project.role && (
        <span className={`${monoStyles.label} border border-rule px-2 py-1 text-muted`}>
          {project.role}
        </span>
      )}
      {project.timeline && (
        <span className={`${monoStyles.data} text-xs border border-rule px-2 py-1 text-muted`}>
          {project.timeline}
        </span>
      )}
      {project.stack?.map((tech) => (
        <span key={tech} className={`${monoStyles.label} border border-rule px-2 py-1 text-muted`}>
          {tech}
        </span>
      ))}
    </div>
  );
}
