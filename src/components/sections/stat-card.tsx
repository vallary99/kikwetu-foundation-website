import type { Stat } from "@/types/content";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="kf-stat-card p-4 h-100">
      <p className="kf-stat-value mb-1">{stat.value}</p>
      <p className="fw-semibold mb-1">{stat.label}</p>
      {stat.description ? <p className="small text-secondary mb-0">{stat.description}</p> : null}
    </div>
  );
}
