const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { items, email } = req.body;

    // Transform items into Stripe format
    const transformedItems = items.map((item) => ({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100), // Convert to cents
        product_data: {
          name: item.title,
          description: item.description, // Optional
          images: [item.image], // Optional
        },
      },
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
