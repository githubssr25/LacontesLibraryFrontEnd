import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaterialList from "./components/tickets/MaterialList";
import MaterialDetails from "./components/tickets/MaterialDetails";
import CreateMaterial from "./components/tickets/CreateMaterial";
import ViewAllPatrons from "./components/patrons/ViewAllPatrons";
import EditPatronInfo from "./components/patrons/EditPatronInfo"
import ViewCheckouts from "./components/checkouts/ViewCheckouts"
import BrowseCheckouts from "./components/checkouts/BrowseCheckouts"
import CreateCheckout from "./components/checkouts/CreateCheckout"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="materials">
          <Route index element={<MaterialList />} />
          <Route path=":id" element={<MaterialDetails />} />
          <Route path="create" element={<CreateMaterial />} />
        </Route>
        <Route path="/allPatrons" element={<ViewAllPatrons />} />
        <Route path="/editPatrons" element={<EditPatronInfo />} />
        <Route path="/viewCheckouts" element={<ViewCheckouts />}/>
        <Route path="/browseCheckouts" element={<BrowseCheckouts />} />
        <Route path="/createCheckout/:materialId" element={<CreateCheckout />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
