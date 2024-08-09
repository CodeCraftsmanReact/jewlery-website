const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { line_items } = await request.json();
    const itemsArray = Object.values(line_items);
    const items = itemsArray.map((item: any) => ({
      price: item.default_price.id,
      quantity: item.quantity,
    }));
    const productInfo = await stripe.paymentLinks.create({
      line_items: items,
    });
    return Response.json(productInfo);
  } catch (err) {
    console.log(err);
    return Response.error();
  }
}
