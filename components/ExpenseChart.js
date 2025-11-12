import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";

export default function ExpenseChart({ expenses }) {
  const monthlyExpenses = Array(12).fill(0);
  expenses.forEach(exp => {
    const date = new Date(exp.date.seconds * 1000);
    monthlyExpenses[date.getMonth()] += exp.amount;
  });

  const screenWidth = Dimensions.get("window").width - 20;

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>
        Chi tiêu theo tháng
      </Text>
      <BarChart
        data={{ labels: ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"], datasets: [{ data: monthlyExpenses }] }}
        width={screenWidth}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { marginVertical: 10 } });
