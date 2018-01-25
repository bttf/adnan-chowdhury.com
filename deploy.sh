#/bin/bash

yarn build -p
cd dist
git init
git add -A
git commit -m "Deploy $(date +%s)"
git remote add origin https://github.com/bttf/bttf.github.io
git push origin master --force
