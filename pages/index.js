export default function Home(){
 return(
  <div style={{padding:20,fontFamily:'system-ui',background:'#f6f7f9',minHeight:'100vh'}}>
   <div style={{maxWidth:1100,margin:'0 auto'}}>
    <div style={{background:'#111',color:'white',padding:24,borderRadius:16,display:'flex',justifyContent:'space-between'}}>
     <div><h1 style={{margin:0}}>🛡️ RTO Shield</h1><p style={{opacity:0.7}}>COD Verification & Fraud Control</p></div>
     <div style={{background:'#22c55e',padding:'8px 16px',borderRadius:20,fontSize:13,fontWeight:'bold'}}>● LIVE</div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:16,marginTop:20}}>
     <div style={{background:'white',padding:18,borderRadius:12,border:'1px solid #e5e7eb'}}><p style={{margin:0,fontSize:12,color:'#6b7280'}}>Total COD Orders</p><h2 style={{margin:'8px 0'}}>1,284</h2><p style={{margin:0,fontSize:12,color:'#22c55e'}}>Last 30 days</p></div>
     <div style={{background:'white',padding:18,borderRadius:12,border:'1px solid #e5e7eb'}}><p style={{margin:0,fontSize:12,color:'#6b7280'}}>Blocked Fake</p><h2 style={{margin:'8px 0'}}>187</h2><p style={{margin:0,fontSize:12,color:'#22c55e'}}>₹42,300 saved</p></div>
     <div style={{background:'white',padding:18,borderRadius:12,border:'1px solid #e5e7eb'}}><p style={{margin:0,fontSize:12,color:'#6b7280'}}>OTP Verified</p><h2 style={{margin:'8px 0'}}>89%</h2><p style={{margin:0,fontSize:12,color:'#22c55e'}}>+12% vs last month</p></div>
     <div style={{background:'white',padding:18,borderRadius:12,border:'1px solid #e5e7eb'}}><p style={{margin:0,fontSize:12,color:'#6b7280'}}>RTO Rate</p><h2 style={{margin:'8px 0'}}>18.4%</h2><p style={{margin:0,fontSize:12,color:'#22c55e'}}>↓ from 31%</p></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginTop:16}}>
     <div style={{background:'white',padding:20,borderRadius:12,border:'1px solid #e5e7eb'}}>
      <h3>📊 RTO Analytics - What is it?</h3>
      <div style={{background:'#f9fafb',padding:16,borderRadius:8}}>
       <p><b>RTO Analytics</b> shows Return to Origin analysis:</p>
       <ul style={{fontSize:14,lineHeight:'24px'}}><li>🔴 High RTO Pincodes: 110001 (42%), 400001 (38%)</li><li>⚠️ Duplicate: 23 orders same phone</li><li>📉 You saved ₹42,300 blocking fake COD</li><li>💡 Tip: Disable COD for 110001</li></ul>
      </div>
     </div>
     <div style={{background:'white',padding:20,borderRadius:12,border:'1px solid #e5e7eb'}}>
      <h3>⚙️ Settings</h3>
      <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #eee'}}><span>WhatsApp OTP</span><span style={{color:'#22c55e',fontWeight:'bold'}}>ON ✓</span></div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #eee'}}><span>Fake Blocker</span><span style={{color:'#22c55e',fontWeight:'bold'}}>ON ✓</span></div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0'}}><span>Prepaid Nudge</span><span style={{color:'#9ca3af'}}>OFF</span></div>
     </div>
    </div>
   </div>
  </div>
 )
}
