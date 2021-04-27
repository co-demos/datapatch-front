<style>
.cell-container {
  min-height: 40px;
  position: relative;
  /* border: 1px solid red; */
  /* display:inline-block; */
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  padding-left: 20px;
}
.cell-resizable {
  border: none;
}
.handle-class {
  position: absolute;
  border: 1px solid black;
  /* border-radius: 50%; */
  background-color: black;
  height: 32px;
  width: 4px;
  box-model: border-box;
  -webkit-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}
.handle-class-mr {
  top: 50%;
  margin-top: -16px;
  right: -2px;
  cursor: col-resize;
}
.handle-resizing {

}

</style>

<template>

  <div
    ref="headerElement"
    class="cell-container pa-0 justify-end"
    :style="`width: ${width === 'auto' ? 'auto' : parentWidth + 'px;' }; `"
    @mouseover="activeResize = true"
    @mouseleave="activeResize = false"   
    >

    <div
      v-if="header.helpHeader"
      :class="`px-3 data-row th-color ${header.value === 'move' ? 'th-end': ''} th-help`"
      >
      <span class="text-center">
        <v-icon small color="grey">
          {{ header.icon }}
        </v-icon>
      </span>
    </div>

    <v-btn
      v-if="!header.helpHeader && width === 'auto'"
      text
      block
      plain
      small
      class="text-none black--text my-0 mr-3"
      @click="dialog += 1"
      >
      <v-icon x-small class="grey--text">
        {{ fieldIcon(header.type) }}
      </v-icon>
      <span class="mx-5 text-body-1 font-weight-bold">
        {{ header.text }}
      </span>
      <v-icon small class="grey--text">
        icon-more-vertical
      </v-icon>
    </v-btn>

    <vue-draggable-resizable
      v-if="!header.helpHeader && width !== 'auto'"
      ref="headerElement"
      :w="width"
      :h="'auto'"
      class="cell-resizable"
      class-name-handle="handle-class"
      class-name-resizing="handle-resizing"
      z-index="10"
      :parent="false"
      :handles="['mr']"
      :resizable="true"
      :draggable="false"
      :active="activeResize"
      :preventDeactivation="true"
      @resizing="onResize"
      :minWidth="defaultWidth"
      >
      <v-btn
        text
        plain
        small
        class="text-none black--text my-0 mr-3"
        @click="dialog += 1"
        >
        <!-- {{ parseInt(width) || width }} -->
        <v-icon x-small class="grey--text">
          {{ fieldIcon(header.type) }}
        </v-icon>
        <span class="mx-5 text-body-1 font-weight-bold">
          {{ header.text }}
          <!-- - {{ width }} -->
        </span>
        <v-icon small class="grey--text">
          icon-more-vertical
        </v-icon>
      </v-btn>
    </vue-draggable-resizable>

    <ModalItem
      :parentDialog="dialog"
      :item="header"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="'update'"
      :apiUrl="api.field"
      :noAvatar="true"
      :onlyLocalUpdate="true"
    />

  </div>
</template>

<script>

  import { mapState } from 'vuex'
  import { Field, FindFieldIcon } from '@/utils/utilsFields'
  import { configHeaders } from '@/utils/utilsAxios'

  export default {
    name: 'DataPatchHeader',
    props: [
      'header',
      'itemModel'
      // 'hidden'
    ],
    // model: {
    //   prop: 'hidden',
    //   event: 'blur'
    // },
    data () {
      return {
        dialog: 0,
        itemType: 'fields',
        width: 'auto',
        minWidth: 200,
        margin: 10,
        activeResize: false,
        defaultWidth: undefined,
      }
    },
    mounted () {
      if (!this.header.helpHeader) {
        this.getHeaderWidth()
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
    },
    methods: {
      // handleInput (value) {
      //   this.$emit('blur', value)
      // },

      updateItemDebounced(width) {
        clearTimeout(this._timerId)
        this._timerId = setTimeout(() => {
          // this.log && console.log(`\nC-DataTableHeader > this.header :`, this.header)
          let headerUpdated = { ...this.header }
          headerUpdated.width = width
          this.$emit('resizeHeader', headerUpdated)
        }, 100)
      },

      fieldIcon (type) {
        return FindFieldIcon(type)
      },
      getHeaderWidth() {
        // this.log && console.log(`\nC-DataTableHeader > this.header.value :`, this.header.value)
        this.defaultWidth = this.$refs.headerElement.clientWidth
        // this.log && console.log(`C-DataTableHeader > this.defaultWidth :`, this.defaultWidth)
        this.width = parseInt(this.defaultWidth) + this.margin 
        this.parentWidth = this.width + this.margin
        this.updateItemDebounced(this.parentWidth)
      },
      onResize (x, y, width, height) {
        this.width = parseInt(width) 
        this.parentWidth = parseInt(width)
        this.updateItemDebounced(width)
      },
    }
  }

</script>
