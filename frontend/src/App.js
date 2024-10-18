import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCategory from "./pages/AddCategory";
import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import ShowCategory from "./pages/ShowCategory";

const App = () => {
  const [categories, setCategories] = useState([]);
console.log(categories,"categories")
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(['Popular']); 
    }
  }, []);

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories)); 
  };

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<DashboardHome categories={categories} />} />
          <Route
            path="/add-category" element={<AddCategory categories={categories} setCategories={updateCategories} />}
          />
          <Route path="/showcategory" element={<ShowCategory categories={categories}/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
