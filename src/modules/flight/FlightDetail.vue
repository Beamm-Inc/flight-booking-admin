<template>
  <div>
    <v-card>
      <v-card-title 
        primary 
        primary-title 
        class="primary--text text--darken-3">
        <div>
          <div class="headline">{{ item.flightName }}</div>
          <span>Code - {{ item.flightCode }}</span>
        </div>
      </v-card-title>
      <v-divider light />
      <v-card-text>
        City - {{ item.flightCity }} 
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn 
          color="primary" 
          @click="edit()">Edit</v-btn>
        <v-btn 
          color="primary" 
          @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-xs-center" />
  </div>
</template>

<script>
export default {
  name: "FlightDetail",
  props: {
    modalName: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    close() {
      this.$modal.hide(this.modalName);
    },
    edit() {
      this.$modal.hide(this.modalName);
      this.$router.push({
        name: "flight-update",
        params: { flightId: this.item.flightID }
      });
    }
  }
};
</script>

<style>
</style>
