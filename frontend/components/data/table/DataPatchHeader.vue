<style>
.cell-container {
  /* min-height: 40px; */
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
    :class="`cell-container pa-0 justify-${ header.helpHeader ? 'center' : 'end'} ${header.value === 'move' ? 'th-end': ''}`"
    :style="`width: ${width === 'auto' ? 'auto' : parentWidth + 'px;' }; `"
    @mouseover="activeResize = true"
    @mouseleave="activeResize = false"   
    >

    <div
      v-if="header.helpHeader && header.value !== 'addCol'"
      :class="`px-3 th-help`"
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

    <v-btn
      v-if="header.helpHeader && header.value === 'addCol'"
      :class="``"
      icon
      small
      tile
      :color="`${ hoverAddCol  ? 'primary' : 'grey lighten-1'}`"
      @mouseover="hoverAddCol = true"
      @mouseleave="hoverAddCol = false"
      @click="addColumn()"
      >
      <v-icon small color="grey">
        {{ header.icon }}
      </v-icon>
    </v-btn>


    <!-- MODAL HEADER -->
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
      'tableId',
      'header',
      'itemModel',
      'redraw',
      // 'hidden'
    ],
    // model: {
    //   prop: 'hidden',
    //   event: 'blur'
    // },
    watch: {
      activeResize(next) {
        this.$emit('hoverResize', next ? this.header && this.header.id : undefined)
      }
    },
    data () {
      return {
        dialog: 0,
        itemType: 'fields',
        width: 'auto',
        minWidth: 200,
        margin: 10,
        activeResize: false,
        defaultWidth: undefined,
        hoverAddCol: false,
      }
    },
    mounted () {
      // this.log && console.log(`\nC-DataPatchHeader > mounted > this.header.value :`, this.header.value)
      this.getHeaderWidth(this.header)
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
          // this.log && console.log(`\nC-DataPatchHeader > updateItemDebounced > this.header :`, this.header)
          let headerUpdated = { ...this.header }
          headerUpdated.width = width
          this.$emit('resizeHeader', headerUpdated)
          // this.header.width = width
          // this.$emit('resizeHeader', this.header)
        }, 100)
      },

      fieldIcon (type) {
        return FindFieldIcon(type)
      },
      getHeaderWidth(header) {
        // this.log && console.log(`\nC-DataPatchHeader > getHeaderWidth > header :`, header)
        if (!header.helpHeader) {
          this.defaultWidth = this.$refs.headerElement.clientWidth
          // this.log && console.log(`C-DataPatchHeader > getHeaderWidth > this.defaultWidth :`, this.defaultWidth)
          this.width = parseInt(this.defaultWidth) + this.margin 
          this.parentWidth = this.width + this.margin
          this.updateItemDebounced(this.parentWidth)
        }
      },
      onResize (x, y, width, height) {
        this.width = parseInt(width) 
        this.parentWidth = parseInt(width)
        this.updateItemDebounced(width)
      },
      addColumn(type='str') {
        this.$emit('addColumn', type)
      }

    }
  }

</script>
