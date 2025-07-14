import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postAPI from "../api/PostApi";
import { showError, showSuccess } from "../utils/toast";
import Navbar from "../components/Navbar";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postAPI.getPostById(id);
        const post = res.data.data;
        setTitle(post.title || "");
        setContent(post.content || "");
        setTags((post.tags || []).join(", "));
      } catch (err) {
        showError(err.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!content.trim()) newErrors.content = "Content is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const postData = {
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };
    try {
      await postAPI.updatePost(id, postData);
      showSuccess("Post updated successfully");
      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Content<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={6}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Tags{" "}
              <span className="text-gray-500 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. react, javascript, webdev"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Edit Post"}
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
