import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";

export default function CategoryChart({ expenses }) {
  // Tính tổng chi tiêu theo danh mục
  const categoryTotals = {};
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const chartData = Object.keys(categoryTotals).map((category, index) => {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
    return {
      name: category,
      population: categoryTotals[category],
      color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    };
  });

  const screenWidth = Dimensions.get("window").width - 20;

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>
        Chi tiêu theo danh mục
      </Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { marginVertical: 10 } });