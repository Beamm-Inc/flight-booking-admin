<template>
  <div>
    <v-container 
      fluid 
      class="pb-0">
      <v-layout>
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Users
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container 
      class="pt-2" 
      fluid 
      grid-list-lg>
      <v-layout wrap>
        <v-flex xs12>
          <v-card class="pt-2">
            <v-toolbar 
              flat 
              color="white">
              <!-- <v-btn
                color="primary"
                class="pa-0 pl-2 pr-3"
                @click="$router.push({ name: 'user-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New User
              </v-btn> -->
              <v-spacer />
              <v-flex 
                xs12 
                md4>
                <v-text-field
                  v-model="search"
                  label="Search"
                  single-line
                  append-icon="search"
                  solo
                />
              </v-flex>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="items"
              :pagination.sync="pagination"
              :loading="loading"
              :search="search"
              rows-per-page-text="People per page"
            >
              <template 
                slot="items" 
                slot-scope="props">
                <tr 
                  style="cursor: pointer" 
                  @click="userDetail(props.item)">
                  <td>{{ props.item.fullName }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.role }}</td>
                  <td>{{ props.item.status }}</td>
                  <td @click.stop>
                    <v-menu 
                      offset-x 
                      left 
                      bottom>
                      <v-btn 
                        slot="activator" 
                        icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>

                      <v-list dense>
                        <v-list-tile 
                          ripple 
                          @click="block(props.item._id)">
                          <v-list-tile-action>
                            <v-icon>block</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-title>Deactivate</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { UserAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import UserDetail from "./UserDetail.vue";

export default {
  name: "UserList",
  mixins: [tableMixin],

  data() {
    return {
      resource: UserAPI,
      resourceName: "User",
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Role",
          value: "role"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  methods: {
    userDetail(user) {
      this.$modal.show(
        UserDetail,
        {
          modalName: "user-detail-modal",
          item: user
        },
        {
          name: "user-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    },
    block(id) {
      UserAPI.block(id)
      .then(() => {
        this.$notify({
          type: "success",
          title: "Success",
          message: "User blocked successfully"
        });
        this.loadData();
      })
      .catch(err => {
        this.$notify({
          type: "danger",
          title: "Error",
          message: "Unable to block user"
        });
        this.loadData();
      });
    },
  }
};
</script>

<style>
</style>
