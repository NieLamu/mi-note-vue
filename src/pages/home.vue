<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>
        <f7-link raised popover-open=".folder-menu">
          {{ title }}&nbsp;
          <f7-icon ios="ion:ios-arrow-dropdown" md="ion:md-arrow-dropdown"></f7-icon>
        </f7-link>
      </f7-nav-title>
      <f7-nav-right>
        <f7-link raised popover-open=".more-menu">
          <f7-icon ios="ion:ios-more" md="ion:md-more"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div v-if="showingFolder === 'trash'" class="trashInfo main-color">废纸篓内的便签逾期30天后会被自动删除哦！</div>
    <f7-card v-for="thisCard in showingNotes" :key="showingFolder+thisCard.tag" outline>
      <f7-card-header>
        <small class="main-color">{{ cardTag(thisCard.tag) }}</small>
        <small v-if="thisCard.tag === 'top'">
          <i class="icofont-safety-pin"></i>
        </small>
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
          >
            <small class="noteDateFooter">{{ noteDateFooter(thisNote.lastEditTime) }}</small>
            &nbsp;
            <i
              class="icofont-sound-wave main-color"
              v-if="noteTitle(thisNote) === audioNoteShowTitle"
            ></i>
          </f7-list-item>
        </f7-list>
      </f7-card-content>
    </f7-card>

    <f7-popover class="folder-menu" backdropEl=".folder-menu-backdrop">
      <f7-list>
        <f7-list-item
          link="#"
          popover-close
          :title="folderShowingName(folder)"
          :after="nums.toString()"
          v-for="(nums, folder) in folderNums"
          :key="folder"
          @click="changeFolder(folder)"
          :class="folderShowingStyle(folder)"
        ></f7-list-item>
      </f7-list>
    </f7-popover>
    <div class="popover-backdrop backdrop-in folder-menu-backdrop" v-if="backdropShow"></div>
    <f7-popover class="more-menu" :backdrop="false">
      <f7-list>
        <f7-list-item link="#" popover-close title="设置" no-chevron></f7-list-item>
        <f7-list-item link="#" popover-close title="九宫格" no-chevron></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-page>
</template>

<script>

export default {
  data () {
    return {
      backdropShow: false,
      folderNums: {}, // folder下便签数量
      allCardTags: {}, // 所有card的tag
      showingFolder: 'all', // 当前folder
      thisYear: null, // 今年初
      audioNoteShowTitle: '语音便签'
    }
  },
  mounted () {
    this.thisYear = this.$moment([this.$moment().year(), 0, 1, 0, 0, 0]).valueOf()
    this.showBackdrop()
    this.getAllNotesInfo()
    // window.$f7.navbar.size('f7-navbar')
  },
  computed: {
    title: function () {
      const thisTitle = this.folderShowingName(this.showingFolder)
      return thisTitle === '全部便签' ? '便签' : thisTitle
    },
    showingNotes: function () {
      let topShowingNotes = []
      let otherShowingNotes = []
      for (let tag in this.allCardTags) {
        let notes = this.allCardTags[tag].filter((note, index) => {
          let result
          switch (this.showingFolder) {
            case 'all':
              result = !note.deleteTime
              break
            case 'trash':
              result = note.deleteTime
              break
            default:
              result = !note.deleteTime && note.folder === this.showingFolder
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
  methods: {
    getAllNotes: function () {
      return this.$store.state.notes
    },
    cardTag: function (tag) {
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
      const audioNum = thisNote.content.split('note-audio').length / 2
      console.log(thisNote.content, audioNum)
      if (audioNum >= 1 && audioNum % 1 === 0.5) { // is audio
        return this.audioNoteShowTitle
      } else {
        const expectLen = 15
        const firstP = thisNote.content.split('<br')[0]
        return firstP.length >= expectLen ? thisNote.content.slice(0, expectLen) : firstP
      }
    },
    noteSubtitle: function (thisNote) {
      return thisNote.content.slice(0, 10)
    },
    noteDateFooter: function (value) {
      return this.$moment(value).calendar()
    },
    changeFolder: function (folder) {
      // change title
      this.showingFolder = folder
    },
    getAllNotesInfo: function () {
      // init
      let trash = 0
      this.folderNums = {
        'all': 0
      }
      this.allCardTags = {
        'top': []
      }
      this.getAllNotes().forEach((note, index) => {
        // get all folders name, including 'all', 'trash'
        // all nums
        this.folderNums.all += 1
        // trash nums
        if (note.deleteTime) {
          trash += 1
        } else { // no delete then fold
          // folder nums
          const theFolder = note.folder
          if (!this.folderNums[theFolder]) {
            this.folderNums[theFolder] = 0
          }
          this.folderNums[theFolder] += 1
        }

        // allCardTags
        let cardTag
        if (note.top) {
          cardTag = 'top'
        } else { // no top then has date tag
          if (note.lastEditTime >= this.thisYear) { // thisYear
            cardTag = this.thisYear
          } else {
            const thisDate = this.$moment(note.lastEditTime)
            cardTag = this.$moment([thisDate.year(), thisDate.month(), 1, 0, 0, 0]).valueOf()
          }
        }
        if (!this.allCardTags[cardTag]) {
          this.allCardTags[cardTag] = []
        }
        this.allCardTags[cardTag].push(note)
      })
      // sorting
      for (let tag in this.allCardTags) {
        this.allCardTags[tag] = this.sortingByDate(this.allCardTags[tag], 'lastEditTime')
      }

      this.folderNums['trash'] = trash
    },
    folderShowingName: function (folder) {
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
    folderShowingStyle: function (folder) {
      return this.showingFolder === folder ? 'main-color' : ''
    },
    sortingByDate: function (arr, attr) {
      return arr.sort((a, b) => {
        return b[attr] - b[attr]
      })
    },
    // popover backdrop
    showBackdrop: function () {
      document.addEventListener('popover:open', (e) => {
        if (e.target.className.includes('folder-menu')) {
          // add non-transparent backdrop
          this.backdropShow = true
          // disable content scroll
          document.querySelector('.page-content').setAttribute('style', 'overflow: hidden')
        }
      })
      document.addEventListener('popover:close', (e) => {
        if (e.target.className.includes('folder-menu')) {
          this.backdropShow = false
          document.querySelector('.page-content').setAttribute('style', 'overflow: auto')
        }
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
  box-shadow: 0 0 0;
}

.noteDateFooter {
  opacity: 0.6;
}

.trashInfo {
  text-align: center;
  background-color: antiquewhite;
  padding: 0.3125rem 0;
}
</style>
