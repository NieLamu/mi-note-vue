import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: {}
  },
  mutations: {
    setAllNotes (state, notes) {
      state.notes = {
        '10000': {
          id: 10000,
          top: false, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357627000, // 创建时间
          lastEditTime: 1556367627000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: `<p>
      <strong>
        <em>
          <s>
            <u>this is a very 中文</u>
          </s>
        </em>
        <code>
          <em>
            <s>
              <u>basic example</u>
            </s>
          </em>
        </code>
        <em>
          <s>
            <u>of tiptap.</u>
          </s>
        </em>
      </strong>
    </p>
    <h1>heading1</h1>
    <h2>heading2</h2>
    <h3>heading3</h3>
    <ul>
      <li>
        <p>unordered</p>
      </li>
      <li>
        <p>list</p>
      </li>
    </ul>
    <ol>
      <li>
        <p>ordered</p>
      </li>
      <li>
        <p>list</p>
      </li>
    </ol>
    <blockquote>
      <p>
        Block quote 👏
        <br>– mom
      </p>
    </blockquote>
    <pre>
        <code>
          .toolbar-bottom .toolbar-inner {
            font-size: 30px;
            padding: 0 0 0 16px;
          }
        </code>
      </pre>
    <p>
      <br>
    </p>
    <p>There is always something to do.中文好的 Thankfully, there are checklists for that. Don't forget to call mom.</p>
    <ul data-type="todo_list">
      <li
        data-type="todo_item"
        data-done="true"
      >Buy beer 和很是公司的概念就是大概第三个第四个三大关键的时刻饿很多费劲啊覅基本上记号记号记号记号</li>
      <li data-type="todo_item" data-done="true">Buy meat</li>
      <li data-type="todo_item" data-done="true">Buy milk</li>
      <li data-type="todo_item" data-done="false">Call mom</li>
    </ul>` // 内容
        },
        '10001': {
          id: 10001,
          top: false, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357628000, // 创建时间
          lastEditTime: 1556347628000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '未置顶未删除未分类已私密<br />的便签' // 内容
        },
        '10010': {
          id: 10010,
          top: false, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357629000, // 创建时间
          lastEditTime: 1556337629000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '未置顶未删除已分类未私密<br />的便签' // 内容
        },
        '10020': {
          id: 10020,
          top: false, // 置顶  可以有多个置顶的
          folder: '日常', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357630000, // 创建时间
          lastEditTime: 1556317630000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '未置顶未删除已分类未私密<br />的便签' // 内容
        },
        '10100': {
          id: 10100,
          top: false, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357631000, // 创建时间
          lastEditTime: 1556377631000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1556357631000, // 是否删除及删除时间
          content: '未置顶已删除未分类未私密<br />的便签' // 内容
        },
        '11000': {
          id: 11000,
          top: true, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357632000, // 创建时间
          lastEditTime: 1556513992000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content:
            '已置顶未删除未分类未私密这句很长哦哈哈哈哈哈哈计划的手机号回到办公室\n<img src="https://wow.techbrood.com/uploads/fiddles/35583/%E6%97%A0%E6%A0%87%E9%A2%98.png">\n图片肯定是占一行的还有audio\n<node-audio :src="xxx.mp3">60</node-audio>\n这句比较短\n这句还行\n' // 内容
        },
        '11100': {
          id: 11100,
          top: true, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357633000, // 创建时间
          lastEditTime: 1556357633000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 15563576330000, // 是否删除及删除时间
          content: '已置顶已删除未分类未私密<br />的便签' // 内容
        },
        '11010': {
          id: 11010,
          top: true, // 置顶  可以有多个置顶的
          folder: '日常', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357634000, // 创建时间
          lastEditTime: 1556255992000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '已置顶未删除已分类未私密<br />的便签' // 内容
        },
        '11020': {
          id: 11020,
          top: true, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357635000, // 创建时间
          lastEditTime: 1553663992000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '已置顶未删除已分类未私密<br />的便签' // 内容
        },
        '11001': {
          id: 11001,
          top: true, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357636000, // 创建时间
          lastEditTime: 1556593333000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '已置顶未删除未分类已私密<br />的便签' // 内容
        },
        '10110': {
          id: 10110,
          top: false, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357637000, // 创建时间
          lastEditTime: 1524719992000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1524719992000, // 是否删除及删除时间
          content:
            '未置顶已删除已分类未私密红红火火恍恍惚惚很好很好韩寒韩红会画画<br />的便签' // 内容
        },
        '10120': {
          id: 10120,
          top: false, // 置顶  可以有多个置顶的
          folder: '日常', // 文件夹 唯一
          private: false, // 私密
          skin: false, // 皮肤
          createTime: 1556357638000, // 创建时间
          lastEditTime: 1556357638000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1556357648000, // 是否删除及删除时间
          content:
            '未置顶已删除已分类未私密的便签来瞧一瞧看一看了这是一个超过一行的文本这是个短文本<audio :src="xxx.mp3" :duration="60"><audio>' // 内容
        },
        '10101': {
          id: 10101,
          top: false, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357639000, // 创建时间
          lastEditTime: 1556347639000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1556357639000, // 是否删除及删除时间
          content: '未置顶已删除未分类已私密<br />的便签' // 内容
        },
        '10011': {
          id: 10011,
          top: false, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357640000, // 创建时间
          lastEditTime: 1532582392000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '未置顶未删除已分类已私密<br />的便签' // 内容
        },
        '10021': {
          id: 10021,
          top: false, // 置顶  可以有多个置顶的
          folder: '日常', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357641000, // 创建时间
          lastEditTime: 1556337641000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '未置顶未删除已分类已私密<br />的便签' // 内容
        },
        '10111': {
          id: 10111,
          top: false, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357642000, // 创建时间
          lastEditTime: 1556353642000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1556357642000, // 是否删除及删除时间
          content: '未置顶已删除已分类已私密<br />的便签' // 内容
        },
        '10121': {
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
        '11011': {
          id: 11011,
          top: true, // 置顶  可以有多个置顶的
          folder: '小说', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357644000, // 创建时间
          lastEditTime: 1556679733000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '已置顶未删除已分类已私密<br />的便签' // 内容
        },
        '11021': {
          id: 11021,
          top: true, // 置顶  可以有多个置顶的
          folder: '日常', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357645000, // 创建时间
          lastEditTime: 1557198133000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: false, // 是否删除及删除时间
          content: '已置顶未删除已分类已私密<br />的便签' // 内容
        },
        '11110': {
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
        '11120': {
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
        '11101': {
          id: 11101,
          top: true, // 置顶  可以有多个置顶的
          folder: 'Unclassified', // 文件夹 唯一
          private: true, // 私密
          skin: false, // 皮肤
          createTime: 1556357648000, // 创建时间
          lastEditTime: 1556357648000, // 编辑时间
          reminderTime: false, // 提醒时间
          deleteTime: 1556357648000, // 是否删除及删除时间
          content: '已置顶已删除未分类已私密<br />的便签' // 内容
        },
        '11111': {
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
        '11121': {
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
      }
    },
    createNewNote (state, payload) {
      const timestamp = parseInt(payload.timestamp)
      const note = {
        id: payload.id,
        top: false, // 置顶  可以有多个置顶的
        folder: 'Unclassified', // 文件夹 唯一
        private: false, // 私密
        skin: false, // 皮肤
        createTime: timestamp, // 创建时间
        lastEditTime: timestamp, // 编辑时间
        reminderTime: false, // 提醒时间
        deleteTime: false, // 是否删除及删除时间
        content: '' // 内容
      }
      state.notes[payload.id] = note
    },
    updateNote (state, note) {
      state.notes[note.id] = note
    }
  },
  getters: {
    navbarStyle: state => {}
  },
  actions: {
    toggleNavbar ({ commit, state }) {}
  }
})
