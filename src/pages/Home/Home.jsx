import "./Home.css";
import Welcome from "./sections/Welcome/Welcome";
import Overview from "./sections/Overview/Overview";
export default function Home() {
  return (
    <main className="home">
      {/* 1. Welcome / Identity Section */}
      <Welcome />

      {/* 2. Mini Overview (Light Dashboard) */}
      <Overview />

      {/* 3. Today / Now Section */}
      <section className="home-section home-today">
        <h2>Today</h2>
        <ul>
          <li>No data yet</li>
        </ul>
      </section>

      {/* 4. System Highlights / Announcements */}
      <section className="home-section home-announcements">
        <h2>Announcements</h2>
        <p>No announcements available</p>
      </section>
    </main>
  );
}