// Import necessary modules
import connectDB from "@/libs/ConnectMongo";
import { NextResponse } from "next/server";
import dataModule from "@/models/DataModel.model";

// Define the POST function
export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request data
    const data = await req.json();

    // Validate the request data
    if (!data.title || !data.details || !data.price) {
      // Return a 400 response if required fields are missing
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new data entry
    const newData = new dataModule({
      title: data.title,
      details: data.details,
      price: data.price,
    });

    // Save the new data to the database
    const newPost = await newData.save();

    // Log the received data
    console.log("Post created:", newPost);

    // Return a success response with the newly created data
    return NextResponse.json(
      { message: "Post created successfully", newPost },
      { status: 201 }
    );
  } catch (error) {
    // Handle and log any errors
    console.error("Failed to create new post:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to create new post" },
      { status: 500 }
    );
  }
}
