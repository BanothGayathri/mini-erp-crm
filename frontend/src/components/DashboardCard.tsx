body{
    margin:0;
    background:#f4f7fc;
    font-family:Arial, Helvetica, sans-serif;
}

.dashboard{
    display:flex;
    min-height:100vh;
}

.main{
    flex:1;
    padding:30px;
}

.heading{
    font-size:32px;
    color:#1e3a8a;
    margin-bottom:5px;
}

.subheading{
    color:#666;
    margin-bottom:30px;
}

.cards{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
}

.card{
    background:white;
    padding:25px;
    border-radius:15px;
    box-shadow:0 8px 20px rgba(0,0,0,.1);
    transition:.3s;
    cursor:pointer;
}

.card:hover{
    transform:translateY(-8px);
}

.card h2{
    margin:10px 0;
    color:#1e3a8a;
}

.card p{
    color:gray;
}

.activity{
    margin-top:40px;
    background:white;
    padding:25px;
    border-radius:15px;
    box-shadow:0 8px 20px rgba(0,0,0,.1);
}

.activity h2{
    color:#1e3a8a;
}

.activity li{
    padding:10px 0;
}
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