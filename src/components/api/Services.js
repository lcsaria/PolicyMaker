import axios from "axios";

const CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account";

const SEARCH_CUSTOMER_ACCOUNT_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/search";

const ACCOUNT_NUMBER_BASE_URL =
  "http://localhost:8080/api/v1/customer_account/searchID";

const ADD_POLICY_BASE_URL = "http://localhost:8080/api/v1/policy";
const ADD_POLICY_HOLDER_BASE_URL = "http://localhost:8080/api/v1/policyHolder";
const ADD_VEHICLES_BASE_URL = "http://localhost:8080/api/v1/vehicles";

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

  async createPolicy(policy) {
    return await axios.post(ADD_POLICY_BASE_URL, policy);
  }

  async createPolicyHolder(policyHolder) {
    return await axios.post(ADD_POLICY_HOLDER_BASE_URL, policyHolder);
  }

  async createVehicles(vehicles) {
    return await axios.post(ADD_VEHICLES_BASE_URL, vehicles);
  }
}

export default new Services();
