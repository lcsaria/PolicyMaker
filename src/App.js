import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/content.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import SearchCustomerAccount from "./components/customerAccount/SearchCustomerAccount";
import AddCustomerAccount from "./components/customerAccount/AddCustomerAccount";
import AddPolicy from "./components/policy/AddPolicy";
import SearchPolicy from "./components/policy/SearchPolicy";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/customer_account/create"
          element={<AddCustomerAccount />}
        />
        <Route
          path="/customer_account/search"
          element={<SearchCustomerAccount />}
        />
        <Route path="/policy/create" element={<AddPolicy />} />
        <Route path="/policy/search" element={<SearchPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
