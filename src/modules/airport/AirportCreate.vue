<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>flight</v-icon> New Airport</h2>
            </div>

            <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-validate="'required'"
                  v-model="item.airportName"
                  :error-messages="errors.collect('airportName')"
                  label="Name"
                  name="airportName"
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
                  v-model="item.airportCode"
                  :error-messages="errors.collect('airportCode')"
                  label="Code"
                  name="airportCode"
                  autofocus
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
                  v-model="item.airportCity"
                  :error-messages="errors.collect('airportCity')"
                  label="City"
                  name="airportCity"
                  autofocus
                  outline
                  background-color="white elevation-1"
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
import { AirportAPI } from "@/api";

export default {
  name: "AirportCreate",
  data() {
    return {
      errorMessage: null,
      item: {}
    };
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.errorMessage = null;
          delete this.item.confirmPassword;
          AirportAPI.create(this.item)
            .then(() => {
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Airport created successfully"
              });
              this.$router.push({ name: "airport-list" });
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
