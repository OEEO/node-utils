const fs = require('fs')
const path = require('path')

const pathResolve = pathname => path.resolve(__dirname, pathname)

const copy = (src, dst, count) => {
  let paths = fs.readdirSync(src); //同步读取当前目录
  for (let i = 0, len = paths.length; i < len; i++) {
    let path = paths[i]
    let isNodeModules = count === 2 && path === 'node_modules'
    let isFirstSVN = count === 1 && path === '.svn'
    if (isNodeModules || isFirstSVN) {
      continue
    }
    let _src = src + '/' + path;
    let _dst = dst + '/' + path;
    let stats = ''
    try {
      stats = fs.statSync(_src)
    } catch (e) {
      console.log(e)
    }
    if(stats.isFile()){ //如果是个文件则拷贝
      // let readStream = fs.createReadStream(_src)
      // let writeStream = fs.createWriteStream(_dst)
      // readStream.pipe(writeStream)
      fs.writeFileSync(_dst, fs.readFileSync(_src))
    } else if(stats.isDirectory()){ //是目录则 递归
      checkDirectory(_src,_dst,copy, count+1);
    }
  }
}
const checkDirectory = function(src,dst,callback,count){
  fs.access(dst, fs.constants.F_OK, (err) => {
    if(err){
      fs.mkdirSync(dst);
      callback(src,dst,count);
    }else{
      callback(src,dst,count);
    }
  });
};


const FROM_DIR = pathResolve('./github')
const TO_DIR = pathResolve('./czwang')

checkDirectory(FROM_DIR, TO_DIR, copy, 1)



