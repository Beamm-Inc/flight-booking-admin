<template>
  <div>
    <v-container 
      fluid 
      class="pb-0">
      <v-layout>
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Scheduled Flights
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
                @click="$router.push({ name: 'scheduledflight-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Scheduled Flight
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
              rows-per-page-text="Scheduledflight per page"
            >
              <template 
                slot="items" 
                slot-scope="props">
                <tr 
                  style="cursor: pointer" 
                  @click="scheduledflightDetail(props.item)">
                  <td>{{ props.item.flight && props.item.flight.flightNumber }}</td>
                  <td>{{ props.item.flight && props.item.flight.origin && props.item.flight.origin.airportCity + " - " + props.item.flight.origin.airportName }}</td>
                  <td>{{ props.item.flight && props.item.flight.destination && props.item.flight.destination.airportCity + " - " + props.item.flight.destination.airportName }}</td>
                  <td>{{ props.item.departureDate }}</td>
                  <td>{{ props.item.arrivalDate }}</td>
                  <td>{{ props.item.airplane && props.item.airplane.airplaneModel }}</td>
                  
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
                              name: 'scheduledflight-update',
                              params: { scheduledflightId: props.item.scheduledflightID }
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
                          @click="deleteItem(props.item.scheduledflightID)">
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
import { ScheduledflightAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import ScheduledflightDetail from "./ScheduledflightDetail.vue";

export default {
  name: "ScheduledflightList",
  mixins: [tableMixin],

  data() {
    return {
      resource: ScheduledflightAPI,
      resourceName: "Scheduledflight",
      headers: [
        {
          text: "Scheduledflight Number",
          value: "scheduledflightNumber"
        },
        {
          text: "From",
          value: "from"
        },
        {
          text: "To",
          value: "to"
        },
                {
          text: "Departure",
          value: "from"
        },
        {
          text: "Arrival",
          value: "to"
        },
        {
          text: "Airplane",
          value: "airplane"
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
    scheduledflightDetail(scheduledflight) {
      this.$modal.show(
        ScheduledflightDetail,
        {
          modalName: "scheduledflight-detail-modal",
          item: scheduledflight
        },
        {
          name: "scheduledflight-detail-modal",
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
