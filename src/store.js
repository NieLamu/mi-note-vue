import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [
      {
        id: 10000,
        top: false, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357627000, // 创建时间
        lastEditTime: 1556357627000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除未分类未私密<br />的便签' // 内容
      },
      {
        id: 10001,
        top: false, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357628000, // 创建时间
        lastEditTime: 1556357628000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除未分类已私密<br />的便签' // 内容
      },
      {
        id: 10010,
        top: false, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357629000, // 创建时间
        lastEditTime: 1556357629000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 10020,
        top: false, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357630000, // 创建时间
        lastEditTime: 1556357630000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 10100,
        top: false, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357631000, // 创建时间
        lastEditTime: 1556357631000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357631000, // 是否删除及删除时间
        content: '未置顶已删除未分类未私密<br />的便签' // 内容
      },
      {
        id: 11000,
        top: true, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357632000, // 创建时间
        lastEditTime: 1556357632000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除未分类未私密<br />的便签' // 内容
      },
      {
        id: 11100,
        top: true, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357633000, // 创建时间
        lastEditTime: 15563576330000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 15563576330000, // 是否删除及删除时间
        content: '已置顶已删除未分类未私密<br />的便签' // 内容
      },
      {
        id: 11010,
        top: true, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357634000, // 创建时间
        lastEditTime: 1556357634000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 11020,
        top: true, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357635000, // 创建时间
        lastEditTime: 1556357635000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 11001,
        top: true, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357636000, // 创建时间
        lastEditTime: 1556357636000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除未分类已私密<br />的便签' // 内容
      },
      {
        id: 10110,
        top: false, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357637000, // 创建时间
        lastEditTime: 1556357637000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357637000, // 是否删除及删除时间
        content: '未置顶已删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 10120,
        top: false, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357638000, // 创建时间
        lastEditTime: 1556357638000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357638000, // 是否删除及删除时间
        content: '未置顶已删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 10101,
        top: false, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357639000, // 创建时间
        lastEditTime: 1556357639000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357639000, // 是否删除及删除时间
        content: '未置顶已删除未分类已私密<br />的便签' // 内容
      },
      {
        id: 10011,
        top: false, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357640000, // 创建时间
        lastEditTime: 1556357640000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 10021,
        top: false, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357641000, // 创建时间
        lastEditTime: 1556357641000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '未置顶未删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 10111,
        top: false, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357642000, // 创建时间
        lastEditTime: 1556357642000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357642000, // 是否删除及删除时间
        content: '未置顶已删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 10121,
        top: false, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357643000, // 创建时间
        lastEditTime: 1556357643000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357643000, // 是否删除及删除时间
        content: '未置顶已删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 11011,
        top: true, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357644000, // 创建时间
        lastEditTime: 1556357644000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 11021,
        top: true, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357645000, // 创建时间
        lastEditTime: 1556357645000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '已置顶未删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 11110,
        top: true, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357646000, // 创建时间
        lastEditTime: 1556357646000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357646000, // 是否删除及删除时间
        content: '已置顶已删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 11120,
        top: true, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: 1556357647000, // 创建时间
        lastEditTime: 1556357647000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357647000, // 是否删除及删除时间
        content: '已置顶已删除已分类未私密<br />的便签' // 内容
      },
      {
        id: 11101,
        top: true, // 置顶  可以有多个置顶的
        folder: false, // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357648000, // 创建时间
        lastEditTime: 1556357648000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357648000, // 是否删除及删除时间
        content: '已置顶已删除未分类已私密<br />的便签' // 内容
      },
      {
        id: 11111,
        top: true, // 置顶  可以有多个置顶的
        folder: '日常', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357649000, // 创建时间
        lastEditTime: 1556357649000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357649000, // 是否删除及删除时间
        content: '已置顶已删除已分类已私密<br />的便签' // 内容
      },
      {
        id: 11121,
        top: true, // 置顶  可以有多个置顶的
        folder: '小说', // 文件夹 唯一
        private: true, // 私密
        skin: false, // 皮肤
        createTime: 1556357650000, // 创建时间
        lastEditTime: 1556357650000, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: 1556357650000, // 是否删除及删除时间
        content: '已置顶已删除已分类已私密<br />的便签' // 内容
      }
    ]
  },
  mutations: {},
  actions: {}
})
