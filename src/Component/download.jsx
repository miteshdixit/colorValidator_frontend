import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// Helper function to convert RGB to readable format
const rgbToString = (rgb) => `rgb(${rgb.R}, ${rgb.G}, ${rgb.B})`;

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
});

// Document Component
const MyDocument = ({ report }) => {
  const paletteColors = Object.entries(report.palette).map(([key, value]) => ({
    name: key,
    color: rgbToString(value),
  }));

  const noIssues = report.report.accessibilityIssues?.length === 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* App Branding */}
        <View style={styles.header}>
          <Text style={styles.appName}>Imagidator</Text>
        </View>

        {/* Extracted Colors in Table */}
        <View style={styles.section}>
          <Text style={styles.heading}>Extracted Colors</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Color Name</Text>
              <Text style={styles.tableColHeader}>Color Value</Text>
            </View>
            {paletteColors.map((color, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{color.name}</Text>
                <Text style={styles.tableCol}>{color.color}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Accessibility Issues in Table */}
        <View style={styles.section}>
          <Text style={styles.heading}>Accessibility Check</Text>
          {noIssues ? (
            <Text style={styles.text}>✅ 10/10 - Everything is OK!</Text>
          ) : (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Issue</Text>
                <Text style={styles.tableColHeader}>Contrast Ratio</Text>
                <Text style={styles.tableColHeader}>Is Match</Text>
              </View>
              {report.report.accessibilityIssues.map((issue, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{issue.message}</Text>
                  <Text style={styles.tableCol}>{issue.contrastRatio}</Text>
                  <Text style={styles.tableCol}>
                    {report.report.colorMatching.isMatch ? "Yes ✅" : "No ❌"}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Closest Matching Brand Color */}
        <View style={styles.section}>
          <Text style={styles.heading}>Closest Brand Color</Text>
          {report.report.colorMatching.closestBrandColor ? (
            <Text style={styles.text}>
              {rgbToString(
                report.report.colorMatching.closestBrandColor.R,
                report.report.colorMatching.closestBrandColor.G,
                report.report.colorMatching.closestBrandColor.B
              )}
            </Text>
          ) : (
            <Text style={styles.text}>No closest brand color found</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Function to handle PDF download
const handleDownloadReport = async (report) => {
  const blob = await pdf(<MyDocument report={report} />).toBlob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Imagidator_ColorContrastReport.pdf";
  link.click();
};

export { MyDocument, handleDownloadReport };
