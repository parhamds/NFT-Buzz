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
import {useEffect} from 'react';
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Modal,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

import { useState } from "react"; 
import Axios from 'axios';

export default function LoginPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [miniModal, setMiniModal] = React.useState(false);
  const [squares7and8, setSquares7and8] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [miniModalFill, setMiniModalFill] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  },[]);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true

  const loginUser = () => {
    if(email=="" | pass==""){
      setMiniModalFill(true)
    }else{
    Axios.post('http://localhost:3001/login', {
      email:email,
      pass:pass,
    }).then((response) =>{
      if (response.data.message){
        setLoginStatus(response.data.message);
        setMiniModal(true)
      } else {
        window.open("/profile-page","_self")
      }
    });}
  };


  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedIn == true){
        window.open("/profile-page","_self")
      }
    })
  },[])

  return (
    <>



{/* Start Mini Modal Fill */}
<Modal
            modalClassName="modal-mini modal-primary modal-mini"
            isOpen={miniModalFill}
            toggle={() => setMiniModalFill(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setMiniModalFill(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                <i className="tim-icons icon-simple-remove" />
              </div>
            </div>
            <div className="modal-body">
              <p>Please fill All of Mandatory* Fields</p>
            </div>
            <div className="modal-footer">              
              <Button
                color="danger"
                type="button"
                onClick={() => setMiniModalFill(false)}
              >
                Done
              </Button>
            </div>
          </Modal>
          {/* End Mini Modal Fill */}




      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4">!!Login!!"</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            maxLength="100"
                            placeholder="Email*"
                            type="email"
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            maxLength="100"
                            placeholder="Password*"
                            type="password"
                            onChange={(event) => {
                              setPass(event.target.value);
                            }}
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-round" color="primary" size="lg" onClick={loginUser}>
                        Login
                      </Button>

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
                          <p>{loginStatus}</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}

                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
