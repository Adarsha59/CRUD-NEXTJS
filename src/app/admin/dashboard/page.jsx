"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [items, setData] = useState([]);

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
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Remove item from local state
      setData(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md py-4 px-6 rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          <Link href="/">
            <button className="btn size-120 glass">
              ADMIN-DASHBOARD || HOME{" "}
            </button>
          </Link>
        </h1>
        <nav>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition duration-200"
          >
            Logout
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Manage Items
          </h2>
          <Link href="/admin/add">
            {" "}
            {/* Updated href to an absolute path */}
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold shadow-lg transition duration-200">
              ADD DATA
            </button>
          </Link>
        </div>

        <table className="w-full table-auto bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm uppercase tracking-wider text-gray-600">
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Price</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="px-6 py-4 text-lg text-gray-800 font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{item.details}</td>
                <td className="px-6 py-4 text-gray-700">${item.price}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-4">
                    <Link href={`/admin/edit/${item._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold shadow-lg transition duration-200">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold shadow-lg transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-gray-600">
          © 2024 Admin Panel. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminPanel;
