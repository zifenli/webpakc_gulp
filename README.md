###
将打包过程单独拿出来,主要有三个命令
####
在webpack_gulp的fe_build项目下:
####
1、首先安装项目依赖<br>
npm install
####
2、本地运行项目,首先打包前端代码<br>
npm run build [-- 项目名称(如:weidong,注意:'--'和项目名称之间必须要由空格隔开)]
####
3、发布之前的打包(发布之前会将代码重新编译一次,作用是:第一,保证代码是最新的,第二,为下一步publish生成dist代码)<br>
npm run deploy [-- 项目名称(如:weidong,注意:'--'和项目名称之间必须要由空格隔开)]
####
4、发布(主要是全量打包所有静态文件,替换url,生成version.json,并且上传CND等)<br>
npm run publish