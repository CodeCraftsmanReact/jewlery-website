const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 100,
      expand: ["data.default_price"],
    });

    return Response.json(products.data);
  } catch (err) {
    return Response.error();
  }
}
