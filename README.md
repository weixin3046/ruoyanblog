# 目录
db
models
piblic
routers
schemas
views

# 只删除githup目录不删除本地目录  
1. 先更新 git pull
2. dir 查看文件目录
3. 删除 git rm -r --cached + 文件名
4. 提交 git commit -m"提交说明"
5. git push 上传代码到githup

# 数据库操作
1. mongod --dbpath=D:\runzhong\Node\ruoyanblog\db --port=27018
2. 数据库下载地址 https://www.mongodb.com/download-center/community
3. 图形化mongodb数据库管理工具  https://robomongo.org/
4. 从 MongoDB 目录的 bin 目录中执行 mongod.exe 文件

# Sublime Text 3
[download and install](http://www.sublimetext.com/3)
[license or china language](http://blog.csdn.net/kencaber/article/details/50651207、http://devework.com/sublime-text-3.html)
[Package Control](https://packagecontrol.io/installation#st3)、[more...](#package-control)

# Git
[git](http://git-scm.com/download/)

# Node.js & NPM
[Windows Installer (.msi)](https://nodejs.org/en/download/)
`node -v`、`npm -v`

## Markdown
[markdown.cn](http://www.markdown.cn/)
[github markdown](https://guides.github.com/features/mastering-markdown/)

## Package Control
`TortoiseSVN` SVN `Alt+C`:Commit,`Alt+U`:Update,`Alt+R`:Revert
`IMESupport` 中文输入法光标跟随
`Markdown Editing`
`Markdown Preview` Alt+P，在浏览器中预览
`JsFormat` Ctrl+Alt+F，格式化
`HTML-CSS-JS Prettify` Ctrl+Shift+H，格式化
`Alignment` 代码对齐，Ctrl+Alt+A
`DocBlockr` /*或者/**然后回车
    ```
    {
        "jsdocs_extra_tags": [
            "@Author ZZH",
            "@DateTime {{date}}"
        ]
    }
    ```
`Color​Picker` Ctrl+Shift+C，颜色选择器
`AutoFileName` 输入‘/’即可看到相对于本项目文件夹的其他文件
`TrailingSpaces` Ctrl+Shift+T，一键删除多余空格（Preferences --> Key Bindings – User下增加代码：`{ "keys": ["ctrl+shift+t"], "command": "delete_trailing_spaces" }`）
`FileDiffs` 右键标签页，出现FileDiffs Menu或者Diff with Tab…选择对应文件比较即可
`AllAutocomplete` 搜索所有打开的文件来寻找匹配的提示词
