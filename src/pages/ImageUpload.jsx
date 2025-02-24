import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../api";

const ImageUpload = ({ setReport, setIsImage, isImage }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
    onDrop: async (files) => {
      const file = files[0];
      if (file) {
        setUploading(true);
        await handleFileUpload(file);
      }
    },
  });

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${API_URL}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setReport(response.data);
      setUploadedImage(response.data.fileUrl);
      setIsImage(true);
      setUploading(false);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Turn on backend - Failed", error);
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setReport(null);
    setIsImage(false);
  };

  return (
    <div className="flex item-center justify-center w-full h-1/2 align-middle">
      <div
        {...getRootProps()}
        className={`item-center border-2 w-full  border-dashed  rounded-lg lg:w-[400px]  p-6 cursor-pointer text-center transition-colors duration-200 relative h-80 ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />

        {uploadedImage && isImage ? (
          <div className="flex flex-col justify-center items-center align-middle  ">
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className=" rounded-lg object-cover m-auto h-60"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ) : (
          <>
            <FiUpload size={48} className="mx-auto text-gray-500 mt-6" />
            <h2 className="text-lg font-medium mt-2">
              {isDragActive
                ? "Drop image here"
                : "Drag image or click to upload"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPEG, PNG
            </p>

            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Browse Files
            </button>

            {uploading && (
              <h1 className="text-grey-100 text-md m-2 mt-3 ">Analysing...</h1>
            )}
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full animate-pulse"
                  style={{ width: `${uploading ? 100 : 0}%` }}
                ></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
