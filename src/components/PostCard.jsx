import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded shadow mb-4 cursor-pointer hover:bg-gray-50 transition">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="mb-2">{post.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag, idx) => (
          <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${post._id}`);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(post._id);
          }}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
