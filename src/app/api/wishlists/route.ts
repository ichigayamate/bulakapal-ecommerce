export async function GET() {
  return Response.json({message: "Wishlist"});
}

export async function POST() {
  return Response.json({message: "Wishlist created"}, {status: 201});
}

export async function DELETE() {
  return Response.json({message: "Wishlist deleted"});
}