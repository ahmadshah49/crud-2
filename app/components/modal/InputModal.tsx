"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
interface ModalProps {
  onClose: () => void;
  title: String;
  isUpdate?: boolean;
}
const InputModal: React.FC<ModalProps> = ({ onClose, title, isUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseInt(value, 10) : value,
    }));
  };
  const postProductApi = async () => {
    try {
      if (!formData.title || !formData.description || !formData.price) {
        alert("please Fill All Fields");
        return;
      }
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: formData.title,
        description: formData.description,
        price: formData.price,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("http://localhost:3000/api", requestOptions);
      setLoading(false);
      setFormData({ title: "", description: "", price: 0 });
      alert("Product Created");
      onClose();
    } catch (error) {
      alert("error");
      console.log("Error While Post Products", error);
    } finally {
      setLoading(false);
    }
  };
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
    } else {
      postProductApi();
    }
  };
  return (
    <div className="bg-black/20  w-screen h-screen absolute inset-0">
      <div className="flex items-center justify-center w-full  h-full ">
        <div className="bg-white/50 b-f2 py-4 px-8 min-w-[500px] max-w-lg rounded-lg shadow-xl">
          <h1 className="text-center py-4 text-2xl font-bold text-red-500">
            {isUpdate ? "Update Products" : "Add Product"}
          </h1>
          <form onSubmit={HandleSubmit}>
            <div className="flex flex-col my-4">
              <label htmlFor="title">Product Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="
                outline-none
                px-2
                rounded-md
                py-[2px]
                focus:ring-1
                ring-inset
                focus:ring-blue-500
                "
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="title">Product Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="
                outline-none
                px-2
                rounded-md
                py-[2px]
                focus:ring-1
                ring-inset
                focus:ring-blue-500
                "
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="title">Product Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="
                outline-none
                px-2
                rounded-md
                py-[2px]
                focus:ring-1
                ring-inset
                focus:ring-blue-500
                "
              />
            </div>
            <div className=" my-8 flex justify-center items-center gap-4">
              <button
                type="submit"
                className="bg-blue-500  hover:bg-blue-600 transition-all text-white w-24 px-2 py-1 rounded"
              >
                {loading ? "loading..." : isUpdate ? "Update" : "Add"}
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 transition-all text-white w-24 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
