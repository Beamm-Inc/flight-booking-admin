import FileSizeFilter from "./file-size.filter";
import DateFilter from "./date-formating.filter";
import TextTruncateFilter from "./text-truncate.filter";

export default {
  install(Vue) {
    Vue.filter("file-size", FileSizeFilter);
    Vue.filter("date", DateFilter);
    Vue.filter("textTruncate", TextTruncateFilter);
  }
};
