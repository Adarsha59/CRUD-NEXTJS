// Import necessary modules
import connectDB from "@/libs/ConnectMongo";
import { NextResponse } from "next/server";
import dataModule from "@/models/DataModel.model";

// Define the GET function
export async function GET(request) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch data from the database
    const data = await dataModule.find();

    // Check if data was found
    if (data.length === 0) {
      // Return a 404 response if no data is found
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // Return a success response with the fetched data
    return NextResponse.json(
      { message: "Data retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    // Handle and log any errors
    console.error("Failed to fetch data:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
