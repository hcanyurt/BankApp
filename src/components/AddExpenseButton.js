import React from "react";

export default function AddExpenseButton({ onClick }) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button
        style={styles.button}
        onClick={onClick}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#35658a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4680a9ff")}
      >
        + Harcama Ekle
      </button>
    </div>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: 16,
    backgroundColor: "#4680a9ff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
