<template>
  <div>
    <v-container 
      fluid 
      class="pb-0">
      <v-layout>
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Airplanes
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
              <v-btn
                color="primary"
                class="pa-0 pl-2 pr-3"
                @click="$router.push({ name: 'airplane-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Airplane
              </v-btn>
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
                  @click="airplaneDetail(props.item)">
                  <td>{{ props.item.airplaneSerialNumber }}</td>
                  <td>{{ props.item.airplaneModel }}</td>
                  <td>{{ props.item.firstClassSeats }}</td>
                  <td>{{ props.item.businessClassSeats }}</td>
                  <td>{{ props.item.economyClassSeats }}</td>
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
                          @click="
                            $router.push({
                              name: 'airplane-update',
                              params: { airplaneId: props.item.airplaneId }
                            })
                          "
                        >
                          <v-list-tile-action>
                            <v-icon>edit</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-title>Edit</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile 
                          ripple 
                          @click="deleteItem(props.item.airplaneId)">
                          <v-list-tile-action>
                            <v-icon>delete</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-title>Delete</v-list-tile-title>
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
import { AirplaneAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import AirplaneDetail from "./AirplaneDetail.vue";

export default {
  name: "AirplaneList",
  mixins: [tableMixin],

  data() {
    return {
      resource: AirplaneAPI,
      resourceName: "Airplane",
      headers: [
        {
          text: "Serial Number",
          value: "airplaneSerialNumber"
        },
        {
          text: "Model",
          value: "airplaneModel"
        },
        {
          text: "First Class Seats",
          value: "firstClassSeats"
        },
        {
          text: "Business Class Seats",
          value: "businessClassSeats"
        },
        {
          text: "Economy Class Seats",
          value: "economyClassSeats"
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
    airplaneDetail(airplane) {
      this.$modal.show(
        AirplaneDetail,
        {
          modalName: "airplane-detail-modal",
          item: airplane
        },
        {
          name: "airplane-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    }
  }
};
</script>

<style>
</style>
