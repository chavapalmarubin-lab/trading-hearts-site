# -*- coding: utf-8 -*-
p='index.html'
d=open(p,encoding='utf-8').read()

css=(
"#thHubOv .hubHead{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}\n"
"#thHubOv .hubHeadL{flex:1 1 auto;min-width:0}\n"
"#thHubOv .hubHeadR{display:flex;flex-wrap:wrap;gap:16px 18px;justify-content:flex-end;align-items:flex-start;max-width:540px;padding-right:46px}\n"
"#thHubOv .hubPer{display:flex;flex-direction:column;align-items:center;gap:9px;cursor:pointer;text-decoration:none;width:90px}\n"
"#thHubOv .hubPer .hubPerDot{width:88px;height:88px;border-radius:50%;border:2px solid rgba(201,168,76,.5);background:#0a1526;display:block}\n"
"#thHubOv .hubPer .hubPerPic{width:88px;height:88px;border-radius:50%;object-fit:cover;object-position:center top;border:2px solid rgba(201,168,76,.5);background:#0a1526;display:none}\n"
"#thHubOv .hubPer.haspic .hubPerDot{display:none}\n"
"#thHubOv .hubPer.haspic .hubPerPic{display:block}\n"
"#thHubOv .hubPer .hubPerNm{font-family:var(--font-display);font-size:1rem;color:var(--cream);text-align:center;line-height:1.2}\n"
"#thHubOv .hubPer:hover .hubPerPic,#thHubOv .hubPer:hover .hubPerDot{border-color:var(--gold)}\n"
"#thHubOv .hubPer:hover .hubPerNm{color:var(--gold)}\n"
"#thHubOv .hub1 .hubPer{width:160px}\n"
"#thHubOv .hub1 .hubPer .hubPerPic,#thHubOv .hub1 .hubPer .hubPerDot{width:144px;height:144px}\n"
"#thHubOv .hub1 .hubPer .hubPerNm{font-size:1.3rem}\n"
"@media(max-width:760px){#thHubOv .hubHead{flex-direction:column}#thHubOv .hubHeadR{justify-content:flex-start;padding-right:0;max-width:none}}\n"
)
anchor="#thHubOv .hubQ{"
nc=d.count(anchor); d=d.replace(anchor, css+anchor, 1)

old_chips="var chips=st.L.map(function(k){return '<span class=\"hubChip\" data-char=\"'+k+'\"><span class=\"hubDot\" style=\"background:'+(col[k]||'#fff')+'\"></span><img class=\"hubPic\" alt=\"\"/>'+nm(k)+'</span>';}).join('');"
new_chips="var chips=st.L.map(function(k){return '<a class=\"hubPer\" data-char=\"'+k+'\"><span class=\"hubPerDot\" style=\"background:'+(col[k]||'#fff')+'\"></span><img class=\"hubPerPic\" alt=\"\"/><span class=\"hubPerNm\">'+nm(k)+'</span></a>';}).join('');"
nch=d.count(old_chips); d=d.replace(old_chips,new_chips)

old_hdr="'<div class=\"hubYr\">'+st.y+'</div><div class=\"hubT\">'+esc(st.n)+'</div><p class=\"hubPlat\">'+(st.L.length>1?'On the platform · '+st.L.length+' hearts lived this moment':'On the platform')+'</p><div class=\"hubWho\">'+chips+'</div>'"
new_hdr="'<div class=\"hubHead'+(st.L.length===1?' hub1':'')+'\"><div class=\"hubHeadL\"><div class=\"hubYr\">'+st.y+'</div><div class=\"hubT\">'+esc(st.n)+'</div><p class=\"hubPlat\">'+(st.L.length>1?'On the platform · '+st.L.length+' hearts lived this moment':'On the platform')+'</p></div><div class=\"hubHeadR\">'+chips+'</div></div>'"
nh=d.count(old_hdr); d=d.replace(old_hdr,new_hdr)

nq=d.count("o.querySelectorAll('.hubChip')"); d=d.replace("o.querySelectorAll('.hubChip')","o.querySelectorAll('.hubPer')")
np2=d.count("c.querySelector('.hubPic')"); d=d.replace("c.querySelector('.hubPic')","c.querySelector('.hubPerPic')")

open(p,'w',encoding='utf-8').write(d)
print('css',nc,'chips',nch,'hdr',nh,'sel',nq,'pic',np2)
