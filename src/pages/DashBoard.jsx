import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ReportDisplay from "./ReportDisplay";
import { FaDownload, FaRobot, FaInfoCircle } from "react-icons/fa";
import ChatBot from "./ChatBot";
import { VscDebugRestart } from "react-icons/vsc";

import { handleDownloadReport } from "../Component/download";

const DashBoard = () => {
  const [report, setReport] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleRestart = () => {
    setIsImage(false);
    setReport(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-2">
      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        {/* Left Panel */}
        <div className="w-full lg:w-2/5 flex flex-col bg-white rounded-xl shadow-2xl p-4">
          <h1 className="font-bold text-3xl sm:text-4xl text-black text-center mt-4 lg:mb-0 mb-5 ">
            <span className="text-red-500">Imagi</span>Dator
          </h1>

          <div className="flex-[0.7] flex items-center justify-center">
            <ImageUpload
              setReport={setReport}
              setIsImage={setIsImage}
              isImage={isImage}
            />
          </div>

          {/* Action Buttons */}
          {report && (
            <div className="flex-[0.3] flex items-center justify-center">
              <div className="flex justify-center gap-3 sm:gap-5">
                <button
                  className="p-3 m-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 transition"
                  title="Download"
                  onClick={handleRestart}
                >
                  <VscDebugRestart className="text-gray-600 text-xl" />
                </button>
                <button
                  className="p-3 m-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 transition"
                  title="Download"
                  onClick={() => handleDownloadReport(report)}
                >
                  <FaDownload className="text-gray-600 text-xl" />
                </button>

                <button
                  className="p-3 m-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 transition"
                  title="AI Action"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <FaRobot className="text-gray-600 text-xl" />
                </button>

                <button
                  className="p-3 m-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400 transition"
                  title="More Details"
                >
                  <FaInfoCircle className="text-gray-600 text-xl" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-3/5 bg-white rounded-xl shadow-xl p-4 flex items-center justify-center">
          <ReportDisplay report={report} />
        </div>
      </div>
      {/* ChatBot Button for Mobile */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaRobot size={24} />
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-10 right-10 w-90 h-auto cover  rounded-lg p-4">
          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
