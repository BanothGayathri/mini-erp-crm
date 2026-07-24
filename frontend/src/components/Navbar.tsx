import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#fff",
        height: "70px",
        borderRadius: "15px",
        padding: "0 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >

      {/* Left Side */}
      <div>
        <h2
          style={{
            color: "#1E3A8A",
            margin: 0,
          }}
        >
          Mini ERP CRM
        </h2>
      </div>


      {/* Center Search */}
      <div>
        <input
          type="text"
          placeholder="🔍 Search..."
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
      </div>


      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >

        {/* Notification */}
        <span
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          🔔
        </span>


        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >

          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#2563EB",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            G
          </div>


          <div>
            <b>Gayathri</b>
            <br />
            <small>Administrator</small>
          </div>

        </div>


        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#1E3A8A",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>


        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            background: "#EF4444",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>


      </div>

    </div>
  );
}

export default Navbar;