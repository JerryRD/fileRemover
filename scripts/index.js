
require('./date');
let fs = require('fs');
let path = require('path');
let {
    BASE_LENGTH,
    targetPath,
    prefixPath,
    originPath,
    logDirPath,
    logResPath
} = require('./const');

let {
    fileToArr,
    isInTargetArray,
    deleteFolder,
    writeDelete,
    writeLog,
    deleteLog,
    copyFolder
} = require('./utils');

let getOriginNotDeleteItem = require('./getOriginNotDelete');
let getNotDeleteItem = require('./getNotDelete');
let time = '';

let deleteTask = new Promise((resolve, reject) => {

    try {

        // 1. 读取存放前缀的文件
        pathArr = fileToArr(prefixPath);

        writeLog('开始删除');
        writeDelete('开始删除');
        time = new Date().Format('yyyy-MM-dd_HH-mm-ss');

        // 2. 递归删除目录和文件
        deleteFiles(targetPath);

        writeLog('删除结束');
        writeDelete('删除结束');

        resolve();

    } catch (e) {
        reject(e);
    }
});

deleteTask
.then(() => {
    getNotDeleteItem();
}).then(() => {
    getOriginNotDeleteItem();
}).then(() => {
    copyFolder(logDirPath, `${logResPath}\\${time}`);
}).then(() => {
    deleteLog(logDirPath);
}).catch(e => {
    console.log('\n', '   删除错误：', e, '\n');
});

function deleteFiles (filePath) {

    if (!fs.existsSync(filePath)) {
        console.log(`未找到 ${filePath}，请检查目标路径！`);
        return;
    }

    let dirNum = 0, fileNum = 0;
    files = fs.readdirSync(filePath);
    
    // 记录一份原始目录
    fs.writeFileSync(originPath, files.join('\n'));
    console.log('\n', `  ${filePath} 下共有 ${files.length} 个文件夹 `, '\n');

    files.forEach((filename) => {
        let prefix = filename.slice(0, BASE_LENGTH);
        if (isInTargetArray(pathArr, prefix)) {
            writeDelete(filename);

            //获取当前文件的绝对路径
            let filedir = path.join(filePath, filename);
            if (fs.statSync(filedir).isDirectory()) {
                let res = deleteFolder(filedir);
                dirNum += (res.dirNum || 0);
                fileNum += (res.fileNum || 0);
            }
        }
    });

    console.log('\n', `  删除完成，共删除 ${dirNum} 个目录，${fileNum} 个文件 `, '\n');
}