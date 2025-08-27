import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddExpenseModal({ open, onClose, onAdd, selectedCard }) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setType('');
      setAmount('');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [open]);

  const handleAdd = async () => {
    if (!type || !amount || !date) {
      alert("Tüm alanları doldurun.");
      return;
    }

    if (!selectedCard || !selectedCard.id) {
      alert("Harcama eklemek için bir kart seçmeniz gerekiyor.");
      return;
    }

    const newExpense = {
      description: type,
      amount: parseFloat(amount),
      date: date,
      cardId: selectedCard.id
    };

    try {
      setLoading(true);
      const res = await fetch("https://localhost:7180/api/expense/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Harcama eklenemedi");
      }

      const savedExpense = await res.json();
      onAdd(savedExpense);
    } catch (error) {
      alert("Sunucu hatası: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Yeni Harcama Ekle
        </Typography>
        <TextField
          fullWidth
          label="Harcama Türü"
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tutar (₺)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tarih"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAdd}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Ekle"}
        </Button>
      </Box>
    </Modal>
  );
}
