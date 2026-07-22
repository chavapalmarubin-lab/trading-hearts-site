# -*- coding: utf-8 -*-
p='index.html'
d=open(p,encoding='utf-8').read()

old_css='#thHubOv .hubChip{display:inline-flex;align-items:center;gap:7px;cursor:pointer;border:1px solid rgba(201,168,76,.3);border-radius:20px;padding:6px 13px 6px 9px;font-family:var(--font-display);font-size:.9rem;color:var(--cream);transition:.2s}'
new_css='#thHubOv .hubChip{display:inline-flex;align-items:center;gap:9px;cursor:pointer;border:1px solid rgba(201,168,76,.3);border-radius:30px;padding:5px 16px 5px 5px;font-family:var(--font-display);font-size:.95rem;color:var(--cream);transition:.2s}\n#thHubOv .hubChip .hubPic{width:40px;height:40px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,168,76,.55);flex:0 0 40px;background:#0a1526}'
nc=d.count(old_css); d=d.replace(old_css,new_css)

old_ch="var chips=st.L.map(function(k){return '<span class=\"hubChip\" data-char=\"'+k+'\"><i style=\"background:'+(col[k]||'#fff')+'\"></i>'+nm(k)+'</span>';}).join('');"
new_ch="var chips=st.L.map(function(k){var por='';try{por=(window.CHARS&&window.CHARS[k]&&window.CHARS[k].portrait)||'';}catch(e){}var pic=por?'<img class=\"hubPic\" src=\"'+por+'\" alt=\"\" onerror=\"this.style.display=\\'none\\'\"/>':'<i style=\"width:14px;height:14px;border-radius:50%;display:inline-block;background:'+(col[k]||'#fff')+'\"></i>';return '<span class=\"hubChip\" data-char=\"'+k+'\">'+pic+nm(k)+'</span>';}).join('');"
nch=d.count(old_ch); d=d.replace(old_ch,new_ch)

open(p,'w',encoding='utf-8').write(d)
print('css',nc,'chips',nch)
