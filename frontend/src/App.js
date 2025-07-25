import React from "react";  
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Footer from "./components/footer"; 

const App = () => {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <Header />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
