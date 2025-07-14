import { toast } from "react-hot-toast";

export const showSuccess = (msg) => {
  toast.success(msg, {
    style: {
      background: "#22c55e",
      color: "white",
    },
  });
};

export const showError = (msg) => {
  toast.error(msg, {
    style: {
      background: "#ef4444",
      color: "white",
    },
  });
};
