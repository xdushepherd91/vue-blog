#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
echo $1
# 生成静态文件
yarn install
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git config user.email "xdushepherd91@gmail.com"
git config user.name "xdushepherd91"

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
 git push -f https://xdushepherd91:$1@github.com/vue-blog.git master:gh-pages

# git push -f git@github.com:xdushepherd91/vue-blog.git master:gh-pages

cd -