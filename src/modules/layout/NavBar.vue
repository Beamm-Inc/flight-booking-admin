<template>
  <v-toolbar 
    fixed 
    app 
    clipped-left 
    color="navbarColor" 
    height="64"
    class="on-top"
    dense
    >
      <v-toolbar-side-icon @click="toggleNavBar()" />
      BeamInc - Flight Booking
    <v-spacer />
    <v-toolbar-items>
      <v-tooltip bottom>
        <img
          slot="activator"
          class="ma-1"
          height="48"
          src="@/assets/miu.png">
        <span>Made in MIU</span>
      </v-tooltip>
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        v-model="visible"
        offset-x
      >
        <v-btn 
          slot="activator" 
          icon 
          >
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile
              avatar
              @click="$router.push({ name: 'user-profile' }), (visible = false)"
              >
              <v-list-tile-avatar>
                <v-icon large>
                  account_circle
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.role }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action />
            </v-list-tile>
          </v-list>
          <v-divider />
          <v-card-actions>
            <v-btn 
              block 
              color="primary" 
              @click="logout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import AccountService from "@/services";
import { mapState, mapMutations } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      visible: true,
      // user: {"name":"Admin","role": "Admin"}
      user: AccountService.getProfile()
    };
  },
  computed: {
    ...mapState("core", ["appName"])
  },
  methods: {
    // ...mapMutations("layout", ["toggleNavBar"]),
    logout() {
      AccountService.logout();
    },
    ...mapMutations("layout", ["toggleNavBar"])
  }
};
</script>
