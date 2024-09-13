import connectDB from "@/libs/ConnectMongo";
import Item from "@/models/DataModel.model";
export async function PUT(request, context) {
  await connectDB();
  const { id } = context.params; // Extract id from context.params
  const body = await request.json(); // Parse JSON request body
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Item updated successfully",
        data: updatedItem,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
