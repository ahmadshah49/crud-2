"use client";

import { useState } from "react";

interface buttonProps {
  id: string;
}
const Button: React.FC<buttonProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const deleteHandler = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: id,
      });

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3000/api", requestOptions);
      alert("Product Deleted");
    } catch (error) {
      console.log("Error While Deleting", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={deleteHandler}
      className="bg-red-500 hover:bg-red-600 transition-all text-white px-3 py-1 rounded"
    >
      {loading ? "loading..." : "  Delete"}
    </button>
  );
};

export default Button;
