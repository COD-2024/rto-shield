import Link from 'next/Link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  const totalOrders = await prisma.order.count();

  const blockedCount = await prisma.order.count({
    where: { riskStatus: 'Blocked' }
  });

  const verifiedCount = await prisma.order.count({
    where: { riskStatus: 'Verified' }
  });

  const moneySaved = blockedCount * 250;

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      totalOrders,
      blockedCount,
      verifiedCount,
      moneySaved,
    },
  };
}

export default function Dashboard({ orders, totalOrders, blockedCount, verifiedCount, moneySaved }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
{/* Simple Menu */}
<div style={{ marginBottom: '25px', background: 'white', padding: '15px', borderRadius: '10px' }}>
  <Link href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Dashboard</Link>
  <Link href="/weekly" style={{ marginRight: '20px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Weekly Report</Link>
  <Link href="/monthly" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Monthly Report</Link>
</div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>RTO Shield</h1>
          <p style={{ margin: 0, color: '#666' }}>COD Verification Dashboard</p>
        </div>
        <div style={{ background: '#22c55e', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>
          ● Live
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Orders</p>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '32px' }}>{totalOrders}</h2>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Blocked Fakes</p>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#ef4444' }}>{blockedCount}</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#16a34a' }}>₹{moneySaved.toLocaleString()} saved</p>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Verified / Safe</p>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#16a34a' }}>{verifiedCount}</h2>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>RTO Risk Rate</p>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '32px' }}>
            {totalOrders > 0 ? Math.round((blockedCount / totalOrders) * 100) : 0}%
          </h2>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginTop: 0 }}>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '12px 8px' }}>Customer</th>
                <th style={{ padding: '12px 8px' }}>Amount</th>
                <th style={{ padding: '12px 8px' }}>Risk</th>
                <th style={{ padding: '12px 8px' }}>Reason</th>
                <th style={{ padding: '12px 8px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 8px' }}>{order.customerName}</td>
                  <td style={{ padding: '12px 8px' }}>₹{order.totalPrice}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{
                      background: order.riskStatus === 'Blocked' ? '#fee2e2' : 
                                  order.riskStatus === 'Verified' ? '#dcfce7' : '#fef9c3',
                      color: order.riskStatus === 'Blocked' ? '#b91c1c' : 
                             order.riskStatus === 'Verified' ? '#15803d' : '#a16207',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>
                      {order.riskStatus} ({order.riskScore})
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#555' }}>
                    {order.riskReason}
                  </td>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>
                    {order.riskStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}