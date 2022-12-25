import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes } from './routes/index';
import LayoutMain from "./components/Layout/LayoutMain";


function App() {
  document.title = 'Quản Trị HighTech';
  return (
    <div style={{height:'100%'}}>
      <Router>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const layoutPage = route.layout;
            if (layoutPage === null) {
              return (
                <Route key={index} path={route.path} element={<Page />}></Route>
              );
            }
            if (layoutPage === "MainLayout") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutMain>
                      <Page />
                    </LayoutMain>
                  }
                ></Route>
              );
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
