d=open('index.html',encoding='utf-8').read()
i=d.find('id="th-wts-js"'); a=d.find('>',i)+1; j=d.find('</script>',a)
open('qa/_wts2.js','w',encoding='utf-8').write('var window={},document={},console={};\n'+d[a:j])
print('wrote', j-a, 'chars, found:', i>0 and j>a)
