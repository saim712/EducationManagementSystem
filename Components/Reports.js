// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Button, Alert, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
// // import RNFS from 'react-native-fs';
// // import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

// // const Reports = () => {
// //   const [loading, setLoading] = useState(false);

// //   const requestStoragePermission = async () => {
// //     if (Platform.OS === 'android') {
// //       try {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
// //           {
// //             title: 'Storage Permission',
// //             message: 'App needs access to your storage to download the report',
// //             buttonNeutral: 'Ask Me Later',
// //             buttonNegative: 'Cancel',
// //             buttonPositive: 'OK',
// //           }
// //         );
// //         return granted === PermissionsAndroid.RESULTS.GRANTED;
// //       } catch (err) {
// //         console.log(err);
// //         return false;
// //       }
// //     }
// //     return true;
// //   };

// //   const fetchFeeStatusData = async () => {
// //     try {
// //       const feeStatusData = [];
// //       const querySnapshot = await firestore().collection('fees').get();
// //       querySnapshot.forEach(doc => {
// //         feeStatusData.push(doc.data());
// //       });
// //       return feeStatusData;
// //     } catch (error) {
// //       console.error('Error fetching fee status data:', error);
// //       Alert.alert('Error', 'Failed to fetch fee status data');
// //     }
// //   };

// //   const generatePDF = async (data) => {
// //     try {
// //       const page1 = PDFPage
// //         .create()
// //         .setMediaBox(200, 200)
// //         .drawText('Fee Status Report', {
// //           x: 5,
// //           y: 180,
// //           color: '#000000',
// //           fontSize: 12,
// //         });
      
// //       let yOffset = 160;
// //       data.forEach(item => {
// //         const text = `Name: ${item.name}, Status: ${item.status}, Amount: ${item.amount}`;
// //         page1.drawText(text, {
// //           x: 5,
// //           y: yOffset,
// //           color: '#000000',
// //           fontSize: 8,
// //         });
// //         yOffset -= 20;
// //       });

// //       const pdfPath = `${RNFS.DocumentDirectoryPath}/fee_status_report_${new Date().getTime()}.pdf`;
// //       const pdfDoc = await PDFDocument
// //         .create(pdfPath)
// //         .addPages(page1)
// //         .write();

// //       return pdfPath;
// //     } catch (error) {
// //       console.error('Error generating PDF:', error);
// //       Alert.alert('Error', 'Failed to generate PDF');
// //     }
// //   };

// //   const downloadReport = async () => {
// //     setLoading(true);
// //     const hasPermission = await requestStoragePermission();
// //     if (!hasPermission) {
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const data = await fetchFeeStatusData();
// //       if (data && data.length > 0) {
// //         const pdfPath = await generatePDF(data);
// //         Alert.alert('Success', `PDF Report generated and saved at: ${pdfPath}`);
// //       } else {
// //         Alert.alert('No Data', 'No fee status data available to generate the report');
// //       }
// //     } catch (error) {
// //       console.error('Error in downloadReport:', error);
// //       Alert.alert('Error', 'Failed to generate or download the report');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Reports</Text>
// //       <Button title="Generate and Download Report" onPress={downloadReport} disabled={loading} />
// //       {loading && <Text style={styles.loading}>Generating report, please wait...</Text>}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   loading: {
// //     marginTop: 20,
// //     fontSize: 16,
// //   },
// // });

// // export default Reports;







// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Alert, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFS from 'react-native-fs';

// const Reports = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       requestPermissions();
//     }
//     fetchData();
//   }, []);

//   const requestPermissions = async () => {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       ]);
//       if (
//         granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
//         granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         Alert.alert('Permissions required', 'Please grant the necessary permissions');
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const feesCollection = await firestore().collection('fees').get();
//       const fetchedData = feesCollection.docs.map(doc => doc.data());
//       setData(fetchedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const generatePDF = async () => {
//     try {
//       let htmlContent = '<h1>Fee Report</h1>';
//       data.forEach((item, index) => {
//         htmlContent += `<p>${index + 1}. ${item.name}: ${item.feeStatus}</p>`;
//       });

//       const options = {
//         html: htmlContent,
//         fileName: 'fee_report',
//         directory: 'Documents',
//       };

//       const file = await RNHTMLtoPDF.convert(options);
//       Alert.alert('Success', `PDF report generated at ${file.filePath}`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Fee Reports</Text>
//       <Button title="Generate PDF Report" onPress={generatePDF} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default Reports;

import React from 'react'
import { View,Text } from 'react-native'


const Reports=()=>{
    return(
        <View>
            <Text>REPORTS PAGE</Text>
        </View>
    )
}

export default Reports;