export default function OverviewCard({ value, label }) {
  return (
    <div className="overview-card">
      <div className="overview-value">{value}</div>
      <div className="overview-label">{label}</div>
    </div>
  );
}