<template>
    <v-container>

      <v-row
        fill-height
        class="justify-center align-center"
        >

        <v-col 
          cols="6"
          >
          
          <!-- <div>
            <code><pre>
              {{ user }}
            </pre></code>
          </div> -->

          <v-card 
            elevation="0"
            class="pa-5 mt-4"
            color="grey lighten-2"
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
                  align="center"
                  justify="center"
                  >
                  <v-avatar color="grey">
                    <v-img
                      class="elevation-6"
                      alt=""
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-avatar>
                  <div>
                    <v-file-input
                      class="ml-3"
                      v-model="avatar"
                      hide-input
                      :disabled="isLoading"
                      :loading="isLoading"
                      :label="$t('me.avatar')"
                      :placeholder="$t('me.avatar')"
                      prepend-icon="icon-camera"
                      ></v-file-input>
                    </div>
                </v-row>
              </v-list-item>
            </v-card-actions>

            <v-card-text>

              <!-- name -->
              <v-text-field
                v-model="name"
                outlined
                background-color="white"
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('me.name')"
                :placeholder="$t('me.name')"
                prepend-inner-icon="icon-user"
                ></v-text-field>

              <!-- surname -->
              <v-text-field
                v-model="surname"
                outlined
                background-color="white"
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('me.surname')"
                :placeholder="$t('me.surname')"
                prepend-inner-icon="icon-user"
                ></v-text-field>

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
                single-line
                :label="$t('me.description')"
                :placeholder="$t('me.description')"
                prepend-inner-icon="icon-file-text"
                ></v-textarea>

              <!-- save changes -->
              <v-btn
                color="primary"
                block
                large
                elevation="0"
                tile
                dark
                class="mr-4"
                @click="saveUser"
                >
                {{ $t('me.save') }}
              </v-btn>
              
              <br>

            </v-card-text>

          </v-card>

          <!-- delete user -->
          <v-btn
            block
            large
            elevation="0"
            text
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

import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {
      pathItems: [
        { 
          text: 'pages.me',
          disabled: false,
          to: '/me',
        },
        { 
          text: 'pages.me',
          disabled: true,
          to: '/me',
        }
      ],
      name: '',
      surname: '',
      email: '',
      avatar: '',
      description: '',
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
      user: (state) => state.user.userData,
      isLoading: (state) => state.dialogs.isLoading,
    })
  },
  beforeMount() {
    this.updatePath(this.pathItems)
    this.name = this.user.name
    this.surname = this.user.surname
    this.email = this.user.email
    this.avatar = this.user.avatar
    this.description = this.user.description
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
   }),
    saveUser () {
      // TO DO
      let updateUser = {
        name: this.name,
        surname: this.surname,
        description: this.description,
      }
    },
    deleteUser () {

    }
  }
}

</script>
