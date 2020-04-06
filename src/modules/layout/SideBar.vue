<template>
  <v-navigation-drawer
    :mini-variant.sync="drawerStatus"
    :mobile-break-point="250"
    :width="250"
    :style="cssProps"
    app
    class="sidebarColor"
    fixed
    clipped
  >
    <v-list>
      <template v-for="menu in menus">
        <v-list-tile
          v-if="!menu.children"
          :key="menu.title"
          :to="{ name: menu.route }"
          ripple
        >
          <v-list-tile-action>
            <v-tooltip 
              slot="prepend" 
              bottom>
              <v-icon slot="activator">{{ menu.icon }}</v-icon>
              {{ menu.title }}
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
        </v-list-tile>

        <v-list-group 
          v-else 
          :key="menu.title" 
          no-action>
          <v-tooltip 
            slot="prependIcon" 
            bottom>
            <v-icon slot="activator">{{ menu.icon }}</v-icon>
            <span>{{ menu.title }}</span>
          </v-tooltip>
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
          <template v-if="!drawerStatus">
            <v-list-tile
              v-for="submenu in menu.children"
              :key="submenu.title"
              :to="{ name: submenu.route }"
              ripple
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ submenu.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AccountService from "@/services/account.service";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      menus: [
        {
          title: "Airplanes",
          icon: "flight",
          route: "airplane-list"
        },
        {
          title: "Airports",
          icon: "business",
          route: "airport-list"
        },
        {
          title: "Flights",
          icon: "flight_takeoff",
          children: [
            {
              title: "Flight Routes",
              route: "flight-list"
            },
            {
              title: "Scheduled Flights",
              route: "scheduledflight-list"
            }
          ]
        },
        {
          title: "Users",
          icon: "people",
          route: "user-list"
        },      
      ]
    };
  },
  computed: {
    isAdministrator() {
      return this.authenticatedProfileUserRole === "Administrator";
    },
    isCommitteeOfficer() {
      return this.authenticatedProfileUserRole === "Committee Officer";
    },
    isInsideMembers() {
      return this.authenticatedProfileUserRole === "Members";
    },
    cssProps() {
      return {
        "--secondary-color": this.$vuetify.theme.secondary
      };
    },
    ...mapState("core", ["appName"]),
    drawerStatus: {
      get() {
        return this.$store.state.layout.navDrawerToggle;
      },
      set(newValue) {
        this.$store.state.layout.navDrawerToggle = newValue;
      }
    }
  },
  created() {
    this.authenticatedProfileUserRole = AccountService.getProfile().role;
  },
  methods: {
    isAuthorized(allowedUserRoles) {
      if (allowedUserRoles.includes("Administrator") && this.isAdministrator) {
        return true;
      } else if (
        allowedUserRoles.includes("Committee Officer") &&
        (this.isAdministrator || this.isCommitteeOfficer)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style>
.v-list__tile--active {
  background-color: var(--secondary-color);
}
.on-top {
  z-index: 99;
}
</style>
