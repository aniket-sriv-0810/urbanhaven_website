import React, { useState, useEffect } from "react";

const BlogForm = ({ onSubmit, initialData, loading, isEditing }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Load Initial Data for Editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        image: initialData.image || null,
      });
      setPreview(initialData.image || null);
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setFormData, setPreview);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title Input */}
      <div>
        <label className="block text-gray-700 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-gray-700 font-semibold">Description</label>
        <textarea
          name="description"
          rows="4"
          placeholder="Enter blog description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
        ></textarea>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg hover:cursor-pointer focus:outline-none"
          required={!isEditing} // Required only if creating
        />
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mt-4 rounded-lg overflow-hidden shadow-md">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full p-2 mt-4 text-white rounded-xl shadow-md font-bold text-lg transition transform hover:scale-105 ${
          loading ? "bg-gradient-to-r from-blue-500 to-purple-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? (
          <span className="animate-pulse flex justify-center items-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEditing ? "Updating Blog..." : "Creating Blog..."}
          </span>
        ) : isEditing ? (
          "Update Blog Details"
        ) : (
          "Create Blog"
        )}
      </button>
    </form>
  );
};

export default BlogForm;
