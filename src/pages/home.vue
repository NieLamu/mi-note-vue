<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>
        <f7-link popover-open=".folder-menu-popover" class="navbar-title-dropdown">
          {{ navbarTitle }}
          <div class="dropdown-arrow" :class="{ 'dropdown-arrow-down': folderMenuPopoverShowing }"></div>
        </f7-link>
      </f7-nav-title>
      <f7-nav-right>
        <f7-link popover-open=".more-menu-popover" class="more-menu a-color-self">
          <f7-icon f7="more_vertical_fill"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div
      v-if="currentFolder === 'trash'"
      class="trash-banner-info main-bg-color"
    >废纸篓内的便签逾期30天后会被自动删除哦！</div>

    <f7-searchbar
      placeholder="搜索便签"
      :disable-button="false"
      :clear-button="true"
      search-container=".search-list"
      :no-hairline="true"
      @focus="onSearchBarFocus"
      @blur="onSearchBarBlur"
    ></f7-searchbar>

    <div class="search-list searchbar-found" v-if="showingMode === 'table'">
      <f7-card
        v-for="thisCard in currentShowingNotes"
        :key="currentFolder+thisCard.tag"
        outline
        class="list-group"
      >
        <f7-card-header>
          <small class="main-text-color">{{ cardTag(thisCard.tag) }}</small>
          <f7-link v-if="thisCard.tag === 'top'">
            <f7-icon f7="arrow_up" size="20px" class="main-text-color"></f7-icon>
          </f7-link>
        </f7-card-header>
        <f7-card-content :padding="false">
          <f7-list media-list>
            <f7-list-item
              no-chevron
              link="#"
              :title="noteTitle(thisNote)"
              :subtitle="noteSubtitle(thisNote)"
              v-for="thisNote in thisCard.notes"
              :key="thisNote.id"
              @click="$f7router.navigate(`/note/${thisNote.id}/edit/`)"
            >
              <small class="note-date-footer">{{ noteDateFooter(thisNote.lastEditTime) }}</small>
              &nbsp;
              <f7-icon
                ion="ios-mic-outline"
                class="main-text-color"
                v-if="noteTitle(thisNote) === audioNoteTitle"
              ></f7-icon>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </div>
    <div class="searchbar-not-found not-found-info">
      (ง •̀_•́)ง┻━┻
      <br />啥也么找到
    </div>

    <f7-fab position="right-bottom" slot="fixed" size="28px" class="main-fab-rgt-btm-btn2">
      <f7-icon f7="mic"></f7-icon>
    </f7-fab>
    <f7-fab position="right-bottom" slot="fixed" size="28px" @click="createNewNote">
      <f7-icon f7="add"></f7-icon>
    </f7-fab>

    <f7-popover
      class="folder-menu-popover"
      backdropEl=".folder-menu-backdrop"
      @popover:open="folderMenuPopoverOpen"
      @popover:close="folderMenuPopoverClose"
    >
      <f7-list>
        <f7-list-item
          link="#"
          popover-close
          :title="folderName(folder)"
          :after="nums.toString()"
          v-for="(nums, folder) in notesNumsInEachFolder"
          :key="folder"
          @click="changeFolder(folder)"
          :class="folderStyleShow(folder)"
        ></f7-list-item>
        <f7-list-item no-chevron class="add-new-folder">
          <f7-icon f7="add" class="main-text-color"></f7-icon>&nbsp;
          <span>新建文件夹</span>
        </f7-list-item>
      </f7-list>
    </f7-popover>
    <div class="popover-backdrop folder-menu-backdrop"></div>

    <f7-popover class="more-menu-popover" :backdrop="false">
      <f7-list>
        <f7-list-item link="#" popover-close title="设置" no-chevron></f7-list-item>
        <f7-list-item
          link="#"
          popover-close
          :title="showingMode === 'table'? '宫格模式': '列表模式'"
          no-chevron
        ></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-page>
</template>

<script>
export default {
  data () {
    return {
      folderMenuPopoverShowing: false, // folder menu popover
      currentFolder: 'all', // 当前folder
      showingMode: 'table', // 排列模式 table grid
      notesNumsInEachFolder: {}, // 各folder下便签数量
      allNotesWithCardTags: {}, // 所有月份card和置顶card的tag, including all the notes
      thisYearStartTime: 0, // 今年初的时间戳
      audioNoteTitle: '语音便签' // 语音便签的title
    }
  },
  mounted () {
    console.log('—————— mounted')
    this.thisYearStartTime = this.$moment([this.$moment().year(), 0, 1, 0, 0, 0]).valueOf()
    this.genAllNotesInfo(this.$store.state.notes) // run first time
  },
  computed: {
    navbarTitle: function () {
      console.log('—————— navbarTitle')
      const thisTitle = this.folderName(this.currentFolder)
      return thisTitle === '全部便签' ? '便签' : thisTitle
    },
    currentShowingNotes: function () {
      console.log('—————— currentShowingNotes')
      let topShowingNotes = [] // 置顶
      let otherShowingNotes = []
      for (let tag in this.allNotesWithCardTags) {
        let notes = this.allNotesWithCardTags[tag].filter((note, index) => {
          let result
          switch (this.currentFolder) {
            case 'all':
              result = !note.deleteTime
              break
            case 'trash':
              result = note.deleteTime
              break
            default:
              result = !note.deleteTime && note.folder === this.currentFolder
              break
          }
          return result
        })
        if (notes.length > 0) {
          if (tag === 'top') {
            topShowingNotes.push({
              tag: tag,
              notes: notes
            })
          } else {
            otherShowingNotes.push({
              tag: tag,
              notes: notes
            })
          }
        }
      }
      otherShowingNotes = this.sortingByDate(otherShowingNotes, 'tag')
      return topShowingNotes.concat(otherShowingNotes)
    }
  },
  watch: {
    // if notes changed, will genAllNotesInfo
    '$store.state.notes': function (newNotes, oldNotes) {
      console.log('—————— watch $store.state.notes')
      this.genAllNotesInfo(newNotes)
    }
  },
  methods: {
    folderMenuPopoverOpen: function () {
      console.log('—————— folderMenuPopoverOpen')
      this.folderMenuPopoverShowing = true
      this.disableContentScroll()
    },
    folderMenuPopoverClose: function () {
      console.log('—————— folderMenuPopoverClose')
      this.folderMenuPopoverShowing = false
      this.enableContentScroll()
    },
    disableContentScroll: function () {
      document.querySelector('.page-content').setAttribute('style', 'overflow: hidden')
    },
    enableContentScroll: function () {
      document.querySelector('.page-content').setAttribute('style', 'overflow: auto')
    },
    onSearchBarFocus: function () {
      console.log('—————— onSearchBarFocus')
      this.$store.dispatch('toggleNavbar')
    },
    onSearchBarBlur: function () {
      console.log('—————— onSearchBarBlur')
      this.$store.dispatch('toggleNavbar')
    },
    folderName: function (folder) {
      console.log('—————— folderName')
      let showName = folder
      switch (folder) {
        case 'all':
          showName = '全部便签'
          break
        case 'Unclassified':
          showName = '未分类'
          break
        case 'trash':
          showName = '废纸篓'
          break
        default:
          break
      }
      return showName
    },
    genAllNotesInfo: function (newNotes) {
      console.log('—————— genAllNotesInfo')
      // init
      let trash = 0
      let notesNumsInEachFolder = {
        'all': 0
      }
      let allNotesWithCardTags = {
        'top': []
      }
      for (let id in newNotes) {
        const note = newNotes[id]
        // get all folders name and nums, including 'all', 'trash'
        // all nums
        notesNumsInEachFolder.all += 1
        // trash nums
        if (note.deleteTime) {
          trash += 1
        } else { // no delete then fold
          // folder nums
          const folder = note.folder
          notesNumsInEachFolder[folder] = (notesNumsInEachFolder[folder] || 0) + 1
        }

        // allNotesWithCardTags
        let cardTag
        if (note.top) {
          cardTag = 'top'
        } else { // no top then has date tag
          if (note.lastEditTime >= this.thisYearStartTime) { // thisYearStartTime
            cardTag = this.thisYearStartTime
          } else {
            const lastEditTime = this.$moment(note.lastEditTime)
            cardTag = this.$moment([lastEditTime.year(), lastEditTime.month(), 1, 0, 0, 0]).valueOf()
          }
        }
        allNotesWithCardTags[cardTag] = allNotesWithCardTags[cardTag] || []
        allNotesWithCardTags[cardTag].push(note)
      }
      // sorting by date in every cardTags
      for (let tag in allNotesWithCardTags) {
        allNotesWithCardTags[tag] = this.sortingByDate(allNotesWithCardTags[tag], 'lastEditTime')
      }
      // add trash nums finally
      notesNumsInEachFolder['trash'] = trash

      this.notesNumsInEachFolder = notesNumsInEachFolder
      this.allNotesWithCardTags = allNotesWithCardTags
    },
    cardTag: function (tag) {
      // console.log('—————— cardTag')
      let showTag
      switch (tag) {
        case 'top':
          showTag = '置顶'
          break
        case this.thisYearStartTime.toString():
          showTag = this.$moment(parseInt(tag)).format('MMM')
          break
        default:
          showTag = this.$moment(parseInt(tag)).format('YYYY年MM月')
          break
      }
      return showTag
    },
    // get note title
    noteTitle: function (thisNote) {
      // console.log('—————— noteTitle')
      const audioNum = thisNote.content.split('note-audio').length / 2
      // console.log(thisNote.content, audioNum)
      if (audioNum >= 1 && audioNum % 1 === 0.5) { // is audio
        return this.audioNoteTitle
      } else {
        const expectLen = 15
        const firstP = thisNote.content.split('<br')[0]
        return firstP.length >= expectLen ? thisNote.content.slice(0, expectLen) : firstP
      }
    },
    noteSubtitle: function (thisNote) {
      // console.log('—————— noteSubtitle')
      return thisNote.content.slice(0, 10)
    },
    noteDateFooter: function (value) {
      // console.log('—————— noteDateFooter')
      return this.$moment(value).calendar()
    },
    changeFolder: function (folder) {
      console.log('—————— changeFolder')
      // change title
      this.currentFolder = folder
    },
    folderStyleShow: function (folder) {
      // console.log('—————— folderStyleShow')
      return this.currentFolder === folder ? 'main-text-color' : ''
    },
    // is show backdrop
    // listenFolderMenu: () => {
    //   document.addEventListener('popover:open', (e) => {
    //     if (e.target.className.includes('folder-menu-popover')) {
    //       // add non-transparent backdrop
    //       // disable content scroll
    //       this.disableContentScroll()
    //     }
    //   })
    //   document.addEventListener('popover:close', (e) => {
    //     if (e.target.className.includes('folder-menu-popover')) {
    //       this.enableContentScroll()
    //     }
    //   })
    // },

    sortingByDate: function (arr, attr) {
      return arr.sort((a, b) => {
        return b[attr] - b[attr]
      })
    },
    createNewNote: function () {
      const id = this.$moment().valueOf()
      this.$f7router.navigate(`/note/${id}/text/`)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-title-dropdown {
  .dropdown-arrow {
    position: relative;
    left: 5px;
    margin-right: 5px;
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 6px solid var(--app-main-color);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transition: all 0.25s ease-out;
    &.dropdown-arrow-down {
      transform: rotate(180deg);
    }
  }
}
.more-menu.a-color-self {
  color: black;
}

.folder-menu-popover {
  left: 0 !important;
  top: var(--f7-navbar-height) !important;
  width: 100%;
}

.note-date-footer {
  opacity: 0.6;
}

.trash-banner-info {
  text-align: center;
  padding: 0.3125rem 0;
  margin-left: var(--f7-card-margin-horizontal);
  margin-right: var(--f7-card-margin-horizontal);
  border-radius: 8px;
}

// search not found
.not-found-info {
  text-align: center;
  font-size: 1rem;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.main-fab-rgt-btm-btn2 {
  right: calc(
    var(--f7-fab-margin) + var(--f7-safe-area-right) + var(--f7-fab-size) +
      var(--f7-fab-margin)
  ) !important;
}
</style>

<style lang="less">
.add-new-folder {
  .item-inner {
    justify-content: center !important;
    i {
      font-size: 1.625rem;
    }
    span {
      position: relative;
      top: 2px;
    }
  }
}
</style>
