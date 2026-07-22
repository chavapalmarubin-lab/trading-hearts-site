# -*- coding: utf-8 -*-
import re
p='index.html'
d=open(p,encoding='utf-8').read()
stn=open('qa/_stn.txt',encoding='utf-8').read()
fn=open('qa/_func.txt',encoding='utf-8').read()
d,ns=re.subn(r'var STN=\[.*?\n  \];', stn, d, count=1, flags=re.S)
d,nf=re.subn(r"function metroSVG\(\)\{.*?return s\+'</svg>';\n  \}", fn, d, count=1, flags=re.S)

old_leg="var legend=LINES.map(function(l){return '<span><i style=\"background:'+l.c+'\"></i>'+l.n+' · '+l.a+'</span>';}).join('');"
new_leg="var legend=LINES.map(function(l){return '<span style=\"cursor:pointer\" onclick=\"thMeet(\\''+l.k+'\\')\"><i style=\"background:'+l.c+'\"></i>'+l.n+' · '+l.a+'</span>';}).join('');"
nl=d.count(old_leg); d=d.replace(old_leg,new_leg)

anchor="}catch(err){ if(window.console)console.warn('TH arranger',err); }"
inject="var _pw=document.querySelector('#twGrid'); if(_pw){var _s=_pw.closest?_pw.closest('section'):null; if(_s)_s.style.display='none';} "
npw=d.count(anchor); d=d.replace(anchor, inject+anchor, 1)

open(p,'w',encoding='utf-8').write(d)
print('stn',ns,'func',nf,'legend',nl,'pickaworld',npw)
