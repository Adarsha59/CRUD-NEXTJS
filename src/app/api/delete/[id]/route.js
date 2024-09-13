import connectDB from "@/libs/ConnectMongo";
import Item from "@/models/DataModel.model";
import mongoose from "mongoose";

export async function DELETE(request, { params }) {
  await connectDB(); // Ensure database connection is established

  const { id } = params; // Extract id from params

  try {
    // Validate id (e.g., check if it's a valid MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    // Perform the deletion
    const result = await Item.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Item deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Failed to delete item:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
