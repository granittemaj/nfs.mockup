/* =========================================================================
   Not For Sale — site engine (no framework, no network)
   Renders shared chrome + page content, generates self-contained artwork.
   ========================================================================= */
(function(){
"use strict";
var FLAGS = window.FLAGS || {};
var FLAME = '<svg viewBox="0 0 24 24"><path d="M12 2c1.2 4.2-3 5.2-3 9.2a3 3 0 0 0 6 0c0-1.6-.8-2.7-1-3.8 2 .9 3.2 3 3.2 5.1a6.4 6.4 0 1 1-12.4 0C4.8 7 9.8 6 12 2z" fill="#fff"/></svg>';
var slug = function(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');};

/* ---------- category system ---------- */
var CAT = {
 "Human Trafficking":{c:"#c46f49",pal:[0,6]},
 "Social Innovation":{c:"#4f8e92",pal:[3]},
 "Social Enterprise":{c:"#4f8e92",pal:[3]},
 "Ecocide":{c:"#5b7747",pal:[2]},
 "Cyber Scams":{c:"#62808d",pal:[1,7]}
};
function catColor(c){return CAT[c]?CAT[c].c:"#F5821F";}

/* ---------- scene generator ---------- */
var PAL=[
 {s1:"#f4d9b8",s2:"#e7ad77",sun:"#f0915a",h:["#d98a52","#bf6f3e","#8f4f2c"]},
 {s1:"#dde8ee",s2:"#a9c3cf",sun:"#f4efe4",h:["#8aa2ad","#62808d","#3f5b66"]},
 {s1:"#dde7cf",s2:"#a9c191",sun:"#eef0d6",h:["#7e9a64","#5b7747","#3a5430"]},
 {s1:"#cfe6e8",s2:"#9cc6cc",sun:"#f6e7c8",h:["#79b0b0","#4f8e92","#356c70"]},
 {s1:"#f3e6c4",s2:"#e6c98a",sun:"#f4a259",h:["#cba85e","#a98742","#7a5d2c"]},
 {s1:"#e9dfe9",s2:"#c8b6c9",sun:"#f3e3ea",h:["#a591a8","#7e6781","#574258"]},
 {s1:"#fbe3d0",s2:"#f6b98e",sun:"#f58a4b",h:["#e3936a","#c46f49","#8f4d31"]},
 {s1:"#e7ecef",s2:"#cdd6db",sun:"#eef2f3",h:["#9fb0b8","#76898f","#516167"]}
];
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hill(baseY,amp,r){var n=5,p=[],i;for(i=0;i<=n;i++)p.push([i/n*100,baseY+(r()*2-1)*amp]);
 var d="M0 100 L0 "+p[0][1].toFixed(1);
 for(i=1;i<=n;i++)d+=" Q "+p[i-1][0].toFixed(1)+" "+p[i-1][1].toFixed(1)+" "+((p[i-1][0]+p[i][0])/2).toFixed(1)+" "+((p[i-1][1]+p[i][1])/2).toFixed(1);
 d+=" L100 "+p[n][1].toFixed(1)+" L100 100 Z";return d;}
function scene(seed,cat){
 var h=hash(seed),r=rng(h),pal;
 if(cat&&CAT[cat])pal=PAL[CAT[cat].pal[h%CAT[cat].pal.length]];else pal=PAL[h%PAL.length];
 var sx=(18+r()*64).toFixed(0),sy=(22+r()*22).toFixed(0),sr=(11+r()*7).toFixed(1),id="g"+h;
 var a=hill(58,7,rng(hash(seed+"a"))),b=hill(70,9,rng(hash(seed+"b"))),c=hill(83,8,rng(hash(seed+"c")));
 return '<svg class="scene" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">'+
  '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+pal.s1+'"/><stop offset="1" stop-color="'+pal.s2+'"/></linearGradient>'+
  '<radialGradient id="'+id+'s"><stop offset="0" stop-color="'+pal.sun+'" stop-opacity=".95"/><stop offset="1" stop-color="'+pal.sun+'" stop-opacity="0"/></radialGradient></defs>'+
  '<rect width="100" height="100" fill="url(#'+id+')"/><circle cx="'+sx+'" cy="'+sy+'" r="'+sr+'" fill="'+pal.sun+'"/>'+
  '<circle cx="'+sx+'" cy="'+sy+'" r="'+(sr*2.4).toFixed(1)+'" fill="url(#'+id+'s)"/>'+
  '<path d="'+a+'" fill="'+pal.h[0]+'" opacity=".92"/><path d="'+b+'" fill="'+pal.h[1]+'" opacity=".95"/><path d="'+c+'" fill="'+pal.h[2]+'"/></svg>';
}
/* duotone portrait avatar with initials */
function avatar(name){
 var h=hash(name),id="a"+h;
 var tone=[["#3a3632","#1d1b18"],["#3c3a40","#1c1b20"],["#39403c","#1b201d"],["#403a36","#1d1a17"]][h%4];
 var ini=name.split(/\s+/).map(function(w){return w[0];}).slice(0,2).join('').toUpperCase();
 return '<svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">'+
  '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+tone[0]+'"/><stop offset="1" stop-color="'+tone[1]+'"/></linearGradient></defs>'+
  '<rect width="100" height="120" fill="url(#'+id+')"/><circle cx="50" cy="46" r="20" fill="rgba(255,255,255,.07)"/>'+
  '<path d="M22 120 q28 -34 56 0 Z" fill="rgba(255,255,255,.06)"/></svg>'+
  '<span class="ini">'+ini+'</span>';
}
function rel(h){if(h<1)return"Just now";if(h<24)return h+"h ago";var d=Math.round(h/24);return d===1?"Yesterday":d+" days ago";}
function tagHTML(cat){var c=catColor(cat);return '<span class="tag" style="color:'+c+'"><span class="dot" style="background:'+c+'"></span>'+cat+'</span>';}

/* =========================================================================
   CONTENT  (representative placeholder — wire to CMS / articlos for real data)
   ========================================================================= */
var FEAT={cat:"Cyber Scams",title:"Inside a Seized Scam Compound in Cambodia, the Machinery of Exploitation Comes Into View",dek:"A rare look behind the walls of the trafficking-fuelled fraud industry sweeping Southeast Asia.",read:9,when:"Today"};
var LATEST=[
 {cat:"Cyber Scams",title:"The Human Cost of Cyber Scam Operations in Southeast Asia",read:7,h:3},
 {cat:"Cyber Scams",title:"Cambodia's Crackdown on Scam Compounds: Progress and Pressure",read:6,h:9},
 {cat:"Social Innovation",title:"Kru Nam's Legacy: From Bamboo Huts to Generations of Change",read:5,h:26},
 {cat:"Ecocide",title:"Where Ecocide Is Happening Today, and Who It Harms",read:4,h:50}
];
var ARTS=[
 {cat:"Human Trafficking",title:"Understanding the Hidden Systems of Exploitation",dek:"How modern slavery operates in plain sight, and the signals that reveal it.",read:6,h:5,big:true},
 {cat:"Social Innovation",title:"Building Businesses That Empower Rather Than Exploit",dek:"Sustainable enterprise as a frontline tool against trafficking.",read:5,h:12},
 {cat:"Ecocide",title:"Confronting the Destruction of Our Shared Environment",dek:"Why environmental collapse and human exploitation are deeply linked.",read:7,h:20},
 {cat:"Cyber Scams",title:"The Human Cost of Cyber Scam Operations in Southeast Asia",dek:"Inside the trafficking pipeline feeding industrial-scale online fraud.",read:7,h:28},
 {cat:"Human Trafficking",title:"What Modern-Day Slavery Looks Like in 2026",dek:"The forms, the numbers, and the people behind them.",read:4,h:36},
 {cat:"Social Innovation",title:"Survivor-Led Enterprise: Dignity Through Work",dek:"Stories from the programs rebuilding lives and livelihoods.",read:5,h:44},
 {cat:"Ecocide",title:"How Ecocide Affects People as Well as Nature",dek:"The communities paying the price for large-scale destruction.",read:6,h:60}
];
var MOST=[
 {cat:"Cyber Scams",title:"Inside a Seized Scam Compound in Cambodia",read:9},
 {cat:"Human Trafficking",title:"What Modern-Day Slavery Looks Like in 2026",read:4},
 {cat:"Ecocide",title:"Confronting the Destruction of Our Shared Environment",read:7},
 {cat:"Social Innovation",title:"Kru Nam's Legacy: Generations of Change",read:5},
 {cat:"Cyber Scams",title:"Cambodia's Crackdown on Scam Compounds",read:6}
];
var SOCIAL=[
 {plat:"Instagram",t:"Kru Nam's Legacy",s:"From bamboo huts to generations of change"},
 {plat:"LinkedIn",t:"International Day of Democracy",s:"Why participation protects the vulnerable"},
 {plat:"TikTok",t:"September in Thailand",s:"A month on the frontlines"},
 {plat:"Facebook",t:"Charity, coupled with action",s:"David Batstone, Co-Founder"}
];
var FAQ=[
 {q:"What is Ecocide?",a:"Ecocide is the large-scale destruction of ecosystems that severely harms the environment and threatens the lives and livelihoods of people who depend on it. <a href='#'>Learn more</a>"},
 {q:"What is Human Trafficking?",a:"Human trafficking is the use of force, fraud, or coercion to exploit people for labour or commercial gain. It is one of the fastest-growing criminal industries in the world. <a href='#'>Learn more</a>"},
 {q:"What is Social Innovation?",a:"Social innovation means building sustainable businesses and models that empower communities rather than exploit them, creating alternatives that prevent trafficking before it starts. <a href='#'>Learn more</a>"}
];
var COUNTRIES=[
 ["Argentina","Americas"],["Bolivia","Americas"],["Brazil","Americas"],["Canada","Americas"],
 ["Colombia","Americas"],["Peru","Americas"],["United States","Americas"],
 ["Cameroon","Africa"],["DR Congo","Africa"],["Guinea","Africa"],["Madagascar","Africa"],
 ["Mozambique","Africa"],["Rwanda","Africa"],["Senegal","Africa"],["South Africa","Africa"],
 ["Tanzania","Africa"],["Uganda","Africa"],
 ["Italy","Europe"],["Netherlands","Europe"],["Sweden","Europe"],["United Kingdom","Europe"],
 ["Australia","Asia-Pacific"],["Japan","Asia-Pacific"],["Laos","Asia-Pacific"],
 ["Myanmar","Asia-Pacific"],["Thailand","Asia-Pacific"],["Vietnam","Asia-Pacific"]
].map(function(r){return {name:r[0],region:r[1],slug:slug(r[0])};});
var WORK=["Netherlands","Vietnam","South Africa","Mozambique","Thailand","Laos","Myanmar","Uganda","DR Congo","Peru","United States"];
var FOCUS={Americas:["Survivor care","Prevention","Reforestation"],Africa:["Reintegration","Education","Agroforestry"],Europe:["Aftercare","Vocational training","Advocacy"],"Asia-Pacific":["Rescue","Safe homes","Education"]};
var PROJECT_SINCE={Americas:"2014",Africa:"2011",Europe:"2013",
"Asia-Pacific":"2012"};
var FOUNDERS=[
 {name:"David Batstone",role:"President & Co-Founder",bio:["David is the co-founder and president of Not For Sale, a global organisation working to end human trafficking and environmental exploitation through systemic solutions and social enterprise. He is also co-founder and managing partner of Just Business, an international investment group that incubates mission-driven companies including REBBL and Dignita.",
 "He is Professor Emeritus at the University of San Francisco, an author of five books, a recipient of two national journalism awards, and a recipient of the Peace Award from the United Nations Women for Peace Association for his work advancing human dignity and justice."]},
 {name:"Mark Wexler",role:"CEO & Co-Founder",bio:["Mark is the co-founder and CEO of Not For Sale, working to end human trafficking and environmental degradation by addressing root causes and empowering survivors through systemic solutions. He is also co-founder and partner of Just Business.",
 "Mark is currently helping launch M2i Global, a minerals and metals company building a U.S. minerals reserve while deploying policy and technology solutions to reduce the risk of forced labour and ecocide in global supply chains. He is a Visiting Research Fellow at King's College London and a widely published author and speaker on ethical business and supply-chain accountability."]}
];
var DIRECTORS=[
 {name:"Toos Heemskerk",role:"Country Director",loc:"Netherlands"},
 {name:"Michael Brosowski",role:"Co-Country Director",loc:"Vietnam"},
 {name:"Tom Hewitt MBE",role:"Country Director",loc:"South Africa & Mozambique"},
 {name:"Kru Nam",role:"Country Director",loc:"Thailand, Laos & Myanmar"},
 {name:"Ntakamaze (TK) Nziyonvira",role:"Country Director",loc:"Uganda & DR Congo"}
];
var PARTNERS=[
 {name:"AllSaints",sub:"Fashion",sector:"Retail / Fashion",since:"2014",blurb:"A decade-long collaboration supporting ethical fashion, community programs, and the fight against human trafficking."},
 {name:"M2i Global",sub:"Minerals · Metals Initiatives",sector:"Minerals & Metals",since:"2024",blurb:"Building responsible mineral supply chains while reducing the risk of forced labour and ecocide."},
 {name:"Regenerate",sub:"Clean Technology",sector:"Technology",since:"2022",blurb:"Advancing clean energy, battery recycling, and sustainable solutions that reduce environmental harm."},
 {name:"ABTC",sub:"American Battery",sector:"Clean Energy",since:"2023",blurb:"Supporting a circular battery economy and ethical resource recovery."},
 {name:"Insured Nomads",sub:"Travel & Insurance",sector:"Insurance",since:"2021",blurb:"Protecting people on the move and funding frontline anti-trafficking work."},
 {name:"Dignitá",sub:"eat well, do good",sector:"Social Enterprise",since:"2016",blurb:"Restaurants and training programs that help survivors rebuild lives and prevent trafficking."},
 {name:"OHO",sub:"Lifestyle",sector:"Consumer",since:"2020",blurb:"A purpose-driven brand channelling sales into survivor support."},
 {name:"Alex and Ani",sub:"Jewellery",sector:"Retail",since:"2015",blurb:"A purpose-driven charm partnership raising awareness and funds to fight human trafficking."},
 {name:"Boll & Branch",sub:"Home",sector:"Retail / Home",since:"2019",blurb:"Advancing Fair Trade supply chains and global efforts to combat human trafficking."}
];

/* =========================================================================
   SHARED CHROME
   ========================================================================= */
var NAVITEMS=[["Home","index.html","home"],["Our Projects","projects.html","projects"],["About","about.html","about"],["Our Team","team.html","team"],["Partners","partners.html","partners"],["News","news.html","news"]];
function injectHeader(page){
 var links=NAVITEMS.map(function(n){return '<a href="'+n[1]+'"'+(n[2]===page?' class="active"':'')+'>'+n[0]+'</a>';}).join('');
 var mlinks=NAVITEMS.map(function(n){return '<a href="'+n[1]+'"'+(n[2]===page?' class="active"':'')+'>'+n[0]+'</a>';}).join('');
 var html='<div class="wrap nav"><div class="left">'+
   '<a class="brand" href="index.html"><span class="flame">'+FLAME+'</span><span class="name">Not For Sale</span></a>'+
   '<nav class="nav-links">'+links+'</nav></div>'+
   '<div class="right"><a class="btn btn-ink" href="#">Donate</a>'+
   '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div></div>'+
   '<div class="mobile-menu" id="mobileMenu">'+mlinks+'<a class="btn btn-orange" href="#">Donate</a></div>';
 var h=document.getElementById('site-header'); if(h){var el=document.createElement('header');el.id='hdr';el.innerHTML=html;h.replaceWith(el);}
}
function injectNewsletter(){
 var n=document.getElementById('site-newsletter'); if(!n)return;
 n.outerHTML='<div class="nl"><div class="wrap in">'+
  '<span class="flame" style="display:inline-grid;width:44px;height:44px">'+FLAME+'</span>'+
  '<h2>Sign Up to Our Newsletter</h2>'+
  '<p>Join our movement and get the latest updates, stories, and ways to take action, straight to your inbox.</p>'+
  '<div class="row"><input placeholder="Email Address *" aria-label="Email"><button>Sign Up</button></div></div></div>';
}
function injectFooter(){
 var f=document.getElementById('site-footer'); if(!f)return;
 f.outerHTML='<footer class="site"><div class="wrap">'+
  '<div class="fcols"><div><div class="fbrand"><span class="flame">'+FLAME+'</span><span class="name">Not For Sale</span></div>'+
  '<p class="fmute">A global movement fighting human trafficking through prevention, rescue, and reintegration since 2006.</p></div>'+
  '<div><h5>About</h5><a href="about.html">About Us</a><a href="team.html">Our Team</a><a href="projects.html">Our Projects</a><a href="#">Donate</a></div>'+
  '<div><h5>Causes</h5><a href="#">Human Trafficking</a><a href="#">Social Innovation</a><a href="#">Ecocide</a><a href="blog.html">News</a></div>'+
  '<div><h5>Follow Us</h5><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">TikTok</a><a href="#">Facebook</a></div></div>'+
  '<div class="fbot"><div>© Not For Sale 2026. All rights reserved.</div><div class="fmark">WE ARE NOT FOR SALE</div></div></div></footer>';
}

/* =========================================================================
   PAGE RENDERERS
   ========================================================================= */
function el(id){return document.getElementById(id);}
function renderHome(){
 var feat=el('feat'); if(feat){feat.href='blog.html';feat.innerHTML=
  '<div class="ph">'+scene(FEAT.title,FEAT.cat)+'</div>'+
  '<span class="live"><span class="pulse"></span>Investigation · '+FEAT.when+'</span>'+
  '<div class="txt"><div class="ftag">'+tagHTML(FEAT.cat)+'</div><h1>'+FEAT.title+'</h1>'+
  '<p class="dek">'+FEAT.dek+'</p><div class="fmeta">'+FEAT.read+' min read · '+FEAT.when+'</div></div>';}
 var ll=el('latestList'); if(ll)ll.innerHTML=LATEST.map(function(a){return '<a class="li" href="blog.html"><div class="th">'+scene(a.title,a.cat)+'</div><div class="c"><div class="t">'+a.title+'</div><div class="m"><b>'+rel(a.h)+'</b> · '+a.read+' min</div></div></a>';}).join('');
 // frontlines filter + feed
 var active="All";
 var fbox=el('filters');
 if(fbox){["All"].concat(Object.keys(CAT).filter(function(c){return c!=="Social Enterprise";})).forEach(function(c){
   var b=document.createElement('button');b.className='chip'+(c==="All"?' on':'');b.textContent=c;
   b.onclick=function(){active=c;[].forEach.call(fbox.children,function(x){x.classList.toggle('on',x.textContent===c);});feed();};fbox.appendChild(b);});}
 function feed(){var list=active==="All"?ARTS:ARTS.filter(function(a){return a.cat===active;});var f=el('feed');if(!f)return;f.innerHTML='';
   list.forEach(function(a){var e=document.createElement('a');e.className='art'+(a.big&&active==="All"?' big':'');e.href='blog.html';
    e.innerHTML='<div class="ph">'+scene(a.title,a.cat)+(a.h<8?'<span class="new">New</span>':'')+'</div>'+
     '<div class="b">'+tagHTML(a.cat)+'<div class="t">'+a.title+'</div><div class="dek">'+a.dek+'</div>'+
     '<div class="am"><span>'+rel(a.h)+'</span><span>'+a.read+' min read →</span></div></div>';f.appendChild(e);});}
 feed();
 var mr=el('mostRead'); if(mr)mr.innerHTML=MOST.map(function(a,i){return '<a class="mr" href="blog.html"><div class="num">'+("0"+(i+1)).slice(-2)+'</div><div><div class="t">'+a.title+'</div><div class="m">'+a.cat+' · '+a.read+' min read</div></div></a>';}).join('');
 var soc=el('social'); if(soc)soc.innerHTML=SOCIAL.map(function(s){return '<div class="scard"><div class="ph">'+scene(s.t+s.plat)+'<div class="cap"><div class="t">'+s.t+'</div><div class="s">'+s.s+'</div></div></div><div class="pl"><span>'+s.plat+'</span></div></div>';}).join('');
 var fv=el('founderVid'); if(fv)fv.insertAdjacentHTML('afterbegin',scene("founder-a-new-chapter","Human Trafficking"));
 buildFAQ(el('faq'),FAQ,'+');
}
function renderProjects(){
 var active="All";var regions=["All"];COUNTRIES.forEach(function(d){if(regions.indexOf(d.region)<0)regions.push(d.region);});
 var fbox=el('pfilters');
 regions.forEach(function(r){var b=document.createElement('button');b.className='chip'+(r==="All"?' on':'');b.textContent=r;
   b.onclick=function(){active=r;[].forEach.call(fbox.children,function(x){x.classList.toggle('on',x.textContent===r);});draw();};fbox.appendChild(b);});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
 function draw(){var list=active==="All"?COUNTRIES:COUNTRIES.filter(function(d){return d.region===active;});
   var g=el('pgrid');g.innerHTML='';el('pcount').textContent=list.length+' programs';
   list.forEach(function(d,i){var f=FLAGS[d.slug]?'<img class="flag" src="'+FLAGS[d.slug]+'" alt="">':'';
     var a=document.createElement('a');a.className='pcard';a.href='project.html?c='+d.slug;a.style.transitionDelay=((i%8)*45)+'ms';
     a.innerHTML='<div class="ph">'+scene(d.name)+f+'</div><div class="meta"><div class="reg">'+d.region+'</div><div class="name">'+d.name+'</div><span class="go">View projects →</span></div>';
     g.appendChild(a);io.observe(a);});}
 draw();
}
function renderAbout(){
 var v=el('founderVid'); if(v)v.insertAdjacentHTML('afterbegin',scene("about-origin","Human Trafficking"));
 var names=["Human Trafficking","Social Enterprise","Ecocide"];
 document.querySelectorAll('.acard .ph').forEach(function(p,i){p.insertAdjacentHTML('afterbegin',scene("approach-"+names[i],names[i]));});
 var fg=el('flagGrid'); if(fg)fg.innerHTML=WORK.map(function(n){var s=slug(n);var f=FLAGS[s]?'<img src="'+FLAGS[s]+'" alt="">':'';return '<a class="fchip" href="projects.html">'+f+'<span>'+n+'</span></a>';}).join('');
}
function renderTeam(){
 var f=el('founders'); if(f)f.innerHTML=FOUNDERS.map(function(p){return '<div class="founder-row"><div class="avatar">'+avatar(p.name)+'</div>'+
   '<div class="bio"><div class="role">'+p.role+'</div><h3>'+p.name+'</h3>'+p.bio.map(function(t){return '<p>'+t+'</p>';}).join('')+'</div></div>';}).join('');
 var d=el('directors'); if(d)d.innerHTML=DIRECTORS.map(function(p){return '<div class="dcard"><div class="avatar">'+avatar(p.name)+'</div>'+
   '<div class="role">'+p.role+'</div><h3>'+p.name+'</h3><div class="loc"><b>'+p.loc+'</b></div></div>';}).join('');
}
function renderPartners(){
 var g=el('logoGrid'); if(g)g.innerHTML=PARTNERS.map(function(p){return '<a class="logo" href="partner.html?p='+slug(p.name)+'">'+scene("partner-"+p.name)+'<div class="wm">'+p.name+(p.sub?'<small>'+p.sub+'</small>':'')+'</div></a>';}).join('');
}
function getParam(k){try{return new URLSearchParams(location.search).get(k);}catch(e){return null;}}
function renderProject(){
 var sl=getParam('c')||'thailand';
 var d=COUNTRIES.filter(function(c){return c.slug===sl;})[0]||COUNTRIES.filter(function(c){return c.slug==='thailand';})[0];
 var ph=el('dheroPh'); if(ph)ph.innerHTML=scene(d.name);
 var fr=el('pjFlag'); if(fr&&FLAGS[d.slug])fr.innerHTML='<img src="'+FLAGS[d.slug]+'" alt="">';
 var k=el('pjKicker'); if(k)k.innerHTML='<span class="dash"></span>'+d.region+' · Programme';
 var t=el('pjTitle'); if(t)t.textContent=d.name;
 if(document.title)document.title=d.name+' — Not For Sale';
 var focus=FOCUS[d.region]||[];
 var ft=el('pjFocus'); if(ft)ft.innerHTML=focus.map(function(f){return '<span class="tag"><span class="dot"></span>'+f+'</span>';}).join('');
 var fbR=el('fbRegion'); if(fbR)fbR.textContent=d.region;
 var fbF=el('fbFocus'); if(fbF)fbF.textContent=focus.join(', ');
 var fbS=el('fbSince'); if(fbS)fbS.textContent=PROJECT_SINCE[d.region]||'2012';
 var rn=el('pjRegionName'); if(rn)rn.textContent=d.region;
 var fig=el('pjFig'); if(fig)fig.insertAdjacentHTML('afterbegin',scene(d.name+'-field'));
 var rel=el('pjRelated');
 if(rel){var more=COUNTRIES.filter(function(c){return c.region===d.region&&c.slug!==d.slug;}).slice(0,4);
   rel.innerHTML=more.map(function(c){var f=FLAGS[c.slug]?'<img class="flag" src="'+FLAGS[c.slug]+'" alt="">':'';
     return '<a class="pcard in" href="project.html?c='+c.slug+'"><div class="ph">'+scene(c.name)+f+'</div><div class="meta"><div class="reg">'+c.region+'</div><div class="name">'+c.name+'</div><span class="go">View project →</span></div></a>';}).join('');}
}
function renderPartner(){
 var sl=getParam('p')||'allsaints';
 var d=PARTNERS.filter(function(p){return slug(p.name)===sl;})[0]||PARTNERS[0];
 var ph=el('dheroPh'); if(ph)ph.innerHTML=scene("partner-"+d.name);
 var t=el('pnTitle'); if(t)t.innerHTML=d.name+(d.sub?'<small>'+d.sub+'</small>':'');
 if(document.title)document.title=d.name+' — Not For Sale Partner';
 var l=el('pnLede'); if(l)l.textContent=d.blurb;
 var fbSec=el('fbSector'); if(fbSec)fbSec.textContent=d.sector;
 var fbSince=el('fbPartnerSince'); if(fbSince)fbSince.textContent=d.since;
 var rel=el('pnRelated');
 if(rel){var more=PARTNERS.filter(function(p){return slug(p.name)!==sl;}).slice(0,3);
   rel.innerHTML=more.map(function(p){return '<a class="logo" href="partner.html?p='+slug(p.name)+'">'+scene("partner-"+p.name)+'<div class="wm">'+p.name+(p.sub?'<small>'+p.sub+'</small>':'')+'</div></a>';}).join('');}
}
function renderNews(){
 var NEWS=[FEAT].concat(LATEST).concat(ARTS);
 var active="All";
 var fbox=el('newsFilters');
 if(fbox){["All"].concat(Object.keys(CAT).filter(function(c){return c!=="Social Enterprise";})).forEach(function(c){
   var b=document.createElement('button');b.className='chip'+(c==="All"?' on':'');b.textContent=c;
   b.onclick=function(){active=c;[].forEach.call(fbox.children,function(x){x.classList.toggle('on',x.textContent===c);});draw();};fbox.appendChild(b);});}
 function draw(){var list=active==="All"?NEWS:NEWS.filter(function(a){return a.cat===active;});
   var g=el('newsGrid');if(!g)return;g.innerHTML='';var cnt=el('newsCount');if(cnt)cnt.textContent=list.length+' stories';
   list.forEach(function(a){var g2=document.createElement('a');g2.className='art';g2.href='blog.html';
     g2.innerHTML='<div class="ph">'+scene(a.title,a.cat)+(a.h<8?'<span class="new">New</span>':'')+'</div>'+
      '<div class="b">'+tagHTML(a.cat)+'<div class="t">'+a.title+'</div>'+(a.dek?'<div class="dek">'+a.dek+'</div>':'')+
      '<div class="am"><span>'+(a.when||rel(a.h))+'</span><span>'+a.read+' min read →</span></div></div>';g.appendChild(g2);});}
 draw();
}
function renderBlog(){
 var bav=el('blogAuthorAv'); if(bav)bav.insertAdjacentHTML('afterbegin',avatar("Field Report"));
 var cov=el('postCover'); if(cov)cov.insertAdjacentHTML('afterbegin',scene(FEAT.title,FEAT.cat));
 document.querySelectorAll('.inlinefig').forEach(function(fig,i){fig.insertAdjacentHTML('afterbegin',scene("inline-"+i,"Cyber Scams"));});
 var ab=el('authorAv'); if(ab)ab.insertAdjacentHTML('afterbegin',avatar("Field Report"));
 var rel2=el('related'); if(rel2)rel2.innerHTML=ARTS.slice(0,3).map(function(a){return '<a class="art" href="blog.html"><div class="ph">'+scene(a.title,a.cat)+'</div><div class="b">'+tagHTML(a.cat)+'<div class="t">'+a.title+'</div><div class="am"><span>'+a.read+' min read</span><span>→</span></div></div></a>';}).join('');
}

/* generic FAQ builder (light) */
function buildFAQ(host,items,icon){ if(!host)return;
 host.innerHTML=items.map(function(f,i){return '<div class="qa'+(i===0?' open':'')+'"><div class="q">'+f.q+'<span class="ic">'+icon+'</span></div><div class="a"><p>'+f.a+'</p></div></div>';}).join('');
 host.querySelectorAll('.qa').forEach(function(qa){var a=qa.querySelector('.a');if(qa.classList.contains('open'))a.style.maxHeight=a.scrollHeight+'px';
   qa.querySelector('.q').onclick=function(){var open=qa.classList.contains('open');
     host.querySelectorAll('.qa').forEach(function(o){o.classList.remove('open');o.querySelector('.a').style.maxHeight=null;});
     if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}};});
}

/* =========================================================================
   UNIVERSAL BEHAVIOURS
   ========================================================================= */
function countUp(elm,dur){var to=+elm.dataset.to,suf=elm.dataset.suffix||'',cm=elm.dataset.comma;
 var fmt=function(v){return cm?Math.round(v).toLocaleString('en-US'):Math.round(v);};var st=performance.now();
 (function s(n){var t=Math.min(1,(n-st)/dur),e=1-Math.pow(1-t,3);elm.textContent=fmt(to*e)+(t>.5?suf:'');if(t<1)requestAnimationFrame(s);else elm.textContent=fmt(to)+suf;})(st);}

function init(){
 var page=document.body.getAttribute('data-page');
 injectHeader(page); injectNewsletter(); injectFooter();
 document.querySelectorAll('.flame').forEach(function(fl){if(!fl.innerHTML.trim())fl.innerHTML=FLAME;});
 // mobile menu
 var burger=document.getElementById('burger'),menu=document.getElementById('mobileMenu');
 if(burger&&menu){
   burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.classList.toggle('x',o);burger.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o);});
   menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.classList.remove('x');document.body.classList.remove('lock');});});
 }
 if(page==='home')renderHome();
 else if(page==='projects')renderProjects();
 else if(page==='about')renderAbout();
 else if(page==='team')renderTeam();
 else if(page==='partners')renderPartners();
 else if(page==='project')renderProject();
 else if(page==='partner')renderPartner();
 else if(page==='news')renderNews();
 else if(page==='blog')renderBlog();

 // reveals
 var rIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rIO.unobserve(e.target);}});},{threshold:.12});
 document.querySelectorAll('.fade').forEach(function(e){rIO.observe(e);});
 // count-up strips
 document.querySelectorAll('[data-countgroup]').forEach(function(grp){
   var sIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){[].forEach.call(e.target.querySelectorAll('.n'),function(n,i){if(n.dataset.to)setTimeout(function(){countUp(n,1400);},i*120);});sIO.disconnect();}});},{threshold:.4});
   sIO.observe(grp);});
 // nav stick + progress bar
 var bar=el('bar');
 function onScroll(){var hdr=el('hdr');if(hdr)hdr.classList.toggle('stuck',window.scrollY>24);
   if(bar){var h=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(h>0?window.scrollY/h*100:0)+'%';}}
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();
}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
