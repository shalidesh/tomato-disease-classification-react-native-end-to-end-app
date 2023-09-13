
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

export default function Dashboard() {


    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };


      const data1 = [
        {
          name: "Seoul",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
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

    return(
        <ScrollView>
            <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                />
            
            <LineChart
                data={data}
                width={screenWidth}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                />
            <PieChart
                data={data1}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
                />
            <BarChart
                // style={graphStyle}
                data={data3}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                />
            <ContributionGraph
                values={commitsData}
                endDate={new Date("2017-04-01")}
                numDays={105}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                />
        </View>

        </ScrollView>
        
    );

}
