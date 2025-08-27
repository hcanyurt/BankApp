import React, { useState, useEffect } from "react";
import AuthPage from "./AuthPage";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import AddExpenseButton from "./components/AddExpenseButton";
import TransactionList from "./components/TransactionList";
import AddExpenseModal from "./components/AddExpenseModal";
import AddCard from "./components/AddCard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    console.log("Çıkış yapıldı");
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    fetch(`https://localhost:7180/api/expense/Cardexpenses/${card.id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Harcama alınamadı");
        }
        return res.json();
      })
      .then((data) => setExpenses(data))
      .catch((err) => {
        console.error("Harcama alınamadı:", err);
        setExpenses([]);
      });
  };

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://localhost:7180/api/card/UserCards/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCards(data);
          if (data.length > 0) {
            handleCardSelect(data[0]);
          } else {
            setSelectedCard(null);
            setExpenses([]);
          }
        })
        .catch((err) => console.error("Kartlar alınamadı:", err));
    }
  }, [user]);

  const handleCardAdd = async (card) => {
    if (!user || !user.email) {
      alert("Kart eklemek için giriş yapmalısınız.");
      return;
    }

    const balanceNumber = parseFloat(card.balance);
    if (isNaN(balanceNumber) || balanceNumber < 0) {
      alert("Geçerli bir bakiye giriniz (örnek: 1000).");
      return;
    }

    try {
      const response = await fetch("https://localhost:7180/api/card/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          cardNumber: card.cardNumber,
          balance: balanceNumber,
          bankName: card.name,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Kart eklenemedi. Sunucu mesajı: " + errorText);
      }

      const savedCard = await response.json();
      setCards([...cards, savedCard]);
      setShowCardForm(false);
      handleCardSelect(savedCard);
    } catch (error) {
      alert("Kart eklenirken hata: " + error.message);
    }
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar
        onAddCardClick={() => setShowCardForm((prev) => !prev)}
        onLogout={handleLogout}
      />

      {selectedCard ? (
        <Card
          total={totalAmount}
          name={selectedCard.bankName}
          cardNumber={selectedCard.cardNumber}
          balance={selectedCard.balance}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Kart Bilgisi Yok</p>
        </div>
      )}

      {showCardForm && <AddCard onCardAdd={handleCardAdd} />}

      <TransactionList expenses={expenses} />

      <AddExpenseButton onClick={() => setOpenModal(true)} />

      <AddExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCard={selectedCard} // <-- ✅ EKLENDİ
        onAdd={(savedExpense) => {
          setExpenses((prev) => [...prev, savedExpense]);
          setOpenModal(false);
        }}
      />
    </div>
  );
}

export default App;
