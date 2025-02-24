import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiCheck, FiCopy } from "react-icons/fi";
import AccessibilityReport from "../Component/Accessibility";

const brandColors = {
  Primary: [
    { name: "Red", rgb: [255, 0, 0] },
    { name: "Deep Navy", rgb: [0, 61, 165] },
  ],
  Secondary: [
    { name: "Light Blue", rgb: [114, 181, 232] },
    { name: "Gray", rgb: [84, 88, 90] },
  ],
  Accent: [
    { name: "Yellow", rgb: [255, 182, 18] },
    { name: "Green", rgb: [21, 139, 69] },
  ],
};

// Color Swatch Component
const ColorSwatch = ({ color, label, isMatch }) => (
  <div className="text-center">
    <div
      className="w-24 h-24 rounded-lg mx-auto border-2"
      style={{ backgroundColor: color, borderColor: "#ddd" }}
    />
    <p className="mt-2 text-sm font-medium flex items-center justify-center gap-1">
      {label}{" "}
      {isMatch ? (
        <FaCheckCircle size={16} className="text-green-500" />
      ) : (
        <FaTimesCircle size={16} className="text-red-500" />
      )}
    </p>
    <p className="text-xs text-gray-500">{color}</p>
  </div>
);

// Main Report Component
const ReportDisplay = ({ report }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleCopy = (rgbValue) => {
    navigator.clipboard.writeText(rgbValue).then(() => {
      setCopiedColor(rgbValue);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  };

  if (!report) {
    return (
      <div className="flex flex-col justify-center text-center align-middle">
        <h1 className="text-5xl font-bold text-red-500 mb-4">
          Upload An Image First For Report!
        </h1>
        <img className="w-3/5 mx-auto " src="/uploadImage.png" alt="girl" />
      </div>
    );
  }

  console.log(report);
  const { extractedColors, colorMatching, accessibilityIssues } = report.report;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Analysis Report
        </h2>
      </div>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <AccessibilityReport accessibilityIssues={accessibilityIssues} />
      </div>

      <hr className="my-6 border-t border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Closest Brand Color */}
        <div className="p-1 shadow-2xl  rounded-3xl bg-white">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Closest Brand Color
          </h3>
          <ColorSwatch
            color={`rgb(${colorMatching.closestBrandColor.R}, ${colorMatching.closestBrandColor.G}, ${colorMatching.closestBrandColor.B})`}
            label="Closest Match"
            isMatch={colorMatching.isMatch}
          />
        </div>

        {/* Extracted Colors */}
        <div className="p-1 shadow-2xl rounded-3xl bg-white">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Extracted Colors
          </h3>

          {Object.entries(report.palette).map(([key, color], index) => {
            const rgbValue = `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;

            return (
              <div
                key={index}
                className="flex items-center gap-2 mb-2 justify-center"
              >
                <div
                  className="md:w-3/4  h-12 rounded-lg shadow-md flex items-center justify-center relative cursor-pointer group"
                  style={{
                    backgroundColor: rgbValue,
                  }}
                  onClick={() => handleCopy(rgbValue)}
                >
                  {/* RGB Text Overlay */}
                  <span className="text-sm text-white font-medium  bg-opacity-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                    {rgbValue}
                  </span>

                  {/* Copy Icon Feedback */}
                  {copiedColor === rgbValue && (
                    <FiCheck className="absolute top-1 right-1 text-green-300" />
                  )}
                  {copiedColor !== rgbValue && (
                    <FiCopy className="absolute top-1 right-1 text-white group-hover:opacity-100 opacity-0 transition" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-1 shadow-2xl rounded-3xl bg-white">
          {/* Brand Colors Section */}
          <div className="flex flex-col  p-1  w-full items-center gap-4 justify-center">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Brand Colors
            </h3>
            {Object.entries(brandColors).map(([category, colors], index) => (
              <div key={index} className="mb-3 items-center flex flex-col ">
                <h4 className="text-lg font-semibold mb-2">
                  {category} Colors
                </h4>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg shadow-md flex items-center justify-center"
                      style={{
                        backgroundColor: `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`,
                      }}
                    >
                      <span className="text-xs text-white font-bold">
                        {color.name[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDisplay;
