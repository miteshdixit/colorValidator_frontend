import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const AccessibilityReport = ({ accessibilityIssues }) => {
  const hasIssues = accessibilityIssues.length > 0;

  return (
    <div className="flex flex-col justify-center item-center space-y-6 lg:w-3/4 mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-start">
        Accessibility Contrast Analysis with Colors
      </h3>

      <div className="space-y-4">
        {hasIssues ? (
          accessibilityIssues.map((issue, index) => {
            const rating = Math.min(
              Math.round((issue.contrastRatio / 7) * 10),
              10
            );
            const improvementTip =
              issue.contrastRatio < 3
                ? "Increase the contrast by using darker text or a lighter background."
                : issue.contrastRatio < 4.5
                ? "Consider slightly increasing the contrast for better readability."
                : "✅ Great contrast! No improvements needed.";

            return (
              <div
                key={index}
                className={`p-4 ${
                  issue.contrastRatio < 4.5
                    ? "bg-yellow-100 border-l-4 border-yellow-500"
                    : "bg-green-100 border-l-4 border-green-500"
                } rounded-lg shadow-sm flex gap-4`}
              >
                {issue.contrastRatio < 4.5 ? (
                  <FaExclamationTriangle
                    size={24}
                    className="text-yellow-500 mt-1"
                  />
                ) : (
                  <FaCheckCircle size={24} className="text-green-600 " />
                )}

                <div className="flex-1">
                  <p className="text-gray-700 font-medium text-xl ">
                    {issue.message}
                  </p>
                  <p className="text-md text-gray-600 mt-1 font-medium">
                    Contrast Ratio: {issue.contrastRatio} (Minimum required:
                    4.5)
                  </p>
                  <p className="text-md font-bold text-gray-500 mt-2">
                    Contrast Difference:{" "}
                    {Math.abs(issue.contrastRatio - 4.5).toFixed(2)}
                  </p>

                  <div className="flex items-center mt-5 gap-1 bg-white p-3 rounded-lg justify-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex} className="text-3xl">
                        {rating >= 10 || starIndex < Math.ceil(rating / 2)
                          ? "⭐"
                          : ""}
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({rating}/10)
                    </span>
                  </div>

                  <p className="mt-3 text-md text-blue-800 font-medium">
                    {improvementTip}
                  </p>

                  <div className="flex mt-2 gap-2">
                    {issue.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="inline-block w-8 h-8 rounded-lg shadow-md"
                        style={{
                          backgroundColor: color,
                          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-5 bg-green-100 border-l-4 border-green-500 rounded-lg shadow-sm flex gap-4">
            <FaCheckCircle size={24} className="text-green-600 mt-1" />
            <div className="flex-1">
              <p className="text-green-900 font-bold text-lg mb-3">
                All colors meet accessibility standards!
              </p>
              <p className="text-lg text-gray-900 font-bold">
                Contrast Ratios: Perfect (≥ 4.5)
              </p>
              <div className="flex items-center mt-5 gap-1 bg-green-200 p-3 rounded-lg justify-center">
                {[...Array(5)].map((_, starIndex) => (
                  <span key={starIndex} className="text-3xl">
                    ⭐
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500">(10/10)</span>
              </div>
              <p className="mt-4 text-md text-green-800 font-medium">
                ✅ Excellent job! All colors provide great readability.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityReport;
