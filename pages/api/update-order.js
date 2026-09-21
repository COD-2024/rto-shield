import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, action } = req.body;

    if (action === 'verify') {
      await prisma.order.update({
        where: { id },
        data: {
          riskStatus: 'Verified',
          riskScore: 10,
          riskReason: 'Manually verified',
        },
      });
    }

    if (action === 'block') {
      await prisma.order.update({
        where: { id },
        data: {
          riskStatus: 'Blocked',
          riskScore: 100,
          riskReason: 'Manually blocked',
        },
      });
    }

    return res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating order' });
  }
}