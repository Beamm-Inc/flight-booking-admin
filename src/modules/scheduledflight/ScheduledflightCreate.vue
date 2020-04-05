<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>flight</v-icon> New Scheduled flight</h2>
            </div>

            <v-layout row>
            <v-flex pl-3 xs6>
              <v-autocomplete
                v-validate="'required'"
                :items="flights"
                v-model="item.flight"
                label="Flight Route"
                name="Flight Route"
                item-text="flightNumber"
                no-data-text="No flight with this number"
                  outline
                  background-color="white elevation-1"
                  return-object
              />
            </v-flex>
            <v-flex pl-3 xs6>
              <v-autocomplete
                v-validate="'required'"
                :items="airplanes"
                v-model="item.airplane"
                label="Airplane"
                name="Airplane"
                item-text="airplaneModel"
                no-data-text="No airplane found"
                       outline
                  background-color="white elevation-1"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex pl-3 xs6>
 <v-dialog
    ref="departureDateDialog"
    v-model="departureDateModal"
    :return-value.sync="departureDate"
    persistent
    lazy
    full-width
    width="290px"
    >
    <v-text-field
        slot="activator"
        v-model="departureDate"
        label="Arrival Date"
        prepend-icon="event"
        readonly
    ></v-text-field>
    <v-date-picker v-model="departureDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="departureDateModal = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.departureDateDialog.save(departureDate)">OK</v-btn>
    </v-date-picker>
    </v-dialog>
            </v-flex>
            <v-flex pl-3 xs6>
<v-dialog
  ref="arrivalDateDialog"
  v-model="arrivalDateModal"
  :return-value.sync="arrivalDate"
  persistent
  lazy
  full-width
  width="290px"
  >
  <v-text-field
      slot="activator"
      v-model="arrivalDate"
      label="Arrival Date"
      prepend-icon="event"
      readonly
  ></v-text-field>
  <v-date-picker v-model="arrivalDate" scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="arrivalDateModal = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.arrivalDateDialog.save(arrivalDate)">OK</v-btn>
  </v-date-picker>
  </v-dialog>
            </v-flex>
          </v-layout>
              <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-model="item.capacity"
                  :error-messages="errors.collect('capacity')"
                  label="Capacity"
                  name="capacity"
                  outline
                  background-color="white elevation-1"
                  type=number
                />             
                
              </v-flex>
              <v-flex xs6>   
                <v-text-field
                  v-model="item.currentPrice"
                  :error-messages="errors.collect('currentPrice')"
                  label="Current Price"
                  name="currentPrice"
                  outline
                  background-color="white elevation-1"
                  type=number
                  step=any
                />             
                
              </v-flex>

            </v-layout>

            <v-layout row>
              <v-spacer/>
              <v-btn large type="submit" color="primary">Save</v-btn>
            </v-layout>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ScheduledflightAPI, AirplaneAPI, FlightAPI } from "@/api";
import { log } from 'util';

export default {
  name: "ScheduledflightCreate",
  data() {
    return {
      errorMessage: null,
      item: {
      },
      arrivalDate: null,
      arrivalDateModal: false,
      departureDate: null,
      departureDateModal: false,
      requiredRule: [v => !!v || "This field is required"],
      airplanes: [],
      flights: []
    };
  },
  async created() {
    FlightAPI.all().then(res => {
      this.flights = res.content.map(({flightID, ...keepAttrs}) => keepAttrs);
      this.flights.forEach(element => {
        delete element.origin.airportID;
        delete element.destination.airportID;
      });
    });
    AirplaneAPI.all().then(res => {
      this.airplanes = res.content.map(({airplaneID, ...keepAttrs}) => keepAttrs);
    });
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.errorMessage = null;
          this.item.departureDate = this.departureDate;
          this.item.arrivalDate = this.arrivalDate;
          ScheduledflightAPI.create(this.item)
            .then(() => {
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Scheduledflight created successfully"
              });
              this.$router.push({ name: "scheduledflight-list" });
            })
            .catch(err => {
              if (err.statusCode === 422) {
                const { messages } = err.details;
                this.errorMessage = messages;
              }
            });
        }
      });
    }
  }
};
</script>
