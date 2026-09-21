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
    const address = order.shipping_address?.address1 || '';
    const phone = order.shipping_address?.phone || order.customer?.phone || '';

    // ===== RISK ENGINE =====
    let riskScore = 20;
    let riskStatus = 'Safe';
    let riskReason = 'Normal order';

    // Check 1: Address quality
    if (!address || address.length < 12) {
      riskScore += 40;
      riskReason = 'Incomplete or suspicious address';
    }

    // Check 2: Phone number missing
    if (!phone || phone.length < 8) {
      riskScore += 25;
      riskReason = 'Missing or invalid phone number';
    }

    // Check 3: Very high order value (example rule)
    if (totalPrice > 3000) {
      riskScore += 15;
      riskReason = 'High order value';
    }

    // Final decision
    if (riskScore >= 71) {
      riskStatus = 'Blocked';
      riskReason = riskReason + ' - Auto blocked';
    } else if (riskScore >= 31) {
      riskStatus = 'Waiting';
      riskReason = 'Moderate risk - Waiting for WhatsApp confirmation';
    } else {
      riskStatus = 'Verified';
      riskReason = 'Low risk - Auto verified';
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

    console.log('Order processed:', shopifyId, riskStatus, riskScore);

    return res.status(200).json({ message: 'Order processed successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error processing order' });
  }
}