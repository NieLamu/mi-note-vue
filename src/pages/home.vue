<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>
        <f7-link raised popover-open=".folder-menu">
          {{ navBarTitle }}&nbsp;
          <f7-icon ios="ion:ios-arrow-dropdown" md="ion:md-arrow-dropdown"></f7-icon>
        </f7-link>
      </f7-nav-title>
      <f7-nav-right>
        <f7-link raised popover-open=".more-menu">
          <f7-icon ios="ion:ios-more" md="ion:md-more"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div>
      <div
        v-if="currentFolder === 'trash' && !$store.state.hideNavbar['view-top']"
        class="trash-info"
      >废纸篓内的便签逾期30天后会被自动删除哦！</div>
      <f7-searchbar
        placeholder
        disable-button-text="取消"
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="!$theme.aurora"
        class="searchbar-demo"
      ></f7-searchbar>
      <div class="search-list searchbar-found">
        <f7-card
          v-for="thisCard in notesShowing"
          :key="currentFolder+thisCard.tag"
          outline
          class="list-group"
        >
          <f7-card-header>
            <small class="main-color">{{ cardTag(thisCard.tag) }}</small>
            <f7-link v-if="thisCard.tag === 'top'">
              <f7-icon ios="ion:ios-attach" md="ion:md-attach" class="main-color"></f7-icon>
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
                @click="goToNote(thisNote.id)"
              >
                <small class="note-date-footer">{{ noteDateFooter(thisNote.lastEditTime) }}</small>
                &nbsp;
                <!--  -->
                <f7-icon
                  ios="ion:ios-mic"
                  md="ion:md-mic"
                  class="main-color"
                  v-if="noteTitle(thisNote) === audioNoteTitle"
                ></f7-icon>
              </f7-list-item>
            </f7-list>
          </f7-card-content>
        </f7-card>
      </div>
      <div class="not-found-info main-color searchbar-not-found">
        (ง •̀_•́)ง┻━┻
        <br>啥也么找到
      </div>
    </div>

    <f7-fab position="right-bottom" slot="fixed" v-show="!searchBarActive">
      <i class="icon ion-ios-add if-not-md"></i>
      <i class="icon ion-md-add md-only"></i>
    </f7-fab>
    <f7-fab
      position="right-bottom"
      slot="fixed"
      v-show="!searchBarActive"
      class="main-fab-rgt-btm-btn2"
    >
      <f7-icon ios="ion:ios-mic" md="ion:md-mic"></f7-icon>
    </f7-fab>

    <f7-popover class="folder-menu" backdropEl=".folder-menu-backdrop">
      <f7-list>
        <f7-list-item
          link="#"
          popover-close
          :title="folderNameShow(folder)"
          :after="nums.toString()"
          v-for="(nums, folder) in folderNums"
          :key="folder"
          @click="changeFolder(folder)"
          :class="folderStyleShow(folder)"
        ></f7-list-item>
      </f7-list>
    </f7-popover>
    <div class="popover-backdrop folder-menu-backdrop"></div>
    <f7-popover class="more-menu" :backdrop="true">
      <f7-list>
        <f7-list-item link="#" popover-close title="设置" no-chevron></f7-list-item>
        <f7-list-item
          link="#"
          popover-close
          :title="Modeshowing === 'table'? '宫格模式': '列表模式'"
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
      backdropShowing: false, // folder menu backdrop
      folderNums: {}, // folder下便签数量
      allCardTags: {}, // 所有card的tag, including all the notes
      currentFolder: 'all', // 当前folder
      thisYear: null, // 今年初的时间戳
      audioNoteTitle: '语音便签', // 语音便签的title
      Modeshowing: 'table' // 排列模式 table grid
    }
  },
  mounted () {
    console.log('—————— mounted')

    this.thisYear = this.$moment([this.$moment().year(), 0, 1, 0, 0, 0]).valueOf()
    this.listenFolderMenu()
    this.listenSearchBar()
    this.getAllNotesInfo(this.$store.state.notes) // run first time
  },
  computed: {
    navBarTitle: function () {
      console.log('—————— navBarTitle')
      const thisTitle = this.folderNameShow(this.currentFolder)
      return thisTitle === '全部便签' ? '便签' : thisTitle
    },
    searchBarActive: function () {
      console.log('—————— searchBarActive')
      return this.$store.state.hideNavbar['view-top']
    },
    notesShowing: function () {
      console.log('—————— notesShowing')
      let topShowingNotes = []
      let otherShowingNotes = []
      for (let tag in this.allCardTags) {
        let notes = this.allCardTags[tag].filter((note, index) => {
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
    // if notes changed, will getAllNotesInfo
    '$store.state.notes': function (newNotes, oldNotes) {
      console.log('—————— watch $store.state.notes')
      this.getAllNotesInfo(newNotes)
    }
  },
  methods: {
    getAllNotesInfo: function (newNotes) {
      console.log('—————— getAllNotesInfo')
      // init
      let trash = 0
      let folderNums = {
        'all': 0
      }
      let allCardTags = {
        'top': []
      }
      for (let id in newNotes) {
        const note = newNotes[id]
        // get all folders name and nums, including 'all', 'trash'
        // all nums
        folderNums.all += 1
        // trash nums
        if (note.deleteTime) {
          trash += 1
        } else { // no delete then fold
          // folder nums
          const folder = note.folder
          folderNums[folder] = (folderNums[folder] || 0) + 1
        }

        // allCardTags
        let cardTag
        if (note.top) {
          cardTag = 'top'
        } else { // no top then has date tag
          if (note.lastEditTime >= this.thisYear) { // thisYear
            cardTag = this.thisYear
          } else {
            const lastEditTime = this.$moment(note.lastEditTime)
            cardTag = this.$moment([lastEditTime.year(), lastEditTime.month(), 1, 0, 0, 0]).valueOf()
          }
        }
        allCardTags[cardTag] = allCardTags[cardTag] || []
        allCardTags[cardTag].push(note)
      }
      // sorting by date in every cardTags
      for (let tag in allCardTags) {
        allCardTags[tag] = this.sortingByDate(allCardTags[tag], 'lastEditTime')
      }
      // add trash nums finally
      folderNums['trash'] = trash

      this.folderNums = folderNums
      this.allCardTags = allCardTags
    },
    cardTag: function (tag) {
      console.log('—————— cardTag')
      let showTag
      switch (tag) {
        case 'top':
          showTag = '置顶'
          break
        case this.thisYear.toString():
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
      console.log('—————— noteTitle')
      const audioNum = thisNote.content.split('note-audio').length / 2
      console.log(thisNote.content, audioNum)
      if (audioNum >= 1 && audioNum % 1 === 0.5) { // is audio
        return this.audioNoteTitle
      } else {
        const expectLen = 15
        const firstP = thisNote.content.split('<br')[0]
        return firstP.length >= expectLen ? thisNote.content.slice(0, expectLen) : firstP
      }
    },
    noteSubtitle: function (thisNote) {
      console.log('—————— noteSubtitle')
      return thisNote.content.slice(0, 10)
    },
    noteDateFooter: function (value) {
      console.log('—————— noteDateFooter')
      return this.$moment(value).calendar()
    },
    changeFolder: function (folder) {
      console.log('—————— changeFolder')
      // change title
      this.currentFolder = folder
    },
    goToNote: function (id) {
      console.log('—————— goToNote', id)
    },
    folderNameShow: function (folder) {
      console.log('—————— folderNameShow')
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
    folderStyleShow: function (folder) {
      console.log('—————— folderStyleShow')
      return this.currentFolder === folder ? 'main-color' : ''
    },
    // is show backdrop
    listenFolderMenu: function () {
      document.addEventListener('popover:open', (e) => {
        if (e.target.className.includes('folder-menu')) {
          // add non-transparent backdrop
          this.backdropShowing = true
          // disable content scroll
          this.disableContentScroll()
        }
      })
      document.addEventListener('popover:close', (e) => {
        if (e.target.className.includes('folder-menu')) {
          this.backdropShowing = false
          this.enableContentScroll()
        }
      })
    },
    // is hide navbar
    listenSearchBar: function () {
      document.addEventListener('searchbar:enable', (e) => {
        console.log('searchbar:enable', e)
        this.$store.dispatch('toggleHideNavbar')
        this.disableContentScroll()
      })
      document.addEventListener('searchbar:search', (e) => {
        console.log('searchbar:search', e)
        if (e.detail === '') {
          this.disableContentScroll()
        } else {
          this.enableContentScroll()
        }
      })
      document.addEventListener('searchbar:clear', (e) => {
        console.log('searchbar:clear', e)
        this.disableContentScroll()
      })
      document.addEventListener('searchbar:disable', (e) => {
        console.log('searchbar:disable', e)
        this.$store.dispatch('toggleHideNavbar')
        this.enableContentScroll()
      })
    },
    disableContentScroll: function () {
      document.querySelector('.page-content').setAttribute('style', 'overflow: hidden')
    },
    enableContentScroll: function () {
      document.querySelector('.page-content').setAttribute('style', 'overflow: auto')
    },
    sortingByDate: function (arr, attr) {
      return arr.sort((a, b) => {
        return b[attr] - b[attr]
      })
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: black !important;
}

.folder-menu-backdrop {
  top: var(--f7-navbar-height);
}

.folder-menu {
  left: 0 !important;
  width: 100%;
  border-radius: 0;
}

.note-date-footer {
  opacity: 0.6;
}

// trash info
.trash-info {
  text-align: center;
  background-color: var(--main-bg-color);
  padding: 0.3125rem 0;
  color: var(--main-color);
}

// search not found
.not-found-info {
  text-align: center;
  padding: 20% 0;
  font-size: 1rem;
}

// fab button
.fab {
  --f7-fab-bg-color: var(--main-color);
  i {
    font-size: 2rem;
  }
}
// second fab button
.main-fab-rgt-btm-btn2 {
  right: calc(
    var(--f7-fab-margin) + var(--f7-safe-area-right) + var(--f7-fab-size) + 1rem
  ) !important;
}
</style>
