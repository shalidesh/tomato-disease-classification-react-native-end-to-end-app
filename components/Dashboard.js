
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
    const colors = ["rgba(131, 167, 234, 1)", "#F00", "yellow", "#ffffff", "rgb(0, 0, 255)", "#0FF"];

    const [data1, setData1] = useState([]);
    const [bacterial_spot, Setbacterial_spot] = useState(0);
    const [early_blight, Setearly_blight] = useState(0);
    const [late_blight, Setlate_blight] = useState(0);
    const [leaf_mold, Setleaf_mold] = useState(0);
    const [mosaic_virus, Setmosaic_virus] = useState(0);
    const [septoria_leaf_spot, Setseptoria_leaf_spot] = useState(0);
    const [spider_mites, Setspider_mites] = useState(0);
    const [target_spot, Settarget_spot] = useState(0);
    const [yellow_leaf_curl, Setyellow_leaf_curl] = useState(0);

    const screenWidth = Dimensions.get("window").width;

    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr","Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            data: [20, 45, 28, 80,20, 45, 28, 80],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      });

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
        strokeWidth: 3, // optional, default 3
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

      // Helper function to get month name from month number
      function getMonthName(monthNumber) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[monthNumber - 1];
      }
    
      function fetchDetections(userId) {
        console.log("user exist", {userId});
        console.log(userId);
    
        const collectionRef = collection(database, 'Detections');
        const q = query(collectionRef, where('userId', '==', userId));
        
        let diseaseCounts = {};
        let recordCountsByMonth = {};
    
        const unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.docs.map(doc => {
                let record = doc.data();
                console.log("Record: ", record);

                // Convert timestamp to Date object
                let timestampInSeconds = record.timestamp.seconds;
                let date = new Date(timestampInSeconds * 1000);

                // Get the month (0-based index, so we add 1 to get a human-readable month number)
                let month = date.getMonth() + 1;

                // Increment the count for this month
                if (month in recordCountsByMonth) {
                    recordCountsByMonth[month]++;
                } else {
                    recordCountsByMonth[month] = 1;
                }
    
                // Increment the count for this diseaseClass
                if (record.diseaseClass in diseaseCounts) {
                    diseaseCounts[record.diseaseClass]++;
                } else {
                    diseaseCounts[record.diseaseClass] = 1;
                }
            }); 
    
            // Log the counts
            console.log("Disease Counts: ", diseaseCounts);
            // Log the counts
            console.log("Record Counts By Month: ", recordCountsByMonth);

             // Create labels and data arrays
            let labels = [];
            let data = [];
            for (let i = 1; i <= 12; i++) {
                labels.push(getMonthName(i));
                data.push(recordCountsByMonth[i] || 0);
            }

            // Update state
            setData({
              labels: labels,
              datasets: [
                {
                  data: data,
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  strokeWidth: 3
                }
              ],
              legend: ["Total Unhealthy Plants"]
            });

           
            Setlate_blight(diseaseCounts["Late Blight"] || 0)
            Setbacterial_spot(diseaseCounts["Bacterial Spot"] || 0)
            Setearly_blight(diseaseCounts["Early Blight"] || 0)
            Setleaf_mold(diseaseCounts["Leaf Mold"] || 0)
            Setmosaic_virus(diseaseCounts["Mosaic Virus"] || 0)
            Setseptoria_leaf_spot(diseaseCounts["Septoria Leaf Spot"] || 0)
            Setspider_mites(diseaseCounts["Spider Mites"] || 0)
            Settarget_spot(diseaseCounts["Target Spot"] || 0)
            Setyellow_leaf_curl(diseaseCounts["Yellow Leaf Curl"] || 0)

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
       <View style={styles.titleCard}>
        <Text style={styles.titleText}>Each Disease Plants Counts</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Bacterial Spot</Text>
          <Text style={styles.centerText1}>{bacterial_spot}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Early Blight</Text>
          <Text style={styles.centerText1}>{early_blight}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Late Blight</Text>
          <Text style={styles.centerText1}>{late_blight}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Leaf Mold</Text>
          <Text style={styles.centerText1}>{leaf_mold}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Mosaic Virus</Text>
          <Text style={styles.centerText1}>{mosaic_virus}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Septoria Leaf </Text>
          <Text style={styles.centerText1}>{septoria_leaf_spot}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Spider Mites</Text>
          <Text style={styles.centerText1}>{spider_mites}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Yellow Leaf Curl</Text>
          <Text style={styles.centerText1}>{yellow_leaf_curl}</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.centerText}>Target Spot</Text>
          <Text style={styles.centerText1}>{target_spot}</Text>
        </View>
      </View>
      <View style={styles.titleCard}>
        <Text style={styles.titleText}>Pie Chart</Text>
      </View>
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
      <View style={styles.titleCard}>
        <Text style={styles.titleText}>Line Chart</Text>
      </View>
      <View style={styles.card}>
        <LineChart
          data={data}
          width={screenWidth-30}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#638ae6',
    borderRadius: 15,
    padding: 1,
    elevation: 1,
    marginTop:5,
    marginHorizontal:5
  },
  card1: {
    flex: 1,
    backgroundColor: '#638ae6',
    borderRadius: 0,
    padding: 10,
    elevation: 1,
    marginTop:5,
    marginHorizontal:5
  },
  centerText: {
    textAlign: 'center',
  },
  centerText1: {
    textAlign: 'center',
    fontSize:30,
    fontWeight:'bold'
  },
  titleCard: {
    backgroundColor: '#18d10a',
    borderRadius: 0,
    padding: 10,
    elevation: 1,
    marginTop:5,
    marginHorizontal:5
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
