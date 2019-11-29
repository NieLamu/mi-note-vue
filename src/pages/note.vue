<template>
  <f7-page class="note-page">
    <f7-navbar>
      <f7-nav-left back-link></f7-nav-left>

      <f7-nav-right v-show="!noteEditMode">
        <f7-link actions-open=".note-share-menu">
          <f7-icon f7="share"></f7-icon>
        </f7-link>
        <f7-link>
          <f7-icon f7="color_filter"></f7-icon>
        </f7-link>
        <f7-link popover-open=".note-more-menu">
          <f7-icon f7="more_vertical_fill"></f7-icon>
        </f7-link>
      </f7-nav-right>

      <editor-menu-bar :editor="editor" v-show="noteEditMode">
        <div class="right" slot-scope="{ commands }">
          <f7-link @click="commands.undo">
            <f7-icon f7="undo"></f7-icon>
          </f7-link>
          <f7-link @click="commands.redo">
            <f7-icon f7="redo"></f7-icon>
          </f7-link>
          <f7-link @click="saveNote" class="allow-blur">
            <f7-icon f7="check_round"></f7-icon>
          </f7-link>
        </div>
      </editor-menu-bar>

      <f7-subnavbar>{{ lastEditTime }} | {{ wordsNum }}字</f7-subnavbar>
    </f7-navbar>

    <editor-content :editor="editor" class="editor-content" />

    <f7-toolbar position="bottom" v-show="1" class="media-choose-toobar">
      <editor-menu-bar :editor="editor" class="media-choose-content">
        <div>
          <f7-link @click="getPicture">
            <f7-icon f7="camera"></f7-icon>
          </f7-link>
          <f7-link @click="toggleTextStyleMode">
            <f7-icon f7="mic"></f7-icon>
          </f7-link>
          <f7-link>
            <f7-icon f7="mic"></f7-icon>
          </f7-link>
        </div>
      </editor-menu-bar>
    </f7-toolbar>

    <f7-toolbar position="bottom" v-show="0" class="text-style-toobar">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="text-style-content">
        <div>
          <div class="text-style-info">
            <p>点击选择样式</p>
            <f7-icon f7="chevron_down" size="16px"></f7-icon>
          </div>
          <div :class="{ 'text-style-active': isActive.bold() }">
            <f7-link @click="commands.bold">
              <i class="icon-bold"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.italic() }">
            <f7-link @click="commands.italic">
              <i class="icon-italic"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.strike() }">
            <f7-link @click="commands.strike">
              <i class="icon-strike"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.underline() }">
            <f7-link @click="commands.underline">
              <i class="icon-underline"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.heading({ level: 2 }) }">
            <f7-link @click="commands.heading({ level: 2 })">
              <i>H2</i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.heading({ level: 3 }) }">
            <f7-link @click="commands.heading({ level: 3 })">
              <i>H3</i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.code()  }">
            <f7-link @click="commands.code ">
              <i class="icon-code"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.code_block()  }">
            <f7-link @click="commands.code_block ">
              <i class="icon-file-code"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.blockquote()  }">
            <f7-link @click="commands.blockquote ">
              <i class="icon-quote-left"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.todo_list()  }">
            <f7-link @click="commands.todo_list ">
              <i class="icon-check-empty"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.bullet_list()  }">
            <f7-link @click="commands.bullet_list ">
              <i class="icon-list-bullet"></i>
            </f7-link>
          </div>

          <div :class="{ 'text-style-active': isActive.ordered_list()  }">
            <f7-link @click="commands.ordered_list ">
              <i class="icon-list-numbered"></i>
            </f7-link>
          </div>
        </div>
      </editor-menu-bar>
      <!-- <f7-button @click="toggleTextStyleMode" class="text-style-choose">
        <f7-icon f7="chevron-down" class="main-text-color"></f7-icon>
      </f7-button>-->
    </f7-toolbar>

    <f7-actions class="note-share-menu">
      <f7-actions-group>
        <f7-actions-button>以图片形式分享</f7-actions-button>
        <f7-actions-button>以文字形式分享</f7-actions-button>
      </f7-actions-group>
    </f7-actions>

    <f7-popover class="note-more-menu" :backdrop="false">
      <f7-list>
        <f7-list-item link="#" title="设置提醒" no-chevron>
          <f7-icon slot="media" f7="alarm"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="设为私密" no-chevron>
          <f7-icon slot="media" f7="lock"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="发送到桌面" no-chevron>
          <f7-icon slot="media" f7="desktop"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="移动到" no-chevron>
          <f7-icon slot="media" f7="exit"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="删除" no-chevron>
          <f7-icon slot="media" f7="trash"></f7-icon>
        </f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-page>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  Strike,
  Underline,
  Heading,
  Code,
  CodeBlock,
  Blockquote,
  TodoList,
  TodoItem,
  OrderedList,
  BulletList,
  ListItem,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    noteId: String,
    type: String
  },
  data () {
    return {
      editor: null,
      currentNote: {},
      noteEditMode: false,
      textStyleMode: false
    }
  },
  mounted () {
    let autoFocus = false
    if (this.type === 'text') {
      autoFocus = true
      this.$store.commit('createNewNote', { id: this.noteId, timestamp: this.noteId }) // new text
    } else if (this.type === 'audio') {
    } else {
    }
    this.currentNote = { ...this.allNotes[this.noteId] } // copy

    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Heading({ levels: [1, 2, 3] }),
        new Code(),
        new CodeBlock(),
        new Blockquote(),
        new TodoList(),
        new TodoItem(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new History()
      ],
      content: this.currentNote.content,
      autoFocus: autoFocus,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onUpdate: this.onUpdate
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  computed: {
    allNotes: function () {
      return this.$store.state.notes
    },

    lastEditTime: function (params) {
      const thisYear = this.$moment([this.$moment().year(), 0, 1, 0, 0, 0]).valueOf()
      const isThisYear = this.currentNote.lastEditTime > thisYear
      return this.$moment(this.currentNote.lastEditTime).format(`${isThisYear ? '' : 'YYYY年'}M月D日`)
    },
    wordsNum: function () {
      let length = 0
      if (this.currentNote.content) {
        length = document.querySelector('.editor-content').innerText.replace(/\n/g, '').length
      }
      return length
    }
  },
  methods: {
    onFocus: function (e) {
      console.log('onFocus', e)
      this.noteEditMode = true
    },
    onBlur: function (e) {
      console.log('onBlur', e)
      // if ((e.event.relatedTarget && e.event.relatedTarget.className.includes('allow-blur')) || e.event.target.className.includes('ProseMirror-focused')) {
      //   // allow click on save button lead to blur
      //   this.noteEditMode = false
      //   return
      // }
      // this.editor.focus()
      this.noteEditMode = false
    },
    onUpdate: function (e) {
      console.log('onUpdate', e)
      this.currentNote.content = e.getJSON()
      this.currentNote.lastEditTime = this.$moment().valueOf()
      this.saveNote()
    },
    saveNote: function () {
      console.log('saveNote', this.$moment().valueOf())
      this.$store.commit('updateNote', this.currentNote)
    },
    toggleTextStyleMode: function () {
      this.textStyleMode = !this.textStyleMode
      if (window.Keyboard && typeof window.Keyboard.hide === 'function') {
        if (this.textStyleMode) {
          console.log('textStyleMode', window.Keyboard.isVisible)
          window.Keyboard.hide()
        } else {
          console.log('!textStyleMode', window.Keyboard.isVisible)

          window.Keyboard.show()
        }
      }
    },
    getPicture: function (params) {
      // navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      //   destinationType: window.Camera.DestinationType.FILE_URI })

      // function onSuccess (imageURI) {
      //   var image = document.getElementById('myImage')
      //   image.src = imageURI
      // }

      // function onFail (message) {
      //   alert('Failed because: ' + message)
      // }
    }
  }
}
</script>

<style lang="less">
.page.note-page {
  .media-choose-toobar {
    height: 130px !important;
    .media-choose-content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 0 25px;
      & > div {
        width: 15%;
        // max-height: 44px;
        margin-right: 2%;
        margin-bottom: 5px;
        border-radius: 10px;
        a {
          color: var(--app-main-color);
        }
        &:nth-child(6n + 1) {
          margin-right: 0;
        }
      }
    }
  }

  .text-style-toobar {
    height: 130px !important;
    .toolbar-inner {
      padding: 0rem;
    }
    .text-style-content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 0 25px;
      .text-style-info {
        width: 100%;
        text-align: center;
        position: relative;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        p {
          margin: 0;
        }
        i {
          font-size: 24px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      & > div:not(.text-style-info) {
        width: 15%;
        max-height: 44px;
        margin-right: 2%;
        margin-bottom: 5px;
        border-radius: 10px;
        background-color: var(--app-main-bg-color);
        a {
          color: var(--app-main-color);
        }
        &:nth-child(6n + 1) {
          margin-right: 0;
        }
        // choosed
        &.text-style-active {
          background-color: var(--app-main-color);
          a {
            color: #ffffff;
          }
        }
      }
    }
  }

  .page-content {
    .editor-content * {
      caret-color: var(--app-main-color);
    }
    .editor-content {
      padding: 0 25px;
      // editor border
      .ProseMirror-focused:focus {
        outline: none;
      }
    }
  }
}

// .editor-content {
//   font-size: 1rem;
//   margin: 0 1.5rem;
//   word-wrap: break-word;
// }

// h2 {
//   border-bottom: none !important;
// }

// h1,
// h2,
// h3 {
//   margin: 0 0 !important;
// }

// p {
//   margin: 0rem 0 !important;
// }

// // code
// .editor-content pre {
//   padding: 0rem 1rem;
//   border-radius: 0.3125rem;
//   background: rgba(66, 185, 131, 0.5);
//   color: #fff;
//   // font-size: 0.8rem;
//   overflow-x: auto;
// }

// .editor-content pre code {
//   display: block;
// }

// .editor-content p code {
//   display: inline-block;
//   padding: 0.125rem 0.25rem;
//   color: #c0341d;
//   background-color: #fbe5e1;
//   border-radius: 0.1875rem;
//   font-size: 90%;
//   font-weight: 400;
// }

// // todo-loist
// ul[data-type="todo_list"] {
//   padding-left: 0;
// }
// li[data-type="todo_item"] {
//   display: flex;
//   flex-direction: row;
// }
// .todo-checkbox {
//   border: 0.125rem solid #42b983;
//   height: 0.9em;
//   width: 0.9em;
//   box-sizing: border-box;
//   margin-right: 0.625rem;
//   margin-top: 0.3rem;
//   user-select: none;
//   -webkit-user-select: none;
//   cursor: pointer;
//   border-radius: 0.2em;
//   background-color: transparent;
//   transition: 0.4s background;
// }
// .todo-content {
//   flex: 1;
// }
// li[data-done="true"] {
//   text-decoration: line-through;
// }
// li[data-done="true"] .todo-checkbox {
//   background-color: #42b983;
// }
// li[data-done="false"] {
//   text-decoration: none;
// }
</style>
