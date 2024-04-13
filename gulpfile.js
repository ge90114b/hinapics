const gulp = require('gulp');  
const copy = require('gulp-copy');   
const util = require('gulp-util');  
const fs = require('fs');  
const path = require('path');  
  
// 定义源文件和目标文件夹  
const srcDir = 'pics/';  
const destDir = 'dist/';  
const htmlDest = path.join(destDir, 'index.html');  

// 创建一个函数来确保dist文件夹存在  
function ensureDistFolder() {  
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {  
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });  
  }  
}  

// 复制图片到目标文件夹  
gulp.task('copy-images', function() {  
  ensureDistFolder()
  return gulp.src(srcDir + '**/*')  
    .pipe(copy(destDir, { prefix: 1 })); // prefix: 1 保持目录结构  
});  
  
// 生成HTML文件  
gulp.task('generate-html', function(done) {  
  // 读取图片文件名并存储到数组中  
  const imageFiles = fs.readdirSync(srcDir)  
    .filter(file => path.extname(file).match(/\.(png|jpe?g|gif|svg)$/i));  
  
  // 将文件名数组转换为JSON字符串  
  const jsonFilenames = JSON.stringify(imageFiles);  
    
    // 将字符字符串嵌入到HTML模板中  
    const htmlContent = `<!DOCTYPE html>  
          <html lang="en">  
          <head>  
          <meta charset="UTF-8">  
          <title>Hina</title>   
          </head>  
          <body>  
            <pre>${jsonFilenames}</pre>  
          </body>  
          </html>`;  
    
    // 将HTML内容写入文件  
    fs.writeFileSync(htmlDest, htmlContent);  
    
    // 通知Gulp任务完成  
    done();  
});
  
// 默认任务  
gulp.task('default', gulp.series('copy-images', 'generate-html'));