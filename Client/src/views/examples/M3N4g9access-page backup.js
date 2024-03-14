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
import moment from 'moment';
import classnames from "classnames";
import { useState } from "react"; 
import {useEffect} from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Modal,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";

import Axios from 'axios';

// core components
import IndexNavbar from "components/Navbars/ProfileNavbar.js";
import Footer from "components/Footer/Footer.js";


const carouselItems = [
  {
    src: require("assets/img/denys.jpg").default,
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg").default,
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg").default,
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];

let ps = null;

export default function M3N4g9access() {
  const [demoModal, setDemoModal] = React.useState(false);
  const [formModal, setFormModal] = React.useState(false);
  const [miniModalInvest, setMiniModalInvest] = React.useState(false);
  const [tabs, setTabs] = React.useState(1);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  Axios.defaults.withCredentials = true

  
const [investList, setinvestList] = useState([]);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("M3N4g9access-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("M3N4g9access-page");
    };
  },[]);


  const Investadmin = () => {
    Axios.post('http://192.168.56.101:3001/investadmin', {}).then((response) =>{
      setinvestList(response.data)
      console.log(response.data)
    });
  };


  useEffect(()=>{
  Axios.get("http://192.168.56.101:3001/M3N4g9login").then((response)=>{
    if(response.data.loggedIn == false){
      window.open("/m3#N4$g9@login","_self")
    }else{
      console.log("QQQQQQUUUUUUEEEEEERRRRRRRRRRYYYYYYYY")
      Investadmin()
    }
  })
},[])

return (
    <>


      <div className="wrapper">
       
      {investList.map((val,key)=>{
        const column = [
          {heading:"id",value:'id'}
        ]
        return(
        <div key={val.id} className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png").default}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <Container className="align-items-center">
            <Row>
              
              <Col className="ml-auto mr-auto" lg="12" md="6">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >


                        <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Invest
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Tab2
                        </NavLink>
                      </NavItem>
                      
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >

                      <TabPane tabId="tab1">
                        <Table data={val} column={column} className="tablesorter" responsive>

                        </Table>
                      </TabPane>

                      <TabPane tabId="tab2">
                      </TabPane>

                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>


        )
      })}
      </div>
    </>
  );
}
