<template>
  <div>
    <v-card>
      <v-card-title 
        primary 
        primary-title 
        class="primary--text text--darken-3">
        <div>
          <div class="headline">{{ item.fullName }}</div>
          <span>{{ item.email }}</span>
        </div>
      </v-card-title>
      <v-divider light />
      <v-card-text>
        Phone: {{ item.phoneNo }}
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
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
  name: "UserDetail",
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
        name: "user-update",
        params: { userId: this.item.id }
      });
    }
  }
};
</script>

<style>
</style>
