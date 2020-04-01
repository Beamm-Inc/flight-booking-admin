<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>flight</v-icon> Edit Airplane</h2>
            </div>

            <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-validate="'required'"
                  v-model="item.airplaneSerialNumber"
                  :error-messages="errors.collect('airplaneSerialNumber')"
                  label="Serial Number"
                  name="airplaneSerialNumber"
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
                  v-model="item.airplaneModel"
                  :error-messages="errors.collect('airplaneModel')"
                  label="Model"
                  name="airplaneModel"
                  autofocus
                  outline
                  background-color="white elevation-1"
                />
                
              </v-flex>
            </v-layout> 

            <v-layout row>
              <v-flex
                pl-3
                xs4>
                <v-text-field
                  v-validate="'required'"
                  v-model="item.firstClassSeats"
                  :error-messages="errors.collect('firstClassSeats')"
                  label="First Class Seats"
                  name="firstClassSeats"
                  autofocus
                  outline
                  background-color="white elevation-1"
                  type="number"
                />
                
              </v-flex>
              <v-flex
                pl-3
                xs4>
                <v-text-field
                  v-validate="'required'"
                  v-model="item.businessClassSeats"
                  :error-messages="errors.collect('businessClassSeats')"
                  label="Business Class Seats"
                  name="businessClassSeats"
                  autofocus
                  outline
                  background-color="white elevation-1"
                  type="number"
                />
                
              </v-flex>
              <v-flex
                pl-3
                xs4>
                <v-text-field
                  v-validate="'required'"
                  v-model="item.economyClassSeats"
                  :error-messages="errors.collect('economyClassSeats')"
                  label="Economy Class Seats"
                  name="economyClassSeats"
                  autofocus
                  outline
                  background-color="white elevation-1"
                  type="number"
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
import { AirplaneAPI, WoredaAPI, AirplaneTypeAPI } from "@/api";

export default {
  name: "AirplaneUpdate",
  data() {
    return {
      errorMessage: null,
      airplaneTypes: [],
      woredas: [],
      item: {}
    };
  },
  async created() {
    const { airplaneId } = this.$route.params;
    AirplaneAPI.get(airplaneId).then(res => {
      this.item = res;
    });
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          AirplaneAPI.update(this.item)
            .then(() => {
              this.item.id = this.$route.params;
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Airplane updated successfully"
              });
              this.$router.push({ name: "airplane-list" });
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
