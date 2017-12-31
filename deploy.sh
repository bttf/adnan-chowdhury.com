#/bin/bash

yarn build
cd dist
g init
g add -A
g commit -m 'Deploy $(date +%s)'
g remote add origin https://github.com/bttf/bttf.github.io
g push origin master --force
