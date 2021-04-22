let path = require('path');

// todo 目标路径
const TARGET_PATH = 'E:/customDesktop/temp/result/test';

// todo 目标路径
const BASE_LENGTH = 16;

// todo 指定前缀文件的路径， txt 格式
const PREFIX_PATH = 'E:/customDesktop/temp/result/origin/index.txt';

const LOG_RES_PATH = './log',
    LOG_DIR_PATH = './temp',
    LOG_ACTION_PATH = `${LOG_DIR_PATH}/delete_action.log`,
    DELETE_PATH = `${LOG_DIR_PATH}/02_delete_item.log`,
    NOT_DELETE_PATH = `${LOG_DIR_PATH}/03_not_delete_item.log`,
    ORIGIN_PATH = `${LOG_DIR_PATH}/00_origin.log`,
    NOT_DELETE_ORIGIN_PATH = `${LOG_DIR_PATH}/01_origin_not_delete.log`;

let paths = [
    TARGET_PATH,
    PREFIX_PATH,
    LOG_RES_PATH,
    LOG_DIR_PATH,
    LOG_ACTION_PATH,
    DELETE_PATH,
    NOT_DELETE_PATH,
    ORIGIN_PATH,
    NOT_DELETE_ORIGIN_PATH
].map(p => path.resolve(p));

let [
    targetPath,
    prefixPath,
    logResPath,
    logDirPath,
    logActionPath,
    deletePath,
    notDeletePath,
    originPath,
    originNotDeletePath
] = paths;

module.exports = {
    BASE_LENGTH,
    targetPath,
    prefixPath,
    logResPath,
    logDirPath,
    logActionPath,
    deletePath,
    notDeletePath,
    originPath,
    originNotDeletePath
};