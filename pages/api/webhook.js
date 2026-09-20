export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("New order received from Shopify:");
    console.log(req.body);

    return res.status(200).json({ message: "Order received" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}