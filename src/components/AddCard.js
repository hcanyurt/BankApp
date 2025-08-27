import React, { useState } from "react";

export default function AddCard({ onCardAdd }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardAdd({
      name: name || "React Kart",
      cardNumber,
      balance: parseFloat(balance) || 0,
    });
  };

  return (
    <div style={styles.container}>
      <h3>Kart Bilgilerini Gir</h3>

      <input
        type="text"
        placeholder="Kart Adı / Banka"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Kart Numarası"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Başlangıç Bakiyesi (₺)"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Kaydet
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    margin: "20px auto",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: "100%",
  },
};
