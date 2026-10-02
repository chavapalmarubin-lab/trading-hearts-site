
(() => {
  const cast = (window.THMX_DATA && window.THMX_DATA.cast) || [];
  const $ = s => document.querySelector(s);
  const esc = (s='') => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const palette=['#C9A84C','#55A5C8','#DB7666','#5474B8','#E3B44C','#E59A48','#629FD6','#A9AEB8','#A874A4','#3F7CCC','#56A69A','#3CA77A','#C86F52','#596C96','#72A474'];

  // cursor
  const cursor=$('.cursor'), ring=$('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cursor){cursor.style.left=mx+'px';cursor.style.top=my+'px'}});
  function tickRing(){if(ring){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(tickRing)} tickRing();

  // particles — intentionally restrained, matching main TH atmosphere
  const cv=$('#particles'), ctx=cv?.getContext('2d');
  let pts=[];
  function resize(){if(!cv)return;cv.width=innerWidth;cv.height=innerHeight;pts=Array.from({length:Math.min(52,Math.floor(innerWidth/24))},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3+.25,v:Math.random()*.18+.05,a:Math.random()*.28+.04}));}
  function draw(){if(!ctx)return;ctx.clearRect(0,0,cv.width,cv.height);for(const p of pts){p.y-=p.v;if(p.y<0){p.y=cv.height;p.x=Math.random()*cv.width}ctx.beginPath();ctx.fillStyle=`rgba(201,168,76,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
  addEventListener('resize',resize); resize(); draw();

  // nav
  const menuBtn=$('#menuBtn'), navLinks=$('#navLinks');
  menuBtn?.addEventListener('click',()=>{const o=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o?'true':'false')});
  navLinks?.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')});

  // reveal
  const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // cards
  const grid=$('#charGrid');
  function mediaFor(c){
    const base=c.media||{};
    const override=(window.THMX_MEDIA&&window.THMX_MEDIA[c.id])||{};
    return {
      headshot:override.headshot||base.headshot||c.image||'',
      onePager:override.onePager||base.onePager||'',
      gallery:Array.isArray(override.gallery)?override.gallery:(base.gallery||[]),
      videos:Array.isArray(override.videos)?override.videos:(base.videos||[]),
      comics:Array.isArray(override.comics)?override.comics:(base.comics||[])
    };
  }
  function portrait(c, cls='char-portrait'){
    const m=mediaFor(c);
    return `<div class="char-fallback">${esc(c.initials)}</div><img class="${cls}" src="${esc(m.headshot)}" alt="${esc(c.name)}" loading="lazy" onerror="this.style.display='none'">`;
  }
  if(grid){
    grid.innerHTML=cast.map((c,i)=>`<button class="char-card reveal" data-id="${esc(c.id)}" aria-label="Abrir perfil de ${esc(c.name)}">
      ${portrait(c)}
      <div class="char-overlay"></div><div class="char-info">
        <p class="char-asset">${esc(c.domain)}</p>
        <h3 class="char-name">${esc(c.name)}</h3>
        <p class="char-role">${esc(c.role)}</p>
        <p class="char-quote">${esc(c.quote)}</p>
      </div></button>`).join('');
    grid.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  // sports
  const sg=$('#sportsGrid');
  if(sg) sg.innerHTML=cast.map(c=>`<article class="sports-card">
      <h3>${esc(c.name)}</h3><p class="sports-team">${esc(c.sports.team)} · Intensidad ${esc(c.sports.intensity)}</p>
      <p class="sport-name">${esc(c.sports.primary)}</p>
      <p>Secundarios: ${esc(c.sports.secondary)}</p>
    </article>`).join('');

  // metro
  const svg=$('#metroSvg'), legend=$('#metroLegend');
  const ns='http://www.w3.org/2000/svg';
  if(svg){
    svg.setAttribute('viewBox','0 0 1320 840');
    const bg=document.createElementNS(ns,'g');
    const title=document.createElementNS(ns,'text'); title.setAttribute('x','1120');title.setAttribute('y','395');title.setAttribute('fill','#C9A84C');title.setAttribute('font-family','Palatino Linotype, serif');title.setAttribute('font-size','17');title.setAttribute('letter-spacing','4');title.textContent='CENTRO · HOY';bg.appendChild(title);
    const hub=document.createElementNS(ns,'circle');hub.setAttribute('cx','1100');hub.setAttribute('cy','420');hub.setAttribute('r','18');hub.setAttribute('fill','#070F1E');hub.setAttribute('stroke','#C9A84C');hub.setAttribute('stroke-width','3');bg.appendChild(hub);
    svg.appendChild(bg);
    cast.forEach((c,i)=>{
      const y=62+i*49.5, col=palette[i%palette.length], targetY=420;
      const g=document.createElementNS(ns,'g'); g.setAttribute('data-id',c.id); g.style.cursor='pointer';
      const path=document.createElementNS(ns,'path');
      path.setAttribute('d',`M 170 ${y} L 450 ${y} C 650 ${y}, 720 ${targetY}, 900 ${targetY} L 1100 ${targetY}`);
      path.setAttribute('fill','none');path.setAttribute('stroke',col);path.setAttribute('stroke-width','5');path.setAttribute('stroke-linecap','round');path.setAttribute('opacity','.86');g.appendChild(path);
      const label=document.createElementNS(ns,'text');label.setAttribute('x','22');label.setAttribute('y',String(y+5));label.setAttribute('fill','#FAF7F2');label.setAttribute('font-size','13');label.setAttribute('font-family','Palatino Linotype, serif');label.textContent=c.name;g.appendChild(label);
      [260,450,760].forEach((x,j)=>{
        const cy=j<2?y:(y+(targetY-y)*.7);
        const circle=document.createElementNS(ns,'circle');circle.setAttribute('cx',x);circle.setAttribute('cy',cy);circle.setAttribute('r','7');circle.setAttribute('fill','#070F1E');circle.setAttribute('stroke',col);circle.setAttribute('stroke-width','3');g.appendChild(circle);
        const tx=document.createElementNS(ns,'text');tx.setAttribute('x',String(x+11));tx.setAttribute('y',String(cy-10));tx.setAttribute('fill','rgba(250,247,242,.55)');tx.setAttribute('font-size','10');tx.setAttribute('font-family','Courier New, monospace');tx.textContent=c.line[Math.min(j,2)];g.appendChild(tx);
      });
      g.addEventListener('click',()=>openCharacter(c.id));
      svg.appendChild(g);
    });
  }
  if(legend) legend.innerHTML=cast.map((c,i)=>`<button class="metro-leg" data-id="${esc(c.id)}" style="border:0;text-align:left;color:inherit"><i class="metro-dot" style="background:${palette[i%palette.length]}"></i><span>${esc(c.name)}</span></button>`).join('');

  // modal
  const backdrop=$('#charBackdrop'), modal=$('#charModal'), close=$('#modalClose');
  let current=null;
  function openCharacter(id){
    const c=cast.find(x=>x.id===id); if(!c)return; current=c;
    $('#modalDomain').textContent=c.domain; $('#modalName').textContent=c.name; $('#modalRole').textContent=c.role; $('#modalQuote').textContent=c.quote; $('#modalBio').textContent=c.bio;
    const media=mediaFor(c);
    $('#modalImgWrap').innerHTML=portrait(c,'modal-hero-img');
    $('#modalInfoStrip').innerHTML=[
      ['Edad',c.age+' años'],['Región',c.region],['Matriz Humana','26 campos']
    ].map(([a,b])=>`<div class="modal-info-cell"><span class="modal-info-label">${esc(a)}</span><span class="modal-info-value">${esc(b)}</span></div>`).join('');
    renderMedia(c, media);
    const tabs=$('#hmTabs');tabs.innerHTML=c.hm.map((h,i)=>`<button class="hm-tab ${i===0?'active':''}" role="tab" aria-selected="${i===0?'true':'false'}" data-i="${i}"><b>${String(h.n).padStart(2,'0')}</b><span>${esc(h.label)}</span></button>`).join('');
    tabs.querySelectorAll('.hm-tab').forEach(b=>b.addEventListener('click',()=>showHM(c,Number(b.dataset.i))));
    showHM(c,0);
    modal.classList.add('open');backdrop.classList.add('open');document.body.style.overflow='hidden';close.focus();
  }
  function renderMedia(c, media){
    const one=$('#modalOnePager'), gallery=$('#modalGallery'), videos=$('#modalVideos'), comics=$('#modalComics');
    if(one){
      one.innerHTML=media.onePager?`<a class="onepager-link" href="${esc(media.onePager)}" target="_blank" rel="noopener"><div class="media-fallback">EXPEDIENTE VISUAL · ACTIVO PENDIENTE</div><img src="${esc(media.onePager)}" alt="Expediente visual de ${esc(c.name)}" loading="lazy" onerror="this.style.display='none'"><span>Abrir expediente visual ↗</span></a>`:`<div class="modal-coming">EXPEDIENTE EN PREPARACIÓN</div>`;
    }
    if(gallery){
      gallery.innerHTML=media.gallery.length?media.gallery.map((src,i)=>`<a class="media-tile" href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(c.name)} · galería ${i+1}" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></a>`).join(''):`<div class="modal-coming media-empty">GALERÍA EN PREPARACIÓN</div>`;
    }
    if(videos){
      videos.innerHTML=media.videos.length?media.videos.map(src=>`<video class="media-video" controls preload="metadata"><source src="${esc(src)}"></video>`).join(''):`<div class="modal-coming media-empty">VIDEO EN PREPARACIÓN</div>`;
    }
    if(comics){
      comics.innerHTML=media.comics.length?media.comics.map((src,i)=>`<a class="media-comic" href="${esc(src)}" target="_blank" rel="noopener">Cómic ${i+1} ↗</a>`).join(''):`<div class="modal-coming">PRÓXIMAMENTE</div>`;
    }
  }

  function showHM(c,i){
    const h=c.hm[i]; if(!h)return;
    $('#hmNum').textContent=String(h.n).padStart(2,'0');$('#hmTitle').textContent=h.label;$('#hmBody').textContent=h.text;
    document.querySelectorAll('.hm-tab').forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-selected',j===i?'true':'false')});
  }
  function closeModal(){modal.classList.remove('open');backdrop.classList.remove('open');document.body.style.overflow=''}
  close?.addEventListener('click',closeModal);backdrop?.addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  document.addEventListener('click',e=>{const card=e.target.closest?.('.char-card,.metro-leg');if(card?.dataset.id)openCharacter(card.dataset.id)});
})();