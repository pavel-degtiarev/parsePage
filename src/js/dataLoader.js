const BASE_URL = "http://localhost:8088/";

export class DataLoader {
  _query = "";

  constructor(query) {
    this._query = query.replaceAll(" ", "+");
  }

  async getBrands() {
    try {
      const response = await fetch(`${BASE_URL}${this._query}`);
      const result = await response.json();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
