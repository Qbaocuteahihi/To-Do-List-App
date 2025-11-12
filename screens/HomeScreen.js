import React, { useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses, deleteExpense } from "../slices/expensesSlice";
import { useNavigation } from "@react-navigation/native";
import ExpenseChart from "../components/ExpenseChart";
import CategoryChart from "./CategoryChart";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const expenses = useSelector(state => state.expenses.items);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => dispatch(deleteExpense(id)) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>

      <ExpenseChart expenses={expenses} />
      <CategoryChart expenses={expenses} />

      {expenses.length === 0 ? (
        <Text style={styles.noDataText}>No expenses yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.expenseItem}
              onPress={() => navigation.navigate("EditExpense", { expense: item })}
            >
              <View style={styles.expenseHeader}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.expenseCategory}>{item.category}</Text>
              <Text style={styles.expenseAmount}>{item.amount.toLocaleString()} VND</Text>
              <Text style={styles.expenseDate}>
                {item.date ? new Date(item.date).toLocaleDateString() : ""}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  addButton: {
    backgroundColor: "#38bdf8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  noDataText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
    marginTop: 50,
  },
  expenseItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  expenseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  deleteText: {
    color: "red",
    fontSize: 12,
  },
  expenseCategory: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 14,
    color: "#2563eb",
    marginTop: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
});