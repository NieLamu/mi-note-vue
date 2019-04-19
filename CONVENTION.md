
## Git commit日志基本规范

Refer:
[git-commit-style-guide](https://github.com/feflow/git-commit-style-guide)
[Writing Meaningful Git Commit Messages](https://medium.com/@menuka/writing-meaningful-git-commit-messages-a62756b65c81)

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**所有的 type 类型如下：**

> type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。

* **build**: 改变构建流程，或者增加依赖库、工具(gulp、npm等)
* **docs**: 仅文档（documentation），比如 README, CHANGELOG, CONTRIBUTE 等等
* **feat**： 新功能（feature）
* **fix**: 修补bug
* **refactor**: 代码重构（既不是新增功能，也不是修改bug的代码变动）
* **style**: 不影响代码含义的更改(空格、缩进、分号等)
* ci: 更改CI配置文件和脚本(Travis、Cirk、BrowserStack、SauceLabs等)
* perf: 优化相关，比如提升性能、体验
* revert: 回滚到上一个版本
* test: 测试用例，包括单元测试、集成测试等

**格式要求：**

```
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。
```

## Git分支与版本发布规范

Refer: [git-commit-style-guide](https://github.com/feflow/git-commit-style-guide)

* 基本原则：master为保护分支，不直接在master上进行代码修改和提交。
* 开发日常需求或者项目时，从master分支上checkout一个feature分支进行开发或者bugfix分支进行bug修复，功能测试完毕并且项目发布上线后，`将feature分支合并到主干master，并且打Tag发布，最后删除开发分支`。分支命名规范：
    * 分支版本命名规则：分支类型 _ 分支发布时间 _ 分支功能。比如：feat_20170401_fairy_flower
    * 分支类型包括：feat、 fix、refactor三种类型，即新功能开发、bug修复和代码重构
    * 时间使用年月日进行命名，不足2位补0
    * 分支功能命名使用snake case命名法，即下划线命名。
* 版本正式发布前需要生成changelog文档，然后再发布上线。
