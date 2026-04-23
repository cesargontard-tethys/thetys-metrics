import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, ReferenceLine, PieChart, Pie } from "recharts";

var ICON="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB9GaSrlvpd9cxiSK3bYejMQoP0zX00pRirydj4+EJTdoq5UzRmrc2l38LqklrIC5CqQMgk+4rTbTtP08LFdrLd3ZUMY422qgPqcjH49fSsp4inBLW9+xvTwtWo2rWt30MHNGa1k0+wv8Lp1zJHO4LCCdCOnUBuhx7ZoFhp0TtG893dyIcP9kh3Kp9M9M1H1unYv6jWva34mRmithdLsbzKadesLgDP2e4XY/5HB/SsiWOSGVopVKOpwVPatadaFT4TGtQqUviRc06xWZHu7pxFZwEF3IzuP90DuT/WnX13Hc3ct1dRAo+BDE/zsigYxjoPXj161a1D934f0xE4Rt8hx3YA4/mT+FYygSFyeowB9MV5mJrtJ1POyPey7BxnJUr7q7/y/EtWuoNBKP7OjkhmJ4RT8j/7y5xj361c3SyPJLO4aSVy7FRgDtgewAxWfYKA00med3lqfQDr+v8AKm29tB5glF5LNKpyWEnX2x6VdCLcVOW7IxbgqkqcPhRoSgYDtLJHsB+ZX24BGD+nFVZr8qqi08poVG0bDwvtgdKdJcWs0htZCjtxlD+dQaYF1Br0wxQRJCgY4GGYZxTqx918rsycNJKa51ddizHei5QRXCZK/MvPI91PUGrF+Te6Z9olO65tHEbvjBkQjKsfft9c1nRLucyY2pGpJJ4+p+laCsF0a+m6xzeVFG3Z2BLEj1xnH4Gs8PKVoylvf8DTH06cZzhT1jb7mFrd211owsLmZYZoX3wSOCVPXg4+pH41XuNJvLba4iZlYZWSAGVGHpwM/pWZmr+l6rcafcRkSOYA3zR54I78V1VsLdNx69Dz8Lj3Bx5tLbNDLb93EAWB3EvkDHU5qH7AjXfntKeGyqooUD6+taWpWHk/6RbndaPloplGVCk52t/dIzjJ4x71RQzEZVC49V+YfpU05RcUbVFNSb7mbDbtFqsz3lvI8R3lJFcKFY/dbOe1X4rS2juTcxj526YbjnqQKrvYW/nSzXUTNvOQHk2hTWnYaTcXcS4Bt7VB807/ACqq+2ep/T3rKM3FtzVl63OipCMoR9nK766WsW7Q2ttp0Oo3wkmMkjeTAuAh2scE+vTvn6Vm3+oXGoTGSd+AflQfdX6CpdYvIZ5YoLMbbS2Ty4h6+prOrroUrLnktWeXiq7k/Zxfur8QopKK6DjLlhqd5p5P2aUqp6oRlT+FXhrdrIc3ejWUrHqwUAn9DWLRWU6FObu0b08TVpq0Xobo161g5stGtIX7MQCR+QFZ9/ql5qB/0mYleyDhR+FUqKIUKcHdIdTE1aitKWgtJRRWpzn/2Q==";
var C={pri:"#0666EB",o1:"#0666EB",o2:"#3D8BF2",o3:"#6EAAF5",o4:"#A0CAF8",o5:"#191C20",o6:"#2A2F35",bg:"#000000",card:"#191C20",border:"#2A2F35",text:"#FFFFFF",sub:"#8E949A",good:"#21BF73",warn:"#FFCC00",bad:"#D92027",blue:"#0666EB",teal:"#21BF73"};
var TS={fontSize:10,fill:"#5A5F66"},GC="#F0F1F4";
var TT={contentStyle:{background:"#2A2F35",border:"1px solid #3A3F45",borderRadius:12,fontSize:12,boxShadow:"none",padding:"12px 16px",color:"#fff"},itemStyle:{color:"#fff"},labelStyle:{color:"#8E949A",marginBottom:4}};
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
m:{dau:dau.toLocaleString(),mau:mau.toLocaleString(),mrr:E+mrr.toLocaleString(),arr:E+(mrr*12).toLocaleString(),arpu:E+arpu,arppu:E+arppu,ltv:E+ltv,cac:cac>0?E+cac:E+"0",lc:lc>=999?String.fromCharCode(8734):lc+"x",churn:chA+"%",stick:(mau>0?(dau/mau*100).toFixed(1):0)+"%",t2p:Math.min(95,+(38.2*q).toFixed(1))+"%",pb:pb+"j",d1:d1+"%",d7:d7+"%",d30:d30+"%",sess:(1.6*q).toFixed(1),acc:Math.min(98,Math.round(64*q))+"%",onb:Math.min(95,Math.round(45.7*q))+"%",adR:E+Math.round(2340*v),dl:Math.round(32100*v).toLocaleString(),sessOnb:Math.round(8.4*q)+"min",sessAll:Math.round(5.2*q)+"min",pwFirst:"3.2 leçons",pwAvgBuy:"4.2 vues",pwLost:"8+ vues",liveBack:Math.round(34*q)+"%",liveGone:Math.round(41/q)+"%",liveQuit:Math.round(52/q)+"%",liveUnlim:Math.round(48*q)+"%",lesUser:Math.round(12.4*q).toLocaleString(),adQuit:Math.round(12/q)+"%",adPrem:Math.round(8*q)+"%",liveTime:Math.round(4.2*q)+"min",liveVidéo:Math.round(38*q)+"%",pwPerSess:(1.4/q).toFixed(1),adPerSess:(0.8*q).toFixed(1),manchesSess:(2.3*q).toFixed(1)},
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

function Mc(p){var bc=p.status==="good"?C.good:p.status==="bad"?C.bad:p.status==="warn"?C.warn:"#D1D5DB";var dot=p.status==="good"?"#00B341":p.status==="bad"?"#EF4444":p.status==="warn"?"#F59E0B":"#D1D5DB";
return(<div style={{padding:"18px 20px",borderRadius:16,background:C.card,className:"mcH",flex:"1 1 155px",minWidth:148,boxShadow:"0 0 0 1px rgba(0,0,0,.04),0 2px 8px rgba(0,0,0,.02)",border:"none",transition:"all .25s ease",cursor:"default"}}>
<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
<div style={{width:6,height:6,borderRadius:3,background:dot}} />
<div style={{fontSize:11.5,color:C.sub,fontWeight:500,letterSpacing:.1}}>{p.label}</div>
</div>
<div style={{fontSize:26,fontWeight:700,color:C.text,letterSpacing:-.5}}>{p.value}</div>
{p.sub&&<div style={{fontSize:11,color:"#9CA3AF",marginTop:6,lineHeight:1.4}}>{p.sub}</div>}
</div>)}

function Cc(p){return(<div style={{padding:"20px",borderRadius:12,background:C.card,gridColumn:p.wide?"1/-1":undefined,border:"1px solid #2A2F35"}}>
<div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:14,letterSpacing:-.02}}>{p.title}</div>
{p.children}
{p.help&&<div style={{fontSize:11,color:"#6B7280",lineHeight:1.55,marginTop:14,fontStyle:"italic"}}>{p.help}</div>}
</div>)}

function Note(p){var c={good:{l:C.good,c:C.good},warn:{l:C.warn,c:C.warn},bad:{l:C.bad,c:C.bad},info:{l:C.pri,c:C.pri}};
var s=c[p.type]||c.info;return(<div style={{padding:"12px 16px",marginBottom:8,fontSize:13,color:s.c,lineHeight:1.6,fontWeight:400,borderLeft:"2px solid "+s.l,background:"#0D0F12",borderRadius:"0 8px 8px 0"}}>{p.text}</div>)}

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
<div style={{width:ww+"%",minWidth:95,padding:"12px 16px",borderRadius:10,background:"#0D0F12",borderLeft:"none",display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:11.5,color:C.text,fontWeight:500}}>{d.s}</span>
<span style={{fontSize:12,fontWeight:700,color:accent,textShadow:"0 0 12px "+accent+"60"}}>{d.v.toLocaleString()}</span>
</div>
{dr&&(<span style={{fontSize:9.5,fontWeight:600,padding:"2px 6px",borderRadius:5,background:hi?C.bad+"20":C.card,color:hi?C.bad:C.sub,whiteSpace:"nowrap"}}>{"-"+dr+"%"}</span>)}
</div></div>)})
}<div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
<div style={{padding:"12px 16px",borderRadius:10,background:C.card,border:"1px solid "+C.border,textAlign:"right"}}>
<div style={{fontSize:9,color:C.sub,fontWeight:500,textTransform:"uppercase",letterSpacing:.5}}>{"Conversion globale"}</div>
<div style={{fontSize:18,fontWeight:700,color:accent,textShadow:"0 0 14px "+accent+"60"}}>{gConv+"%"}</div>
<div style={{fontSize:10,color:C.bad,fontWeight:500}}>{gLoss+"% de perte"}</div>
</div></div></div>)}

function Seg(p){return(<div style={{display:"inline-flex",gap:4}}>{p.opts.map(function(o){var act=p.val===o.v;return(<button key={o.v} onClick={function(){p.set(o.v)}} style={{padding:"7px 16px",borderRadius:24,fontSize:12,fontWeight:act?600:400,border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .3s cubic-bezier(.4,0,.2,1)",background:act?"#FFFFFF":"#191C20",color:act?"#000000":"#8E949A",boxShadow:"none"}}>{o.l}</button>)})}</div>)}

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
<div style={{fontSize:12,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{"Revenus"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:22}}>
<Mc label={"MRR"} value={m.mrr} sub={"Récurrent mensuel"} status="good" />
<Mc label={"ARR"} value={m.arr} sub={"Annualise"} status="good" />
<Mc label={"ARPU"} value={m.arpu} sub={"Bench: 0.30-0.80"} status={sH(parseFloat(m.arpu.slice(1)),.35)} />
<Mc label={"ARPPU"} value={m.arppu} sub={"Bench: 7-12"} status={sH(parseFloat(m.arppu.slice(1)),8)} />
<Mc label={"LTV"} value={m.ltv} sub={"Durée de vie"} status={sH(parseFloat(m.ltv.slice(1)),25)} />
<Mc label={"LTV/CAC"} value={m.lc} sub={"Cible: 3-5x"} status={sH(parseFloat(m.lc)||0,3,2)} />
</div>
<div style={{fontSize:12,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{"Utilisateurs et sessions"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:22}}>
<Mc label={"DAU"} value={m.dau} sub={"Actifs/jour"} status="good" /><Mc label={"MAU"} value={m.mau} sub={"Actifs/mois"} status="good" />
<Mc label={"Downloads"} value={m.dl} sub={"Téléchargements totaux"} status="good" />
<Mc label={"Stickiness"} value={m.stick} sub={"Bench: 15-25%"} status={sH(parseFloat(m.stick),20,12)} />
<Mc label={"Session tous"} value={m.sessAll} sub={"Tous users"} status={sH(parseFloat(m.sessAll),5)} />
<Mc label={"Session onboardes"} value={m.sessOnb} sub={"Apres onboarding"} status={sH(parseFloat(m.sessOnb),7)} />
</div>
<div style={{fontSize:12,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{"Conversion et rétention"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:22}}>
<Mc label={"Onboarding"} value={m.onb} sub={"Bench: plus de 60%"} status={sH(parseInt(m.onb),60,45)} />
<Mc label={"Trial to Paid"} value={m.t2p} sub={"Bench: 35-50%"} status={sH(parseFloat(m.t2p),40,30)} />
<Mc label={"Churn"} value={m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(m.churn),5,10)} />
<Mc label={"Ret. J1"} value={m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(m.d1),40)} />
<Mc label={"Ret. J30"} value={m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(m.d30),10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"DAU"} help={"Ce graphique montre le nombre de personnes qui utilisent Sapio chaque jour. Si la courbe monte, votre app gagne en popularité. Si elle chute brutalement, il y a un problème (bug, mauvaise mise à jour, fin d une campagne pub...)."}><ResponsiveContainer width="100%" height={165}><AreaChart data={D.dauT}><XAxis dataKey="d" tick={TS} interval={Math.max(0,Math.ceil(D.dauT.length/5)-1)} /><YAxis tick={TS} width={40} /><Tooltip {...TT} /><Area type="monotone" dataKey="v" stroke={"#0666EB"} fill={"#0666EB15"} strokeWidth={2} name="DAU" style={{filter:"drop-shadow(0 0 8px #0666EB80)"}} /></AreaChart></ResponsiveContainer></Cc>
<Cc title={"MRR"} help={"Le MRR (Monthly Recurring Revenue) représente l argent que vos abonnés vous rapportent chaque mois. Chaque barre = une période. Si les barres montent, votre business croît de façon saine et prévisible."}><ResponsiveContainer width="100%" height={165}><BarChart data={D.mrrT}><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><Bar dataKey="v" fill={"#0666EB"} name="MRR" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Churn"} help={"Le churn mesure le pourcentage d abonnés qui annulent chaque mois. La ligne verte représente l objectif de 5%. Au-dessus, vous perdez trop de monde. Un churn qui baisse signifie que vos utilisateurs sont de plus en plus satisfaits."}><ResponsiveContainer width="100%" height={165}><LineChart data={D.chT}><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><ReferenceLine y={5} stroke={"#8E949A"} strokeDasharray="4 4" /><Line type="monotone" dataKey="v" stroke={"#0666EB"} strokeWidth={2} dot={false} name="Churn %" style={{filter:"drop-shadow(0 0 8px #0666EB80)"}} /></LineChart></ResponsiveContainer></Cc>
<Cc title={"LTV par cohorte"} help={"La LTV (Lifetime Value) estime combien d argent un utilisateur vous rapportera au total pendant toute sa durée de vie dans l app. Si les barres montent, vos utilisateurs restent plus longtemps et dépensent plus."}><ResponsiveContainer width="100%" height={165}><BarChart data={D.ltT}><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={38} /><Tooltip {...TT} /><Bar dataKey="v" fill={"#0666EB"} name="LTV" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_journey(p){var D=p.D;return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"Vies: retour J+1"} value={D.m.liveBack} sub={"Reviennent après perte de vies"} status={sH(parseInt(D.m.liveBack),40,25)} />
<Mc label={"Vies: churn definitif"} value={D.m.liveGone} sub={"Ne reviennent jamais"} status={sL(parseInt(D.m.liveGone),30,50)} />
<Mc label={"Temps avant 0 vies"} value={D.m.liveTime} sub={"Temps moyen avant perte totale"} status="info" />
<Mc label={"Clic vidéo = 1 vie"} value={D.m.liveVidéo} sub={"Regardent une pub pour une vie"} status={sH(parseInt(D.m.liveVidéo),40,25)} />
<Mc label={"Clic Vies illimitees"} value={D.m.liveUnlim} sub={"CTA premium sur perte vies"} status={sH(parseInt(D.m.liveUnlim),50,30)} />
</div>
<Cc title={"Parcours Organique"} help={"Ce funnel montre le parcours complet d un utilisateur organique (qui vous découvre naturellement). Chaque barre = une étape, de la découverte sur l App Store jusqu à J30. Les badges rouges signalent les plus grosses pertes."} wide={true}><Fnl data={D.jOrg} accent={"#0666EB"} /></Cc>
<div style={{height:16}} />
<Cc title={"Parcours Paid Ads"} help={"Ce funnel montre le parcours d un utilisateur provenant de la publicité. Le volume est plus important mais la qualité est inférieure : moins de complétion d onboarding, moins de rétention, LTV plus faible."} wide={true}><Fnl data={D.jPaid} accent={"#3D8BF2"} /></Cc>
</div>)}

function V_acquisition(p){var D=p.D;return(<div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"ROAS par canal"} wide={true} help={"Le ROAS montre combien chaque euro de publicité vous rapporte. Si la barre dépasse la ligne rouge (1x), le canal est rentable : vous gagnez plus que vous ne dépensez. En dessous, vous perdez de l argent sur ce canal."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.ro} layout="vertical"><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="ch" tick={TS} width={55} /><Tooltip {...TT} /><ReferenceLine x={1} stroke={"#8E949A"} strokeDasharray="4 4" /><Bar dataKey="v" name="ROAS" radius={[0,6,6,0]}>{D.ro.map(function(r,i){return(<Cell key={i} fill={"#0666EB"} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"CPI vs LTV"} help={"Rouge = ce que vous payez pour acquérir un utilisateur (CPI). Vert = ce que cet utilisateur vous rapporte sur sa durée de vie (LTV). Le vert doit être au moins 3 fois plus grand que le rouge pour que le canal soit rentable."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.cpiL}><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="cpi" fill={"#0666EB60"} name="CPI" radius={[6,6,0,0]} /><Bar dataKey="ltv" fill={"#0666EB"} name="LTV" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Installs par source"} wide={true} help={"Ce graphique montre d où viennent vos installations chaque semaine. Chaque couleur = un canal d acquisition. L organique (gratuit) devrait représenter au moins 30% pour ne pas dépendre uniquement de la pub."}><ResponsiveContainer width="100%" height={180}><AreaChart data={D.instS}><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={40} /><Tooltip {...TT} /><Area type="monotone" dataKey="organic" stackId="1" stroke={"#0666EB"} fill={"#0666EB20"} name="Organique" /><Area type="monotone" dataKey="meta" stackId="1" stroke={"#3D8BF2"} fill={"#3D8BF220"} name="Meta" /><Area type="monotone" dataKey="google" stackId="1" stroke={"#6EAAF5"} fill={"#6EAAF520"} name="Google" /><Area type="monotone" dataKey="tiktok" stackId="1" stroke={"#A0CAF8"} fill={"#A0CAF820"} name="TikTok" /><Area type="monotone" dataKey="asa" stackId="1" stroke={"#D0E4FC"} fill={"#D0E4FC15"} name="ASA" /></AreaChart></ResponsiveContainer></Cc>
<Cc title={"Rétention par canal"} help={"Ce graphique compare la qualité des utilisateurs selon leur provenance. Les barres montrent quel pourcentage revient à J1, J7 et J30. Un canal avec une bonne rétention amène des gens vraiment intéressés, pas juste des curieux."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.rCh}><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={"#0666EB"} name="J1" radius={[5,5,0,0]} /><Bar dataKey="d7" fill={"#3D8BF2"} name="J7" radius={[5,5,0,0]} /><Bar dataKey="d30" fill={"#6EAAF5"} name="J30" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_onboarding(p){var D=p.D;return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"Complétion"} value={D.m.onb} sub={"Bench: 55-70%"} status={sH(parseInt(D.m.onb),55)} />
<Mc label={"Skip vidéo"} value={"68%"} status="bad" sub={"Bench: moins de 30%"} />
<Mc label={"Push opt-in"} value={"47%"} status="warn" sub={"Bench: plus de 55%"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"Funnel onboarding"} help={"Ce funnel montre chaque étape de l onboarding et combien d utilisateurs passent à la suivante. Les badges rouges signalent les étapes où vous perdez le plus de monde. C est là qu il faut concentrer vos efforts d amélioration."}><Fnl data={D.oF} /></Cc>
<Cc title={"Réussite quiz"} help={"Chaque barre montre le taux de réussite d une question du quiz d onboarding. Si une barre est sous la ligne rouge (50%), la question est trop dure pour un premier contact. Les nouveaux utilisateurs se découragent et quittent l app."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.qz}><XAxis dataKey="q" tick={TS} /><YAxis tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><ReferenceLine y={50} stroke={"#8E949A"} strokeDasharray="4 4" /><Bar dataKey="v" name="Réussite %" radius={[6,6,0,0]}>{D.qz.map(function(q,i){return(<Cell key={i} fill={"#0666EB"} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_engagement(p){var D=p.D;return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"Leçons/j"} value={D.m.sess} sub={"Bench: 1.5-3"} status={sH(parseFloat(D.m.sess),1.5)} />
<Mc label={"Accuracy"} value={D.m.acc} sub={"Zone idéale: 65-75%"} status={sH(parseInt(D.m.acc),65,55)} />
<Mc label={"Leçons / joueur"} value={D.m.lesUser} sub={"Moyenne totale par utilisateur"} status={sH(parseFloat(D.m.lesUser),12,6)} />
<Mc label={"Leçons 1ère session"} value={"1.8"} status={sH(1.8,2,1)} sub={"Bench: 2-3"} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"Leçons/jour et Accuracy"} wide={true} help={"Barres = leçons par user. Courbe = taux de réussite. Si les barres montent mais la courbe descend, la difficulté est mal calibree."}><ResponsiveContainer width="100%" height={180}><ComposedChart data={D.engD}><XAxis dataKey="d" tick={TS} interval={Math.max(0,Math.ceil(D.engD.length/5)-1)} /><YAxis yAxisId="l" tick={TS} width={30} /><YAxis yAxisId="r" orientation="right" tick={TS} width={30} domain={[40,90]} /><Tooltip {...TT} /><Bar yAxisId="l" dataKey="les" fill={C.o1+"50"} name="Leçons" radius={[5,5,0,0]} /><Line yAxisId="r" type="monotone" dataKey="acc" stroke={C.good} name="Réussite %" strokeWidth={2} dot={false} /></ComposedChart></ResponsiveContainer></Cc>
<Cc title={"Réussite par format"} help={"Chaque barre représente un type de question et son taux de réussite. Vert (plus de 65%) = la difficulté est bien calibrée. Orange (55-65%) = limite. Rouge (sous 55%) = trop dur, les utilisateurs se sentent en échec et risquent de quitter l app."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.qT} layout="vertical"><XAxis type="number" tick={TS} domain={[0,100]} /><YAxis type="category" dataKey="t" tick={TS} width={50} /><Tooltip {...TT} /><ReferenceLine x={55} stroke={"#8E949A"} strokeDasharray="4 4" /><Bar dataKey="a" name="%" radius={[0,6,6,0]}>{D.qT.map(function(q,i){return(<Cell key={i} fill={"#0666EB"} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Leçons à la 1ère session"} help={"Ce graphique montre combien de leçons un utilisateur complète lors de sa toute première session. La barre rouge (0 leçon) représente les gens qui quittent l app sans même essayer le contenu. L objectif est de minimiser cette barre."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.fsl}><XAxis dataKey="n" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="v" name="Users" radius={[6,6,0,0]}>{D.fsl.map(function(d,i){return(<Cell key={i} fill={"#0666EB"} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Progression contenu"} help={"Barres = nombre d users par ere. Courbe = taux de complétion. La chute montre ou le contenu perd les gens."}><ResponsiveContainer width="100%" height={200}><ComposedChart data={D.dp}><XAxis dataKey="e" tick={{fontSize:8,fill:C.sub}} /><YAxis yAxisId="u" tick={TS} width={38} /><YAxis yAxisId="c" orientation="right" tick={TS} width={30} domain={[0,100]} /><Tooltip {...TT} /><Bar yAxisId="u" dataKey="u" fill={"#0666EB25"} name="Users" radius={[6,6,0,0]} /><Line yAxisId="c" type="monotone" dataKey="p" stroke={C.bad} name="Complétion %" strokeWidth={2} dot={true} /></ComposedChart></ResponsiveContainer></Cc>
</div></div>)}

function V_packs(p){var D=p.D;var _pf=useState(""),pkFilter=_pf[0],setPkF=_pf[1];
var filtered=D.topPacks.filter(function(pk){return pkFilter===""||pk.n.toLowerCase().indexOf(pkFilter.toLowerCase())>=0});
return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"Manches / session"} value={D.m.manchesSess} sub={"Nombre moyen de manches par session"} status="info" />
<Mc label={"Accuracy packs"} value={"68%"} sub={"Bench: 65-75%"} status="good" />
<Mc label={"Durée moy."} value={"6m30"} sub={"Par pack"} status="info" />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"Funnel packs"} help={"Du lancement au replay. Le taux de replay est un indicateur cle de la qualité du contenu."}><Fnl data={D.packF} accent={"#0666EB"} /></Cc>
<Cc title={"Étoiles"} help={"Les étoiles reflètent la difficulté perçue. 1 étoile = l utilisateur a eu du mal (frustration). 3 étoiles = trop facile (ennui). L idéal est d avoir la majorité en 2 étoiles : un défi accessible mais motivant."}><ResponsiveContainer width="100%" height={200}><BarChart data={D.stars}><XAxis dataKey="s" tick={TS} /><YAxis tick={TS} width={35} /><Tooltip {...TT} /><Bar dataKey="c" name="Leçons" radius={[6,6,0,0]}>{D.stars.map(function(_,i){return(<Cell key={i} fill={["#0666EB","#3D8BF2","#6EAAF5"][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Top 10 packs les plus joués"} wide={true} help={"Ce classement montre les 10 packs les plus joués par vos utilisateurs. Cela vous aide à comprendre quels thèmes plaisent le plus et à orienter la création de nouveaux packs. Utilisez la barre de recherche pour trouver un pack précis."}>
<input value={pkFilter} onChange={function(e){setPkF(e.target.value)}} placeholder={"Rechercher un pack..."} style={{width:"100%",padding:"8px 12px",borderRadius:6,border:"1px solid "+C.border,fontSize:12,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box",background:C.card,color:"#FFFFFF"}} />
<ResponsiveContainer width="100%" height={280}><BarChart data={filtered} layout="vertical"><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="n" tick={{fontSize:10,fill:C.sub}} width={120} /><Tooltip {...TT} /><Bar dataKey="p" name="Joueurs" radius={[0,6,6,0]} fill={"#0666EB"} /></BarChart></ResponsiveContainer>
</Cc>
</div></div>)}

function V_monetization(p){var D=p.D;return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"1er paywall"} value={D.m.pwFirst} sub={"Quand l user voit le 1er paywall"} status="info" />
<Mc label={"Paywalls avant achat"} value={D.m.pwAvgBuy} sub={"En moyenne pour convertir"} status="info" />
<Mc label={"Paywalls = perdu"} value={D.m.pwLost} sub={"Seuil : l user ne convertira plus"} status="warn" />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"Funnel achat"} help={"Ce funnel retrace le parcours d achat complet : le paywall s affiche, l utilisateur scrolle, clique, lance le paiement, et le paiement aboutit. Chaque étape perdue = des clients potentiels qui abandonnent."}><Fnl data={D.pF} /></Cc>
<Cc title={"Paywall fatigue"} help={"% des users encore actifs après chaque paywall vu. Au-dela de 5 paywalls sans achat, l user est considere comme perdu."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.pwFunnel}><XAxis dataKey="n" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="v" name="% restants" radius={[6,6,0,0]}>{D.pwFunnel.map(function(_,i){return(<Cell key={i} fill={["#0666EB","#0666EB","#3D8BF2","#6EAAF5","#A0CAF8"][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Conversion par écran"} help={"Quel écran source généré le plus de conversions. Onboarding = moment ou l user est le plus receptif."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.ps} layout="vertical"><XAxis type="number" tick={TS} /><YAxis type="category" dataKey="s" tick={TS} width={80} /><Tooltip {...TT} /><Bar dataKey="r" name="%" radius={[0,6,6,0]}>{D.ps.map(function(s,i){return(<Cell key={i} fill={"#0666EB"} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
<Cc title={"Évolution MRR"} wide={true} help={"Ce graphique décompose l évolution de vos revenus récurrents. Vert = nouveaux abonnés qui arrivent. Violet = abonnés existants qui renouvellent. Rouge = abonnés qui partent. Pour que votre revenu grandisse, le vert + violet doit toujours dépasser le rouge."}><ResponsiveContainer width="100%" height={180}><BarChart data={D.mb} stackOffset="sign"><XAxis dataKey="w" tick={TS} interval={Math.max(0,Math.ceil(D.mrrT.length/5)-1)} /><YAxis tick={TS} width={42} /><Tooltip {...TT} /><ReferenceLine y={0} stroke={GC} /><Bar dataKey="n" stackId="a" fill={"#0666EB"} name="Nouveaux" radius={[5,5,0,0]} /><Bar dataKey="r" stackId="a" fill={C.o3} name="Renouvelés" /><Bar dataKey="l" stackId="a" fill={"#0666EB40"} name="Perdus" radius={[0,0,5,5]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Publicité in-app"} help={"Ce graphique montre l impact des publicités sur vos utilisateurs. La part verte = ceux qui restent dans l app après la pub. La part rouge = ceux qui quittent immédiatement. Si la part rouge dépasse 15%, les pubs nuisent à l expérience."}>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:"#0D0F12",border:"1px solid #2A2F35"}}>
<div style={{fontSize:10,color:C.sub}}>{"Rev. pubs"}</div>
<div style={{fontSize:16,fontWeight:700}}>{D.m.adR}</div>
</div>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:"#0D0F12",border:"1px solid #2A2F35"}}>
<div style={{fontSize:10,color:C.sub}}>{"Quittent après pub"}</div>
<div style={{fontSize:16,fontWeight:700,color:C.bad}}>{D.m.adQuit}</div>
</div>
<div style={{flex:"1 1 120px",padding:"10px 12px",borderRadius:8,background:"#0D0F12",border:"1px solid #2A2F35"}}>
<div style={{fontSize:10,color:C.sub}}>{"Premium pour supprimer"}</div>
<div style={{fontSize:16,fontWeight:700,color:C.good}}>{D.m.adPrem}</div>
</div>
</div>
<ResponsiveContainer width="100%" height={180}><PieChart><Pie data={D.adImpact} dataKey="v" nameKey="n" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} label={function(e){return e.n+" "+e.v+"%"}}>{D.adImpact.map(function(_,i){return(<Cell key={i} fill={i===0?"#0666EB":"#0666EB30"} />)})}</Pie><Tooltip {...TT} /></PieChart></ResponsiveContainer>
</Cc>
<Cc title={"Paywalls et vidéos par session"} help={"Ces deux chiffres montrent à quelle fréquence vos utilisateurs sont exposés aux sollicitations commerciales. Trop de paywalls crée de la lassitude. Trop de vidéos pub dégrade l expérience."}>
<div style={{display:"flex",gap:16,alignItems:"center",justifyContent:"center",padding:"20px 0"}}>
<div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:C.o1}}>{D.m.pwPerSess}</div><div style={{fontSize:11,color:C.sub,marginTop:4}}>{"Paywalls / session"}</div></div>
<div style={{width:1,height:50,background:C.border}} />
<div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:C.o2}}>{D.m.adPerSess}</div><div style={{fontSize:11,color:C.sub,marginTop:4}}>{"Vidéos pub / session"}</div></div>
</div>
</Cc>
<Cc title={"Erreurs achat"} help={"Ces barres montrent pourquoi des paiements échouent. Chaque erreur = une personne qui voulait payer mais n a pas pu. C est du revenu perdu récupérable en corrigeant les bugs."}>{D.pErr.map(function(e,i){return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:C.sub,width:100,flexShrink:0}}>{e.t}</span><div style={{flex:1,height:8,borderRadius:4,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",width:(D.pErr[0].c>=1?(e.c/D.pErr[0].c)*100:0)+"%",background:i===0?"#0666EB":"#3D8BF2",borderRadius:4}} /></div><span style={{fontSize:12,fontWeight:700,color:C.text,width:30,textAlign:"right"}}>{e.c}</span></div>)})}</Cc>
</div></div>)}

function V_retention(p){var D=p.D;
function cBg(v){return v===null?C.card:v>=30?"#0666EB":v>=15?"#0666EB90":v>=10?"#0666EB50":"#0666EB25"}
function cC(v){return v===null?C.sub:v>=30?"#FFFFFF":v>=15?"#FFFFFF":v>=10?"#FFFFFF":"#FFFFFF"}
return(<div>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
<Mc label={"Jour 1"} value={D.m.d1} sub={"Bench: plus de 40%"} status={sH(parseInt(D.m.d1),40)} />
<Mc label={"Jour 7"} value={D.m.d7} sub={"Bench: plus de 20%"} status={sH(parseInt(D.m.d7),20)} />
<Mc label={"Jour 30"} value={D.m.d30} sub={"Bench: plus de 10%"} status={sH(parseInt(D.m.d30),10)} />
<Mc label={"Churn"} value={D.m.churn} sub={"Bench: moins de 6%"} status={sL(parseFloat(D.m.churn),5,10)} />
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
<Cc title={"Cohortes"} wide={true} help={"Chaque ligne = une semaine d install. Chaque colonne = rétention a J+n. Vert = bon. Rouge = problème."}>
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",borderSpacing:0,fontSize:12}}>
<thead><tr><th style={{padding:"8px 10px",textAlign:"left",color:C.sub,fontSize:11}}>{"Cohorte"}</th>{["J1","J3","J7","J14","J30"].map(function(d){return(<th key={d} style={{padding:"8px 10px",textAlign:"center",color:C.sub,fontSize:11}}>{d}</th>)})}</tr></thead>
<tbody>{D.co.map(function(c,i){return(<tr key={i}><td style={{padding:"7px 10px",fontWeight:600,color:C.text}}>{c.w}</td>{["d1","d3","d7","d14","d30"].map(function(d){return(<td key={d} style={{padding:"7px 10px",textAlign:"center",fontWeight:600,background:cBg(c[d]),color:cC(c[d]),borderRadius:0,border:"1px solid #000000"}}>{c[d]!==null?c[d]+"%":"--"}</td>)})}</tr>)})}</tbody>
</table></div></Cc>
<Cc title={"Courbe de rétention"} help={"Cette courbe montre quel pourcentage de vos utilisateurs est encore actif chaque jour après l installation. Plus la courbe descend lentement, mieux c est. L objectif est de garder la courbe au-dessus de 10% à J30."}><ResponsiveContainer width="100%" height={190}><LineChart data={D.rC}><XAxis dataKey="j" tick={TS} /><YAxis tick={TS} width={32} domain={[0,100]} /><Tooltip {...TT} /><Line type="monotone" dataKey="p" stroke={C.o1} strokeWidth={2.5} dot={false} name="Rétention %" /></LineChart></ResponsiveContainer></Cc>
<Cc title={"Rétention par canal"} help={"Ce graphique compare la qualité des utilisateurs selon leur provenance. Les barres montrent quel pourcentage revient à J1, J7 et J30. Un canal avec une bonne rétention amène des gens vraiment intéressés, pas juste des curieux."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.rCh}><XAxis dataKey="ch" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="d1" fill={"#0666EB"} name="J1" radius={[5,5,0,0]} /><Bar dataKey="d7" fill={"#3D8BF2"} name="J7" radius={[5,5,0,0]} /><Bar dataKey="d30" fill={"#6EAAF5"} name="J30" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></Cc>
<Cc title={"Time to churn"} help={"TIME TO CHURN : montre QUAND les utilisateurs partent definitivement. C est une distribution. Chaque barre indique quel % du churn total se produit dans cette tranche de jours. Par exemple, si la barre 1-2j est a 32%, cela veut dire que 32% de tous les utilisateurs qui partent le font dans les 2 premiers jours. Cela aide a savoir A QUEL MOMENT intervenir pour les retenir."}><ResponsiveContainer width="100%" height={190}><BarChart data={D.t2ch}><XAxis dataKey="r" tick={TS} /><YAxis tick={TS} width={30} /><Tooltip {...TT} /><Bar dataKey="p" name="% du churn" radius={[6,6,0,0]}>{D.t2ch.map(function(_,i){return(<Cell key={i} fill={["#0666EB","#0666EB","#3D8BF2","#6EAAF5","#A0CAF8"][i]} />)})}</Bar></BarChart></ResponsiveContainer></Cc>
</div></div>)}

function V_weekly(p){var D=p.D;
var _r=useState(null),rpt=_r[0],setRpt=_r[1];
var _l=useState(false),ld=_l[0],setLd=_l[1];
var _sd=useState("Dimanche"),schedDay=_sd[0],setSchedDay=_sd[1];
var _st=useState("20:00"),schedTime=_st[0],setSchedTime=_st[1];
var _em=useState([]),emails=_em[0],setEmails=_em[1];
var _ei=useState(""),emailIn=_ei[0],setEmailIn=_ei[1];
function gen(){setLd(true);var m=D.m;fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:"Analyse ces metriques EdTech. JSON: {summary,trends:[{title,direction,detail}],alerts:[{severity,text}],recommendations:[{priority,action,impact}],kpi_changes:[{name,value,change,status}]}. JSON UNIQUEMENT. DAU="+m.dau+",MRR="+m.mrr+",Churn="+m.churn+",D1="+m.d1+",D7="+m.d7+",D30="+m.d30+",Onb="+m.onb}]})}).then(function(r){return r.json()}).then(function(d){try{var t=d.content.map(function(c){return c.text||""}).join("");setRpt(JSON.parse(t.replace(/```json|```/g,"").trim()))}catch(e){setRpt({summary:"Erreur: "+e.message})}setLd(false)}).catch(function(e){setRpt({summary:"Erreur: "+e.message});setLd(false)})}
function addEmail(){if(emailIn&&emailIn.indexOf("@")>=0){setEmails(emails.concat([emailIn]));setEmailIn("")}}
return(<div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
<div style={{background:"#191C20",borderRadius:12,border:"1px solid #2A2F35",padding:20}}>
<div style={{fontSize:16,fontWeight:700,color:"#FFFFFF",marginBottom:14}}>{"Destinataires"}</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
<input value={emailIn} onChange={function(e){setEmailIn(e.target.value)}} onKeyDown={function(e){if(e.key==="Enter")addEmail()}} placeholder={"email@exemple.com"} style={{flex:1,padding:"9px 14px",borderRadius:24,border:"1px solid #2A2F35",fontSize:12,fontFamily:"inherit",background:"#0D0F12",color:"#FFFFFF",outline:"none"}} />
<button onClick={addEmail} style={{padding:"9px 18px",borderRadius:24,border:"none",background:"#0666EB",color:"#FFFFFF",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"Ajouter"}</button>
</div>
{emails.length===0&&<div style={{fontSize:12,color:"#8E949A",padding:"16px 0",textAlign:"center"}}>{"Aucun destinataire"}</div>}
<div style={{maxHeight:200,overflowY:"auto"}}>
{emails.map(function(em,i){return(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",marginBottom:3,borderRadius:10,background:"#0D0F12"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{width:26,height:26,borderRadius:13,background:"#0666EB20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#0666EB",fontWeight:600}}>{em.charAt(0).toUpperCase()}</div>
<span style={{fontSize:12,color:"#FFFFFF"}}>{em}</span>
</div>
<button onClick={function(){setEmails(emails.filter(function(_,j){return j!==i}))}} style={{border:"none",background:"none",color:"#D92027",cursor:"pointer",fontSize:11,fontFamily:"inherit",padding:"4px 8px"}}>{"Supprimer"}</button>
</div>)})}
</div>
</div>
<div style={{background:"#191C20",borderRadius:12,border:"1px solid #2A2F35",padding:20}}>
<div style={{fontSize:16,fontWeight:700,color:"#FFFFFF",marginBottom:14}}>{"Planification"}</div>
<div style={{fontSize:12,fontWeight:600,color:"#FFFFFF",marginBottom:8}}>{"Jour"}</div>
<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
{["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"].map(function(d){var act=schedDay===d;return(<button key={d} onClick={function(){setSchedDay(d)}} style={{padding:"6px 12px",borderRadius:20,border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",background:act?"#0666EB":"#0D0F12",color:act?"#FFFFFF":"#8E949A"}}>{d}</button>)})}
</div>
<div style={{fontSize:12,fontWeight:600,color:"#FFFFFF",marginBottom:8}}>{"Heure"}</div>
<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
{["08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"].map(function(h){var act=schedTime===h;return(<button key={h} onClick={function(){setSchedTime(h)}} style={{padding:"6px 12px",borderRadius:20,border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",background:act?"#0666EB":"#0D0F12",color:act?"#FFFFFF":"#8E949A"}}>{h}</button>)})}
</div>
<div style={{padding:"12px 14px",borderRadius:10,background:"#0D0F12",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div><div style={{fontSize:11,color:"#8E949A"}}>{"Prochain envoi"}</div><div style={{fontSize:14,fontWeight:600,color:"#FFFFFF"}}>{schedDay+" "+schedTime}</div></div>
<button onClick={gen} disabled={ld} style={{padding:"10px 22px",borderRadius:24,border:"none",background:ld?"#2A2F35":"#FFFFFF",color:ld?"#8E949A":"#000000",fontSize:13,fontWeight:600,cursor:ld?"wait":"pointer",fontFamily:"inherit"}}>{ld?"Analyse...":"Generer maintenant"}</button>
</div>
</div>
</div>
{rpt&&(<div>
<div style={{background:"#191C20",borderRadius:12,border:"1px solid #2A2F35",padding:20,marginBottom:14}}>
<div style={{fontSize:16,fontWeight:700,color:"#FFFFFF",marginBottom:10}}>{"Synthese"}</div>
<div style={{fontSize:13,lineHeight:1.65,color:"#FFFFFF"}}>{rpt.summary}</div>
</div>
{rpt.kpi_changes&&rpt.kpi_changes.length>=1&&(<div style={{background:"#191C20",borderRadius:12,border:"1px solid #2A2F35",padding:20,marginBottom:14}}>
<div style={{fontSize:14,fontWeight:600,color:"#FFFFFF",marginBottom:12}}>{"Variations"}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:10}}>
{rpt.kpi_changes.map(function(k,i){return(<div key={i} style={{flex:"1 1 140px",padding:"12px",borderRadius:10,background:"#0D0F12",border:"1px solid #2A2F35"}}>
<div style={{fontSize:10,color:"#8E949A"}}>{k.name}</div>
<div style={{fontSize:18,fontWeight:700,color:"#FFFFFF"}}>{k.value}</div>
<div style={{fontSize:12,fontWeight:600,color:k.status==="good"?"#21BF73":k.status==="bad"?"#D92027":"#8E949A"}}>{k.change}</div>
</div>)})}
</div></div>)}
{rpt.recommendations&&rpt.recommendations.length>=1&&(<div style={{background:"#191C20",borderRadius:12,border:"1px solid #2A2F35",padding:20}}>
<div style={{fontSize:14,fontWeight:600,color:"#FFFFFF",marginBottom:12}}>{"Recommandations"}</div>
{rpt.recommendations.map(function(r,i){return(<div key={i} style={{padding:"12px",marginBottom:6,borderRadius:10,background:"#0D0F12",border:"1px solid #2A2F35"}}>
<div style={{fontSize:13,fontWeight:600,color:"#FFFFFF"}}>{r.action}</div>
<div style={{fontSize:11,color:"#8E949A",marginTop:3}}>{"Impact : "+r.impact}</div>
</div>)})}
</div>)}
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
<div style={{display:"flex",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:C.bg,color:C.text,minHeight:"100vh"}}><style dangerouslySetInnerHTML={{__html:"@keyframes gIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}*{transition:background .2s cubic-bezier(.4,0,.2,1),color .2s ease,border-color .2s ease,box-shadow .2s ease,transform .2s cubic-bezier(.4,0,.2,1)}"}} />
<div style={{width:sb?210:0,minWidth:sb?210:0,background:C.bg,borderRight:"1px solid "+C.border,transition:"all .25s ease",overflow:"hidden",position:"sticky",top:0,height:"100vh",display:"flex",flexDirection:"column"}}>
<div style={{padding:"20px 16px",borderBottom:"1px solid "+C.border}}>
<div style={{fontSize:20,fontWeight:800,color:"#FFFFFF",letterSpacing:-.03,marginBottom:14}}>{"THETYS METRICS"}</div>
<div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,background:"#0D0F12",border:"1px solid "+C.border,cursor:"pointer"}}>
<img src={ICON} style={{width:32,height:32,borderRadius:12,objectFit:"cover",flexShrink:0}} />
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#FFFFFF"}}>{"Sapio"}</div><div style={{fontSize:10,color:C.sub}}>{"EdTech App"}</div></div>
<span style={{fontSize:10,color:C.sub}}>{"\u25BC"}</span>
</div>
</div>
<div style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
{NAV.map(function(n){var active=tab===n.id;return(
<button key={n.id} onClick={function(){setTab(n.id)}} style={{display:"block",width:"100%",padding:"10px 14px",marginBottom:3,borderRadius:12,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:active?600:400,background:active?"rgba(6,102,235,.1)":"transparent",boxShadow:active?"inset 3px 0 0 #0666EB":"none",border:active?"1px solid #0666EB":"1px solid transparent",color:active?"#FFFFFF":C.sub,textShadow:active?"0 0 14px #0666EB50":"none",transition:"all .3s cubic-bezier(.4,0,.2,1)",textAlign:"left"}}>{n.label}</button>)
})}
</div>
</div>
<div style={{flex:1,minWidth:0}}>
<div style={{background:"#000000",borderBottom:"none",boxShadow:"none",padding:"0 28px",position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<button onClick={function(){setSb(!sb)}} style={{padding:"6px 8px",borderRadius:6,border:"1px solid "+C.border,background:C.card,cursor:"pointer",fontSize:14,color:"#FFFFFF",fontFamily:"inherit"}}>{sb?"\u2190":"\u2192"}</button>
<div style={{fontSize:18,fontWeight:700,color:"#FFFFFF",letterSpacing:-.02}}>{curNav?curNav.label:""}</div>
</div>
</div>
<div style={{paddingBottom:10,display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
<div><div style={{fontSize:10,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{"Utilisateur"}</div><Seg opts={FO.ut} val={fi.ut} set={function(v){sf(Object.assign({},fi,{ut:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{"Période"}</div><Seg opts={FO.pe} val={fi.pe} set={function(v){sf(Object.assign({},fi,{pe:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{"Canal"}</div><Seg opts={FO.ch} val={fi.ch} set={function(v){sf(Object.assign({},fi,{ch:v}))}} /></div>
<div><div style={{fontSize:10,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{"Plateforme"}</div><Seg opts={FO.pl} val={fi.pl} set={function(v){sf(Object.assign({},fi,{pl:v}))}} /></div>
<div style={{position:"relative"}}><div style={{fontSize:10,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{"Pays"}</div>
<button onClick={function(){setCdd(!cdd)}} style={{padding:"7px 16px",borderRadius:24,fontSize:12,fontWeight:400,border:"none",background:"#191C20",cursor:"pointer",fontFamily:"inherit",color:"#FFFFFF",display:"flex",alignItems:"center",gap:4}}>{countries[0]==="all"?"Tous les pays":countries.length+" pays"}<span style={{fontSize:8,color:"#FFFFFF",opacity:.6}}>{"\u25BC"}</span></button>
{cdd&&(<div style={{position:"absolute",top:"100%",left:0,marginTop:4,background:C.card,border:"1px solid "+C.border,borderRadius:16,boxShadow:"0 12px 40px rgba(0,0,0,.6)",padding:8,zIndex:200,minWidth:200,maxHeight:280,overflowY:"auto"}}>
<div onClick={function(){setCo(["all"])}} style={{padding:"6px 10px",borderRadius:5,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
<div style={{width:14,height:14,borderRadius:3,border:"1.5px solid "+(countries[0]==="all"?C.o1:C.border),background:countries[0]==="all"?C.o1:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{countries[0]==="all"&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>{"\u2713"}</span>}</div>
{"Tous les pays"}
</div>
<div style={{height:1,background:C.border,margin:"4px 0"}} />
{COUNTRIES.map(function(c){var sel=countries.indexOf(c)>=0||countries[0]==="all";return(<div key={c} onClick={function(){if(countries[0]==="all"){setCo([c])}else if(countries.indexOf(c)>=0){var nxt=countries.filter(function(x){return x!==c});setCo(nxt.length>=1?nxt:["all"])}else{setCo(countries.concat([c]))}}} style={{padding:"5px 10px",borderRadius:5,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
<div style={{width:14,height:14,borderRadius:3,border:"1.5px solid "+(sel?C.pri:C.border),background:sel?C.pri:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>{"\u2713"}</span>}</div>
{c}
</div>)})}
</div>)}
{cdd&&(<div onClick={function(){setCdd(false)}} style={{position:"fixed",inset:0,zIndex:199}} />)}
</div>
{countries[0]!=="all"&&(<div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center",marginBottom:2}}>{countries.map(function(c){return(<span key={c} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:5,background:C.pri+"20",color:C.pri,fontSize:10.5,fontWeight:600}}>{c}<span onClick={function(){var nxt=countries.filter(function(x){return x!==c});setCo(nxt.length>=1?nxt:["all"])}} style={{cursor:"pointer",fontSize:12,opacity:.7}}>{"\u00d7"}</span></span>)})}</div>)}
{nf>=1&&(<button onClick={function(){sf({ut:"all",pe:"30d",ch:"all",pl:"all"});setCo(["all"])}} style={{fontSize:11,color:C.bad,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:"inherit",marginBottom:4}}>{"Reset ("+nf+")"}</button>)}
</div>
</div>
<div style={{padding:"24px 28px 60px"}}><View D={D} /></div>
</div>
</div>)
}
