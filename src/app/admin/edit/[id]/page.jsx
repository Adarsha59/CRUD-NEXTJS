"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/read`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        const matchedItem = result.data.find((item) => item._id === id);
        if (matchedItem) {
          reset(matchedItem); // Pre-fill the form with fetched data
        } else {
          throw new Error("Item not found");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);
  const [data, stateData] = useState("");

  const onSubmit = async (data) => {
    try {
      const api = await fetch(`http://localhost:3000/api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const apiResponse = await api.json();
      stateData(apiResponse);
      router.push("/admin/dashboard");
      console.log("object created" + apiResponse);
    } catch (error) {
      console.error("Error creating new post:", error);
      alert("Failed to add data");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #3498db, #2980b9)",
        backgroundSize: "4000% 4000%",
        animation: "gradient-animation 10s ease-in-out infinite",
      }}
    >
      <div className="p-10 w-screen bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Input Form
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              placeholder="Type the title here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              id="details"
              {...register("details")}
              placeholder="Type the details here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows={4}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price")}
              placeholder="Type the price here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
