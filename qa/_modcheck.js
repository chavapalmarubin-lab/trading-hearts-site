var window={},document={getElementById:function(){},querySelector:function(){},addEventListener:function(){},readyState:1,createElement:function(){return{}}};(function(){
  var LINES=[
   {k:'alexandros',n:'Alexandros',a:'Drachma',c:'#19A7A7'},{k:'aurora',n:'Aurora',a:'Gold',c:'#C9A84C'},
   {k:'conrad',n:'Conrad',a:'US Dollar',c:'#3EA55E'},{k:'isabella',n:'Isabella',a:'Pound',c:'#4C6FBF'},
   {k:'sofia',n:'Sofia',a:'Euro',c:'#3D8FD4'},{k:'aiko',n:'Aiko',a:'Yen',c:'#D24B6A'},
   {k:'victoria',n:'Victoria',a:'Swiss Franc',c:'#C0453B'},{k:'charlotte',n:'Charlotte',a:'Canadian $',c:'#B5533A'},
   {k:'scarlett',n:'Scarlett',a:'Aussie $',c:'#E0A33C'},{k:'clara',n:'Clara',a:'Bonds',c:'#8A93A8'},
   {k:'zane',n:'Zane',a:'Oil',c:'#6C7A89'},{k:'hiro',n:'Hiro',a:'Bitcoin',c:'#E8873A'},
   {k:'zephyr',n:'Zephyr',a:'Ethereum',c:'#7C6CD0'},{k:'niko',n:'Niko',a:'Solana',c:'#B84DBE'},
   {k:'camila',n:'Camila',a:'Brazil Real',c:'#2FA36B'},{k:'fernanda',n:'Fernanda',a:'Mexican Peso',c:'#8FA83A'},
   {k:'valentina',n:'Valentina',a:'Argentine Peso',c:'#5AA6D6'},{k:'simon',n:'Simón',a:'Bolívar',c:'#9A6A2B'},
   {k:'catalina',n:'Catalina',a:'Colombian Peso',c:'#2A9D8F'},{k:'marisol',n:'Marisol',a:'Peru Sol',c:'#C97B4A'},
   {k:'mei',n:'Mei',a:'Yuan · offshore',c:'#E0524E'},{k:'wei',n:'Wei',a:'Yuan · onshore',c:'#46B37A'},
   {k:'klaus',n:'Klaus',a:'Weimar Mark',c:'#9A7B5F'},{k:'isabelle',n:'Isabelle',a:'The Saga',c:'#9488A8'},
   {k:'lars',n:'Lars',a:'The Saga',c:'#6E8FA0'},{k:'matteo',n:'Matteo',a:'The Saga',c:'#A0788E'},
   {k:'carlos',n:'Carlos',a:'The Saga',c:'#7A9E86'},{k:'ana',n:'Ana',a:'The Saga',c:'#A89A6E'}
  ];
  var STN=[
   {px:120,py:250,y:'600 BCE',n:'The Birth of Money',L:['alexandros']},
   {px:200,py:250,y:'480 BCE',n:'Silver Wins a War',L:['alexandros']},
   {px:290,py:300,y:'50 BCE',n:'Rome Mints Gold',L:['aurora']},
   {px:320,py:185,y:'1694',n:'The Bank of England',L:['isabella']},
   {px:430,py:160,y:'1871',n:'The Yen Is Born',L:['aiko']},
   {px:520,py:215,y:'1913',n:'The Federal Reserve',L:['conrad'],e:'03'},
   {px:450,py:110,y:'1923',n:'When Money Died',L:['klaus']},
   {px:660,py:285,y:'1944',n:'Bretton Woods',L:['conrad','aurora','isabella','aiko','victoria'],e:'05'},
   {px:800,py:330,y:'1971',n:'The Gold Window Closes',L:['aurora','conrad','isabella','aiko','victoria','charlotte'],e:'05'},
   {px:740,py:430,y:'1973',n:'Oil & the Petrodollar',L:['zane','conrad'],e:'06'},
   {px:610,py:470,y:'1981',n:'The Bond Peak',L:['clara'],e:'06'},
   {px:700,py:520,y:'1983',n:'The Aussie Floats',L:['scarlett']},
   {px:500,py:660,y:'1991',n:'Peru’s New Sol',L:['marisol']},
   {px:640,py:630,y:'1994',n:'Real, Tequila & the Yuan',L:['camila','fernanda','wei']},
   {px:720,py:700,y:'1999',n:'Colombia’s Crisis',L:['catalina']},
   {px:810,py:675,y:'2001',n:'Argentina Defaults',L:['valentina']},
   {px:900,py:375,y:'2002',n:'The Euro; the Drachma Retires',L:['sofia','alexandros'],e:'07'},
   {px:910,py:545,y:'2008',n:'Satoshi & the Crisis',L:['hiro','conrad','victoria'],e:'08'},
   {px:860,py:825,y:'2010',n:'The Offshore Yuan',L:['mei']},
   {px:1015,py:470,y:'2015',n:'Franc Shock · Greek No · Ethereum',L:['victoria','alexandros','sofia','zephyr','mei','wei'],e:'09'},
   {px:930,py:735,y:'2018',n:'The Bolívar Collapses',L:['simon']},
   {px:1025,py:625,y:'2020',n:'Oil Negative · Solana',L:['zane','niko'],e:'09'},
   {px:1090,py:905,y:'2024',n:'The Exchange — present day',L:['isabelle','lars','matteo','carlos','ana'],e:'09'}
  ];
  window.TH_STN=STN;
  var DTX=1240,FTX=1350,byk={},col={};
  LINES.forEach(function(l){byk[l.k]=l;col[l.k]=l.c;});
  function esc(s){return (s||'').replace(/&/g,'&amp;');}
  function nm(k){return byk[k]?byk[k].n:k;}
  function metroSVG(){
    var HUBX=1200,FUTX=1380,HY0=250,HDY=15,li={};LINES.forEach(function(l,i){li[l.k]=i;});
    function hubY(i){return HY0+i*HDY;}
    function oc(x1,y1,x2,y2){var dx=x2-x1,dy=y2-y1,adx=Math.abs(dx),ady=Math.abs(dy),sx=dx<0?-1:1,sy=dy<0?-1:1;if(adx>=ady)return ' L'+(x2-sx*ady)+' '+y1+' L'+x2+' '+y2;return ' L'+x1+' '+(y2-sy*adx)+' L'+x2+' '+y2;}
    function pathFor(k){var ss=STN.filter(function(z){return z.L.indexOf(k)>=0;}).sort(function(a,b){return a.px-b.px;});var pts=ss.map(function(z){return [z.px,z.py];});pts.push([HUBX,hubY(li[k])]);var d='M'+pts[0][0]+' '+pts[0][1];for(var i=1;i<pts.length;i++)d+=oc(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1]);return d;}
    var W=1520,H=1010,s='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMinYMin meet" style="min-width:1200px;width:100%;height:auto;font-family:-apple-system,Segoe UI,Roboto,sans-serif">';
    [[430,'rgba(255,255,255,.02)'],[300,'rgba(255,255,255,.028)'],[170,'rgba(201,168,76,.05)']].forEach(function(z){s+='<circle cx="'+HUBX+'" cy="500" r="'+z[0]+'" fill="'+z[1]+'"/>';});
    LINES.forEach(function(l){s+='<path d="'+pathFor(l.k)+'" fill="none" stroke="'+l.c+'" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>';});
    s+='<rect x="'+(HUBX-7)+'" y="'+(hubY(0)-9)+'" width="14" height="'+(hubY(27)-hubY(0)+18)+'" rx="7" fill="#0a1526" stroke="#C9A84C" stroke-width="2.5"/>';
    LINES.forEach(function(l,i){s+='<circle cx="'+HUBX+'" cy="'+hubY(i)+'" r="4.4" fill="'+l.c+'"/>';});
    LINES.forEach(function(l,i){s+='<text x="'+(HUBX+13)+'" y="'+(hubY(i)+3)+'" fill="'+l.c+'" font-size="8.5" font-weight="600" style="cursor:pointer" onclick="thMeet(\''+l.k+'\')">'+l.n+'</text>';});
    s+='<line x1="'+HUBX+'" y1="500" x2="'+FUTX+'" y2="500" stroke="#C9A84C" stroke-width="4" stroke-dasharray="3 6"/><circle cx="'+FUTX+'" cy="500" r="8" fill="#0a1526" stroke="#C9A84C" stroke-width="2.5"/>';
    STN.forEach(function(st){if(st.L.length>1)s+='<circle cx="'+st.px+'" cy="'+st.py+'" r="7" fill="#fff" stroke="#333" stroke-width="2"/>';else s+='<circle cx="'+st.px+'" cy="'+st.py+'" r="4.6" fill="'+(col[st.L[0]]||'#fff')+'"/>';});
    STN.forEach(function(st){s+='<text x="'+st.px+'" y="'+(st.py-12)+'" text-anchor="middle" fill="#C9A84C" font-size="10" font-weight="600">'+st.y+'</text>';});
    [[0,'alexandros'],[2,'aurora'],[3,'isabella'],[4,'aiko'],[5,'conrad'],[6,'klaus']].forEach(function(o){var st=STN[o[0]],l=byk[o[1]];if(st&&l)s+='<text x="'+st.px+'" y="'+(st.py+17)+'" text-anchor="middle" fill="'+l.c+'" font-size="9" font-weight="600" style="cursor:pointer" onclick="thMeet(\''+o[1]+'\')">'+l.n+'</text>';});
    var PX=70;
    s+='<rect x="'+PX+'" y="498" width="344" height="140" rx="8" fill="rgba(255,255,255,.022)" stroke="rgba(201,168,76,.25)"/><text x="'+(PX+18)+'" y="524" fill="#C9A84C" font-size="11" font-weight="700" letter-spacing="2">HOW TO READ THE MAP</text>';
    var ry=546;
    s+='<line x1="'+(PX+18)+'" y1="'+ry+'" x2="'+(PX+42)+'" y2="'+ry+'" stroke="#C9A84C" stroke-width="4" stroke-linecap="round"/><text x="'+(PX+52)+'" y="'+(ry+4)+'" fill="#d8d2c4" font-size="10">A line is a character — an asset</text>';ry+=21;
    s+='<line x1="'+(PX+30)+'" y1="'+(ry-5)+'" x2="'+(PX+30)+'" y2="'+(ry+5)+'" stroke="#C9A84C" stroke-width="3" stroke-linecap="round"/><text x="'+(PX+52)+'" y="'+(ry+4)+'" fill="#d8d2c4" font-size="10">A station is a real event</text>';ry+=21;
    s+='<circle cx="'+(PX+30)+'" cy="'+ry+'" r="5.5" fill="#fff" stroke="#C9A84C" stroke-width="2"/><text x="'+(PX+52)+'" y="'+(ry+4)+'" fill="#d8d2c4" font-size="10">A white circle is a transfer — many hearts</text>';ry+=21;
    s+='<rect x="'+(PX+27)+'" y="'+(ry-6)+'" width="5" height="12" rx="2.5" fill="#0a1526" stroke="#C9A84C" stroke-width="1.6"/><text x="'+(PX+52)+'" y="'+(ry+4)+'" fill="#d8d2c4" font-size="10">Downtown is TODAY — every line meets</text>';ry+=21;
    s+='<line x1="'+(PX+18)+'" y1="'+ry+'" x2="'+(PX+42)+'" y2="'+ry+'" stroke="#C9A84C" stroke-width="3" stroke-dasharray="2 4"/><text x="'+(PX+52)+'" y="'+(ry+4)+'" fill="#d8d2c4" font-size="10">The Future is the end of the line</text>';
    s+='<rect x="'+PX+'" y="650" width="344" height="176" rx="8" fill="rgba(255,255,255,.022)" stroke="rgba(201,168,76,.25)"/><text x="'+(PX+18)+'" y="676" fill="#C9A84C" font-size="11" font-weight="700" letter-spacing="2">CHOOSE YOUR EXPERIENCE</text><text x="'+(PX+18)+'" y="690" fill="rgba(250,247,242,.4)" font-size="8.5">tap any station to open it</text>';
    [['🎬','Watch it','documentary · animated episode'],['📖','Read it','comic · novel · article'],['🎧','Hear it','podcast · narration'],['🎮','Live it','quiz · simulation'],['🏛','Explore it','museum objects · sources'],['🧠','Understand it','why it still matters today']].forEach(function(e,i){var yy=710+i*19;s+='<text x="'+(PX+20)+'" y="'+(yy+4)+'" font-size="13">'+e[0]+'</text><text x="'+(PX+44)+'" y="'+(yy+4)+'" fill="#f0ead6" font-size="10">'+e[1]+' — <tspan fill="rgba(250,247,242,.45)" font-size="8.5">'+e[2]+'</tspan></text>';});
    s+='<rect x="'+PX+'" y="838" width="344" height="150" rx="8" fill="rgba(255,255,255,.022)" stroke="rgba(201,168,76,.25)"/><text x="'+(PX+18)+'" y="864" fill="#C9A84C" font-size="11" font-weight="700" letter-spacing="2">YOUR JOURNEY</text><text x="'+(PX+18)+'" y="878" fill="rgba(250,247,242,.4)" font-size="8.5">members · saved to your account</text>';
    [['👣','My Routes'],['♥','Favorite Characters'],['◷','Recent Stations'],['🏅','Achievements'],['📈','Learning Progress']].forEach(function(e,i){var yy=898+i*17;s+='<text x="'+(PX+22)+'" y="'+(yy+4)+'" font-size="12" fill="#C9A84C">'+e[0]+'</text><text x="'+(PX+46)+'" y="'+(yy+4)+'" fill="#f0ead6" font-size="10">'+e[1]+'</text>';});
    s+='<text x="'+HUBX+'" y="'+(hubY(27)+30)+'" text-anchor="middle" fill="#C9A84C" font-size="13" font-weight="700" letter-spacing="1">TODAY</text>';
    s+='<text x="'+FUTX+'" y="484" text-anchor="middle" fill="#C9A84C" font-size="10" font-weight="700">THE FUTURE</text>';
    s+='<text x="150" y="70" fill="rgba(250,247,242,.4)" font-size="11" letter-spacing="2">THE SUBURBS · ancient origins</text>';
    STN.forEach(function(st,i){s+='<circle cx="'+st.px+'" cy="'+st.py+'" r="18" fill="transparent" style="cursor:pointer" onclick="thOpenHub('+i+')"><title>'+st.y+' — '+esc(st.n)+'</title></circle>';});
    return s+'</svg>';
  }
  function ovl(){var o=document.getElementById('thHubOv');if(o)return o;o=document.createElement('div');o.id='thHubOv';o.innerHTML='<div class="hubCard"><button class="hubX" onclick="thCloseHub()">&times;</button><div id="hubBody"></div></div>';document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o)thCloseHub();});return o;}
  function groups(st){return [
    {i:'🎬',k:'Watch it',items:[{l:'Documentary',tag:'p'},{l:'Animated episode',tag:'s'},{l:'Motion comic',tag:'s'}]},
    {i:'📖',k:'Read it',items:[{l:'Comic',act:st.e?'era':null},{l:'The Saga — novel',act:'saga'},{l:'Historical article',tag:'s'}]},
    {i:'🎧',k:'Hear it',items:[{l:'Character narration',tag:'s'},{l:'Podcast',tag:'s'},{l:'Audio drama',tag:'p'}]},
    {i:'🎮',k:'Live it',items:[{l:'Explore the map',act:'timeline'},{l:'Quiz',tag:'s'},{l:'Decision simulation',tag:'p'}]},
    {i:'🏛',k:'Explore it',items:[{l:'Museum objects',act:'sources'},{l:'Primary sources',act:'sources'},{l:'World map',act:'map'}]},
    {i:'🧠',k:'Understand it',items:[{l:'Economic impact',tag:'s'},{l:'Political impact',tag:'s'},{l:'Why it still matters',tag:'s'}]}
  ];}
  function itemHtml(it){if(it.act)return '<div class="hubIt live" data-act="'+it.act+'">'+it.l+'<span class="hubTag g">Open</span></div>';return '<div class="hubIt soon">'+it.l+(it.tag==='p'?'<span class="hubTag p">TH+ soon</span>':'<span class="hubTag s">Soon</span>')+'</div>';}
  window.thOpenHub=function(i){var st=STN[i];if(!st)return;var o=ovl();
    var chips=st.L.map(function(k){return '<a class="hubPer" data-char="'+k+'"><span class="hubPerDot" style="background:'+(col[k]||'#fff')+'"></span><img class="hubPerPic" alt=""/><span class="hubPerNm">'+nm(k)+'</span></a>';}).join('');
    var gh=groups(st).map(function(g){return '<div class="hubG"><div class="gi">'+g.i+'</div><div class="gk">'+g.k+'</div>'+g.items.map(itemHtml).join('')+'</div>';}).join('');
    var nextI=(i+1<STN.length)?i+1:null;
    document.getElementById('hubBody').innerHTML='<div class="hubHead'+(st.L.length===1?' hub1':'')+'"><div class="hubHeadL"><div class="hubYr">'+st.y+'</div><div class="hubT">'+esc(st.n)+'</div><p class="hubPlat">'+(st.L.length>1?'On the platform · '+st.L.length+' hearts lived this moment':'On the platform')+'</p></div><div class="hubHeadR">'+chips+'</div></div><div class="hubQ">How would you like to experience this story?</div><div class="hubGrid">'+gh+'</div><div class="hubNext"><a onclick="thCloseHub()">&times; Close</a>'+(nextI!=null?'<a onclick="thOpenHub('+nextI+')">Continue to '+STN[nextI].y+' &rarr;</a>':'<span></span>')+'</div>';
    [].forEach.call(o.querySelectorAll('.hubPer'),function(n){n.onclick=function(){thMeet(n.getAttribute('data-char'));};});(function fp(n){var pend=false;[].forEach.call(o.querySelectorAll('.hubPer'),function(c){var im=c.querySelector('.hubPerPic');if(im&&!im.getAttribute('src')){var k=c.getAttribute('data-char');var por=(window.CHARS&&window.CHARS[k]&&window.CHARS[k].portrait);if(por){im.onload=function(){c.classList.add('haspic');};im.src=por;}else pend=true;}});if(pend&&n<25)setTimeout(function(){fp(n+1);},200);})(0);
    [].forEach.call(o.querySelectorAll('.hubIt.live'),function(n){n.onclick=function(){thHubAct(n.getAttribute('data-act'),st);};});
    o.classList.add('on');document.body.style.overflow='hidden';o.scrollTop=0;
  };
  window.thCloseHub=function(){var o=document.getElementById('thHubOv');if(o)o.classList.remove('on');document.body.style.overflow='';};
  function toId(id){var s=document.getElementById(id);if(s)s.scrollIntoView({behavior:'smooth'});}
  window.thMeet=function(k){thCloseHub();if(window.thShowHome)thShowHome();toId('characters');if(window.openChar)setTimeout(function(){openChar(k);},480);};
  window.thHubAct=function(a,st){thCloseHub();
    if(a==='era'){if(window.eraDrawer)eraDrawer(st.e);else toId('eramap');}
    else if(a==='saga'){if(window.thShowHome)thShowHome();toId('saga');}
    else if(a==='timeline'){if(window.thShowHome)thShowHome();toId('thtimeline');}
    else if(a==='map'){if(window.thShowHome)thShowHome();toId('thworld');}
    else if(a==='sources'){if(window.thShowAbout){thShowAbout();setTimeout(function(){toId('thsources');},220);}else toId('thsources');}
  };
  window.tlOpen=function(i){thOpenHub(i);};
  document.addEventListener('keydown',function(e){if(e.key==='Escape')thCloseHub();});
  function ready(fn){document.readyState!=='loading'?fn():document.addEventListener('DOMContentLoaded',fn);}
  ready(function(){try{
    var sec=document.getElementById('thtimeline');if(!sec||document.getElementById('thMetro'))return;
    var scroll=sec.querySelector('.tht-scroll');
    var key='<div class="mx-key">'
     +'<span><svg width="26" height="8"><line x1="1" y1="4" x2="25" y2="4" stroke="#C9A84C" stroke-width="4" stroke-linecap="round"/></svg>Character line</span>'
     +'<span><svg width="12" height="14"><line x1="6" y1="1" x2="6" y2="13" stroke="#C9A84C" stroke-width="3" stroke-linecap="round"/></svg>Station &middot; an event</span>'
     +'<span><svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="#fff" stroke="#C9A84C" stroke-width="2"/></svg>Transfer &middot; many hearts</span>'
     +'<span><svg width="14" height="14"><rect x="5" y="1" width="4" height="12" rx="2" fill="#0a1526" stroke="#C9A84C" stroke-width="1.6"/></svg>Downtown &middot; Today</span>'
     +'<span><svg width="26" height="8"><line x1="1" y1="4" x2="25" y2="4" stroke="#C9A84C" stroke-width="3" stroke-dasharray="2 4"/></svg>The Future</span></div>';
    var hubrow=STN.map(function(st,i){return {i:i,st:st};}).filter(function(o){return o.st.L.length>1;}).map(function(o){return '<div class="mx-hub" onclick="thOpenHub('+o.i+')"><div class="med">'+o.st.y+'</div><div class="hn">'+esc(o.st.n)+'</div></div>';}).join('');
    var legend=LINES.map(function(l){return '<span style="cursor:pointer" onclick="thMeet(\''+l.k+'\')"><i style="background:'+l.c+'"></i>'+l.n+' · '+l.a+'</span>';}).join('');
    var box=document.createElement('div');box.id='thMetro';
    box.innerHTML='<div class="mx-head"><p class="mx-ey">The Trading Hearts</p><h3 class="mx-h">Underground of <span class="g">Civilization</span></h3><p class="mx-sub">28 characters, 28 lines. The oldest begin far out in the suburbs and ride inbound through history to Downtown — Today — where every line meets. The Future is the end of the line. Tap any station to travel the story.</p></div>'+key+'<div class="mx-scroll">'+metroSVG()+'</div><div class="mx-legend">'+legend+'</div><div class="mx-hubs"><div class="ht">Major Transfer Stations · moments that changed everything</div><div class="mx-hubrow">'+hubrow+'</div></div>';
    if(scroll){sec.insertBefore(box,scroll);scroll.style.display='none';}else sec.appendChild(box);
  }catch(e){if(window.console)console.warn('TH metro',e);}});
})();