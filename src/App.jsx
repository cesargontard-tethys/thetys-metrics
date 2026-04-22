import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, ReferenceLine, PieChart, Pie } from "recharts";

var ICON="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB9GaSrlvpd9cxiSK3bYejMQoP0zX00pRirydj4+EJTdoq5UzRmrc2l38LqklrIC5CqQMgk+4rTbTtP08LFdrLd3ZUMY422qgPqcjH49fSsp4inBLW9+xvTwtWo2rWt30MHNGa1k0+wv8Lp1zJHO4LCCdCOnUBuhx7ZoFhp0TtG893dyIcP9kh3Kp9M9M1H1unYv6jWva34mRmithdLsbzKadesLgDP2e4XY/5HB/SsiWOSGVopVKOpwVPatadaFT4TGtQqUviRc06xWZHu7pxFZwEF3IzuP90DuT/WnX13Hc3ct1dRAo+BDE/zsigYxjoPXj161a1D934f0xE4Rt8hx3YA4/mT+FYygSFyeowB9MV5mJrtJ1POyPey7BxnJUr7q7/y/EtWuoNBKP7OjkhmJ4RT8j/7y5xj361c3SyPJLO4aSVy7FRgDtgewAxWfYKA00med3lqfQDr+v8AKm29tB5glF5LNKpyWEnX2x6VdCLcVOW7IxbgqkqcPhRoSgYDtLJHsB+ZX24BGD+nFVZr8qqi08poVG0bDwvtgdKdJcWs0htZCjtxlD+dQaYF1Br0wxQRJCgY4GGYZxTqx918rsycNJKa51ddizHei5QRXCZK/MvPI91PUGrF+Te6Z9olO65tHEbvjBkQjKsfft9c1nRLucyY2pGpJJ4+p+laCsF0a+m6xzeVFG3Z2BLEj1xnH4Gs8PKVoylvf8DTH06cZzhT1jb7mFrd211owsLmZYZoX3wSOCVPXg4+pH41XuNJvLba4iZlYZWSAGVGHpwM/pWZmr+l6rcafcRkSOYA3zR54I78V1VsLdNx69Dz8Lj3Bx5tLbNDLb93EAWB3EvkDHU5qH7AjXfntKeGyqooUD6+taWpWHk/6RbndaPloplGVCk52t/dIzjJ4x71RQzEZVC49V+YfpU05RcUbVFNSb7mbDbtFqsz3lvI8R3lJFcKFY/dbOe1X4rS2juTcxj526YbjnqQKrvYW/nSzXUTNvOQHk2hTWnYaTcXcS4Bt7VB807/ACqq+2ep/T3rKM3FtzVl63OipCMoR9nK766WsW7Q2ttp0Oo3wkmMkjeTAuAh2scE+vTvn6Vm3+oXGoTGSd+AflQfdX6CpdYvIZ5YoLMbbS2Ty4h6+prOrroUrLnktWeXiq7k/Zxfur8QopKK6DjLlhqd5p5P2aUqp6oRlT+FXhrdrIc3ejWUrHqwUAn9DWLRWU6FObu0b08TVpq0Xobo161g5stGtIX7MQCR+QFZ9/ql5qB/0mYleyDhR+FUqKIUKcHdIdTE1aitKWgtJRRWpzn/2Q==";
var C={pri:"#E95F2A",o1:"#E95F2A",o2:"#F28C5A",o3:"#F5A97A",o4:"#F8C9A5",o5:"#FBE4D2",o6:"#2C1810",bg:"#F6F8FA",card:"#fff",border:"#E1E4E8",text:"#24292F",sub:"#656D76",good:"#1A7F37",warn:"#BF8700",bad:"#CF222E",blue:"#0969DA",teal:"#0E8A7E"};
var TS={fontSize:9,fill:C.sub},GC="#F0F1F4";
var TT={contentStyle:{background:"#fff",border:"1px solid "+C.border,borderRadius:8,fontSize:12,boxShadow:"0 4px 12px rgba(0,0,0,.07)",padding:"10px 14px"}};
function mkDt(pe){var n=pe==="7d"?7:pe==="90d"?13:pe==="all"?12:30;return Array.from({length:n},function(_,i){var d=new Date(2026,3,22);if(pe==="all"){d=new Date(2025,4+i,1);return d.toLocaleDateString("fr-FR",{month:"short"})}if(pe==="90d"){d.setDate(d.getDate()-90+i*7);return d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})}d.setDate(d.getDate()-n+1+i);return d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})})}
function mkDays(n){if(n>=365){return Array.from({length:12},function(_,i){var d=new Date(2025,4+i,1);return d.toLocaleDateString("fr-FR",{month:"short"})})}if(n>=90){return Array.from({length:13},function(_,i){var d=new Date(2026,3,22);d.setDate(d.getDate()-90+i*7);return d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})})}return Array.from({length:n},function(_,i){var d=new Date(2026,3,22);d.setDate(d.getDate()-n+1+i);return d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})})}

function sH(v,a,b){if(b!==undefined)return v>=a?"good":v>=b?"warn":"bad";return v>=a?"good":"bad"}
function sL(v,a,b){if(b!==undefined)return v<a?"good":v<b?"warn":"bad";return v<a?"good":"bad"}
function vM(f){var m=1;if(f.ut==="free")m*=.72;if(f.ut==="prem")m*=.28;if(f.ut==="trial")m*=.08;if(f.ch==="organic")m*=.42;if(f.ch==="meta")m*=.22;if(f.ch==="google")m*=.16;if(f.ch==="tiktok")m*=.12;if(f.ch==="asa")m*=.08;if(f.pl==="ios")m*=.62;if(f.pl==="android")m*=.38;return m}
function qM(f){var q=1;if(f.ut==="prem")q=1.35;if(f.ut==="trial")q=1.12;if(f.ut==="free")q=.82;if(f.ch==="asa")q*=1.18;if(f.ch==="tiktok")q*=.72;if(f.ch==="organic")q*=1.08;if(f.pl==="ios")q*=1.06;if(f.pl==="android")q*=.94;return q}

function bD(f){
var nDays=f.pe==="7d"?7:f.pe==="90d"?90:f.pe==="all"?365:30;
var WK=mkDt(f.pe);
var DY=mkDays(nDays);
var v=vM(f),q=qM(f),isP=f.ut==="prem",isF=f.ut==="free";
var dau=Math.round(4283*v),mau=Math.round(38540*v),ch=isP?4.2:isF?12.8:8.6,chA=+(ch/q).toFixed(1);
var arppu=+(8.40*q).toFixed(2),ltv=+(arppu*8.2*q).toFixed(2);
var cM={organic:0,meta:1.8,google:2.3,tiktok:.9,asa:3.1,all:1.95},cac=cM[f.ch]||1.95;
var lc=cac>0?+(ltv/cac).toFixed(1):999,mrr=Math.round(12470*v*(isP?1:isF?.15:.35));
var d1=Math.min(95,Math.round(44*q)),d7=Math.min(80,Math.round(19*q)),d30=Math.min(60,Math.round(8*q));
var arpu=mau>0?+((mrr+2340*v)/mau).toFixed(2):0,pb=cac>0?Math.round(cac/(arppu/30)/q):0;
var E=String.fromCharCode(8364);
return{
m:{dau:dau.toLocaleString(),mau:mau.toLocaleString(),mrr:E+mrr.toLocaleString(),arr:E+(mrr*12).toLocaleString(),arpu:E+arpu,arppu:E+arppu,ltv:E+ltv,cac:cac>0?E+cac:E+"0",lc:lc>=999?String.fromCharCode(8734):lc+"x",churn:chA+"%",stick:(mau>0?(dau/mau*100).toFixed(1):0)+"%",t2p:Math.min(95,+(38.2*q).toFixed(1))+"%",pb:pb+"j",d1:d1+"%",d7:d7+"%",d30:d30+"%",sess:(1.6*q).toFixed(1),acc:Math.min(98,Math.round(64*q))+"%",onb:Math.min(95,Math.round(45.7*q))+"%",adR:E+Math.round(2340*v),dl:Math.round(32100*v).toLocaleString(),sessOnb:Math.round(8.4*q)+"min",sessAll:Math.round(5.2*q)+"min",pwFirst:"3.2 leçons",pwAvgBuy:"4.2 vues",pwLost:"8+ vues",liveBack:Math.round(34*q)+"%",liveGone:Math.round(41/q)+"%",liveQuit:Math.round(52/q)+"%",liveUnlim:Math.round(48*q)+"%",adQuit:Math.round(12/q)+"%",adPrem:Math.round(8*q)+"%",liveTime:Math.round(4.2*q)+"min",liveVidéo:Math.round(38*q)+"%",pwPerSess:(1.4/q).toFixed(1),adPerSess:(0.8*q).toFixed(1),manchesSess:(2.3*q).toFixed(1)},
dauT:DY.map(function(d,i){var base=nDays>=365?2800+i*150:nDays>=90?3000+i*45:3400+i*30;return{d:d,v:Math.max(0,Math.round((base+Math.sin(i*.5)*500)*v))}}),
mrrT:WK.map(function(w,i){var growth=nDays>=365?220:nDays>=90?300:380;return{w:w,v:Math.round((8200+i*growth)*v*(isP?1:.35))}}),
chT:WK.map(function(w,i){return{w:w,v:+(chA+Math.sin(i*(6.28/WK.length))*1.2).toFixed(1)}}),
ltT:WK.map(function(w,i){return{w:w,v:+(ltv*(.1+i*(.9/WK.length))).toFixed(1)}}),
rC:Array.from({length:31},function(_,i){return{j:i,p:Math.max(0,Math.round(100*Math.exp(-(isP?.035:isF?.085:.055)*i/q)))}}),
oF:[{s:"Pas de compte",v:Math.round(18400*v)},{s:"Vidéo",v:Math.round(16800*v)},{s:"Age/Goal/Level",v:Math.round(15200*v)},{s:"Quiz (3 Q)",v:Math.round(12800*v*q)},{s:"Objectif",v:Math.round(11100*v*q)},{s:"Notifications",v:Math.round(10200*v*q)},{s:"Compte",v:Math.round(9400*v*q)},{s:"App",v:Math.round(8400*v*q)}],
qT:[{t:"QC",a:Math.min(98,Math.round(81*q))},{t:"QCM img",a:Math.min(98,Math.round(74*q))},{t:"Assoc.",a:Math.min(98,Math.round(67*q))},{t:"Chrono",a:Math.min(98,Math.round(58*q))},{t:"Curseur",a:Math.min(98,Math.round(51*q))},{t:"Saisie",a:Math.min(98,Math.round(42*q))}],
dp:[{e:"Big Bang",u:Math.round(9200*v),p:Math.min(100,Math.round(82*q))},{e:"Antiquité",u:Math.round(7800*v),p:Math.min(100,Math.round(72*q))},{e:"M-Age",u:Math.round(5800*v),p:Math.min(100,Math.round(58*q))},{e:"Renaiss.",u:Math.round(4100*v),p:Math.min(100,Math.round(45*q))},{e:"Lumieres",u:Math.round(2900*v),p:Math.min(100,Math.round(34*q))},{e:"Moderne",u:Math.round(1800*v),p:Math.min(100,Math.round(22*q))},{e:"Guerres",u:Math.round(1100*v),p:Math.min(100,Math.round(15*q))},{e:"G.Froide",u:Math.round(620*v),p:Math.min(100,Math.round(10*q))},{e:"XXIe",u:Math.round(320*v),p:Math.min(100,Math.round(6*q))}],
pF:[{s:"Paywall vu",v:Math.round(14200*v)},{s:"Scroll",v:Math.round(8900*v)},{s:"CTA click",v:Math.round(3100*v*q)},{s:"Achat lance",v:Math.round(1850*v*q)},{s:"Achat OK",v:Math.round(1480*v*q)}],
ro:[{ch:"ASA",v:+(2.06*q).toFixed(2)},{ch:"Meta",v:+(1.73*q).toFixed(2)},{ch:"Google",v:+(1.28*q).toFixed(2)},{ch:"TikTok",v:+(0.86*q).toFixed(2)}],
rCh:[{ch:"Organic",d1:Math.round(48*q),d7:Math.round(24*q),d30:Math.round(12*q)},{ch:"ASA",d1:Math.round(51*q),d7:Math.round(28*q),d30:Math.round(14*q)},{ch:"Meta",d1:Math.round(42*q),d7:Math.round(18*q),d30:Math.round(8*q)},{ch:"Google",d1:Math.round(38*q),d7:Math.round(15*q),d30:Math.round(6*q)},{ch:"TikTok",d1:Math.round(35*q),d7:Math.round(11*q),d30:Math.round(4*q)}],
co:[{w:"S-6",d1:Math.round(41*q),d3:Math.round(27*q),d7:Math.round(17*q),d14:Math.round(11*q),d30:Math.round(7*q)},{w:"S-5",d1:Math.round(45*q),d3:Math.round(31*q),d7:Math.round(21*q),d14:Math.round(14*q),d30:null},{w:"S-4",d1:Math.round(43*q),d3:Math.round(29*q),d7:Math.round(19*q),d14:null,d30:null},{w:"S-3",d1:Math.round(46*q),d3:Math.round(32*q),d7:null,d14:null,d30:null}],
ps:[{s:"Onboarding",r:+(16.8*q).toFixed(1)},{s:"Pack lock",r:+(12.9*q).toFixed(1)},{s:"Vies",r:+(11.1*q).toFixed(1)},{s:"Post-lecon",r:+(9.0*q).toFixed(1)},{s:"Settings",r:+(4.0*q).toFixed(1)}],
mb:WK.map(function(w,i){return{w:w,n:Math.round((1800+i*(640/WK.length))*v),r:Math.round((7200+i*(960/WK.length))*v),l:-Math.round((1200+i*(160/WK.length))*v)}}),
qz:[{q:"Q1",v:Math.min(99,Math.round(82*q))},{q:"Q2",v:Math.min(99,Math.round(68*q))},{q:"Q3",v:Math.min(99,Math.round(54*q))}],
engD:DY.map(function(d,i){return{d:d,les:+(1.2+Math.sin(i*(6.28/DY.length))*.5).toFixed(1),acc:Math.min(98,Math.round((62+Math.sin(i*(6.28/DY.length))*.8*8)*q))}}),
stars:[{s:"1",c:Math.round(3200*v)},{s:"2",c:Math.round(4100*v)},{s:"3",c:Math.round(4050*v)}],
cpiL:[{ch:"Organic",cpi:0,ltv:+(4.2*q).toFixed(1)},{ch:"Meta",cpi:1.8,ltv:+(5.1*q).toFixed(1)},{ch:"Google",cpi:2.3,ltv:+(3.8*q).toFixed(1)},{ch:"TikTok",cpi:.9,ltv:+(2.1*q).toFixed(1)},{ch:"ASA",cpi:3.1,ltv:+(6.4*q).toFixed(1)}],
instS:WK.map(function(w,i){return{w:w,organic:Math.round((800+i*(200/WK.length))*v),meta:Math.round((450+i*(100/WK.length))*v),google:Math.round((300+i*(40/WK.length))*v),tiktok:Math.round((180+i*(150/WK.length))*v),asa:Math.round((100+i*(40/WK.length))*v)}}),
pErr:[{t:"Card declined",c:Math.round(124*v)},{t:"Network",c:Math.round(98*v)},{t:"Store",c:Math.round(72*v)},{t:"Cancel",c:Math.round(58*v)}],
t2ch:[{r:"1-2j",p:32},{r:"3-5j",p:24},{r:"6-14j",p:22},{r:"15-30j",p:14},{r:"30j+",p:8}],
fsl:[{n:"0",v:Math.round(18*v/q)},{n:"1",v:Math.round(42*v*q)},{n:"2",v:Math.round(24*v*q)},{n:"3",v:Math.round(10*v*q)},{n:"4+",v:Math.round(6*v*q)}],
pwFunnel:[{n:"1er",v:100},{n:"2e",v:72},{n:"3e",v:51},{n:"4e",v:34},{n:"5e+",v:18}],
topPacks:[{n:"Le corps humain",p:Math.round(4200*v)},{n:"Capitales du monde",p:Math.round(3800*v)},{n:"Harry Potter",p:Math.round(3200*v)},{n:"Le football",p:Math.round(2900*v)},{n:"Le systeme solaire",p:Math.round(2400*v)},{n:"Les animaux",p:Math.round(2100*v)},{n:"Cuisine du monde",p:Math.round(1800*v)},{n:"Geographie France",p:Math.round(1500*v)},{n:"Cinema",p:Math.round(1200*v)},{n:"Musique pop",p:Math.round(900*v)}],
packF:[{s:"Lancés",v:Math.round(6200*v)},{s:"50%",v:Math.round(4300*v)},{s:"Terminés",v:Math.round(3100*v)},{s:"Rejoués",v:Math.round(370*v)}],
adImpact:[{n:"Restent",v:88},{n:"Quittent",v:12}],
mrrProd:[{n:"Annuel",v:Math.round(mrr*.62)},{n:"Mensuel",v:Math.round(mrr*.31)},{n:"Hebdo",v:Math.round(mrr*.07)}],
jOrg:[{s:"App Store (découverte)",v:50000},{s:"Visite fiche",v:50000},{s:"Install",v:8500},{s:"Ouverture app",v:7650},{s:"Pas de compte",v:7200},{s:"Vidéo intro (68% skip)",v:6800},{s:"Age / Goal / Level",v:6300},{s:"Quiz (3 questions)",v:5400},{s:"Objectif quotidien",v:5100},{s:"Notifications (47% accept)",v:4900},{s:"Création compte",v:4600},{s:"App (suivre)",v:4400},{s:"1ère leçon terminée",v:3500},{s:"Paywall vu",v:2800},{s:"Trial démarré",v:560},{s:"Abonné payant",v:215},{s:"Actif J7",v:1056},{s:"Actif J30",v:528}],
jPaid:[{s:"Impression pub",v:2800000},{s:"Click pub (CTR 3.5%)",v:98000},{s:"Page Store",v:98000},{s:"Install (CPI ~1.95)",v:23600},{s:"Ouverture app",v:20100},{s:"Pas de compte",v:18400},{s:"Vidéo intro (68% skip)",v:16800},{s:"Age / Goal / Level",v:15200},{s:"Quiz (3 questions)",v:12800},{s:"Objectif quotidien",v:11100},{s:"Notifications",v:10200},{s:"Création compte",v:9400},{s:"App (suivre)",v:8400},{s:"1ère leçon terminée",v:5880},{s:"Paywall vu",v:4700},{s:"Trial démarré",v:705},{s:"Abonné payant",v:254},{s:"Actif J7",v:3776},{s:"Actif J30",v:1652}]
}}

function Mc(p){var bc=p.status==="good"?C.good:p.status==="bad"?C.bad:p.status==="warn"?C.warn:C.border;
return(<div style={{padding:"16px 18px",borderRadius:10,background:C.card,flex:"1 1 155px",minWidth:148,border:"1px solid "+C.border,position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:bc}} />
<div style={{fontSize:11,color:C.sub,marginBottom:5,fontWeight:500}}>{p.label}</div>
<div style={{fontSize:22,fontWeight:700,color:C.text}}>{p.value}</div>
{p.sub&&<div style={{fontSize:10.5,color:C.sub,marginTop:4,lineHeight:1.4}}>{p.sub}</div>}
</div>)}

function Cc(p){return(<div style={{padding:"20px",borderRadius:10,background:C.card,gridColumn:p.wide?"1/-1":undefined,border:"1px solid "+C.border}}>
<div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:p.help?4:12}}>{p.title}</div>
{p.help&&<div style={{fontSize:11,color:C.sub,lineHeight:1.5,padding:"6px 10px",background:C.bg,borderRadius:6,marginBottom:14,borderLeft:"2px solid "+C.o1}}>{p.help}</div>}
{p.children}</div>)}

function Note(p){var c={good:{bg:"#DAFBE1",b:"#82E596",c:"#116329"},warn:{bg:"#FFF8C5",b:"#D4A72C",c:"#633C01"},bad:{bg:"#FFEBE9",b:"#FF8182",c:"#82071E"},info:{bg:"#DDF4FF",b:"#54AEFF",c:"#0550AE"}};
var s=c[p.type]||c.info;return(<div style={{padding:"12px 16px",borderRadius:8,background:s.bg,border:"1px solid "+s.b,marginBottom:8,fontSize:12.5,color:s.c,lineHeight:1.55,fontWeight:500}}>{p.text}</div>)}

function HB(p){return(<div style={{padding:"16px 18px",borderRadius:10,background:"#FFF5EE",border:"1px solid #F5C9A8",marginBottom:16}}>
<div style={{fontSize:13,fontWeight:700,color:C.o1,marginBottom:5}}>{p.title}</div>
<div style={{fontSize:12.5,color:"#4C4C6D",lineHeight:1.6}}>{p.text}</div></div>)}

function Fnl(p){
var mx=p.data[0].v,last=p.data[p.data.length-1].v,accent=p.accent||C.pri;
var gConv=((last/mx)*100).toFixed(mx>=100000?2:1),gLoss=(100-parseFloat(gConv)).toFixed(1);
return(<div>
{p.data.map(function(d,i){
var ww=Math.max(22,(d.v/mx)*100);var pv=i>=1?p.data[i-1].v:d.v;
var dr=i>=1?((pv-d.v)/pv*100).toFixed(1):null;var hi=dr&&parseFloat(dr)>=12;
return(<div key={i} style={{marginBottom:2}}><div style={{display:"flex",alignItems:"center",gap:6}}>
<div style={{width:ww+"%",minWidth:95,padding:"7px 12px",borderRadius:8,background:accent+"08",borderLeft:"3px solid "+accent,display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:11.5,color:C.text,fontWeight:500}}>{d.s}</span>
<span style={{fontSize:11.5,fontWeight:700,color:accent}}>{d.v.toLocaleString()}</span>
</div>
{dr&&(<span style={{fontSize:9.5,fontWeight:600,padding:"2px 6px",borderRadius:5,background:hi?"#FFEBE9":C.bg,color:hi?C.bad:C.sub,whiteSpace:"nowrap"}}>{"-"+dr+"%"}</span>)}
</div></div>)})
}<div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
<div style={{padding:"7px 12px",borderRadius:8,background:C.bg,border:"1px solid "+C.border,textAlign:"right"}}>
<div style={{fontSize:9,color:C.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{"Conversion globale"}</div>
<div style={{fontSize:17,fontWeight:700,color:accent}}>{gConv+"%"}</div>
<div style={{fontSize:10,color:C.bad,fontWeight:600}}>{gLoss+"% de perte"}</div>
</div></div></div>)}

function Seg(p){return(<div style={{display:"inline-flex",background:C.bg,borderRadius:7,padding:2,gap:1,border:"1px solid "+C.border}}>{p.opts.map(function(o){return(<button key={o.v} onClick={function(){p.set(o.v)}} style={{padding:"5px 12px",borderRadius:6,fontSize:11.5,fontWeight:p.val===o.v?600:400,border:"none",cursor:"pointer",fontFamily:"inherit",background:p.val===o.v?C.card:"transparent",color:p.val===o.v?C.text:C.sub,boxShadow:p.val===o.v?"0 1px 2px rgba(0,0,0,.05)":"none"}}>{o.l}</button>)})}</div>)}

var NAV=[
{id:"overview",label:"Vue d'ensemble"},
{id:"journey",label:"User Journey"},
{id:"acquisition",label:"Acquisition"},
{id:"onboarding",label:"Onboarding"},
{id:"engagement",label:"Engagement"},
{id:"packs",label:"Packs"},
{id:"monetization",label:"Monétisation"},
{id:"retention",label:"Rétention"},
{id:"weekly",label:"Weekly Report"}
];

function V_overview(p){var m=p.D.m,D=p.D;return(<div>
<HB title={"Vue d'ensemble"} text={"Toutes vos métriques business. Bord coloré : vert = sain, orange = attention, rouge = problème."} />
<div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{"Revenus"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"MRR"} value={m.mrr} sub={"Récurrent mensuel"} status="good" />
<Mc label={"ARR"} value={m.arr} sub={"Annualise"} status="good" />
<Mc label={"ARPU"} value={m.arpu} sub={"Bench: 0.30-0.80"} status={sH(parseFloat(m.arpu.slice(1)),.35)} />
<Mc label={"ARPPU"} value={m.arppu} sub={"Bench: 7-12"} status={sH(parseFloat(m.arppu.slice(1)),8)} />
<Mc label={"LTV"} value={m.ltv} sub={"Durée de vie"} status={sH(parseFloat(m.ltv.slice(1)),25)} />
<Mc label={"LTV/CAC"} value={m.lc} sub={"Cible: 3-5x"} status={sH(parseFloat(m.lc)||0,3,2)} />
</div>
<div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{"Utilisateurs et sessions"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"DAU"} value={m.dau} sub={"Actifs/jour"} status="good" /><Mc label={"MAU"} value={m.mau} sub={"Actifs/mois"} status="good" />
<Mc label={"Downloads"} value={m.dl} sub={"Téléchargements totaux"} status="good" />
<Mc label={"Stickiness"} value={m.stick} sub={"Bench: 15-25%"} status={sH(parseFloat(m.stick),20,12)} />
<Mc label={"Session tous"} value={m.sessAll} sub={"Tous users"} status={sH(parseFloat(m.sessAll),5)} />
<Mc label={"Session onboardes"} value={m.sessOnb} sub={"Apres onboarding"} status={sH(parseFloat(m.sessOnb),7)} />
</div>
<div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{"Conversion et rétention"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
<Mc label={"Onboarding"} value={m.onb} sub={"Bench: plus de 60%"} status={sH(parseInt(m.onb),60,45)} />
<Mc label={"Trial to Paid"} value={m.t2p} sub={"Bench: 35-50%"} status={sH(parseFloat(m.t2p),40,30)} />
<Mc label={"Churn"} value={m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(m.churn),5,10)} />
<Mc label={"Ret. J1"} value={m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(m.d1),40)} />
<Mc label={"Ret. J30"} value={m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(m.d30),10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"DAU"} help={"La courbe doit monter. Un décrochage = problème."}><ResponsiveContainer width="100%" height={165}><AreaChart data={D.dauT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="d" tick={TS} interval={Math.max(0,Math.ceil(D.dauT.length/5)-1)} /><YAxis tick={TS} width={40} /><Tooltip {...TT} /><Area type="monotone" dataKey="v" stroke={C.o1} fill={C.o1+"15"} strokeWidth={2} name="DAU" /></AreaChart></ResponsiveContainer></Cc>
<Cc title={"MRR"} help={"Revenus récurrents mensuels."}><ResponsiveContainer width="100%" height={165}><BarChart data={D.mrrT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><Bar dataKey="v" fill={C.o1} name="MRR" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Churn"} help={"Ligne verte = cible 5%."}><ResponsiveContainer width="100%" height={165}><LineChart data={D.chT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><ReferenceLine y={5} stroke={C.good} strokeDasharray="4 4" /><Line type="monotone" dataKey="v" stroke={C.bad} strokeWidth={2} dot={false} name="Churn %" /></LineChart></ResponsiveContainer></Cc>
<Cc title={"LTV par cohorte"} help={"Valeur cumulée. Doit monter."}><ResponsiveContainer width="100%" height={165}><BarChart data={D.ltT}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={38} /><Tooltip {...TT} /><Bar dataKey="v" fill={C.o2} name="LTV" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_journey(p){var D=p.D;return(<div>
<HB title={"Parcours utilisateur complet"} text={"Chaque barre = une etape. Plus la barre est large, plus il y a de monde. Badges rouges = pertes importantes."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
<Mc label={"Vies: retour J+1"} value={D.m.liveBack} sub={"Reviennent après perte de vies"} status={sH(parseInt(D.m.liveBack),40,25)} />
<Mc label={"Vies: churn definitif"} value={D.m.liveGone} sub={"Ne reviennent jamais"} status={sL(parseInt(D.m.liveGone),30,50)} />
<Mc label={"Temps avant 0 vies"} value={D.m.liveTime} sub={"Temps moyen avant perte totale"} status="info" />
<Mc label={"Clic vidéo = 1 vie"} value={D.m.liveVidéo} sub={"Regardent une pub pour une vie"} status={sH(parseInt(D.m.liveVidéo),40,25)} />
<Mc label={"Clic Vies illimitees"} value={D.m.liveUnlim} sub={"CTA premium sur perte vies"} status={sH(parseInt(D.m.liveUnlim),50,30)} />
</div>
<Cc title={"Parcours Organique"} help={"De la découverte App Store jusqu'à J30. Chaque etape detaillee."} wide={true}><Fnl data={D.jOrg} accent={C.o1} /></Cc>
<div style={{height:16}} />
<Cc title={"Parcours Paid Ads"} help={"De l impression pub jusqu'à J30. Volume plus grand mais qualité plus faible."} wide={true}><Fnl data={D.jPaid} accent={C.o3} /></Cc>
</div>)}

function V_acquisition(p){var D=p.D;return(<div>
<HB title={"Acquisition"} text={"Trouver les canaux rentables, pas juste des volumes."} />
<Note type="bad" text={"TikTok : chaque euro investi ne rapporte que 86 centimes. Canal déficitaire."} />
<Note type="good" text={"Apple Search Ads : meilleur ROAS (2.06x) et meilleure rétention."} />
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"ROAS par canal"} wide={true} help={"Combien rapporte 1 euro de pub. Au-dessus de la ligne rouge = rentable."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.ro} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="ch" tick={TS} width={55} /><Tooltip {...TT} /><ReferenceLine x={1} stroke={C.bad} strokeDasharray="4 4" /><Bar dataKey="v" name="ROAS" radius={[0,5,5,0]}>{D.ro.map(function(r,i){return(<Cell key={i} fill={r.v>=1.5?C.good:r.v>=1?C.warn:C.bad} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"CPI vs LTV"} help={"Rouge = coût. Vert = valeur générée."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.cpiL}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="cpi" fill={C.bad} name="CPI" radius={[4,4,0,0]} /><Bar dataKey="ltv" fill={C.good} name="LTV" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Installs par source"} wide={true} help={"Évolution des installations par canal. L organique doit rester au-dessus de 30%."}><ResponsiveContainer width="100%" height={180}><AreaChart data={D.instS}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={40} /><Tooltip {...TT} /><Area type="monotone" dataKey="organic" stackId="1" stroke={C.o1} fill={C.o1+"30"} name="Organique" /><Area type="monotone" dataKey="meta" stackId="1" stroke={C.o2} fill={C.o2+"30"} name="Meta" /><Area type="monotone" dataKey="google" stackId="1" stroke={C.o3} fill={C.o3+"30"} name="Google" /><Area type="monotone" dataKey="tiktok" stackId="1" stroke={C.o4} fill={C.o4+"30"} name="TikTok" /><Area type="monotone" dataKey="asa" stackId="1" stroke={C.o6} fill={C.o6+"30"} name="ASA" /></AreaChart></ResponsiveContainer></Cc>
<Cc title={"Rétention par canal"} help={"Qualité des users par source d acquisition."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.rCh}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={C.o1} name="J1" radius={[3,3,0,0]} /><Bar dataKey="d7" fill={C.o2} name="J7" radius={[3,3,0,0]} /><Bar dataKey="d30" fill={C.o3} name="J30" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_onboarding(p){var D=p.D;return(<div>
<HB title={"Onboarding"} text={"Moins d un utilisateur sur 2 terminé l onboarding. Bench EdTech : 55-70%."} />
<Note type="warn" text={"Plus de 2 personnes sur 3 passent la vidéo sans la regarder."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Complétion"} value={D.m.onb} sub={"Bench: 55-70%"} status={sH(parseInt(D.m.onb),55)} />
<Mc label={"Skip vidéo"} value={"68%"} status="bad" sub={"Bench: moins de 30%"} />
<Mc label={"Push opt-in"} value={"47%"} status="warn" sub={"Bench: plus de 55%"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"Funnel onboarding"} help={"Les pertes signalées en rouge."}><Fnl data={D.oF} /></Cc>
<Cc title={"Réussite quiz"} help={"Sous la ligne rouge (50%) = trop difficile."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.qz}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="q" tick={TS} /><YAxis tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><ReferenceLine y={50} stroke={C.bad} strokeDasharray="4 4" /><Bar dataKey="v" name="Réussite %" radius={[5,5,0,0]}>{D.qz.map(function(q,i){return(<Cell key={i} fill={q.v>=65?C.good:q.v>=50?C.warn:C.bad} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_engagement(p){var D=p.D;return(<div>
<HB title={"Engagement"} text={"Zone idéale de réussite : 65-75%. Bench EdTech : 1.5-3 sessions/jour."} />
<Note type="bad" text={"Le format texte libre est trop difficile : seulement 42% de bonnes réponses. Minimum acceptable : 55%."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Leçons/j"} value={D.m.sess} sub={"Bench: 1.5-3"} status={sH(parseFloat(D.m.sess),1.5)} />
<Mc label={"Accuracy"} value={D.m.acc} sub={"Zone idéale: 65-75%"} status={sH(parseInt(D.m.acc),65,55)} />
<Mc label={"Leçons 1ère session"} value={"1.8"} status={sH(1.8,2,1)} sub={"Bench: 2-3"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"Leçons/jour et Accuracy"} wide={true} help={"Barres = leçons par user. Courbe = taux de réussite. Si les barres montent mais la courbe descend, la difficulté est mal calibree."}><ResponsiveContainer width="100%" height={180}><ComposedChart data={D.engD}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="d" tick={TS} interval={Math.max(0,Math.ceil(D.engD.length/5)-1)} /><YAxis yAxisId="l" tick={TS} width={30} /><YAxis yAxisId="r" orientation="right" tick={TS} width={30} domain={[40,90]} /><Tooltip {...TT} /><Bar yAxisId="l" dataKey="les" fill={C.o1+"50"} name="Leçons" radius={[3,3,0,0]} /><Line yAxisId="r" type="monotone" dataKey="acc" stroke={C.good} name="Réussite %" strokeWidth={2} dot={false} /></ComposedChart></ResponsiveContainer></Cc>
<Cc title={"Réussite par format"} help={"Vert = bonne difficulté. Rouge (sous 55%) = frustrant, les users abandonnent."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.qT} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} domain={[0,100]} /><YAxis type="category" dataKey="t" tick={TS} width={50} /><Tooltip {...TT} /><ReferenceLine x={55} stroke={C.bad} strokeDasharray="4 4" /><Bar dataKey="a" name="%" radius={[0,5,5,0]}>{D.qT.map(function(q,i){return(<Cell key={i} fill={q.a>=65?C.good:q.a>=55?C.warn:C.bad} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Leçons à la 1ère session"} help={"Combien de leçons un user fait lors de sa toute première connexion. 0 = il est parti avant de commencer."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.fsl}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="n" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="v" name="Users" radius={[5,5,0,0]}>{D.fsl.map(function(d,i){return(<Cell key={i} fill={i===0?C.bad:i===1?C.warn:C.good} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Progression contenu"} help={"Barres = nombre d users par ere. Courbe = taux de complétion. La chute montre ou le contenu perd les gens."}><ResponsiveContainer width="100%" height={200}><ComposedChart data={D.dp}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="e" tick={{fontSize:8,fill:C.sub}} /><YAxis yAxisId="u" tick={TS} width={38} /><YAxis yAxisId="c" orientation="right" tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><Bar yAxisId="u" dataKey="u" fill={C.o1+"30"} name="Users" radius={[4,4,0,0]} /><Line yAxisId="c" type="monotone" dataKey="p" stroke={C.bad} name="Complétion %" strokeWidth={2} dot={true} /></ComposedChart></ResponsiveContainer></Cc>
</div></div>)}

function V_packs(p){var D=p.D;var _pf=useState(""),pkFilter=_pf[0],setPkF=_pf[1];
var filtered=D.topPacks.filter(function(pk){return pkFilter===""||pk.n.toLowerCase().indexOf(pkFilter.toLowerCase())>=0});
return(<div>
<HB title={"Packs"} text={"Statistiques des packs d entrainement : combien de gens les font, leur progression, leurs resultats."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Manches / session"} value={D.m.manchesSess} sub={"Nombre moyen de manches par session"} status="info" />
<Mc label={"Accuracy packs"} value={"68%"} sub={"Bench: 65-75%"} status="good" />
<Mc label={"Durée moy."} value={"6m30"} sub={"Par pack"} status="info" />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"Funnel packs"} help={"Du lancement au replay. Le taux de replay est un indicateur cle de la qualité du contenu."}><Fnl data={D.packF} accent={C.o2} /></Cc>
<Cc title={"Étoiles"} help={"1 = trop dur. 3 = trop facile. Ideal = majorite en 2."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.stars}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="s" tick={TS} /><YAxis tick={TS} width={35} /><Tooltip {...TT} /><Bar dataKey="c" name="Leçons" radius={[5,5,0,0]}>{D.stars.map(function(_,i){return(<Cell key={i} fill={[C.bad,C.warn,C.good][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Top 10 packs les plus joués"} wide={true} help={"Les packs les plus populaires. Utilisez le filtre pour rechercher un pack spécifique."}>
<input value={pkFilter} onChange={function(e){setPkF(e.target.value)}} placeholder={"Rechercher un pack..."} style={{width:"100%",padding:"8px 12px",borderRadius:6,border:"1px solid "+C.border,fontSize:12,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box"}} />
<ResponsiveContainer width="100%" height={280}><BarChart data={filtered} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="n" tick={{fontSize:10,fill:C.sub}} width={120} /><Tooltip {...TT} /><Bar dataKey="p" name="Joueurs" radius={[0,5,5,0]} fill={C.o1} /></BarChart></ResponsiveContainer>
</Cc>
</div></div>)}

function V_monetization(p){var D=p.D;return(<div>
<HB title={"Monétisation"} text={"Du paywall au paiement. Bench EdTech : 2-8% de conversion paywall."} />
<Note type="good" text={"Le paywall onboarding convertit le mieux (16.8%). Au-dessus de la moyenne (12-20%)."} />
<Note type="bad" text={"370 achats échouent par mois pour raisons techniques. Environ 3100 euros de revenu perdu."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"1er paywall"} value={D.m.pwFirst} sub={"Quand l user voit le 1er paywall"} status="info" />
<Mc label={"Paywalls avant achat"} value={D.m.pwAvgBuy} sub={"En moyenne pour convertir"} status="info" />
<Mc label={"Paywalls = perdu"} value={D.m.pwLost} sub={"Seuil : l user ne convertira plus"} status="warn" />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"Funnel achat"} help={"Du moment ou le paywall s affiche au paiement reussi."}><Fnl data={D.pF} /></Cc>
<Cc title={"Paywall fatigue"} help={"% des users encore actifs après chaque paywall vu. Au-dela de 5 paywalls sans achat, l user est considere comme perdu."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.pwFunnel}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="n" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="v" name="% restants" radius={[5,5,0,0]}>{D.pwFunnel.map(function(_,i){return(<Cell key={i} fill={[C.good,C.good,C.warn,C.bad,C.bad][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Conversion par écran"} help={"Quel écran source généré le plus de conversions. Onboarding = moment ou l user est le plus receptif."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.ps} layout="vertical"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="s" tick={TS} width={80} /><Tooltip {...TT} /><Bar dataKey="r" name="%" radius={[0,5,5,0]}>{D.ps.map(function(s,i){return(<Cell key={i} fill={s.r>=13?C.good:s.r>=9?C.blue:C.warn} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Évolution MRR"} wide={true} help={"Vert = nouveaux abonnés. Violet = renouvellements. Rouge = perdus. La croissance = vert+violet doit dépasser le rouge."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.mb} stackOffset="sign"><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><ReferenceLine y={0} stroke={GC} /><Bar dataKey="n" stackId="a" fill={C.o1} name="Nouveaux" radius={[3,3,0,0]} /><Bar dataKey="r" stackId="a" fill={C.o3} name="Renouvelés" /><Bar dataKey="l" stackId="a" fill={C.bad} name="Perdus" radius={[0,0,3,3]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Publicité in-app"} help={"Impact des pubs rewarded. % qui quittent l app après une pub vs % qui prennent premium pour les supprimer."}>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:C.bg,border:"1px solid "+C.border}}>
<div style={{fontSize:10,color:C.sub}}>{"Rev. pubs"}</div>
<div style={{fontSize:16,fontWeight:700}}>{D.m.adR}</div>
</div>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:C.bg,border:"1px solid "+C.border}}>
<div style={{fontSize:10,color:C.sub}}>{"Quittent après pub"}</div>
<div style={{fontSize:16,fontWeight:700,color:C.bad}}>{D.m.adQuit}</div>
</div>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:C.bg,border:"1px solid "+C.border}}>
<div style={{fontSize:10,color:C.sub}}>{"Premium pour supprimer"}</div>
<div style={{fontSize:16,fontWeight:700,color:C.good}}>{D.m.adPrem}</div>
</div>
</div>
<ResponsiveContainer width="100%" height={180}><PieChart><Pie data={D.adImpact} dataKey="v" nameKey="n" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} label={function(e){return e.n+" "+e.v+"%"}}>{D.adImpact.map(function(_,i){return(<Cell key={i} fill={i===0?C.good:C.bad} />)})}</Pie><Tooltip {...TT} /></PieChart></ResponsiveContainer>
</Cc>
<Cc title={"Paywalls et vidéos par session"} help={"Nombre moyen de paywalls vus et de vidéos pub regardees par session utilisateur."}>
<div style={{display:"flex",gap:16,alignItems:"center",justifyContent:"center",padding:"20px 0"}}>
<div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:C.o1}}>{D.m.pwPerSess}</div><div style={{fontSize:11,color:C.sub,marginTop:4}}>{"Paywalls / session"}</div></div>
<div style={{width:1,height:50,background:C.border}} />
<div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:C.o2}}>{D.m.adPerSess}</div><div style={{fontSize:11,color:C.sub,marginTop:4}}>{"Vidéos pub / session"}</div></div>
</div>
</Cc>
<Cc title={"Erreurs achat"} help={"Chaque erreur = un user prêt a payer qui n a pas pu. A corriger en priorité."}>{D.pErr.map(function(e,i){return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:C.sub,width:100,flexShrink:0}}>{e.t}</span><div style={{flex:1,height:8,borderRadius:4,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",width:(D.pErr[0].c>=1?(e.c/D.pErr[0].c)*100:0)+"%",background:i===0?C.bad:C.warn,borderRadius:4}} /></div><span style={{fontSize:12,fontWeight:700,color:C.text,width:30,textAlign:"right"}}>{e.c}</span></div>)})}</Cc>
</div></div>)}

function V_retention(p){var D=p.D;
function cBg(v){return v===null?C.bg:v>=30?"#FFF0E6":v>=15?"#FFF5EE":v>=10?"#FFF8F3":"#FFFBF8"}
function cC(v){return v===null?C.sub:v>=30?C.o1:v>=15?"#C4723A":v>=10?"#D4956A":"#D4A88A"}
return(<div>
<HB title={"Rétention"} text={"La métrique la plus importante. Sans rétention, l app meurt."} />
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
<Mc label={"Jour 1"} value={D.m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(D.m.d1),40)} />
<Mc label={"Jour 7"} value={D.m.d7} sub={"Bench: plus de 20%"} status={sH(parseInt(D.m.d7),20)} />
<Mc label={"Jour 30"} value={D.m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(D.m.d30),10)} />
<Mc label={"Churn"} value={D.m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(D.m.churn),5,10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
<Cc title={"Cohortes"} wide={true} help={"Chaque ligne = une semaine d install. Chaque colonne = rétention a J+n. Vert = bon. Rouge = problème."}>
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"separate",borderSpacing:3,fontSize:12}}>
<thead><tr><th style={{padding:"8px 10px",textAlign:"left",color:C.sub,fontSize:11}}>{"Cohorte"}</th>{["J1","J3","J7","J14","J30"].map(function(d){return(<th key={d} style={{padding:"8px 10px",textAlign:"center",color:C.sub,fontSize:11}}>{d}</th>)})}</tr></thead>
<tbody>{D.co.map(function(c,i){return(<tr key={i}><td style={{padding:"7px 10px",fontWeight:600,color:C.text}}>{c.w}</td>{["d1","d3","d7","d14","d30"].map(function(d){return(<td key={d} style={{padding:"7px 10px",textAlign:"center",fontWeight:600,background:cBg(c[d]),color:cC(c[d]),borderRadius:6}}>{c[d]!==null?c[d]+"%":"--"}</td>)})}</tr>)})}</tbody>
</table></div></Cc>
<Cc title={"Courbe de rétention"} help={"Pourcentage d utilisateurs encore actifs chaque jour après l install."}><ResponsiveContainer width="100%" height={190}><LineChart data={D.rC}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="j" tick={TS} /><YAxis tick={TS} width={32} domain={[0,100]} /><Tooltip {...TT} /><Line type="monotone" dataKey="p" stroke={C.o1} strokeWidth={2.5} dot={false} name="Rétention %" /></LineChart></ResponsiveContainer></Cc>
<Cc title={"Rétention par canal"} help={"Qualité des users par source d acquisition."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.rCh}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={C.o1} name="J1" radius={[3,3,0,0]} /><Bar dataKey="d7" fill={C.o2} name="J7" radius={[3,3,0,0]} /><Bar dataKey="d30" fill={C.o3} name="J30" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Time to churn"} help={"TIME TO CHURN : montre QUAND les utilisateurs partent definitivement. C est une distribution. Chaque barre indique quel % du churn total se produit dans cette tranche de jours. Par exemple, si la barre 1-2j est a 32%, cela veut dire que 32% de tous les utilisateurs qui partent le font dans les 2 premiers jours. Cela aide a savoir A QUEL MOMENT intervenir pour les retenir."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.t2ch}><CartesianGrid stroke={GC} strokeDasharray="3 3" /><XAxis dataKey="r" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="p" name="% du churn" radius={[5,5,0,0]}>{D.t2ch.map(function(_,i){return(<Cell key={i} fill={[C.o1,C.o1,C.o2,C.o3,C.o4][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_weekly(p){var D=p.D;var _r=useState(null),rpt=_r[0],setRpt=_r[1];var _l=useState(false),ld=_l[0],setLd=_l[1];
function gen(){setLd(true);var m=D.m;fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:"Analyse ces métriques EdTech. JSON: {summary,trends:[{title,direction,detail}],alerts:[{severity,text}],recommendations:[{priority,action,impact}],kpi_changes:[{name,value,change,status}]}. JSON UNIQUEMENT. DAU="+m.dau+",MRR="+m.mrr+",Churn="+m.churn+",D1="+m.d1+",D7="+m.d7+",D30="+m.d30+",Onb="+m.onb}]})}).then(function(r){return r.json()}).then(function(d){try{var t=d.content.map(function(c){return c.text||""}).join("");setRpt(JSON.parse(t.replace(/```json|```/g,"").trim()))}catch(e){setRpt({summary:"Erreur: "+e.message})}setLd(false)}).catch(function(e){setRpt({summary:"Erreur: "+e.message});setLd(false)})}
return(<div>
<HB title={"Claude is Killing BCG Stars"} text={"Chaque dimanche à 20h, Claude analyse vos données et généré un rapport avec tendances, alertes et recommandations."} />
<button onClick={gen} disabled={ld} style={{padding:"10px 22px",borderRadius:8,border:"none",background:ld?"#ccc":C.o1,color:"#fff",fontSize:13,fontWeight:600,cursor:ld?"wait":"pointer",fontFamily:"inherit",marginBottom:16}}>{ld?"Analyse en cours...":"Générer le rapport"}</button>
{rpt&&(<div style={{marginTop:12}}>
<div style={{background:C.card,borderRadius:10,padding:20,marginBottom:12,border:"1px solid "+C.border}}><div style={{fontSize:16,fontWeight:700,marginBottom:8}}>{"Synthèse"}</div><div style={{fontSize:13,lineHeight:1.65,color:"#333"}}>{rpt.summary}</div></div>
{rpt.kpi_changes&&rpt.kpi_changes.length>=1&&(<div style={{background:C.card,borderRadius:10,padding:20,marginBottom:12,border:"1px solid "+C.border}}><div style={{fontSize:14,fontWeight:600,marginBottom:12}}>{"Variations"}</div><div style={{display:"flex",flexWrap:"wrap",gap:10}}>{rpt.kpi_changes.map(function(k,i){return(<div key={i} style={{flex:"1 1 140px",padding:"12px",borderRadius:8,background:C.bg,border:"1px solid "+C.border}}><div style={{fontSize:10,color:C.sub}}>{k.name}</div><div style={{fontSize:18,fontWeight:700,color:C.text}}>{k.value}</div><div style={{fontSize:12,fontWeight:600,color:k.status==="good"?C.good:k.status==="bad"?C.bad:C.sub}}>{k.change}</div></div>)})}</div></div>)}
{rpt.recommendations&&rpt.recommendations.length>=1&&(<div style={{background:C.card,borderRadius:10,padding:20,border:"1px solid "+C.border}}><div style={{fontSize:14,fontWeight:600,marginBottom:12}}>{"Recommandations"}</div>{rpt.recommendations.map(function(r,i){return(<div key={i} style={{padding:"12px",marginBottom:6,borderRadius:8,background:C.bg,border:"1px solid "+C.border}}><div style={{fontSize:13,fontWeight:600,color:C.text}}>{r.action}</div><div style={{fontSize:11,color:C.sub,marginTop:3}}>{"Impact : "+r.impact}</div></div>)})}</div>)}
</div>)}
</div>)}

var VW={overview:V_overview,journey:V_journey,acquisition:V_acquisition,onboarding:V_onboarding,engagement:V_engagement,packs:V_packs,monetization:V_monetization,retention:V_retention,weekly:V_weekly};
var FO={ut:[{v:"all",l:"Tous"},{v:"free",l:"Gratuits"},{v:"prem",l:"Premium"},{v:"trial",l:"Essai"}],pe:[{v:"7d",l:"7j"},{v:"30d",l:"30j"},{v:"90d",l:"90j"},{v:"all",l:"All time"}],ch:[{v:"all",l:"Tous"},{v:"organic",l:"Organique"},{v:"meta",l:"Meta"},{v:"google",l:"Google"},{v:"tiktok",l:"TikTok"},{v:"asa",l:"ASA"}],pl:[{v:"all",l:"Toutes"},{v:"ios",l:"iOS"},{v:"android",l:"Android"}]};

export default function App(){
var _t=useState("overview"),tab=_t[0],setTab=_t[1];
var _f=useState({ut:"all",pe:"30d",ch:"all",pl:"all"}),fi=_f[0],sf=_f[1];
var _sb=useState(true),sb=_sb[0],setSb=_sb[1];
var _co=useState(["all"]),countries=_co[0],setCo=_co[1];
var _cd=useState(false),cdd=_cd[0],setCdd=_cd[1];
var COUNTRIES=["Afghanistan","Afrique du Sud","Albanie","Algerie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie saoudite","Argentine","Armenie","Australie","Autriche","Azerbaidjan","Bahamas","Bahrein","Bangladesh","Barbade","Belgique","Belize","Benin","Bhoutan","Bielorussie","Birmanie","Bolivie","Bosnie-Herzegovine","Botswana","Bresil","Brunei","Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Canada","Cap-Vert","Centrafrique","Chili","Chine","Chypre","Colombie","Comores","Congo","Coree du Nord","Coree du Sud","Costa Rica","Cote d'Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Egypte","Emirats arabes unis","Equateur","Erythree","Espagne","Estonie","Eswatini","Etats-Unis","Ethiopie","Fidji","Finlande","France","Gabon","Gambie","Georgie","Ghana","Grece","Grenade","Guatemala","Guinee","Guinee-Bissau","Guinee equatoriale","Guyana","Haiti","Honduras","Hongrie","Inde","Indonesie","Irak","Iran","Irlande","Islande","Israel","Italie","Jamaique","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweit","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Macedoine du Nord","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Maurice","Mauritanie","Mexique","Micronesie","Moldavie","Monaco","Mongolie","Montenegro","Mozambique","Namibie","Nauru","Nepal","Nicaragua","Niger","Nigeria","Norvege","Nouvelle-Zelande","Oman","Ouganda","Ouzbekistan","Pakistan","Palaos","Palestine","Panama","Papouasie-N-Guinee","Paraguay","Pays-Bas","Perou","Philippines","Pologne","Portugal","Qatar","Republique dominicaine","Republique tcheque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Kitts-et-Nevis","Sainte-Lucie","Saint-Vincent","Salomon","Salvador","Samoa","Sao Tome-et-Principe","Senegal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovenie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suede","Suisse","Suriname","Syrie","Tadjikistan","Tanzanie","Tchad","Thailande","Timor oriental","Togo","Tonga","Trinite-et-Tobago","Tunisie","Turkmenistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yemen","Zambie","Zimbabwe"];
var D=useMemo(function(){return bD(fi)},[fi.ut,fi.pe,fi.ch,fi.pl]);
var View=VW[tab];
var nf=[fi.ut!=="all",fi.pe!=="30d",fi.ch!=="all",fi.pl!=="all"].filter(Boolean).length;
var curNav=NAV.find(function(n){return n.id===tab});
return(
<div style={{display:"flex",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",background:C.bg,color:C.text,minHeight:"100vh"}}>
<div style={{width:sb?210:0,minWidth:sb?210:0,background:C.card,borderRight:"1px solid "+C.border,transition:"all .2s",overflow:"hidden",position:"sticky",top:0,height:"100vh",display:"flex",flexDirection:"column"}}>
<div style={{padding:"18px 16px",borderBottom:"1px solid "+C.border,display:"flex",alignItems:"center",gap:10}}>
<img src={ICON} style={{width:30,height:30,borderRadius:8,objectFit:"cover",flexShrink:0}} />
<div><div style={{fontSize:13,fontWeight:700,color:C.text}}>{"THETYS"}</div><div style={{fontSize:10,color:C.sub}}>{"Sapio Analytics"}</div></div>
</div>
<div style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
{NAV.map(function(n){var active=tab===n.id;return(
<button key={n.id} onClick={function(){setTab(n.id)}} style={{display:"block",width:"100%",padding:"9px 14px",marginBottom:1,borderRadius:7,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:active?600:400,background:active?C.o1+"0F":"transparent",color:active?C.o1:C.sub,textAlign:"left"}}>{n.label}</button>)
})}
</div>
</div>
<div style={{flex:1,minWidth:0}}>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<button onClick={function(){setSb(!sb)}} style={{padding:"6px 8px",borderRadius:6,border:"1px solid "+C.border,background:C.card,cursor:"pointer",fontSize:14,color:C.sub,fontFamily:"inherit"}}>{sb?"\u2190":"\u2192"}</button>
<div style={{fontSize:15,fontWeight:600,color:C.text}}>{curNav?curNav.label:""}</div>
</div>
</div>
<div style={{paddingBottom:10,display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
<div><div style={{fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{"Utilisateur"}</div><Seg opts={FO.ut} val={fi.ut} set={function(v){sf(Object.assign({},fi,{ut:v}))}} /></div>
<div><div style={{fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{"Période"}</div><Seg opts={FO.pe} val={fi.pe} set={function(v){sf(Object.assign({},fi,{pe:v}))}} /></div>
<div><div style={{fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{"Canal"}</div><Seg opts={FO.ch} val={fi.ch} set={function(v){sf(Object.assign({},fi,{ch:v}))}} /></div>
<div><div style={{fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{"Plateforme"}</div><Seg opts={FO.pl} val={fi.pl} set={function(v){sf(Object.assign({},fi,{pl:v}))}} /></div>
<div style={{position:"relative"}}><div style={{fontSize:9,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{"Pays"}</div>
<button onClick={function(){setCdd(!cdd)}} style={{padding:"5px 12px",borderRadius:6,fontSize:11.5,fontWeight:500,border:"1px solid "+C.border,background:C.card,cursor:"pointer",fontFamily:"inherit",color:C.text,display:"flex",alignItems:"center",gap:4}}>{countries[0]==="all"?"Tous les pays":countries.length+" pays"}<span style={{fontSize:8,color:C.sub}}>{"\u25BC"}</span></button>
{cdd&&(<div style={{position:"absolute",top:"100%",left:0,marginTop:4,background:C.card,border:"1px solid "+C.border,borderRadius:8,boxShadow:"0 8px 24px rgba(0,0,0,.1)",padding:8,zIndex:200,minWidth:200,maxHeight:280,overflowY:"auto"}}>
<div onClick={function(){setCo(["all"])}} style={{padding:"6px 10px",borderRadius:5,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
<div style={{width:14,height:14,borderRadius:3,border:"1.5px solid "+(countries[0]==="all"?C.o1:C.border),background:countries[0]==="all"?C.o1:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{countries[0]==="all"&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>{"\u2713"}</span>}</div>
{"Tous les pays"}
</div>
<div style={{height:1,background:C.border,margin:"4px 0"}} />
{COUNTRIES.map(function(c){var sel=countries.indexOf(c)>=0||countries[0]==="all";return(<div key={c} onClick={function(){if(countries[0]==="all"){setCo([c])}else if(countries.indexOf(c)>=0){var nxt=countries.filter(function(x){return x!==c});setCo(nxt.length>=1?nxt:["all"])}else{setCo(countries.concat([c]))}}} style={{padding:"5px 10px",borderRadius:5,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
<div style={{width:14,height:14,borderRadius:3,border:"1.5px solid "+(sel?C.o1:C.border),background:sel?C.o1:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>{"\u2713"}</span>}</div>
{c}
</div>)})}
</div>)}
{cdd&&(<div onClick={function(){setCdd(false)}} style={{position:"fixed",inset:0,zIndex:199}} />)}
</div>
{countries[0]!=="all"&&(<div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center",marginBottom:2}}>{countries.map(function(c){return(<span key={c} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:5,background:C.o1+"12",color:C.o1,fontSize:10.5,fontWeight:600}}>{c}<span onClick={function(){var nxt=countries.filter(function(x){return x!==c});setCo(nxt.length>=1?nxt:["all"])}} style={{cursor:"pointer",fontSize:12,opacity:.7}}>{"\u00d7"}</span></span>)})}</div>)}
{nf>=1&&(<button onClick={function(){sf({ut:"all",pe:"30d",ch:"all",pl:"all"});setCo(["all"])}} style={{fontSize:11,color:C.bad,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:4}}>{"Reset ("+nf+")"}</button>)}
</div>
</div>
<div style={{padding:"20px 24px 60px"}}><View D={D} /></div>
</div>
</div>)
}
