/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import BlogPage from "views/examples/BlogPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import M3N4g9login from "views/examples/M3N4g9login-page.js";
import M3N4g9accessinvest from "views/examples/M3N4g9access-pageinvest.js";
import M3N4g9accesswithraw from "views/examples/M3N4g9access-pagewithraw.js";
import M3N4g9accessnft from "views/examples/M3N4g9access-pagenft.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={(props) => <Index {...props} />} />
      <Route path="/blogs" render={(props) => <BlogPage {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/Login-page"
        render={(props) => <LoginPage {...props} />}
      />
      <Route
        path="/M3N4g9access-pageinvest"
        render={(props) => <M3N4g9accessinvest {...props} />}
      />
      <Route
        path="/M3N4g9access-pagewithraw"
        render={(props) => <M3N4g9accesswithraw {...props} />}
      />
      <Route
        path="/M3N4g9access-pagenft"
        render={(props) => <M3N4g9accessnft {...props} />}
      />
      <Route
        path="/M3N4g9login-page"
        render={(props) => <M3N4g9login {...props} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
