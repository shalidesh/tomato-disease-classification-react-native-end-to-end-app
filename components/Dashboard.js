
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Dimensions,ScrollView} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { auth } from "../config/firebase";

export default function Dashboard() {


    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["January", "February", "March", "April"],
        datasets: [
          {
            data: [20, 45, 28, 80],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };


      const data1 = [
        {
          name: "Seoul",
          population: 21500,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#000000",
          legendFontSize: 10
        },
        {
          name: "Toronto",
          population: 2800,
          color: "#F00",
          legendFontColor: "#000000",
          legendFontSize: 10
        },
        {
          name: "Beijing",
          population: 5276,
          color: "red",
          legendFontColor: "#000000",
          legendFontSize: 10
        },
        {
          name: "New York",
          population: 8538,
          color: "#ffffff",
          legendFontColor: "#000000",
          legendFontSize: 10
        },
        {
          name: "Moscow",
          population: 11920,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#000000",
          legendFontSize: 10
        }
      ];

      const data3 = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      };

      const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
      ];

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };



      useEffect(() => {

        const user = auth.currentUser;
        console.log(user.uid);      // prints the user's unique ID
        console.log(user.email);    // prints the user's email address

   
    }, []);

    return(

      <ScrollView>
      <View style={styles.container}>
          {/* <Text>Bezier Line Chart</Text> */}
          <View style={styles.card}>
              <PieChart
                  data={data1}
                  width={screenWidth}
                  height={200}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"0"}
                  absolute={false}
              />
          </View>
          <View style={styles.card}>
          <LineChart
                data={data}
                width={screenWidth-40}
                height={200}
                chartConfig={chartConfig}
                />
          </View>
      </View>
  </ScrollView>

        
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#18d10a',
    borderRadius: 15,
    padding: 10,
    elevation: 1,
    marginTop:5
  },
});
