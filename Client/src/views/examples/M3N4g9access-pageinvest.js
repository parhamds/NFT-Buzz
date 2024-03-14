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
import MyTable from "components/MyTable";
import { getConstantValue } from "typescript";

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

export default function M3N4g9accessinvest() {
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
    document.body.classList.toggle("M3N4g9access-pageinvest");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("M3N4g9access-pageinvest");
    };
  },[]);


  const Investadmin = () => {
    Axios.post('http://127.0.0.1:3001/investadmin', {}).then((response) =>{
      setinvestList(response.data)
      console.log(response.data)
    });
  };
  
const [approvedid, setapprovedid] = React.useState("");
const [rejectedid, setrejectedid] = React.useState([]);


  const [miniModal, setMiniModal] = React.useState(false);
   
              {/* Start Mini Modal */}
              <Modal
            modalClassName="modal-mini modal-primary modal-mini"
            isOpen={miniModal}
            toggle={() => setMiniModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setMiniModal(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                <i className="tim-icons icon-single-02" />
              </div>
            </div>
            <div className="modal-body">
              <p>Your Account Succesfully Created</p>
            </div>
            <div className="modal-footer">
              <Button className="btn-neutral" color="link" type="button" onClick={() => window.open("/landing-page","_self")}>
                plans
              </Button>              
              <Button
                color="danger"
                type="button"
                onClick={() => window.open("/profile-page","_self")}
              >
                Profile
              </Button>
            </div>
          </Modal>
          {/* End Mini Modal */}

  const approveinvest = () => {
      Axios.post('http://127.0.0.1:3001/approveinvest', {
        id:approvedid
      }).then(() =>{
        window.open("/M3N4g9access-pageinvest","_self")
      });
  };

  const rejectinvest = () => {
    Axios.post('http://127.0.0.1:3001/rejectinvest', {
      id:rejectedid
    }).then(() =>{
      window.open("/M3N4g9access-pageinvest","_self")
    });
};



  useEffect(()=>{
  Axios.get("http://127.0.0.1:3001/M3N4g9login").then((response)=>{
    if(response.data.loggedIn == false){
      window.open("/M3N4g9login-page","_self")
    }else{
      console.log("QQQQQQUUUUUUEEEEEERRRRRRRRRRYYYYYYYY")
      Investadmin()
    }
  })
},[])

const column = [
  {heading:'id',value:'id'},
  {heading:'basicid',value:'basicid'},
  {heading:'investamount',value:'investamount'},
  {heading:'hash',value:'hash'},
  {heading:'investdate',value:'investdate'},
  {heading:'approved',value:'approved'},
  {heading:'rejected',value:'rejected'},
]


return (
    <div>
      <h1>INVEST</h1>

      <FormGroup>
       <Input
       placeholder="id"
                                onChange={(event) => {
                                  setapprovedid(event.target.value);
                                }}
                              />
                              <FormText color="default" tag="span">
                                Enter id of confirmed invests.
                              </FormText>
      </FormGroup>

      <Button onClick={approveinvest}>
                        approve
      </Button>
      
      <FormGroup>
       <Input
       placeholder="id"
                                onChange={(event) => {
                                  setrejectedid(event.target.value);
                                }}
                              />
                              <FormText color="default" tag="span">
                                Enter id of rejected invests.
                              </FormText>
      </FormGroup>
      <Button onClick={rejectinvest}>
                        reject
      </Button>
      
      <MyTable data={investList} column={column}/>
    </div>
  );
}
