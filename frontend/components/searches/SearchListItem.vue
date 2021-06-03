<template>

  <v-card
    outlined
    light
    elevation="0"
    class="mb-2"
    >
    <v-container fluid>
      <v-row class="child-flex ma-0 py-2 px-3">
      
        <!-- CHECKBOX -->
        <v-col cols="1" class="align-self-center justify-center text-center">
          <v-checkbox
            class="text-center ma-0"
            v-model="model"
            :value="item"
            color="grey"
            hide-details
            @change="handleInput"
          />
        </v-col>

        <!-- ITEM AVATAR -->
        <v-col cols="1" class="justify-center align-self-center">
          <v-avatar size="30">
            <v-icon
              dark
              small
              :class="item.color || 'black'"
              >
              {{ item.icon || itemTexts[item.item_type].defaultIcon }}
            </v-icon>
          </v-avatar>
        </v-col>

        <!-- ITEM INFOS -->
        <v-col cols="10" class="text-left align-self-center">
          <p
            :class="`mb-1 font-weight-bold ${item.color}--text`"
            >
            {{ getItemInfos(item, 'txt') }}
            <span v-if="item.item_type === 'user'" class="font-weight-medium">
              - {{ item.name }} {{ item.surname }}<br>
            </span>
          </p>
          <p class="body-2 ma-0">
            {{ getItemInfos(item, 'txtBis') }}<br>
            <span class="grey--text font-italic">
              {{ $t(`dataPackage.${item.item_type}`) }}
            </span>
          </p>
        </v-col>

      </v-row>
    </v-container>

    <v-speed-dial
      v-model="fabActivated"
      open-on-hover
      absolute
      right
      top
      direction="left"
      transition="slide-x-reverse-transition"
      >
      <!-- :style="'right: -18px;'" -->
      <template v-slot:activator>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-model="fabActivated"
              color="info"
              elevation="0"
              class="pa-1"
              dark
              small
              icon
              v-bind="attrs"
              v-on="on"
              >
              <!-- fab -->
              <v-icon
                small
                v-if="fabActivated"
                >
                icon-clear
              </v-icon>
              <v-icon
                small
                v-else
                >
                <!-- icon-settings -->
                icon-more-vertical
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('buttons.selectedOptions')}}
          </span>
        </v-tooltip>
      </template>

      <v-tooltip
        v-for="(value, name) in buttons"
        v-if="itemTexts[item.item_type].actions.includes(name)"
        :key="name"
        top
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="0"
            class="ma-1"
            color="success"
            fab
            dark
            x-small
            v-bind="attrs"
            v-on="on"
            >
            <v-icon size="15">
              {{ value.icon }}
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t(value.tooltip)}}
          <!-- {{ value.icon }} -->
        </span>
      </v-tooltip>

    </v-speed-dial>
  </v-card>
</template>

<script>

  export default {
    name: 'SearchListItem',
    props: [
      'item',
      'hidden',
      'itemTexts',
      'getItemInfos',
      // 'actionBtns',
      'buttons'
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {
        fabActivated: false,
      }
    },
    beforeMount () {
      this.model = this.hidden
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      },
      changeSelection(val) {
        this.log && console.log('\nC-SearchListItem > changeSelection > val :' , val)

      },
    }
  }

</script>
