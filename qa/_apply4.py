# -*- coding: utf-8 -*-
import re
p='index.html'
d=open(p,encoding='utf-8').read()

new_css=(
"#thHubOv .hubChip{display:inline-flex;align-items:center;gap:9px;cursor:pointer;border:1px solid rgba(201,168,76,.3);border-radius:30px;padding:6px 15px 6px 12px;font-family:var(--font-display);font-size:.95rem;color:var(--cream);transition:.2s}\n"
"#thHubOv .hubChip:hover{border-color:var(--gold);background:rgba(201,168,76,.08)}\n"
"#thHubOv .hubChip.haspic{padding:5px 16px 5px 5px}\n"
"#thHubOv .hubChip .hubDot{width:14px;height:14px;border-radius:50%;display:inline-block}\n"
"#thHubOv .hubChip .hubPic{width:40px;height:40px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,168,76,.55);flex:0 0 40px;background:#0a1526;display:none}\n"
"#thHubOv .hubChip.haspic .hubDot{display:none}\n"
"#thHubOv .hubChip.haspic .hubPic{display:block}"
)
d,ncss=re.subn(r"#thHubOv \.hubChip\{[^}]*\}\n#thHubOv \.hubChip \.hubPic\{[^}]*\}", new_css, d, count=1)

new_chips="var chips=st.L.map(function(k){return '<span class=\"hubChip\" data-char=\"'+k+'\"><span class=\"hubDot\" style=\"background:'+(col[k]||'#fff')+'\"></span><img class=\"hubPic\" alt=\"\"/>'+nm(k)+'</span>';}).join('');"
d,nch=re.subn(r"var chips=st\.L\.map\(function\(k\)\{.*?\}\)\.join\(''\);", new_chips, d, count=1, flags=re.S)

wiring="[].forEach.call(o.querySelectorAll('.hubChip'),function(n){n.onclick=function(){thMeet(n.getAttribute('data-char'));};});"
fill="(function fp(n){var pend=false;[].forEach.call(o.querySelectorAll('.hubChip'),function(c){var im=c.querySelector('.hubPic');if(im&&!im.getAttribute('src')){var k=c.getAttribute('data-char');var por=(window.CHARS&&window.CHARS[k]&&window.CHARS[k].portrait);if(por){im.onload=function(){c.classList.add('haspic');};im.src=por;}else pend=true;}});if(pend&&n<25)setTimeout(function(){fp(n+1);},200);})(0);"
nw=d.count(wiring); d=d.replace(wiring, wiring+fill, 1)

open(p,'w',encoding='utf-8').write(d)
print('css',ncss,'chips',nch,'wiring',nw)
