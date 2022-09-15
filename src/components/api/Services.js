import axios from "axios";

const CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account";

const SEARCH_CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/search";

const ACCOUNT_NUMBER_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/searchID";

class Services {
  createCustomerAccount(customerAccount) {
    return axios.post(CUSTOMER_ACCOUNT_BASE_URL, customerAccount);
  }

  searchCustomerAccount(customerAccount) {
    return axios.post(SEARCH_CUSTOMER_ACCOUNT_BASE_URL, customerAccount);
  }

  searchAccountNumber(customerAccount) {
    return axios.post(ACCOUNT_NUMBER_BASE_URL, customerAccount);
  }
}

export default new Services();
