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

// reactstrap components
import { Container } from "reactstrap";
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  Button,
  NavItem,
  NavLink,
} from "reactstrap";


export default function PageHeader() {
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">NFT•BUZZ</h1>
          <h3 className="d-none d-sm-block">
            Wanna Change Your Future ?
          </h3>  
            <Button
              className="btn-round"
              color="info"
              href="/landing-page"
              role="button"
              size="lg"
            >
              Click Here To Discover
            </Button>
        </div>
      </Container>
    </div>
  );
}
