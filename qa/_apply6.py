# -*- coding: utf-8 -*-
p='index.html'
d=open(p,encoding='utf-8').read()
res={}

# 1) brighten world map image
o="\\.thw-map img{width:100%;display:block;filter:grayscale(.55) brightness(.4) sepia(.25) hue-rotate(175deg) contrast(1.05);opacity:.8}"
o=".thw-map img{width:100%;display:block;filter:grayscale(.55) brightness(.4) sepia(.25) hue-rotate(175deg) contrast(1.05);opacity:.8}"
n=".thw-map img{width:100%;display:block;filter:grayscale(.28) brightness(.82) sepia(.12) hue-rotate(175deg) contrast(1.06) saturate(1.1);opacity:.96}"
res['map']=d.count(o); d=d.replace(o,n)

# 2) brighten world-map hover thumbnails
o=".thw-thumb{width:50px;height:50px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,168,76,.55);flex:0 0 50px;background:#0a1526;display:block}"
n=".thw-thumb{width:50px;height:50px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,168,76,.55);flex:0 0 50px;background:#0a1526;display:block;filter:brightness(1.15) contrast(1.04)}"
res['thumb']=d.count(o); d=d.replace(o,n)

# 3) brighten hub portrait
o="#thHubOv .hubPer .hubPerPic{width:88px;height:88px;border-radius:50%;object-fit:cover;object-position:center top;border:2px solid rgba(201,168,76,.5);background:#0a1526;display:none}"
n="#thHubOv .hubPer .hubPerPic{width:88px;height:88px;border-radius:50%;object-fit:cover;object-position:center top;border:2px solid rgba(201,168,76,.5);background:#0a1526;display:none;filter:brightness(1.12) contrast(1.03)}"
res['hubpic']=d.count(o); d=d.replace(o,n)

# 4) move hub character to the RIGHT of the header
a=".getElementById('hubBody').innerHTML='<div class=\"hubYr\">"
b=".getElementById('hubBody').innerHTML='<div class=\"hubHead'+(st.L.length===1?' hub1':'')+'\"><div class=\"hubHeadL\"><div class=\"hubYr\">"
res['hdrA']=d.count(a); d=d.replace(a,b,1)

a="'</p><div class=\"hubWho\">'+chips+'</div><div class=\"hubQ\">"
b="'</p></div><div class=\"hubHeadR\">'+chips+'</div></div><div class=\"hubQ\">"
res['hdrB']=d.count(a); d=d.replace(a,b,1)

open(p,'w',encoding='utf-8').write(d)
print(res)
