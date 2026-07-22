var window={},document={},console={};
(function(){
var GOLD='#C9A84C',GREEN='#3AAA70';
var COIN='https://openaccess-cdn.clevelandart.org/1916.992/1916.992_web.jpg';
// name,currency,archetype,pillarColor,lat,lon
var C=[
['Alexandros','Greek Drachma','Trust',GOLD,37.98,23.73],['Aurora Lux','Gold','Scarcity',GOLD,25.2,55.27],
['Conrad Powers','US Dollar','Power',GOLD,38.9,-77.04],['Charlotte','British Pound','Tradition',GOLD,51.5,-0.12],
['Sofia Valente','The Euro','Union',GOLD,50.85,4.35],['Aiko','Japanese Yen','Patience',GOLD,35.68,139.69],
['Clara','Swiss Franc','Neutrality',GOLD,46.95,7.44],['Victoria','Equities / S&P','Ownership',GOLD,40.71,-74.0],
['Hiro Cipher','Bitcoin','Freedom',GOLD,34.7,135.5],['Zephyr Cole','Ethereum','Programmability',GOLD,37.77,-122.42],
['Niko','Solana','Speed',GOLD,6.24,-75.58],['Zane Okafor','Oil','Energy',GREEN,6.45,3.39],
['Valentina','Argentine Peso','Resilience',GOLD,-34.6,-58.38],['Klaus Weber','Deutsche Mark','Discipline',GOLD,50.11,8.68],
['Isabelle Dupont','French Franc','Elegance',GOLD,48.85,2.35],['Lars','Guilder / Krone','Trade',GOLD,52.37,4.9],
['Matteo Romano','Italian Lira','Beauty',GOLD,45.46,9.19],['Carlos','Colombian Peso','Recovery',GOLD,4.71,-74.07],
['Ana','Brazilian Real','Endurance',GOLD,-23.55,-46.63],['Camila','Mexican Peso','Bridge',GOLD,19.43,-99.13],
['Catalina','Chilean Peso','Ground',GREEN,-33.45,-70.67],['Fernanda','Agribusiness','Harvest',GREEN,-15.6,-56.1],
['Marisol','Cuban Peso','Survival',GOLD,23.11,-82.37],['Simón Vargas','Venezuelan Bolívar','Conviction',GOLD,10.5,-66.9],
['Isabella','Euro / Luxury','Craft',GOLD,43.77,11.25],['Mei','Offshore RMB','Ambition',GOLD,22.32,114.17],
['Wei','Onshore RMB','Order',GOLD,39.9,116.4],['Scarlett Rayne','Copper / ASX','Grit',GREEN,-33.87,151.21]];
// world hotspots
var hs=document.getElementById('thwHots');
var SLUG={"Alexandros":"alexandros","Aurora Lux":"aurora","Conrad Powers":"conrad","Charlotte":"charlotte","Sofia Valente":"sofia","Aiko":"aiko","Clara":"clara","Victoria":"victoria","Hiro Cipher":"hiro","Zephyr Cole":"zephyr","Niko":"niko","Zane Okafor":"zane","Valentina":"valentina","Klaus Weber":"klaus","Isabelle Dupont":"isabelle","Lars":"lars","Matteo Romano":"matteo","Carlos":"carlos","Ana":"ana","Camila":"camila","Catalina":"catalina","Fernanda":"fernanda","Marisol":"marisol","Simón Vargas":"simon","Isabella":"isabella","Mei":"mei","Wei":"wei","Scarlett Rayne":"scarlett"};
C.forEach(function(c){var x=(c[5]+180)/360*100,y=(90-c[4])/180*100;var slug=SLUG[c[0]];
 var d=document.createElement('div');d.className='thw-hot';d.style.left=x+'%';d.style.top=y+'%';d.style.setProperty('--acc',c[3]);
 d.innerHTML='<div class="thw-pin"></div><div class="thw-lbl"><img class="thw-thumb" alt="" onerror="this.style.display=\'none\'"/><span class="thw-txt"><span class="thw-nm">'+c[0]+'</span><span class="thw-cur">'+c[1]+'</span></span></div>';
 d.addEventListener('mouseenter',function(){var im=d.querySelector('.thw-thumb');if(im&&!im.getAttribute('src')&&window.CHARS&&window.CHARS[slug]&&window.CHARS[slug].portrait){im.src=window.CHARS[slug].portrait;}});
 d.onclick=(function(s){return function(){var cs=document.getElementById("characters");if(cs)cs.scrollIntoView({behavior:"smooth"});if(s&&window.openChar)setTimeout(function(){openChar(s);},480);};})(slug);
 hs.appendChild(d);});
// timeline
var TL=[['600 BCE','First coins struck in Lydia','Alexandros','A stamp on metal becomes a promise.','char:alexandros'],
['483 BCE','The vote at Laurion','Alexandros','Ships over silver. Themistocles wins.','char:alexandros'],
['480 BCE','The Battle of Salamis','Alexandros','The drachma pays the men who saved Greece.','char:alexandros'],
['447 BCE','The Parthenon rises','Alexandros','Silver becomes marble.','char:alexandros'],
['1440','The printing press','Innovation','Information breaks free of the few.',''],
['1694','The Bank of England','Charlotte','A nation learns to borrow.','char:charlotte'],
['1792','The US Coinage Act','Conrad','The dollar is defined into being.','era:01'],
['1923','Weimar hyperinflation','Klaus','Money dies; a nation never forgets.','char:klaus'],
['1929','The Great Crash','Victoria','Ownership turns to ash overnight.','era:04'],
['1944','Bretton Woods','Conrad','The world pegs itself to the dollar.','era:05'],
['1971','Nixon closes the gold window','Aurora','Money floats free of gold.','era:05'],
['2002','The euro; the drachma retires','Sofia','The oldest name in money ends.','era:07'],
['2008','Satoshi’s white paper','Hiro','Money without a master.','era:08'],
['2015','Greece votes 61% “no”','Alexandros','And takes the terms anyway.','era:09'],
['2020','Oil turns negative','Zane','The world briefly pays you to take it.','era:09'],
['2025','You are here','Trading Hearts','Every thread still moving.','']];
document.getElementById('thtLine').innerHTML=TL.map(function(e,i){var has=e[4]?' tht-has':'';var cta=e[4]?(e[4].indexOf('era')===0?'▸ Open the comics':'▸ Meet '+e[2]):'In production';return '<div class="tht-ev'+has+'" onclick="tlOpen('+i+')"><div class="tht-yr">'+e[0]+'</div><div class="tht-nub"></div><div class="tht-ti">'+e[1]+'</div><div class="tht-ch">'+e[2]+'</div><div class="tht-bl">'+e[3]+'</div><div class="'+(e[4]?'tht-go':'tht-soon')+'">'+cta+'</div></div>';}).join('');
window.tlOpen=function(i){var t=(TL[i]||[])[4];if(!t)return;var p=t.split(':');if(p[0]==='era'){if(window.eraDrawer){eraDrawer(p[1]);}else{var em=document.getElementById('eramap');if(em)em.scrollIntoView({behavior:'smooth'});}}else if(p[0]==='char'){var cs=document.getElementById('characters');if(cs)cs.scrollIntoView({behavior:'smooth'});if(window.openChar)setTimeout(function(){openChar(p[1]);},500);}};
// sources — master archives
var ARCH=[['FRASER','St. Louis Fed — every primary document of US monetary history (1792 Coinage Act, Bretton Woods, Nixon 1971).','Public domain'],
['Bank of England Archive','80,000+ records from 1694 — the Royal Charter, the first subscribers, 330 years of minutes.','Mixed'],
['Smithsonian NNC','1.6M monetary objects — the 1933 Double Eagle, gold certificates, coin dies.','CC0'],
['British Museum','Coins & Medals + the Money Gallery — the first Lydian coin, denarii, cowrie shells.','Educational'],
['Cleveland / Met / Toledo','Open-access ancient coins in high resolution — incl. the Athenian owl tetradrachm.','CC0'],
['OeNB Money Museum','Original banknote design sketches (Klimt, Moser) and 1816 printing plates.','Attribution'],
['Bundesbank Archive','Weimar hyperinflation cabinet, Notgeld, the 1948 D-Mark reform law.','Mixed'],
['Library of Congress','17M images — Bretton Woods 1944, Drake Well 1859, Depression photography.','Public domain'],
['Attic Inscriptions Online','The Parthenon construction accounts (IG I³ 449) in Greek + translation.','CC-BY'],
['Internet Archive / Wikimedia','Public-domain scans: Herodotus, the Bank of England Act 1694, coin hoards.','CC / PD']];
document.getElementById('thsArch').innerHTML=ARCH.map(function(a){return '<div class="ths-a"><h4>'+a[0]+'</h4><p>'+a[1]+'</p><div class="lic">'+a[2]+'</div></div>';}).join('');
// sources — per character
var AL_ITEMS=[
['Owl tetradrachm — the coin','Cleveland Museum of Art · acc. 1916.992','CC0','https://clevelandart.org/art/1916.992'],
['Parthenon accounts — IG I³ 449','Acropolis Museum · Attic Inscriptions Online','CC-BY','https://www.atticinscriptions.com/inscription/IGI3/449'],
['The fleet & Salamis','Herodotus, Histories, Book VII','Public domain','https://archive.org/details/herodotus'],
['First coin — Lydian electrum stater','British Museum, Money Gallery','Educational','https://www.britishmuseum.org/collection'],
['The trireme','HS Olympias reconstruction (Hellenic Navy)','CC-BY-SA','https://commons.wikimedia.org/wiki/Category:Olympias_(ship,_1987)'],
['The silver mines','Laurion archaeological site','Survey','https://www.ancient-greece.org/archaeology/lavrion-ancient-silver-mines.html']];
var KEY={'Conrad Powers':'FRASER — 1792 Coinage Act, Bretton Woods 1944, Nixon 1971 gold-window transcript.',
'Aurora Lux':'FRASER — FDR 1933 gold order + Nixon 1971; Smithsonian National Numismatic Collection.',
'Charlotte':'Bank of England Archive — the 1694 Royal Charter and Book of Subscriptions.',
'Klaus Weber':'Bundesbank Archive — the 1948 D-Mark reform law; Weimar Notgeld (Wikimedia).',
'Hiro Cipher':'The Satoshi white paper (9pp), the genesis block, The Times front page 3 Jan 2009.',
'Valentina':'IMF Argentina files; Reinhart & Rogoff; corralito 2001 photo archives.',
'Zane Okafor':'Drake Well 1859 photographs (Library of Congress); OPEC founding documents.',
'Sofia Valente':'The Maastricht Treaty; ECB founding records; Europeana.',
'Victoria':'FSA / Great Crash photography (Library of Congress); NYSE historical record.',
'Isabelle Dupont':'French Assignat banknotes (Europeana); Banque de France archive.',
'Simón Vargas':'Venezuelan hyperinflation data; PDVSA records.',
'Mei':'PBoC / HKMA records; Belt & Road documentation.','Wei':'People’s Bank of China archives.'};
var g=document.getElementById('thsGrid');var html='';
// Alexandros full card
html+='<div class="ths-c full"><div class="arch">Trust · Money</div><h4>Alexandros</h4><div class="cur">Greek Drachma · the owl tetradrachm</div>'+
 '<div class="ths-full-grid"><div><img class="ths-coin" src="'+COIN+'" alt="Athenian owl tetradrachm, Cleveland Museum of Art"/><div class="seal">✓ Verified · Two-source</div></div>'+
 '<div class="ths-items">'+AL_ITEMS.map(function(i){return '<div class="ths-item"><a href="'+i[3]+'" target="_blank" rel="noopener">'+i[0]+'</a><div class="h">'+i[1]+'</div><span class="l">'+i[2]+'</span></div>';}).join('')+'</div></div></div>';
// the rest
C.forEach(function(c){if(c[0]==='Alexandros')return;var k=KEY[c[0]];
 html+='<div class="ths-c"><div class="arch">'+c[2]+'</div><h4>'+c[0]+'</h4><div class="cur">'+c[1]+'</div>'+
 '<div class="key">'+(k||'Deep File + Source Archive — in documentation.')+'</div>'+
 (k?'<span class="seal" style="color:'+GOLD+';border-color:rgba(201,168,76,.4)">Sourcing</span>':'')+'</div>';});
g.innerHTML=html;
})();