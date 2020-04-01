import { buildFilter } from "@/util";

const tableMixin = {
  data() {
    return {
      totalItems: 0,
      items: [],
      loading: true,
      pagination: { skip: 0, rowsPerPage: 10 },
      search: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async deleteItem(id) {
      const confirmed = await this.$confirm("Are you sure?");
      if (confirmed) {
        await this.resource.remove(id);
        this.$notify({
          type: "success",
          title: "Success",
          message: `${this.resourceName} deleted successfully`
        });
        this.loadData();
      }
    },
    async loadData(instantFilters) {
      this.loading = true;
      const filters = {
        ...instantFilters,
        ...this.filter,
        ...buildFilter(this.pagination)
      };

      await this.resource.all(this.url).then(res=>{
          this.items = res.content;
          this.totalItems = res.totalElements;
      })
      .catch(err => {
        this.$notify({
          type: "danger",
          title: "Error",
          message: err
        });    
      });

      this.loading = false;
    }
  }
};
export default tableMixin;
