import React from "react";
import { Card, Text } from "react-native-paper";

export default function ExpenseCard({ expense }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content>
        <Text style={{ fontWeight: "bold" }}>{expense.title}</Text>
        <Text>{expense.category}</Text>
        <Text style={{ color: "red" }}>{expense.amount} VND</Text>
        <Text>{new Date(expense.date.seconds * 1000).toLocaleDateString()}</Text>
      </Card.Content>
    </Card>
  );
}
    