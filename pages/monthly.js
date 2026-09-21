import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const blocked = orders.filter(o => o.riskStatus === 'Blocked');
  const moneySaved = blocked.length * 250;

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      blockedCount: blocked.length,
      moneySaved,
      totalOrders: orders.length
    }
  };
}

export default function MonthlyReport({ orders, blockedCount, moneySaved, totalOrders }) {
  return (
    <div style={{ fontFamily: 'Arial', background: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      
      {/* Simple Menu */}
      <div style={{ marginBottom: '30px', background: 'white', padding: '15px', borderRadius: '10px' }}>
        <Link href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Dashboard</Link>
        <Link href="/weekly" style={{ marginRight: '20px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Weekly Report</Link>
        <Link href="/monthly" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Monthly Report</Link>
      </div>

      <h1>Monthly Report (Last 30 Days)</h1>

      <div style={{ display: 'flex', gap: '20px', margin: '30px 0' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', minWidth: '180px' }}>
          <p>Total Orders</p>
          <h2>{totalOrders}</h2>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', minWidth: '180px' }}>
          <p>Blocked RTOs</p>
          <h2 style={{ color: 'red' }}>{blockedCount}</h2>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', minWidth: '180px' }}>
          <p>Money Saved</p>
          <h2 style={{ color: 'green' }}>₹{moneySaved.toLocaleString()}</h2>
        </div>
      </div>

      <h3>Blocked Orders This Month</h3>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
        {blockedCount === 0 ? (
          <p>No blocked orders in the last 30 days</p>
        ) : (
          orders.filter(o => o.riskStatus === 'Blocked').map(order => (
            <div key={order.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <strong>{order.customerName}</strong> — ₹{order.totalPrice}  
              <br />
              <span style={{ color: '#666' }}>{order.riskReason}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}