let fs = require('fs');
let {
    targetPath,
    deletePath,
    originPath,
    originNotDeletePath
} = require('./const');
let {fileToArr, isInTargetArray} = require('./utils');

module.exports = function getOriginNotDeleteItem () {
    let deleteItem = fileToArr(deletePath),
        allItem = fileToArr(originPath);

    deleteItem = deleteItem.slice(1, deleteItem.length - 1);
    let notDeleteItem = allItem.filter(item =>
        !isInTargetArray(deleteItem, item)
    );
    fs.writeFileSync(originNotDeletePath, notDeleteItem.join('\n'));

    console.log(
        '\n',
        `  ${targetPath} 目录下原有 ${allItem.length} 个文件夹，已删除 ${deleteItem.length} 个，剩余 ${notDeleteItem.length} 个。`,
        '\n'
    );
}