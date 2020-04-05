import { API_ROOT } from ".";
import Request from "./request";

const PATH = "flight";

const FlightAPI = {
    get(id) {
      return Request.get(`${API_ROOT}${PATH}/${id}`);
    },
    all(filter) {
      return Request.get(`${API_ROOT}${PATH}`, { params: { filter } });
    },
    create(data) {
      return Request.post(`${API_ROOT}${PATH}`, data);
    },
    update(data) {
      return Request.post(`${API_ROOT}${PATH}/edit`, data);
    },
    remove(id) {
      return Request.get(`${API_ROOT}${PATH}/delete/${id}`);
    },
    search(query) {
      return Request.get(`${API_ROOT}${PATH}/search`, {
        params: { searchKey: query }
      });
    }
  };

  export default FlightAPI;