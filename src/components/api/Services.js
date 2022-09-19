import axios from "axios";

const CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account";

const SEARCH_CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/search";

const ACCOUNT_NUMBER_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/searchID";

class Services {
  async createCustomerAccount(customerAccount) {
    return await axios.post(CUSTOMER_ACCOUNT_BASE_URL, customerAccount);
  }

  async searchCustomerAccount(customerAccount) {
    return await axios.post(SEARCH_CUSTOMER_ACCOUNT_BASE_URL, customerAccount);
  }

  async searchAccountNumber(customerAccount) {
    return await axios.post(ACCOUNT_NUMBER_BASE_URL, customerAccount);
  }
}

export default new Services();
