
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

import {
  collection,
  addDoc,
  orderBy,
  where,
  query,
  onSnapshot
} from 'firebase/firestore';

import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';


export default function Dashboard() {

    // Array of colors for the pie chart
    const colors = ["rgba(131, 167, 234, 1)", "#F00", "#red", "#ffffff", "rgb(0, 0, 255)", "#0FF"];

    const [data1, setData1] = useState([]);

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
        console.log(user.email);
        if (user) {
            console.log("user exist");
            fetchDetections(user.uid);
          }
      }, []);
    
      function fetchDetections(userId) {
        console.log("user exist", {userId});
        console.log(userId);
    
        const collectionRef = collection(database, 'Detections');
        const q = query(collectionRef, where('userId', '==', userId));
        
        let diseaseCounts = {};
    
        const unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.docs.map(doc => {
                let record = doc.data();
                console.log("Record: ", record);
    
                // Increment the count for this diseaseClass
                if (record.diseaseClass in diseaseCounts) {
                    diseaseCounts[record.diseaseClass]++;
                } else {
                    diseaseCounts[record.diseaseClass] = 1;
                }
            }); 
    
            // Log the counts
            console.log("Disease Counts: ", diseaseCounts);

            // Update data1 based on diseaseCounts
            const newData1 = Object.keys(diseaseCounts).map((diseaseClass, index) => ({
                name: diseaseClass,
                population: diseaseCounts[diseaseClass],
                color: colors[index % colors.length], // Use a color from the array
                legendFontColor: "#000000",
                legendFontSize: 10
            }));

            setData1(newData1);

            console.log("Data for Pie Chart: ", newData1);
        });
    
        // Cleanup function to unsubscribe from listener
        return () => unsubscribe();
    }
    
    
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
