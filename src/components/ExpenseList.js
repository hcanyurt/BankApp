import React, { useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import AddExpenseModal from './AddExpenseModal';
import AddExpenseButton from './AddExpenseButton';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([
    { date: '20/07/2025', type: 'Market Alışverişi', amount: 150 },
    { date: '18/07/2025', type: 'Online Alışveriş', amount: 320 },
    { date: '15/07/2025', type: 'Elektrik Faturası', amount: 200 },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Hesap Hareketlerim
      </Typography>

      <List sx={{ maxWidth: 400, margin: "0 auto" }}>
        {expenses.map((item, index) => (
          <ListItem key={index}>
            {item.date} - {item.type} - {item.amount}₺
          </ListItem>
        ))}
      </List>

      <AddExpenseButton onClick={() => setOpenModal(true)} />

      <AddExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddExpense}
      />
    </Box>
  );
}
