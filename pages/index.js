export default function Home(){
 const orders=[
  {id:'#COD-89241',name:'Rohan P.',amt:'₹2,499',risk:'72 • High',status:'Flagged - Address Mismatch'},
  {id:'#COD-89218',name:'Anita K.',amt:'₹1,190',risk:'64 • Med',status:'Pending Verification'},
  {id:'#COD-89195',name:'Sahil M.',amt:'₹3,250',risk:'85 • Critical',status:'Blocked - Duplicate COD'},
 ]
 return(
  <div style={{fontFamily:'Inter,sans-serif',minHeight:'100vh',background:'linear-gradient(135deg,#eef2ff 0%,#e0e7ff 25%,#fae8ff 40%,#fce7f3 100%)'}}>
   <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap');*{font-family:Inter}`}</style>
   <div style={{background:'#0f172a',padding:'14px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:34,height:34,background:'linear-gradient(135deg,#8b5cf6,#6366f1)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center'}}>🛡️</div><div><div style={{color:'white',fontWeight:800}}>RTO Shield</div><div style={{color:'#a5b4fc',fontSize:10}}>COD Verification</div></div></div>
    <span style={{background:'#1e293b',color:'#22c55e',padding:'6px 12px',borderRadius:20,fontSize:11}}>● LIVE • API Ready</span>
   </div>
   <div style={{maxWidth:1100,margin:'0 auto',padding:20}}>
    <h1 style={{margin:'0 0 4px',fontSize:26,fontWeight:800,color:'#0f172a'}}>COD Verification Dashboard</h1>
    <p style={{margin:0,color:'#64748b',fontSize:12}}>Monitor RTO risk • Last 30 days • API: /api/verify</p>
    
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginTop:18}}>
     {[{t:'Total Orders',v:'1,284',g:'+8.2%'},{t:'Blocked Fake',v:'187',g:'₹42.3k saved'},{t:'Verified',v:'89%',g:'+12%'},{t:'RTO Rate',v:'18.4%',g:'↓ from 31%'}].map(x=>(
      <div key={x.t} style={{background:'white',padding:16,borderRadius:14,boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}><p style={{margin:0,fontSize:10,color:'#64748b',textTransform:'uppercase'}}>{x.t}</p><h2 style={{margin:'6px 0 0',fontSize:26}}>{x.v}</h2><span style={{fontSize:11,color:'#16a34a',background:'#f0fdf4',padding:'2px 8px',borderRadius:10}}>{x.g}</span></div>
     ))}
    </div>

    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:14,marginTop:14}}>
     <div style={{background:'white',borderRadius:14,padding:18,boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
      <h3 style={{margin:0,fontSize:16}}>Verification Trend</h3>
      <p style={{margin:'4px 0 12px',fontSize:11,color:'#64748b'}}>Daily verified vs RTO flagged orders</p>
      <svg viewBox="0 0 400 120" style={{width:'100%',height:120}}><path d="M0,80 Q30,60 60,55 T120,65 T180,50 T240,45 T300,55 T400,40" fill="none" stroke="#6366f1" strokeWidth="2.5"/><path d="M0,90 Q30,85 60,80 T120,75 T180,80 T240,70 T300,75 T400,80" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.6"/><circle cx="400" cy="40" r="4" fill="#6366f1"/><circle cx="400" cy="80" r="4" fill="#f43f5e"/></svg>
      <div style={{display:'flex',gap:12,fontSize:11,marginTop:8}}><span>🔵 Verified</span><span>🔴 RTO Flagged</span><span style={{marginLeft:'auto',color:'#64748b'}}>Oct 4 - Oct 22</span></div>
     </div>
     <div style={{background:'white',borderRadius:14,padding:18,boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
      <h3 style={{margin:'0 0 12px',fontSize:16}}>Recent Flagged Orders</h3>
      {orders.map(o=>(
       <div key={o.id} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f1f5f9',fontSize:12}}><div><b>{o.id}</b><div style={{color:'#64748b'}}>{o.name} • {o.amt}</div></div><div style={{textAlign:'right'}}><div style={{background:'#fef2f2',color:'#dc2626',padding:'2px 6px',borderRadius:6,fontSize:10}}>{o.risk}</div><div style={{fontSize:10,color:'#64748b',marginTop:2}}>{o.status}</div></div></div>
      ))}
      <button style={{width:'100%',marginTop:10,background:'#0f172a',color:'white',border:0,padding:10,borderRadius:8,fontSize:12}}>View All Flagged →</button>
     </div>
    </div>
   </div>
  </div>
 )
}
