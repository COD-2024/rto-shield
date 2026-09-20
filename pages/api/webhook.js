import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const order = req.body;

    const shopifyId = String(order.id);
    const customerName = order.customer 
      ? `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim()
      : 'Unknown';
    const totalPrice = parseFloat(order.total_price) || 0;

    // Simple risk check (we will improve this later)
    let riskScore = 20;
    let riskStatus = "Safe";
    let riskReason = "Normal order";

    const address = order.shipping_address?.address1 || "";
    if (!address || address.length < 10) {
      riskScore = 75;
      riskStatus = "High Risk";
      riskReason = "Incomplete or suspicious address";
    }

    // Save to database
    await prisma.order.create({
      data: {
        shopifyId,
        customerName,
        totalPrice,
        riskScore,
        riskStatus,
        riskReason,
      },
    });

    console.log("Order saved:", shopifyId, riskStatus);

    return res.status(200).json({ message: "Order processed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error processing order" });
  }
}