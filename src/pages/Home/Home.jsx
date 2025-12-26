export default function Home() {
  return (
    <main className="home">
      {/* 1. Welcome / Identity Section */}
      <section className="home-section home-welcome">
        <h1>Welcome back</h1>
        <p>Little Scholars Management System</p>
        <span>Academic Year 2025–2026</span>
      </section>

      {/* 2. Mini Overview (Light Dashboard) */}
      <section className="home-section home-overview">
        <div className="overview-card">
          <h3>Students</h3>
          <p>—</p>
        </div>
        <div className="overview-card">
          <h3>Classes</h3>
          <p>—</p>
        </div>
        <div className="overview-card">
          <h3>Teachers</h3>
          <p>—</p>
        </div>
      </section>

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