<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link></f7-nav-left>
      <f7-nav-right>
        <f7-link raised @click="toggleEditMode">
          <f7-icon ios="ion:ios-open" md="ion:md-open"></f7-icon>
        </f7-link>
        <f7-link raised actions-open=".note-share-menu">
          <f7-icon ios="ion:ios-share" md="ion:md-share"></f7-icon>
        </f7-link>
        <f7-link raised popover-open=".note-more-menu">
          <f7-icon ios="ion:ios-more" md="ion:md-more"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <mavon-editor
      v-model="currentNote.content"
      :subfield="true"
      :defaultOpen="editMode?'edit':'preview'"
      :toolbarsFlag="false"
      :shortCut="false"
      :autofocus="false"
      placeholder=" "
      @keydown="toggleEditMode"
    />

    <f7-actions class="note-share-menu">
      <f7-actions-group>
        <f7-actions-label>Do something</f7-actions-label>
        <f7-actions-button bold>Button 1</f7-actions-button>
        <f7-actions-button>Button 2</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
    <f7-popover class="note-more-menu" :backdrop="false">
      <f7-list>
        <f7-list-item link="#" title="设置提醒" no-chevron>
          <f7-icon slot="media" ios="ion:ios-alarm" md="ion:md-alarm"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="设为私密" no-chevron>
          <f7-icon slot="media" ios="ion:ios-lock" md="ion:md-lock"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="发送到桌面" no-chevron>
          <f7-icon slot="media" ios="ion:ios-apps" md="ion:md-apps"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="移动到" no-chevron>
          <f7-icon slot="media" ios="ion:ios-exit" md="ion:md-exit"></f7-icon>
        </f7-list-item>
        <f7-list-item link="#" title="删除" no-chevron>
          <f7-icon slot="media" ios="ion:ios-trash" md="ion:md-trash"></f7-icon>
        </f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-page>
</template>

<script>

export default {
  props: {
    noteId: String
  },
  data () {
    return {
      currentNote: {},
      editMode: false
    }
  },
  mounted () {
    this.currentNote = { ...this.allNotes[this.noteId] } // copy
  },
  computed: {
    allNotes: function () {
      return this.$store.state.notes
    }

  },
  methods: {
    toggleEditMode: function () {
      console.log('toggleEditMode')
      // if (!this.editMode) {
      this.editMode = !this.editMode
      // }
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    'currentNote.content': function (newQuestion, oldQuestion) {
      console.log('currentNote', newQuestion)
    }
  }
}
</script>

<style lang="less">
// can not be scoped because v-html
.v-note-wrapper {
  background: transparent !important;
  .v-note-op {
    background: transparent !important;
    &.shadow {
      box-shadow: 0 0 0 !important;
    }
  }
  .v-note-panel {
    .v-note-show {
      .v-show-content {
        background: transparent !important;
      }
      .v-show-content-html {
        background: transparent !important;
      }
    }

    &.shadow {
      box-shadow: 0 0 0 !important;
    }
    .v-note-navigation-wrapper {
      &.shadow {
        box-shadow: 0 0 0 !important;
      }
      .v-note-navigation-title {
        &.shadow {
          box-shadow: 0 0 0 !important;
        }
      }
    }
  }
}

// .v-note-wrapper .v-note-op.shadow .v-note-wrapper .v-note-panel.shadow
//   .v-note-wrapper .v-note-panel .v-note-navigation-wrapper.shadow
//   v-show-content-html scroll-style;
</style>
