<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>flight</v-icon> Update Flight</h2>
            </div>

            <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-validate="'required'"
                  v-model="item.flightName"
                  :error-messages="errors.collect('flightName')"
                  label="Name"
                  name="flightName"
                  autofocus
                  outline
                  background-color="white elevation-1"
                />             
                
              </v-flex>
              <v-flex
                pl-3
                xs6>
                <v-text-field
                  v-validate="'required'"
                  v-model="item.flightCode"
                  :error-messages="errors.collect('flightCode')"
                  label="Code"
                  name="flightCode"
                  outline
                  background-color="white elevation-1"
                />
                
              </v-flex>
            </v-layout> 

            <v-layout row>
              <v-flex
                pl-3
                xs6>
                <v-text-field
                  v-validate="'required'"
                  v-model="item.flightCity"
                  :error-messages="errors.collect('flightCity')"
                  label="City"
                  name="flightCity"
                  outline
                  background-color="white elevation-1"
                />                
              </v-flex>
            </v-layout>


            <v-layout row>
              <v-spacer/>
              <v-btn large type="submit" color="primary">Update</v-btn>
            </v-layout>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { FlightAPI, WoredaAPI, FlightTypeAPI } from "@/api";

export default {
  name: "FlightUpdate",
  data() {
    return {
      errorMessage: null,
      flightTypes: [],
      item: {}
    };
  },
  async created() {
    const { flightId } = this.$route.params;
    FlightAPI.get(flightId).then(res => {
      this.item = res;
    });
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          FlightAPI.update(this.item)
            .then(() => {
              this.item.id = this.$route.params;
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Flight updated successfully"
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
