#!/bin/bash
cd "/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
B="file:///Users/salvadorpalma/Library/Mobile%20Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading%20Hearts%20(1)/th_public_site/index_experience.html"
mkdir -p qa
shot(){ "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=$2 --screenshot="qa/$1.png" "$3" >/dev/null 2>&1; echo "shot $1 done"; }
shot s_gate 1440x1500 "$B"
shot s_explore 1440x1900 "$B?enter=1&view=explore"
shot s_experience 1440x1900 "$B?enter=1&view=experience"
shot s_learn 1440x1400 "$B?enter=1&view=learn"
shot s_today 1440x1200 "$B?enter=1&view=today"
shot s_join 1440x1200 "$B?enter=1&view=join"
/usr/bin/python3 - <<'PY'
from PIL import Image
import os
D="qa"; names=["s_gate","s_explore","s_experience","s_learn","s_today","s_join"]
ims=[]
for n in names:
    p=os.path.join(D,n+".png")
    if os.path.exists(p):
        im=Image.open(p).convert("RGB")
        im=im.crop((0,0,im.width,min(im.height,1400))).resize((520,505))
        ims.append((n,im))
cols=3; rows=(len(ims)+cols-1)//cols
M=Image.new("RGB",(cols*520,rows*505),(15,13,9))
for i,(n,im) in enumerate(ims): M.paste(im,((i%cols)*520,(i//cols)*505))
M.save(os.path.join(D,"_site_qa.png")); print("montage",len(ims))
PY
echo "QA DONE"
