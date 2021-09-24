<template>
  <v-container>

    <v-row
      fill-height
      class="justify-center align-center mb-12"
      >

      <v-col 
        cols="6"
        class="mb-12"
        >
        
        <!-- <div>
          <code><pre>
            {{ user }}
          </pre></code>
        </div> -->

        <v-card 
          elevation="0"
          class="pa-5 mt-4"
          color="grey lighten-4"
          >

          <v-card-title class="justify-center">
            <!-- <v-avatar color="white"> -->
              <!-- <v-icon>
                icon-user
              </v-icon> -->
            <!-- </v-avatar> -->
            <span class="ml-3">
              {{ $t('pages.me') }}
            </span>
          </v-card-title>

          <!-- email -->
          <v-card-subtitle class="text-center mb-5">
            <v-icon small>
              icon-at-sign
            </v-icon>
            <span class="pl-1">
              {{ email }}
            </span>
          </v-card-subtitle>


          <!-- avatar -->
          <v-card-actions>
            <v-list-item class="grow">
              <v-row
                class="align-center justify-left"
                >

                <v-col
                  cols="6"
                  class="offset-3 pl-12"
                  >
                  <v-row class="justify-center align-center">
                    <v-avatar color="grey">
                      <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-avatar>
                    <div>
                      <v-file-input
                        class="ml-3 pt-0 mt-0"
                        v-model="avatar"
                        hide-input
                        :disabled="isLoading"
                        :loading="isLoading"
                        :label="$t('me.avatar')"
                        :placeholder="$t('me.avatar')"
                        prepend-icon="icon-camera"
                        />
                    </div>
                  </v-row>
                </v-col>

                <v-col
                 cols="3"
                 class="align-center"
                 >
                  <v-switch
                    v-model="editMode"
                    inset
                    :ripple="false"
                    color="purple"
                    hide-details
                    class="mt-0 mb-1"
                    >
                    <template v-slot:label>
                      <span :class="`${editMode ? 'font-weight-black primary--text' : ''}`">
                        {{ $t('buttons.edit') }}
                      </span>
                    </template>
                  </v-switch>
                </v-col>
                 
              </v-row>
            </v-list-item>
          </v-card-actions>

          <v-card-text>

            <!-- username -->
            <v-text-field
              v-model="username"
              outlined
              background-color="white"
              :clearable="editMode"
              :disabled="isLoading || !editMode"
              :readonly="isLoading || !editMode"
              :loading="isLoading"
              :label="$t('me.username')"
              :placeholder="$t('me.username')"
              >
              <!-- prepend-inner-icon="icon-user" -->
              <template v-slot:prepend-inner>
                <v-icon small class="mr-3 pb-0">
                  icon-user
                </v-icon>
              </template>
            </v-text-field>

            <!-- name -->
            <v-text-field
              v-model="name"
              outlined
              background-color="white"
              :clearable="editMode"
              :disabled="isLoading || !editMode"
              :readonly="isLoading || !editMode"
              :loading="isLoading"
              :label="$t('me.name')"
              :placeholder="$t('me.name')"
              >
              <!-- prepend-inner-icon="icon-user" -->
              <template v-slot:prepend-inner>
                <v-icon small class="mr-3 pb-0">
                  icon-user
                </v-icon>
              </template>
            </v-text-field>

            <!-- surname -->
            <v-text-field
              v-model="surname"
              outlined
              background-color="white"
              :clearable="editMode"
              :disabled="isLoading || !editMode"
              :readonly="isLoading || !editMode"
              :loading="isLoading"
              :label="$t('me.surname')"
              :placeholder="$t('me.surname')"
              >
              <!-- prepend-inner-icon="icon-user" -->
              <template v-slot:prepend-inner>
                <v-icon small class="mr-3 pb-0">
                  icon-user
                </v-icon>
              </template>
            </v-text-field>

            <!-- email -->
            <!-- <v-text-field
              v-model="email"
              outlined
              background-color="white"
              single-line
              readonly
              :label="$t('me.email')"
              :placeholder="$t('me.email')"
              prepend-inner-icon="icon-at-sign"
              ></v-text-field> -->

            <!-- description -->
            <v-textarea
              v-model="description"
              outlined
              background-color="white"
              :disabled="isLoading || !editMode"
              :readonly="isLoading || !editMode"
              :loading="isLoading"
              :label="$t('me.description')"
              :placeholder="$t('me.description')"
              >
              <!-- prepend-inner-icon="icon-file-text" -->
              <template v-slot:prepend-inner>
                <v-icon small class="mr-3 pb-0">
                  icon-file-text
                </v-icon>
              </template>
            </v-textarea>

            <!-- visibility -->
            <v-select
              v-model="visibility"
              :items="readChoices"
              item-value="name"
              outlined
              background-color="white"
              :disabled="isLoading || !editMode"
              :readonly="isLoading || !editMode"
              :loading="isLoading"
              :label="$t('me.visibility')"
              :placeholder="$t('me.visibility')"
              >
              <!-- prepend-inner-icon="icon-eye" -->
              <template v-slot:prepend-inner>
                <v-icon small class="mr-3 pt-1">
                  icon-eye
                </v-icon>
              </template>

              <template v-slot:item="{ item, index }">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    {{ $t(item.label) }}
                    <v-icon
                      class="mx-2"
                      color="grey"
                      dark
                      x-small
                      v-bind="attrs"
                      v-on="on"
                      >
                      icon-info
                    </v-icon>
                  </template>
                  <span>
                    {{ $t(item.tooltip) }}
                  </span>
                </v-tooltip>
              </template>

              <template v-slot:selection="{ item, index }">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    {{ $t(item.label) }}
                    <v-icon
                      class="mx-2"
                      color="grey"
                      dark
                      x-small
                      v-bind="attrs"
                      v-on="on"
                      >
                      icon-info
                    </v-icon>
                  </template>
                  <span>
                    {{ $t(item.tooltip) }}
                  </span>
                </v-tooltip>
              </template>

            </v-select>


            <!-- save changes -->
            <v-expand-transition>
              <v-btn
                v-show="editMode"
                color="primary"
                :disabled="!editMode"
                block
                large
                elevation="0"
                tile
                dark
                class="mr-4"
                @click="saveUserinfos()"
                >
                {{ $t('me.save') }}
              </v-btn>
            </v-expand-transition>
            
            <br>

          </v-card-text>

        </v-card>

        <!-- delete user -->
        <v-btn
          block
          :disabled="!editMode"
          large
          elevation="0"
          text
          color="warning"
          class="mt-5 text-none"
          @click="deleteUser"
          >
          {{ $t('me.deleteMe') }}
        </v-btn>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { AuthsOptionsUser } from '@/utils/utilsAuths'

export default {
  
  name: 'Me',
  head() {
    return {
      title: `${this.appTitle} - ${this.$t('pages.me')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    }
  },
  data () {
    return {
      pathItems: [
        { 
          text: 'pages.me',
          disabled: true,
          to: '/me',
        },
        { 
          text: 'pages.me',
          disabled: true,
          to: '/me',
        }
      ],
      itemType: 'users',
      apiUrl: undefined,
      editMode: false,
      username: '',
      name: '',
      surname: '',
      email: '',
      avatar: '',
      description: '',
      visibility: '',
      readChoices: []
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      api: (state) => state.api,
      user: (state) => state.user.userData,
      isLoading: (state) => state.dialogs.isLoading,
    }),
    ...mapGetters({
      userBasicInfos: 'user/userBasicInfos',
      headerUser: 'user/headerUser'
    })
  },
  beforeMount() {
    this.updatePath(this.pathItems)
    this.log && console.log("P-me/index > this.user :", this.user)
    // this.log && console.log("P-me/index > this.userBasicInfos :", this.userBasicInfos)
    this.name = this.user.name
    this.username = this.user.username
    this.surname = this.user.surname
    this.email = this.user.email
    this.avatar = this.user.avatar
    this.description = this.user.description
    this.visibility = this.user.read
    this.readChoices = [ ...AuthsOptionsUser ]
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
      populateUserBasicInfos: 'user/populateUserBasicInfos'
   }),
    saveUserinfos () {
      let userBasicInfos = this.userBasicInfos
      userBasicInfos.username = this.username
      userBasicInfos.name = this.name
      userBasicInfos.surname = this.surname
      userBasicInfos.description = this.description
      userBasicInfos.read = this.visibility
      this.$axios
        .put(`${this.api.users}/me/`, userBasicInfos, this.headerUser)
        .then(resp => {
          // this.log && console.log('P-Me > saveUserinfos > resp.data : ', resp.data)
          this.populateUserBasicInfos(resp.data)
        })
    },
    deleteUser () {

    }
  }
}

</script>
