import { useEffect, useState } from "react";
import postAPI from "../api/PostApi";
import PostCard from "../components/PostCard";
import { showError, showSuccess } from "../utils/toast";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await postAPI.getAllPosts(pageNum);
      const data = res.data.data;
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      showError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await postAPI.deletePost(id);
      showSuccess("Post deleted");
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
      showError("Could not delete post");
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Your Blog Posts
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))
      )}
      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
    </>
  );
}
