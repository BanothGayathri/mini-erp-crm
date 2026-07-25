import "./DashboardCard.css";

export default function DashboardCard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>Sales Overview</h2>
        <div
          style={{
            height: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          }}
        >
          📊 Sales Chart Coming Soon
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>Quick Stats</h2>
        <p>✅ Active Users : 12</p>
        <p>📦 Orders : 85</p>
        <p>🏪 Stock : 560</p>
        <p>📄 Challans : 42</p>
      </div>
    </div>
  );
}