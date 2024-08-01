const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const productInfo = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });
    return Response.json(productInfo);
  } catch (err) {
    return Response.error();
  }
}
