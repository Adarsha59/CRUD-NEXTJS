"use client"; // Ensure this is placed at the top if using Next.js App Router

import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";

const Data = () => {
  const [data, setData] = useState([]); // Use `data` and `setData` for state management

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/read`
        );
        if (!response.ok) {
          // Check if the response is OK
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error.message); // Update state with error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Data Shown Here
        </h1>
        <Link href="./admin/dashboard">
          <button className="btn glass">ADMIN-DASHBOARD</button>
        </Link>

        <p className="text-lg text-gray-600">
          This is where you will display the fetched data in a beautiful way.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
          {data.map((item) => (
            <Card key={item._id} {...item} /> // Spread item as props for Card
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
