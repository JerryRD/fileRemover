
let fs = require('fs');
let os = require('os');
let path = require('path');
let {logActionPath, deletePath} = require('./const');

function fileToArr (filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    let data = fs.readFileSync(filePath, 'utf-8') || '',
        pathArr = data.toString().split('\n');
    return pathArr.filter(item => item.trim().replace(/\s/g, ''));
}

function isInTargetArray (targetArray, target) {
    let res = false;
    if (!(targetArray instanceof Array)) {
        return false;
    }
    targetArray.forEach(item => {
        [item, target] = [item, target].map(i => i.trim().replace(/\s/g, ''));
        if (item === target) {
            res = true;
        }
    });
    return res;
}

// 递归删除文件夹
function deleteFolder (targetPath, config = {}) {
    let files = [], dirNum = 0, fileNum = 0;
    let defaultValue = {
        dirNum,
        fileNum
    };

    if (!fs.existsSync(targetPath)) {
        console.log(`未找到 ${targetPath} ，请检查目标路径！`);
        return defaultValue;
    }

    files = fs.readdirSync(targetPath);
    if (Array.isArray(files) && !files.length) {
        return defaultValue;
    }
 
    files.forEach((file) => {
        let curPath = path.join(targetPath, file);
        if (fs.statSync(curPath).isDirectory()) {
            let res = deleteFolder(curPath);
            dirNum += (res.dirNum || 0);
            fileNum += (res.fileNum || 0);
        } else {
            fs.unlinkSync(curPath);
            ++ fileNum;
            writeLog('删除文件：' + curPath);
        }
    });

    fs.rmdirSync(targetPath);
    ++ dirNum;
    writeLog('删除目录：' + targetPath);
    return {
        dirNum,
        fileNum
    };
}

function writeLog (content) {
    let time = new Date().Format('yyyy-MM-dd HH:mm:ss');
    fs.appendFileSync(logActionPath, `[${time}] ${content}\n`);
}

function writeDelete (content) {
    fs.appendFileSync(deletePath, `${content}\n`);
}

function deleteLog (logPath) {
    if (!fs.existsSync(logPath)) {
        console.log(`  未找到 ${logPath}，请检查日志文件路径！`);
        return;
    }
    try {
        files = fs.readdirSync(logPath);
        if (Array.isArray(files) && !files.length) {
            console.log('\n', '  日志目录为空，无需删除', '\n');
            return;
        }
     
        files.forEach((file) => {
            let curPath = path.join(logPath, file);
            if (fs.statSync(curPath).isDirectory()) {
                deleteLog(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    } catch (error) {
        console.log('\n', '  日志删除失败', error, '\n');   
    }
}

function copyFile (srcPath, tarPath) {
    if (!fs.existsSync(srcPath)) {
        throw `源文件 ${srcPath} 不存在`;
    }

    try {
        let rs = fs.createReadStream(srcPath),
            ws = fs.createWriteStream(tarPath);
        rs.pipe(ws);
    } catch (e) {
        console.log('\n', `复制文件失败：`, e, '\n');
        throw e;
    }
}

function copyFolder (srcDir, tarDir) {
    if (!fs.existsSync(srcDir)) {
        throw `源目录 ${srcDir} 不存在`;
    }

    try {
        if (!fs.existsSync(tarDir)) {
            fs.mkdirSync(tarDir, (err) => {
                if (err) {
                    console.log(`创建目录失败：${err}`);
                    return;
                }
            });
        }
    
        let files = fs.readdirSync(srcDir);
        files.forEach((file) => {
            let srcPath = path.join(srcDir, file),
                tarPath = path.join(tarDir, file);
    
            if (fs.statSync(srcPath).isDirectory()) {
                fs.mkdirSync(tarPath, (err) => {
                    if (err) {
                        console.log(`创建目录失败：${err}`);
                        return;
                    }
                    copyFolder(srcPath, tarPath);
                });
            } else {
                copyFile(srcPath, tarPath);
            }
        });
    } catch (error) {
        console.log('   日志复制失败', error);
    }
}

module.exports = {
    fileToArr,
    deleteFolder,
    isInTargetArray,
    writeDelete,
    writeLog,
    deleteLog,
    copyFile,
    copyFolder
};