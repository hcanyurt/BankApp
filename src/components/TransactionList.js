import React from "react";

export default function TransactionList({ expenses, onDelete }) {
  return (
    <div style={styles.container}>
      <h3>Hesap Hareketlerim</h3>
      <ul style={styles.list}>
        {expenses.map((item, index) => (
          <li key={index} style={styles.item}>
            <span>
              {item.date} - {item.description} - {item.amount}₺
            </span>
            <button
              style={styles.deleteButton}
              onClick={() => onDelete(index)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "0 auto 50px auto",
    backgroundColor: "#bfe9f6ff",
    padding: 20,
    borderRadius: 10,
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: "8px 12px",
    backgroundColor: "#fff",
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  deleteButton: {
    backgroundColor: "#e4a8a9ff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "5px 10px",
    cursor: "pointer",
  },
};
