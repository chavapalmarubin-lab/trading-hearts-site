d=open('index.html',encoding='utf-8').read()
probe='<script>(function(){var t=setInterval(function(){if(window.thOpenHub&&window.CHARS){clearInterval(t);window.thOpenHub(7);}},120);})();</script>'
d=d.replace('</body>', probe+'</body>',1)
open('_qa_hub.html','w',encoding='utf-8').write(d)
print('ok')
