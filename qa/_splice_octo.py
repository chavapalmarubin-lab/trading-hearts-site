import re
p='index.html'
d=open(p,encoding='utf-8').read()
stn=open('qa/_stn.txt',encoding='utf-8').read()
fn=open('qa/_func.txt',encoding='utf-8').read()
d,ns=re.subn(r'var STN=\[.*?\n  \];', stn, d, count=1, flags=re.S)
d,nf=re.subn(r"function metroSVG\(\)\{.*?return s\+'</svg>';\n  \}", fn, d, count=1, flags=re.S)
open(p,'w',encoding='utf-8').write(d)
print('STN repl:',ns,'| func repl:',nf,'| has px:', 'px:120' in d, '| pathFor:', 'function pathFor' in d)
