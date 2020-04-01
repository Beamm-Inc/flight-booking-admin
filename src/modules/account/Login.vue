<template>
  <v-container
    fluid
    fill-height
    pa-0>
    <v-layout column>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            md12
            order-xs2
            order-md1>
            <div class="text-xs-center">
              <v-layout
                class="pa-0 ma-0"
                align-center
                justify-center
                fill-height
                fill-width
                style="z-index: 99; position:absolute; width:100%;bottom:6em"
              >
                <v-flex
                  xs10
                  sm8
                  md4
                  lg3>

                  <v-flex class="mb-4">
                    <v-layout justify-center >
                      <img
                        height="200"
                        src="@/assets/logo.png">
                    </v-layout>
                  </v-flex>
                  <v-card class="elevation-12 ">
                    <v-toolbar
                      dark
                      color="primary">
                      <v-spacer/>
                      <v-toolbar-title>
                        <div class="text-xs-center">Log in</div>
                      </v-toolbar-title>
                      <v-spacer/>
                    </v-toolbar>

                    <v-card-text>
                  <v-form @submit.prevent="login">
                    <v-alert 
                      v-if="authError" 
                      :value="true" 
                      type="error">
                      {{ authError }}
                    </v-alert>
                    <v-text-field
                      v-validate="'required'"
                      v-model="user.email"
                      :error-messages="errors.collect('email')"
                      prepend-icon="person"
                      name="email"
                      label="Email"
                      type="text"
                      autocomplete="email"
                    />
                    <v-text-field
                      v-validate="{ required: true, min: 5 }"
                      v-model="user.password"
                      :error-messages="errors.collect('password')"
                      prepend-icon="lock"
                      name="password"
                      autocomplete="current-password"
                      label="Password"
                      type="password"
                    />
                    <v-card-actions class="text-xs-center">
                      <v-btn 
                        type="submit" 
                        block 
                        color="primary"
                        >
                        Login
                      </v-btn>
                    </v-card-actions>
                    <router-link :to="{ name: 'forgot' }">
                      Forgot password ?
                    </router-link>
                  </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AccountService from "@/services";

export default {
  name: "Login",
  data() {
    return {
      authError: false,
      user: {}
    };
  },
  methods: {
    async login() {
      const self = this;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.loading = true;

          self.authError = null;
          AccountService.login(this.user.email, this.user.password)
            .then(() => {
              this.$validator.reset();
              this.$router.push({ name: "airplane-list" });
            })
            .catch(err => {
              this.loading = false;
              self.authError = err;
            });
        }
      });
    }
  }
};
</script>
