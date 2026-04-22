import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, ReferenceLine } from "recharts";

var G="#34C759",W="#FF9500",B="#FF3B30",BL="#007AFF",IN="#5856D6",TE="#5AC8FA",G1="#8E8E93",G5="#E5E5EA",G6="#F2F2F7";
var TS={fontSize:10,fill:G1},GC="#f0f0f3";
var TT={contentStyle:{background:"rgba(255,255,255,.96)",border:"none",borderRadius:12,fontSize:12,boxShadow:"0 4px 24px rgba(0,0,0,.08)",padding:"10px 14px"}};
var WK=["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12"];
var DY=Array.from({length:30},function(_,i){var d=new Date(2026,2,23+i);return d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})});
function sH(v,a,b){if(b!==undefined)return v>=a?"good":v>=b?"warn":"bad";return v>=a?"good":"bad"}
function sL(v,a,b){if(b!==undefined)return v<a?"good":v<b?"warn":"bad";return v<a?"good":"bad"}
function vM(f){var m=1;if(f.ut==="free")m*=.72;if(f.ut==="prem")m*=.28;if(f.ut==="trial")m*=.08;if(f.ch==="organic")m*=.42;if(f.ch==="meta")m*=.22;if(f.ch==="google")m*=.16;if(f.ch==="tiktok")m*=.12;if(f.ch==="asa")m*=.08;if(f.pl==="ios")m*=.62;if(f.pl==="android")m*=.38;return m}
function qM(f){var q=1;if(f.ut==="prem")q=1.35;if(f.ut==="trial")q=1.12;if(f.ut==="free")q=.82;if(f.ch==="asa")q*=1.18;if(f.ch==="tiktok")q*=.72;if(f.ch==="organic")q*=1.08;if(f.pl==="ios")q*=1.06;if(f.pl==="android")q*=.94;return q}
function bD(f){
var v=vM(f),q=qM(f),isP=f.ut==="prem",isF=f.ut==="free";
var dau=Math.round(4283*v),mau=Math.round(38540*v);
var ch=isP?4.2:isF?12.8:8.6,chA=+(ch/q).toFixed(1);
var arppu=+(8.40*q).toFixed(2),ltv=+(arppu*8.2*q).toFixed(2);
var cM={organic:0,meta:1.8,google:2.3,tiktok:.9,asa:3.1,all:1.95},cac=cM[f.ch]||1.95;
var lc=cac>0?+(ltv/cac).toFixed(1):999,mrr=Math.round(12470*v*(isP?1:isF?.15:.35));
var d1=Math.min(95,Math.round(44*q)),d7=Math.min(80,Math.round(19*q)),d30=Math.min(60,Math.round(8*q));
var arpu=mau>0?+((mrr+2340*v)/mau).toFixed(2):0,pb=cac>0?Math.round(cac/(arppu/30)/q):0;
var E=String.fromCharCode(8364);
return{
m:{dau:dau.toLocaleString(),mau:mau.toLocaleString(),mrr:E+mrr.toLocaleString(),arr:E+(mrr*12).toLocaleString(),arpu:E+arpu,arppu:E+arppu,ltv:E+ltv,cac:cac>0?E+cac:E+"0",lc:lc>=999?String.fromCharCode(8734):lc+"x",churn:chA+"%",stick:(mau>0?(dau/mau*100).toFixed(1):0)+"%",t2p:Math.min(95,+(38.2*q).toFixed(1))+"%",pb:pb+"j",d1:d1+"%",d7:d7+"%",d30:d30+"%",sess:(1.6*q).toFixed(1),acc:Math.min(98,Math.round(64*q))+"%",onb:Math.min(95,Math.round(45.7*q))+"%",adR:E+Math.round(2340*v)},
dauT:DY.map(function(d,i){return{d:d,v:Math.max(0,Math.round((3400+Math.sin(i*.3)*600+i*30)*v))}}),
mrrT:WK.map(function(w,i){return{w:w,v:Math.round((8200+i*380)*v*(isP?1:.35))}}),
chT:WK.map(function(w,i){return{w:w,v:+(chA+Math.sin(i*.4)*1.2).toFixed(1)}}),
ltT:WK.map(function(w,i){return{w:w,v:+(ltv*(.3+i*.065)).toFixed(1)}}),
rC:Array.from({length:31},function(_,i){return{j:i,p:Math.max(0,Math.round(100*Math.exp(-(isP?.035:isF?.085:.055)*i/q)))}}),
oF:[{s:"Pas de compte",v:Math.round(18400*v)},{s:"Vid\u00e9o",v:Math.round(16800*v)},{s:"Age/Goal/Level",v:Math.round(15200*v)},{s:"Quiz (3 Q)",v:Math.round(12800*v*q)},{s:"Objectif quotidien",v:Math.round(11100*v*q)},{s:"Notifications",v:Math.round(10200*v*q)},{s:"Cr\u00e9ation compte",v:Math.round(9400*v*q)},{s:"App (suivre)",v:Math.round(8400*v*q)}],
qT:[{t:"V/F",a:Math.min(98,Math.round(81*q))},{t:"QCM",a:Math.min(98,Math.round(74*q))},{t:"Assoc",a:Math.min(98,Math.round(63*q))},{t:"Chrono",a:Math.min(98,Math.round(58*q))},{t:"Range",a:Math.min(98,Math.round(51*q))},{t:"Texte",a:Math.min(98,Math.round(42*q))}],
dp:[{e:"Antiquit\u00e9",u:Math.round(8400*v),p:Math.min(100,Math.round(72*q))},{e:"Moyen \u00c2ge",u:Math.round(5200*v),p:Math.min(100,Math.round(54*q))},{e:"Renaissance",u:Math.round(3100*v),p:Math.min(100,Math.round(38*q))},{e:"Lumi\u00e8res",u:Math.round(1800*v),p:Math.min(100,Math.round(22*q))},{e:"R\u00e9volutions",u:Math.round(980*v),p:Math.min(100,Math.round(15*q))},{e:"Contemporain",u:Math.round(420*v),p:Math.min(100,Math.round(8*q))}],
pF:[{s:"Paywall vu",v:Math.round(14200*v)},{s:"Scroll",v:Math.round(8900*v)},{s:"CTA click",v:Math.round(3100*v*q)},{s:"Achat lanc\u00e9",v:Math.round(1850*v*q)},{s:"Achat OK",v:Math.round(1480*v*q)}],
ro:[{ch:"ASA",v:+(2.06*q).toFixed(2)},{ch:"Meta",v:+(1.73*q).toFixed(2)},{ch:"Google",v:+(1.28*q).toFixed(2)},{ch:"TikTok",v:+(0.86*q).toFixed(2)}],
rCh:[{ch:"Organic",d1:Math.round(48*q),d7:Math.round(24*q),d30:Math.round(12*q)},{ch:"ASA",d1:Math.round(51*q),d7:Math.round(28*q),d30:Math.round(14*q)},{ch:"Meta",d1:Math.round(42*q),d7:Math.round(18*q),d30:Math.round(8*q)},{ch:"Google",d1:Math.round(38*q),d7:Math.round(15*q),d30:Math.round(6*q)},{ch:"TikTok",d1:Math.round(35*q),d7:Math.round(11*q),d30:Math.round(4*q)}],
co:[{w:"S-6",d1:Math.round(41*q),d3:Math.round(27*q),d7:Math.round(17*q),d14:Math.round(11*q),d30:Math.round(7*q)},{w:"S-5",d1:Math.round(45*q),d3:Math.round(31*q),d7:Math.round(21*q),d14:Math.round(14*q),d30:null},{w:"S-4",d1:Math.round(43*q),d3:Math.round(29*q),d7:Math.round(19*q),d14:null,d30:null},{w:"S-3",d1:Math.round(46*q),d3:Math.round(32*q),d7:null,d14:null,d30:null}],
ps:[{s:"Onboarding",r:+(16.8*q).toFixed(1)},{s:"Pack lock",r:+(12.9*q).toFixed(1)},{s:"Vies",r:+(11.1*q).toFixed(1)},{s:"Post-le\u00e7on",r:+(9.0*q).toFixed(1)},{s:"Settings",r:+(4.0*q).toFixed(1)}],
mb:WK.map(function(w,i){return{w:w,n:Math.round((1800+i*80)*v),r:Math.round((7200+i*120)*v),l:-Math.round((1200+i*20)*v)}}),
qz:[{q:"Q1",v:Math.min(99,Math.round(82*q))},{q:"Q2",v:Math.min(99,Math.round(68*q))},{q:"Q3",v:Math.min(99,Math.round(54*q))}],
engD:DY.map(function(d,i){return{d:d,les:+(1.2+Math.sin(i*.2)*.5).toFixed(1),acc:Math.min(98,Math.round((62+Math.sin(i*.15)*8)*q))}}),
stars:[{s:"1 star",c:Math.round(3200*v)},{s:"2 stars",c:Math.round(4100*v)},{s:"3 stars",c:Math.round(4050*v)}],
cpiL:[{ch:"Organic",cpi:0,ltv:+(4.2*q).toFixed(1)},{ch:"Meta",cpi:1.8,ltv:+(5.1*q).toFixed(1)},{ch:"Google",cpi:2.3,ltv:+(3.8*q).toFixed(1)},{ch:"TikTok",cpi:.9,ltv:+(2.1*q).toFixed(1)},{ch:"ASA",cpi:3.1,ltv:+(6.4*q).toFixed(1)}],
instS:WK.map(function(w,i){return{w:w,organic:Math.round((800+i*20)*v),meta:Math.round((450+i*10)*v),google:Math.round(320*v),tiktok:Math.round((180+i*15)*v),asa:Math.round(120*v)}}),
pErr:[{t:"Card declined",c:Math.round(124*v)},{t:"Network",c:Math.round(98*v)},{t:"Store",c:Math.round(72*v)},{t:"Cancel",c:Math.round(58*v)}],
t2ch:[{r:"1-2j",p:32},{r:"3-5j",p:24},{r:"6-14j",p:22},{r:"15-30j",p:14},{r:"30j+",p:8}],
fsl:[{n:"0",v:Math.round(18*v/q)},{n:"1",v:Math.round(42*v*q)},{n:"2",v:Math.round(24*v*q)},{n:"3",v:Math.round(10*v*q)},{n:"4+",v:Math.round(6*v*q)}]
}}

function Seg(p){return(<div style={{display:"inline-flex",background:G6,borderRadius:9,padding:2,gap:1}}>{p.opts.map(function(o){return(<button key={o.v} onClick={function(){p.set(o.v)}} style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:p.val===o.v?600:400,border:"none",cursor:"pointer",fontFamily:"inherit",background:p.val===o.v?"#fff":"transparent",color:p.val===o.v?"#1d1d1f":G1,boxShadow:p.val===o.v?"0 1px 4px rgba(0,0,0,.08)":"none"}}>{o.l}</button>)})}</div>)}
function Mc(p){var bc=p.status==="good"?G:p.status==="bad"?B:p.status==="warn"?W:"transparent";return(<div style={{padding:"14px 16px",borderRadius:14,background:"#fff",flex:"1 1 150px",minWidth:140,boxShadow:"0 .5px 2px rgba(0,0,0,.04)",border:"1px solid rgba(0,0,0,.04)",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:bc,opacity:.8}} /><div style={{fontSize:10.5,color:G1,marginBottom:4,fontWeight:500}}>{p.label}</div><div style={{fontSize:20,fontWeight:700,color:"#1d1d1f"}}>{p.value}</div>{p.sub&&<div style={{fontSize:10,color:G1,marginTop:3,lineHeight:1.35}}>{p.sub}</div>}</div>)}
function Cc(p){return(<div style={{padding:"16px 18px",borderRadius:14,background:"#fff",gridColumn:p.wide?"1/-1":undefined,boxShadow:"0 .5px 2px rgba(0,0,0,.04)",border:"1px solid rgba(0,0,0,.04)"}}><div style={{fontSize:13,fontWeight:600,color:"#1d1d1f",marginBottom:p.help?2:10}}>{p.title}</div>{p.help&&<div style={{fontSize:10.5,color:G1,lineHeight:1.45,padding:"5px 10px",background:G6,borderRadius:8,marginBottom:12}}>{"Lecture : "+p.help}</div>}{p.children}</div>)}
function Note(p){var c={good:{bg:"#f0fdf4",b:"#bbf7d0",c:"#166534"},warn:{bg:"#fffbeb",b:"#fde68a",c:"#92400e"},bad:{bg:"#fef2f2",b:"#fecaca",c:"#991b1b"},info:{bg:"#eff6ff",b:"#bfdbfe",c:"#1e40af"}};var s=c[p.type]||c.info;return(<div style={{padding:"10px 14px",borderRadius:10,background:s.bg,border:"1px solid "+s.b,marginBottom:6,fontSize:12,color:s.c,lineHeight:1.5,fontWeight:500}}>{p.text}</div>)}
function HelpBox(p){return(<div style={{padding:"14px 16px",borderRadius:14,background:"linear-gradient(135deg,#eef2ff,#f5f3ff)",border:"1px solid #c7d2fe",marginBottom:14}}><div style={{fontSize:13,fontWeight:700,color:IN,marginBottom:4}}>{p.title}</div><div style={{fontSize:12,color:"#4a4a5e",lineHeight:1.55}}>{p.text}</div></div>)}
function FnlC(p){
var mx=p.data[0].v,last=p.data[p.data.length-1].v;
var gConv=((last/mx)*100).toFixed(1),gLoss=(100-parseFloat(gConv)).toFixed(1);
return(<div>
{p.data.map(function(d,i){
var w=Math.max(28,(d.v/mx)*100);var pv=i>=1?p.data[i-1].v:d.v;
var dr=i>=1?((pv-d.v)/pv*100).toFixed(1):null;var hi=dr&&parseFloat(dr)>=16;
return(<div key={i} style={{marginBottom:3}}><div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{width:w+"%",minWidth:90,padding:"8px 12px",borderRadius:10,background:"linear-gradient(90deg,"+IN+"10,"+IN+"04)",borderLeft:"3px solid "+IN,display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:12,color:"#1d1d1f",fontWeight:500}}>{d.s}</span>
<span style={{fontSize:12,fontWeight:700,color:IN}}>{d.v.toLocaleString()}</span>
</div>
{dr&&(<span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:8,background:hi?"#fef2f2":G6,color:hi?B:G1,whiteSpace:"nowrap"}}>{"-"+dr+"%"}</span>)}
</div></div>)
})}
<div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
<div style={{padding:"6px 12px",borderRadius:10,background:G6,border:"1px solid rgba(0,0,0,.06)",textAlign:"right"}}>
<div style={{fontSize:9,color:G1,fontWeight:500}}>{"Conversion globale"}</div>
<div style={{fontSize:16,fontWeight:700,color:IN}}>{gConv+"%"}</div>
<div style={{fontSize:10,color:B,fontWeight:600}}>{gLoss+"% de perte"}</div>
</div></div>
</div>)}

var TABS=[{id:"metrics",l:"M\u00e9triques"},{id:"acquisition",l:"Acquisition"},{id:"onboarding",l:"Onboarding"},{id:"engagement",l:"Engagement"},{id:"monetization",l:"Mon\u00e9tisation"},{id:"retention",l:"R\u00e9tention"},{id:"weekly",l:"Weekly Report"},{id:"journey",l:"User Journey"}];

function V0(p){var m=p.D.m,D=p.D;
return(<div>
<HelpBox title={"M\u00e9triques business"} text={"Chaque carte a un bord color\u00e9 : vert = sain, orange = attention, rouge = probl\u00e8me. Utilisez les filtres pour comparer Premium vs Gratuit."} />
<Note type="info" text={"Les meilleures apps \u00e9ducatives ont un revenu par utilisateur entre 0.30 et 0.80, gardent plus de 40% de leurs users le lendemain, et moins de 6% de leurs abonn\u00e9s annulent chaque mois."} />
<Note type="bad" text={"Chaque utilisateur devrait rapporter au moins 3 fois ce qu il co\u00fbte en acquisition. Vous \u00eates en dessous de ce seuil."} />
<Note type="warn" text={"Vos utilisateurs ne reviennent pas assez souvent. Dans les apps \u00e9ducatives performantes, 15 \u00e0 25% reviennent chaque jour."} />
<div style={{fontSize:13,fontWeight:600,color:"#1d1d1f",marginBottom:8}}>{"Revenus"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"MRR"} value={m.mrr} sub={"Revenu mensuel r\u00e9current"} status="good" />
<Mc label={"ARR"} value={m.arr} sub={"Revenu annualis\u00e9"} status="good" />
<Mc label={"ARPU"} value={m.arpu} sub={"Bench EdTech: 0.30-0.80"} status={sH(parseFloat(m.arpu.slice(1)),.35)} />
<Mc label={"ARPPU"} value={m.arppu} sub={"Bench EdTech: 7-12"} status={sH(parseFloat(m.arppu.slice(1)),8)} />
<Mc label={"LTV"} value={m.ltv} sub={"Dur\u00e9e de vie"} status={sH(parseFloat(m.ltv.slice(1)),25)} />
<Mc label={"CAC"} value={m.cac} sub={"Co\u00fbt acquisition"} status="warn" />
<Mc label={"LTV/CAC"} value={m.lc} sub={"Bench EdTech: 3-5x"} status={sH(parseFloat(m.lc)||0,3,2)} />
<Mc label={"Payback"} value={m.pb} sub={"Bench: moins de 90j"} status={sL(parseInt(m.pb),60)} />
<Mc label={"Rev. Pubs"} value={m.adR} sub={"Rewarded (users gratuits)"} status="info" />
</div>
<div style={{fontSize:13,fontWeight:600,color:"#1d1d1f",marginBottom:8}}>{"Utilisateurs"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"DAU"} value={m.dau} sub={"Actifs quotidiens"} status="good" />
<Mc label={"MAU"} value={m.mau} sub={"Actifs mensuels"} status="good" />
<Mc label={"Stickiness"} value={m.stick} sub={"Bench EdTech: 15-25%"} status={sH(parseFloat(m.stick),20,12)} />
<Mc label={"Sessions/j"} value={m.sess} sub={"Bench EdTech: 1.5-3"} status={sH(parseFloat(m.sess),1.5)} />
<Mc label={"Accuracy"} value={m.acc} sub={"Zone id\u00e9ale: 65-75%"} status={sH(parseInt(m.acc),65,55)} />
<Mc label={"Onboarding"} value={m.onb} sub={"Bench: plus de 60%"} status={sH(parseInt(m.onb),60,45)} />
</div>
<div style={{fontSize:13,fontWeight:600,color:"#1d1d1f",marginBottom:8}}>{"Conversion et R\u00e9tention"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"Trial to Paid"} value={m.t2p} sub={"Bench EdTech: 35-50%"} status={sH(parseFloat(m.t2p),40,30)} />
<Mc label={"Churn"} value={m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(m.churn),5,10)} />
<Mc label={"R\u00e9t. J1"} value={m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(m.d1),40)} />
<Mc label={"R\u00e9t. J7"} value={m.d7} sub={"Bench: plus de 20%"} status={sH(parseInt(m.d7),20)} />
<Mc label={"R\u00e9t. J30"} value={m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(m.d30),10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"DAU"} help={"La courbe doit monter. Un d\u00e9crochage = probl\u00e8me."}><ResponsiveContainer width="100%" height={160}><AreaChart data={D.dauT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="d" tick={TS} interval={6} /><YAxis tick={TS} width={40} /><Tooltip {...TT} /><Area type="monotone" dataKey="v" stroke={IN} fill={IN+"15"} strokeWidth={2} name="DAU" /></AreaChart></ResponsiveContainer></Cc>
<Cc title={"MRR"} help={"Tendance haussi\u00e8re = croissance saine."}><ResponsiveContainer width="100%" height={160}><BarChart data={D.mrrT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><Bar dataKey="v" fill={G} name="MRR" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Churn"} help={"Doit baisser. Ligne verte = cible 5%."}><ResponsiveContainer width="100%" height={160}><LineChart data={D.chT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><ReferenceLine y={5} stroke={G} strokeDasharray="4 4" /><Line type="monotone" dataKey="v" stroke={B} strokeWidth={2} dot={false} name="Churn %" /></LineChart></ResponsiveContainer></Cc>
<Cc title={"LTV par cohorte"} help={"Valeur cumul\u00e9e. Doit monter."}><ResponsiveContainer width="100%" height={160}><BarChart data={D.ltT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} /><YAxis tick={TS} width={38} /><Tooltip {...TT} /><Bar dataKey="v" fill={BL} name="LTV" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V1(p){var D=p.D;return(<div>
<HelpBox title={"Acquisition"} text={"Trouver les canaux qui am\u00e8nent des utilisateurs rentables, pas juste des volumes."} />
<Note type="info" text={"Le co\u00fbt moyen pour acqu\u00e9rir un utilisateur en EdTech est de 1.50 \u00e0 3.50. Au moins 30% de vos installs devraient \u00eatre organiques."} />
<Note type="bad" text={"Vous perdez de l argent sur TikTok : chaque euro investi en pub ne rapporte que 86 centimes."} />
<Note type="good" text={"Apple Search Ads est votre canal le plus rentable : chaque euro investi rapporte 2.06 euros."} />
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"ROAS par canal"} wide={true} help={"Au-dessus de la ligne rouge = rentable."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.ro} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="ch" tick={TS} width={60} /><Tooltip {...TT} /><ReferenceLine x={1} stroke={B} strokeDasharray="4 4" /><Bar dataKey="v" name="ROAS" radius={[0,5,5,0]}>{D.ro.map(function(r,i){return(<Cell key={i} fill={r.v>=1.5?G:r.v>=1?W:B} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"CPI vs LTV"} help={"Rouge = co\u00fbt. Vert = valeur. Le vert doit \u00eatre 3x le rouge."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.cpiL}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="cpi" fill={B} name="CPI" radius={[5,5,0,0]} /><Bar dataKey="ltv" fill={G} name="LTV" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"R\u00e9tention par canal"} help={"Qualit\u00e9 des users par source."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.rCh}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={IN} name="J1" radius={[3,3,0,0]} /><Bar dataKey="d7" fill={BL} name="J7" radius={[3,3,0,0]} /><Bar dataKey="d30" fill={TE} name="J30" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V2(p){var D=p.D;return(<div>
<HelpBox title={"Onboarding"} text={"Moins d un utilisateur sur 2 termine l onboarding. Les meilleures apps \u00e9ducatives sont entre 55 et 70%."} />
<Note type="bad" text={"Les questions du quiz sont trop difficiles : moins d une personne sur deux r\u00e9pond correctement. Le taux de r\u00e9ussite devrait d\u00e9passer 65%."} />
<Note type="warn" text={"Plus de 2 personnes sur 3 passent la vid\u00e9o sans la regarder. Dans les apps performantes, moins de 30% la sautent."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Compl\u00e9tion"} value={D.m.onb} sub={"Bench EdTech: 55-70%"} status={sH(parseInt(D.m.onb),55)} />
<Mc label={"Skip vid\u00e9o"} value={"68%"} status="bad" sub={"Bench: moins de 30%"} />
<Mc label={"Push opt-in"} value={"47%"} status="warn" sub={"Bench: plus de 55%"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"Funnel onboarding"} help={"Les pertes les plus grosses sont signal\u00e9es."}><FnlC data={D.oF} /></Cc>
<Cc title={"R\u00e9ussite quiz"} help={"Sous la ligne rouge (50%) = trop difficile."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.qz}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="q" tick={TS} /><YAxis tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><ReferenceLine y={50} stroke={B} strokeDasharray="4 4" /><Bar dataKey="v" name="R\u00e9ussite %" radius={[5,5,0,0]}>{D.qz.map(function(q,i){return(<Cell key={i} fill={q.v>=65?G:q.v>=50?W:B} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V3(p){var D=p.D;return(<div>
<HelpBox title={"Engagement"} text={"Zone id\u00e9ale de r\u00e9ussite : 65-75%. Trop bas = frustration. Trop haut = ennui."} />
<Note type="bad" text={"Le format texte libre est trop difficile : seulement 42% de bonnes r\u00e9ponses. Le minimum acceptable est 55%."} />
<Note type="warn" text={"92% de vos utilisateurs n atteignent jamais le contenu avanc\u00e9."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Le\u00e7ons/j"} value={D.m.sess} sub={"Bench EdTech: 1.5-3"} status={sH(parseFloat(D.m.sess),1.5)} />
<Mc label={"Accuracy"} value={D.m.acc} sub={"Zone id\u00e9ale: 65-75%"} status={sH(parseInt(D.m.acc),65,55)} />
<Mc label={"Abandon"} value={"21%"} status="warn" sub={"Bench: moins de 15%"} />
<Mc label={"Le\u00e7ons 1\u00e8re session"} value={"1.8"} status={sH(1.8,2,1)} sub={"Bench EdTech: 2-3"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"Le\u00e7ons/jour et Accuracy"} wide={true} help={"Barres = le\u00e7ons. Courbe = r\u00e9ussite."}><ResponsiveContainer width="100%" height={180}><ComposedChart data={D.engD}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="d" tick={TS} interval={6} /><YAxis yAxisId="l" tick={TS} width={30} /><YAxis yAxisId="r" orientation="right" tick={TS} width={30} domain={[40,90]} /><Tooltip {...TT} /><Bar yAxisId="l" dataKey="les" fill={IN+"50"} name="Le\u00e7ons/user" radius={[3,3,0,0]} /><Line yAxisId="r" type="monotone" dataKey="acc" stroke={G} name="R\u00e9ussite %" strokeWidth={2} dot={false} /></ComposedChart></ResponsiveContainer></Cc>
<Cc title={"R\u00e9ussite par format"} help={"Vert = bon. Rouge (sous 55%) = frustrant."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.qT} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} domain={[0,100]} /><YAxis type="category" dataKey="t" tick={TS} width={50} /><Tooltip {...TT} /><ReferenceLine x={55} stroke={B} strokeDasharray="4 4" /><Bar dataKey="a" name="%" radius={[0,5,5,0]}>{D.qT.map(function(q,i){return(<Cell key={i} fill={q.a>=65?G:q.a>=55?W:B} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Le\u00e7ons \u00e0 la 1\u00e8re session"} help={"Nombre de le\u00e7ons faites \u00e0 la 1\u00e8re connexion. Beaucoup de 0 = activation trop lente."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.fsl}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="n" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="v" name="Users %" radius={[5,5,0,0]}>{D.fsl.map(function(d,i){return(<Cell key={i} fill={i===0?B:i===1?W:G} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Progression contenu"} help={"La chute montre o\u00f9 le contenu perd les gens."}><ResponsiveContainer width="100%" height={200}><ComposedChart data={D.dp}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="e" tick={{fontSize:8,fill:G1}} /><YAxis yAxisId="u" tick={TS} width={38} /><YAxis yAxisId="c" orientation="right" tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><Bar yAxisId="u" dataKey="u" fill={IN+"35"} name="Users" radius={[4,4,0,0]} /><Line yAxisId="c" type="monotone" dataKey="p" stroke={B} name="Compl\u00e9tion %" strokeWidth={2} dot={true} /></ComposedChart></ResponsiveContainer></Cc>
</div></div>)}

function V4(p){var D=p.D;return(<div>
<HelpBox title={"Mon\u00e9tisation"} text={"Du paywall au paiement r\u00e9ussi. Dans les apps \u00e9ducatives, 2 \u00e0 8% des utilisateurs qui voient l offre premium l ach\u00e8tent."} />
<Note type="good" text={"Le paywall affich\u00e9 pendant l onboarding a le meilleur taux de conversion (16.8%). Au-dessus de la moyenne (12-20%)."} />
<Note type="bad" text={"370 personnes essaient de payer chaque mois mais n y arrivent pas \u00e0 cause de bugs. Environ 3100 euros perdus."} />
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"Funnel achat"} help={"Les pertes les plus grosses sont signal\u00e9es."}><FnlC data={D.pF} /></Cc>
<Cc title={"Conversion par \u00e9cran"} help={"Verts convertissent le mieux."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.ps} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="s" tick={TS} width={80} /><Tooltip {...TT} /><Bar dataKey="r" name="%" radius={[0,5,5,0]}>{D.ps.map(function(s,i){return(<Cell key={i} fill={s.r>=13?G:s.r>=9?BL:W} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"\u00c9volution du MRR"} wide={true} help={"Vert = nouveaux. Violet = renouvel\u00e9s. Rouge = perdus."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.mb} stackOffset="sign"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><ReferenceLine y={0} stroke={GC} /><Bar dataKey="n" stackId="a" fill={G} name="Nouveaux" radius={[3,3,0,0]} /><Bar dataKey="r" stackId="a" fill={IN} name="Renouvel\u00e9s" /><Bar dataKey="l" stackId="a" fill={B} name="Perdus" radius={[0,0,3,3]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Erreurs achat"} help={"Chaque erreur = un user pr\u00eat \u00e0 payer qui n a pas pu."}>{D.pErr.map(function(e,i){return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:"#4a4a5e",width:100,flexShrink:0}}>{e.t}</span><div style={{flex:1,height:9,borderRadius:5,background:G6,overflow:"hidden"}}><div style={{height:"100%",width:(D.pErr[0].c>=1?(e.c/D.pErr[0].c)*100:0)+"%",background:i===0?B:W,borderRadius:5}} /></div><span style={{fontSize:12,fontWeight:700,color:"#1d1d1f",width:32,textAlign:"right"}}>{e.c}</span></div>)})}</Cc>
</div></div>)}

function V5(p){var D=p.D;
function cBg(v){return v===null?G6:v>=30?"#f0fdf4":v>=15?"#eff6ff":v>=10?"#fffbeb":"#fef2f2"}
function cC(v){return v===null?G1:v>=30?"#166534":v>=15?"#1e40af":v>=10?"#92400e":"#991b1b"}
return(<div>
<HelpBox title={"R\u00e9tention"} text={"La m\u00e9trique la plus importante. M\u00eame avec 1 million d installs, sans r\u00e9tention l app meurt."} />
<Note type="info" text={"Les apps \u00e9ducatives performantes gardent plus de 40% de leurs utilisateurs apr\u00e8s 1 jour, plus de 20% apr\u00e8s 7 jours, et plus de 10% apr\u00e8s 30 jours."} />
<Note type={sH(parseInt(D.m.d30),10)} text={"R\u00e9tention J30 \u00e0 "+D.m.d30+". Le benchmark EdTech est de 10% minimum."} />
<Note type="warn" text={"Plus de la moiti\u00e9 des d\u00e9parts ont lieu dans les 5 premiers jours. Fen\u00eatre critique : 48 premi\u00e8res heures."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Jour 1"} value={D.m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(D.m.d1),40)} />
<Mc label={"Jour 7"} value={D.m.d7} sub={"Bench: plus de 20%"} status={sH(parseInt(D.m.d7),20)} />
<Mc label={"Jour 30"} value={D.m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(D.m.d30),10)} />
<Mc label={"Churn"} value={D.m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(D.m.churn),5,10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
<Cc title={"Cohortes"} wide={true} help={"Chaque ligne = une semaine. Chaque colonne = r\u00e9tention \u00e0 J+n."}>
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"separate",borderSpacing:3,fontSize:12}}>
<thead><tr><th style={{padding:"7px 10px",textAlign:"left",color:G1,fontSize:10.5}}>{"Cohorte"}</th>{["J1","J3","J7","J14","J30"].map(function(d){return(<th key={d} style={{padding:"7px 10px",textAlign:"center",color:G1,fontSize:10.5}}>{d}</th>)})}</tr></thead>
<tbody>{D.co.map(function(c,i){return(<tr key={i}><td style={{padding:"6px 10px",fontWeight:600}}>{c.w}</td>{["d1","d3","d7","d14","d30"].map(function(d){return(<td key={d} style={{padding:"6px 10px",textAlign:"center",fontWeight:600,background:cBg(c[d]),color:cC(c[d]),borderRadius:8}}>{c[d]!==null?c[d]+"%":"--"}</td>)})}</tr>)})}</tbody>
</table></div></Cc>
<Cc title={"Courbe de r\u00e9tention"} help={"Pourcentage d utilisateurs encore actifs chaque jour."}><ResponsiveContainer width="100%" height={190}><LineChart data={D.rC}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="j" tick={TS} /><YAxis tick={TS} width={32} domain={[0,100]} /><Tooltip {...TT} /><Line type="monotone" dataKey="p" stroke={IN} strokeWidth={2.5} dot={false} name="R\u00e9tention %" /></LineChart></ResponsiveContainer></Cc>
<Cc title={"R\u00e9tention par canal"} help={"Qualit\u00e9 des users par source."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.rCh}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={IN} name="J1" radius={[3,3,0,0]} /><Bar dataKey="d7" fill={BL} name="J7" radius={[3,3,0,0]} /><Bar dataKey="d30" fill={TE} name="J30" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Time to churn"} help={"Quand les gens partent. Plus de 50% dans les 5 premiers jours."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.t2ch}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="r" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="p" name="% du churn" radius={[5,5,0,0]}>{D.t2ch.map(function(_,i){return(<Cell key={i} fill={[B,B,W,BL,BL][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V6(p){var D=p.D;var _r=useState(null),rpt=_r[0],setRpt=_r[1];var _l=useState(false),ld=_l[0],setLd=_l[1];
function gen(){setLd(true);var m=D.m;fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:"Analyse ces m\u00e9triques EdTech et g\u00e9n\u00e8re un JSON: {summary,trends:[{title,direction,detail}],alerts:[{severity,text}],recommendations:[{priority,action,impact}],kpi_changes:[{name,value,change,status}]}. R\u00e9ponds UNIQUEMENT en JSON. DAU="+m.dau+",MAU="+m.mau+",MRR="+m.mrr+",Churn="+m.churn+",D1="+m.d1+",D7="+m.d7+",D30="+m.d30+",Onb="+m.onb}]})}).then(function(r){return r.json()}).then(function(d){try{var t=d.content.map(function(c){return c.text||""}).join("");setRpt(JSON.parse(t.replace(/```json|```/g,"").trim()))}catch(e){setRpt({summary:"Erreur: "+e.message})}setLd(false)}).catch(function(e){setRpt({summary:"Erreur: "+e.message});setLd(false)})}
return(<div>
<HelpBox title={"Claude is Killing BCG Stars"} text={"Chaque dimanche \u00e0 20h, Claude analyse vos donn\u00e9es et g\u00e9n\u00e8re un rapport avec tendances, alertes et recommandations."} />
<button onClick={gen} disabled={ld} style={{padding:"10px 20px",borderRadius:10,border:"none",background:ld?"#ccc":IN,color:"#fff",fontSize:13,fontWeight:600,cursor:ld?"wait":"pointer",fontFamily:"inherit",marginBottom:16}}>{ld?"Analyse en cours...":"G\u00e9n\u00e9rer le rapport"}</button>
{rpt&&(<div style={{marginTop:12}}>
<div style={{background:"#fff",borderRadius:14,padding:18,marginBottom:12,border:"1px solid rgba(0,0,0,.06)"}}><div style={{fontSize:15,fontWeight:700,marginBottom:8}}>{"Synth\u00e8se"}</div><div style={{fontSize:13,lineHeight:1.6,color:"#333"}}>{rpt.summary}</div></div>
{rpt.kpi_changes&&rpt.kpi_changes.length>=1&&(<div style={{background:"#fff",borderRadius:14,padding:18,marginBottom:12,border:"1px solid rgba(0,0,0,.06)"}}><div style={{fontSize:14,fontWeight:600,marginBottom:12}}>{"Variations"}</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{rpt.kpi_changes.map(function(k,i){return(<div key={i} style={{flex:"1 1 140px",padding:"12px 14px",borderRadius:10,background:G6}}><div style={{fontSize:10,color:G1}}>{k.name}</div><div style={{fontSize:18,fontWeight:700}}>{k.value}</div><div style={{fontSize:12,fontWeight:600,color:k.status==="good"?G:k.status==="bad"?B:G1}}>{k.change}</div></div>)})}</div></div>)}
{rpt.recommendations&&rpt.recommendations.length>=1&&(<div style={{background:"#fff",borderRadius:14,padding:18,marginBottom:12,border:"1px solid rgba(0,0,0,.06)"}}><div style={{fontSize:14,fontWeight:600,marginBottom:12}}>{"Recommandations"}</div>{rpt.recommendations.map(function(r,i){return(<div key={i} style={{padding:"12px 14px",marginBottom:6,borderRadius:10,background:G6,border:"1px solid rgba(0,0,0,.04)"}}><div style={{fontSize:13,fontWeight:600}}>{r.action}</div><div style={{fontSize:11,color:"#666",marginTop:2}}>{"Impact : "+r.impact}</div></div>)})}</div>)}
</div>)}
</div>)}

var orgD=[{s:"D\u00e9couverte",u:50000,p:"acq"},{s:"Install",u:8500,p:"acq"},{s:"Onboarding",u:7200,p:"onb"},{s:"1\u00e8re le\u00e7on",u:3500,p:"eng"},{s:"Paywall",u:2800,p:"mon"},{s:"Abonn\u00e9",u:215,p:"mon"},{s:"Actif J30",u:528,p:"ret"}];
var paidD=[{s:"Impression pub",u:2800000,p:"acq"},{s:"Click",u:98000,p:"acq"},{s:"Install",u:23600,p:"acq"},{s:"Onboarding",u:18400,p:"onb"},{s:"1\u00e8re le\u00e7on",u:5880,p:"eng"},{s:"Paywall",u:4700,p:"mon"},{s:"Abonn\u00e9",u:254,p:"mon"},{s:"Actif J30",u:1652,p:"ret"}];
function JFnl(p){var data=p.data,accent=p.accent,title=p.title;var mx=data[0].u;var gConv=((data[data.length-1].u/mx)*100).toFixed(2);var gLoss=(100-parseFloat(gConv)).toFixed(1);return(<div style={{background:"#fff",borderRadius:14,padding:18,marginBottom:16,border:"1px solid rgba(0,0,0,.04)"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:8,height:8,borderRadius:4,background:accent}} /><div style={{fontSize:15,fontWeight:700}}>{title}</div></div>{data.map(function(d,i){var w=Math.max(18,Math.pow(d.u/mx,0.4)*100);var pv=i>=1?data[i-1].u:d.u;var drp=i>=1?((pv-d.u)/pv*100).toFixed(1):null;var big=drp&&parseFloat(drp)>=10;return(<div key={i} style={{marginBottom:2}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:w+"%",minWidth:120,padding:"7px 12px",borderRadius:9,background:"linear-gradient(90deg,"+accent+"12,"+accent+"04)",borderLeft:"3px solid "+accent,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11.5,fontWeight:600}}>{d.s}</span><span style={{fontSize:12,fontWeight:700,color:accent}}>{d.u.toLocaleString()}</span></div>{big&&(<span style={{padding:"2px 7px",borderRadius:6,background:"#fef2f2",border:"1px solid #fecaca",fontSize:9.5,fontWeight:600,color:B,whiteSpace:"nowrap"}}>{"-"+drp+"%"}</span>)}</div></div>)})}<div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}><div style={{padding:"6px 12px",borderRadius:10,background:G6,border:"1px solid rgba(0,0,0,.06)",textAlign:"right"}}><div style={{fontSize:9,color:G1,fontWeight:500}}>{"Conversion globale"}</div><div style={{fontSize:16,fontWeight:700,color:accent}}>{gConv+"%"}</div><div style={{fontSize:10,color:B,fontWeight:600}}>{gLoss+"% de perte"}</div></div></div></div>)}
function V7(p){return(<div>
<HelpBox title={"Parcours utilisateur"} text={"Ces sch\u00e9mas montrent le chemin de vos utilisateurs depuis la d\u00e9couverte jusqu \u00e0 la r\u00e9tention."} />
<JFnl data={orgD} title={"Parcours Organique"} accent={G} />
<JFnl data={paidD} title={"Parcours Paid Ads"} accent={BL} />
</div>)}

var VW={metrics:V0,acquisition:V1,onboarding:V2,engagement:V3,monetization:V4,retention:V5,weekly:V6,journey:V7};
var FO={ut:[{v:"all",l:"Tous"},{v:"free",l:"Gratuits"},{v:"prem",l:"Premium"},{v:"trial",l:"Essai"}],pe:[{v:"7d",l:"7j"},{v:"30d",l:"30j"},{v:"90d",l:"90j"}],ch:[{v:"all",l:"Tous"},{v:"organic",l:"Organique"},{v:"meta",l:"Meta"},{v:"google",l:"Google"},{v:"tiktok",l:"TikTok"},{v:"asa",l:"ASA"}],pl:[{v:"all",l:"Toutes"},{v:"ios",l:"iOS"},{v:"android",l:"Android"}]};

export default function App(){
var _t=useState("metrics"),tab=_t[0],setTab=_t[1];
var _f=useState({ut:"all",pe:"30d",ch:"all",pl:"all"}),fi=_f[0],sf=_f[1];
var _d=useState(false),dd=_d[0],setDd=_d[1];
var D=useMemo(function(){return bD(fi)},[fi.ut,fi.pe,fi.ch,fi.pl]);
var View=VW[tab];
var nf=[fi.ut!=="all",fi.pe!=="30d",fi.ch!=="all",fi.pl!=="all"].filter(Boolean).length;
return(
<div style={{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",background:G6,color:"#1d1d1f",minHeight:"100vh"}}>
<div style={{background:"rgba(255,255,255,.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,0,0,.08)",position:"sticky",top:0,zIndex:100}}>
<div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
<div style={{display:"flex",alignItems:"center",height:52,gap:14}}>
<div style={{position:"relative"}}>
<button onClick={function(){setDd(!dd)}} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,.06)",background:"rgba(0,0,0,.02)",cursor:"pointer",fontFamily:"inherit"}}>
<div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#4FC3F7,#5856D6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:700}}>{"S"}</div>
<span style={{fontSize:13.5,fontWeight:600}}>{"Sapio"}</span>
</button>
{dd&&(<div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:"#fff",borderRadius:12,boxShadow:"0 8px 32px rgba(0,0,0,.12)",padding:4,minWidth:180,zIndex:200}}>
<div onClick={function(){setDd(false)}} style={{padding:"8px 12px",borderRadius:8,fontSize:13,fontWeight:600,color:IN,cursor:"pointer"}}>{"Sapio"}</div>
<div style={{padding:"8px 12px",borderRadius:8,fontSize:13,color:G1}}>{"App 2 (bient\u00f4t)"}</div>
</div>)}
</div>
<div style={{width:1,height:20,background:"rgba(0,0,0,.08)"}} />
<span style={{fontSize:15,fontWeight:700,letterSpacing:-.3}}>{"THETYS METRICS"}</span>
</div>
<div style={{display:"flex",gap:0,overflowX:"auto",marginTop:-1}}>
{TABS.map(function(t){return(
<button key={t.id} onClick={function(){setTab(t.id)}} style={{padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:tab===t.id?600:400,fontFamily:"inherit",color:tab===t.id?"#1d1d1f":G1,whiteSpace:"nowrap",borderBottom:tab===t.id?"2px solid "+IN:"2px solid transparent"}}>{t.l}</button>
)})}
</div>
</div></div>
<div style={{maxWidth:1100,margin:"0 auto",padding:"14px 16px 0"}}>
<div style={{background:"#fff",borderRadius:14,padding:"14px 16px",boxShadow:"0 .5px 2px rgba(0,0,0,.04)",border:"1px solid rgba(0,0,0,.04)",marginBottom:14}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:13,fontWeight:600}}>{"Filtres"}</span>
{nf>=1&&(<span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:IN,color:"#fff",fontWeight:700}}>{nf}</span>)}
</div>
{nf>=1&&(<button onClick={function(){sf({ut:"all",pe:"30d",ch:"all",pl:"all"})}} style={{fontSize:12,color:B,background:"none",border:"none",cursor:"pointer",fontWeight:500,fontFamily:"inherit"}}>{"Reset"}</button>)}
</div>
<div style={{fontSize:10.5,color:G1,marginBottom:10}}>{"Combinez les filtres pour une analyse granulaire."}</div>
<div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
<div><div style={{fontSize:10,fontWeight:600,color:G1,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>{"Utilisateur"}</div><Seg opts={FO.ut} val={fi.ut} set={function(v){sf(Object.assign({},fi,{ut:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:G1,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>{"P\u00e9riode"}</div><Seg opts={FO.pe} val={fi.pe} set={function(v){sf(Object.assign({},fi,{pe:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:G1,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>{"Canal"}</div><Seg opts={FO.ch} val={fi.ch} set={function(v){sf(Object.assign({},fi,{ch:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:G1,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>{"Plateforme"}</div><Seg opts={FO.pl} val={fi.pl} set={function(v){sf(Object.assign({},fi,{pl:v}))}} /></div>
</div></div></div>
<div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px 60px"}}><View D={D} /></div>
{dd&&(<div onClick={function(){setDd(false)}} style={{position:"fixed",inset:0,zIndex:99}} />)}
</div>)
}
