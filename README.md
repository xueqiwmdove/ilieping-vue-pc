
# 1.编译环境安装
> OS: Centos7.3

```bash
# 安装 npm
yum install -y npm
# 安装 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 升级 cnpm
cnpm install cnpm -g

```
# 2.项目编译

```bash
# 拉取代码
git clone http://192.168.2.152/ilieping-h5/ilieping-vue
cd ilieping-vue
# 安装项目依赖
cnpm install 
# 编译
cnpm run build 
```

# 3.配置文件说明
```bash
./src/api/api.js    # 前端访问后端接口地址

./src/http/http.js  # 此文件暂时不用 
```

# 4.项目部署

在项目目录 `ilieping-vue`下, 生成一个`dist`目录, 将`dist`目录下的文件部署到 web 服务器即可。

    dist/
    ├── index.html
    └── static
        ├── bitbug_favicon\ (1).ico
        ├── css
        ├── fonts
        ├── img
        ├── js
        ├── json
        └── ueditor
