import type { ProjectMetric } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

type ProjectMetricsStripProps = {
  metrics: ProjectMetric[];
};

export default function ProjectMetricsStrip({ metrics }: ProjectMetricsStripProps) {
  if (!metrics.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="text-center py-4 px-3 ring-1 ring-rule-hi bg-white dark:bg-gray-800"
        >
          <p className="text-3xl sm:text-4xl font-bold text-signal font-mono tabular-nums">
            {metric.value}
          </p>
          <p className={`${monoStyles.eyebrow} mt-1`}>{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
