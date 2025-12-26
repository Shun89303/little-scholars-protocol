import "./Overview.css";
import OverviewCard from "./OverviewCard";

export default function Overview() {
  return (
    <section className="overview">
      <OverviewCard label="Students" value={324} />
      <OverviewCard label="Classes" value={12} />
      <OverviewCard label="Teachers" value={18} />
      <OverviewCard label="Notices" value={3} />
    </section>
  );
}