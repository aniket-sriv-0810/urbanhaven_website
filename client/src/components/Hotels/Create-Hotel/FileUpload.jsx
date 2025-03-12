import React from "react";

const FileUpload = ({ image, setImage, preview, setPreview }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Hotel Image
      </label>
      <div
        className="relative w-full p-6 text-center border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-500">
            Drag & drop an image here, or{" "}
            <span className="text-blue-500 underline">browse</span>
          </p>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image"
          className="hidden"
          onChange={handleFileChange}
          required
          name="image"
        />
      </div>
      {image && (
        <p className="text-sm text-green-500 mt-2">
          {image.name} selected successfully!
        </p>
      )}
    </div>
  );
};

export default FileUpload;
