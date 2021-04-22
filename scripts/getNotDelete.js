let fs = require('fs');
let {deletePath, prefixPath, notDeletePath, BASE_LENGTH} = require('./const');
let {fileToArr, isInTargetArray} = require('./utils');

module.exports = function getNotDeleteItem () {
    let deleteItem = fileToArr(deletePath),
        allItem = fileToArr(prefixPath);

    deleteItem = deleteItem.slice(1, deleteItem.length - 1);
    let notDeleteItem = allItem.filter(item => !isInTargetArray(
        deleteItem.map(del => del.slice(0, BASE_LENGTH)),
        item
    ));
    fs.writeFileSync(notDeletePath, notDeleteItem.join('\n'));

    console.log(
        '\n',
        `  共需要删除 ${allItem.length} 个文件夹， ${deleteItem.length} 个删除成功， ${notDeleteItem.length} 个删除失败。`,
        '\n'
    );
};
