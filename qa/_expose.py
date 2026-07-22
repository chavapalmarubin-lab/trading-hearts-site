d=open('index.html',encoding='utf-8').read()
if 'window.CHARS=CHARS' in d:
    print('already exposed')
else:
    ci=d.find('const CHARS = {')
    oi=d.find('function openChar', ci)
    si=d.find('</script>', oi)
    assert ci>0 and oi>ci and si>oi, (ci,oi,si)
    d=d[:si]+'\ntry{window.CHARS=CHARS;}catch(e){}\n'+d[si:]
    open('index.html','w',encoding='utf-8').write(d)
    print('exposed window.CHARS at', si)
