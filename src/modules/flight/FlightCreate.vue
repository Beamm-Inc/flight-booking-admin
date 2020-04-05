<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>flight</v-icon> New Flight</h2>
            </div>

            <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-validate="'required'"
                  v-model="item.flightNumber"
                  :error-messages="errors.collect('flightNumber')"
                  label="Flight Number"
                  name="flightNumber"
                  autofocus
                  outline
                  background-color="white elevation-1"
                />             
                
              </v-flex>

            </v-layout>
            <v-layout row>
            <v-flex pl-3 xs6>
              <v-autocomplete
                v-validate="'required'"
                :items="airports"
                v-model="item.origin"
                label="From"
                name="From"
                item-text="airportName"
                no-data-text="No city with this name"
                  outline
                  background-color="white elevation-1"
                  return-object
              />
            </v-flex>
            <v-flex pl-3 xs6>
              <v-autocomplete
                v-validate="'required'"
                :items="airports"
                v-model="item.destination"
                label="To"
                name="To"
                item-text="airportName"
                no-data-text="No city with this name"
                       outline
                  background-color="white elevation-1"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex pl-3 xs6>
                   <v-dialog
        ref="departureDialog"
        v-model="departureModal"
        :return-value.sync="departureTime"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="departureTime"
          label="Departure Time"
          readonly
                            outline
                  background-color="white elevation-1"
        ></v-text-field>
        <v-time-picker v-model="departureTime" actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="departureModal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.departureDialog.save(departureTime)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
            </v-flex>
            <v-flex pl-3 xs6>
     <v-dialog
        ref="arrivalDialog"
        v-model="arrivalModal"
        :return-value.sync="arrivalTime"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="arrivalTime"
          label="Arrival Time"
          readonly
                            outline
                  background-color="white elevation-1"
        ></v-text-field>
        <v-time-picker v-model="arrivalTime" actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="arrivalModal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.arrivalDialog.save(arrivalTime)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
            </v-flex>
          </v-layout>
                      <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-model="item.distance"
                  :error-messages="errors.collect('distance')"
                  label="Distance"
                  name="distance"
                  outline
                  background-color="white elevation-1"
                  type=number step=any
                />             
                
              </v-flex>
              <v-flex xs6>   
                <v-text-field
                  v-model="item.nominalPrice"
                  :error-messages="errors.collect('nominalPrice')"
                  label="Nominal Price"
                  name="nominalPrice"
                  outline
                  background-color="white elevation-1"
                  type=number step=any
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
import { FlightAPI, AirportAPI } from "@/api";
import { log } from 'util';

export default {
  name: "FlightCreate",
  data() {
    return {
      errorMessage: null,
      item: {
      },
      arrivalTime: null,
      arrivalModal: false,
      departureTime: null,
      departureModal: false,
      departureDate: new Date().toISOString().substr(0, 10),
      returnDate: new Date().toISOString().substr(0, 10),
      departureModal: false,
      returnModal: false,
      airportRules: [v => !!v || "This field is required"],
      airports: [],
    };
  },
  async created() {
    AirportAPI.all().then(res => {
// const newArray = res.content.map(({airportID, ...keepAttrs}) => keepAttrs);
// log(newArray);
      this.airports = res.content.map(({airportID, ...keepAttrs}) => keepAttrs);
      log(this.airports)
    });
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.errorMessage = null;
          delete this.item.confirmPassword;
          // this.item.departureTime = this.departureTime;
          // this.item.arrivalTime = this.arrivalTime;
          FlightAPI.create(this.item)
            .then(() => {
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Flight created successfully"
              });
              this.$router.push({ name: "flight-list" });
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
