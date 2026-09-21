import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  const totalOrders = await prisma.order.count();
  const highRisk = await prisma.order.count({
    where: { riskStatus: 'High Risk' },
  });

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      totalOrders,
      highRisk,
    },
  };
}

export default function Dashboard({ orders, totalOrders, highRisk }) {
  return (
    <div style={{ fontFamily: 'Arial', padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '10px' }}>RTO Shield - COD Verification</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Live Dashboard</p>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', minWidth: '180px' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalOrders}</p>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', minWidth: '180px' }}>
          <h3>High Risk</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'red' }}>{highRisk}</p>
        </div>
      </div>

      <h2>Recent Orders</h2>
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px' }}>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
              <strong>{order.customerName}</strong> — ₹{order.totalPrice}  
              <span style={{ 
                marginLeft: '15px', 
                color: order.riskStatus === 'High Risk' ? 'red' : 'green',
                fontWeight: 'bold'
              }}>
                {order.riskStatus} ({order.riskScore})
              </span>
              <div style={{ fontSize: '13px', color: '#666' }}>{order.riskReason}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}