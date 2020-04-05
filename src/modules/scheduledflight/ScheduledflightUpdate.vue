<template>
  <v-container class="pa-0" fluid grid-list-lg>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-form @submit.prevent="save">
          <v-card class="pa-4">
            <form-error-messages :messages="errorMessage" />
            <div class="text-xs-center pa-4">
              <h2 class="font-weight-light"><v-icon medium>scheduledflight</v-icon> Update Scheduled Flight</h2>
            </div>

            <v-layout row>
              <v-flex xs6>   
                <v-text-field
                  v-validate="'required'"
                  v-model="item.scheduledflightName"
                  :error-messages="errors.collect('scheduledflightName')"
                  label="Name"
                  name="scheduledflightName"
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
                  v-model="item.scheduledflightCode"
                  :error-messages="errors.collect('scheduledflightCode')"
                  label="Code"
                  name="scheduledflightCode"
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
                  v-model="item.scheduledflightCity"
                  :error-messages="errors.collect('scheduledflightCity')"
                  label="City"
                  name="scheduledflightCity"
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
import { ScheduledflightAPI, WoredaAPI, ScheduledflightTypeAPI } from "@/api";

export default {
  name: "ScheduledflightUpdate",
  data() {
    return {
      errorMessage: null,
      scheduledflightTypes: [],
      item: {}
    };
  },
  async created() {
    const { scheduledflightId } = this.$route.params;
    ScheduledflightAPI.get(scheduledflightId).then(res => {
      this.item = res;
    });
  },
  methods: {
    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          ScheduledflightAPI.update(this.item)
            .then(() => {
              this.item.id = this.$route.params;
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: "Scheduledflight updated successfully"
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
