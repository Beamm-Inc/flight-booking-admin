const createFormMixin = {
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
          this.resource
            .create(this.item)
            .then(() => {
              this.item = {};
              this.$notify({
                type: "success",
                title: "Success",
                message: `${this.resourceName} created successfully`
              });
              this.$router.push({ name: this.listRoute });
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
export default createFormMixin;
