## 文件删除过滤

    功能说明：在指定的目录中，递归删除以给定的前缀为开头的目录。

## 使用方法

1. 配置文件为 scripts/const.js，在这里修改要过滤的目录，前缀长度和前缀文件的路径

    1.1 配置指定目录: 的 TARGET_PATH，使用绝对路径，如：E:/customDesktop/temp/result/origin/index.txt。

    1.2 修改文件前缀的长度 BASE_LENGTH，默认长度为 16。

    1.3 修改指定前缀文件的路径（文件建议为txt 格式，不支持 office 相关类型），可以使用绝对或相对路径。
        如： ../origin.txt 或 

2. 配置 node 的执行环境：把 run.cmd 中的 ```node``` 直接改成 node10-x64 的绝对路径，
    如: E:\customDesktop\temp\result\git\fileRemover\node10-x64\node.exe

3. 运行程序：双击 run.cmd，执行完成，会输出删除结果。

4. 运行结束后，日志在 log 目录下，每次执行都会以执行时间为名称创建日志。

5. 日志相关说明：

   5.1 00_origin.log：执行删除前，指定的目录中所包含的子目录

   5.2 01_origin_not_delete.log：执行删除后，指定的目录中所包含的子目录

   5.3 02_delete_item.log：需要删除的目录

   5.4 03_not_delete_item.log：删除失败的目录

   5.5 delete_action.log：所执行的所有的删除操作。

   5.6 清理日志：双击 clearlog.cmd