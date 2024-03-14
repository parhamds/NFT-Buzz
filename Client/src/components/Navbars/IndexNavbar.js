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
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>NFT BUZZ• </span>
            Invest For your Future
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by NFT•BUZZ Team
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  NFT•BUZZ
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="/landing-page"
                rel="noopener noreferrer"
                target="_self"
                title="Follow us on Twitter"
              >
                
                <p className="d-lg-none d-xl-none">Investment Plans</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="/login-page"
                rel="noopener noreferrer"
                target="_self"
                title="Join us on Discord"
              >
                <p className="d-lg-none d-xl-none">Login</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="/register-page"
                rel="noopener noreferrer"
                target="_self"
                title="Follow us on Instagram"
              >
                <p className="d-lg-none d-xl-none">Register</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="/blog-page"
                rel="noopener noreferrer"
                target="_self"
                title="Follow us on Instagram"
              >
                <p className="d-lg-none d-xl-none">Q&A</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                onClick={() => window.open("/blogs","_self")}
              >
                <i className="tim-icons icon-spaceship" /> Q&A
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                onClick={() => window.open("/landing-page","_self")}
              >
                <i className="tim-icons icon-spaceship" /> Investment Plans
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                target="_blank"
                onClick={() => window.open("/register-page","_self")}
              >
                <i className="tim-icons icon-cloud-download-93" /> Register
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                target="_blank"
                onClick={() => window.open("/Login-Page","_self")}
              >
                <i className="tim-icons icon-cloud-download-93" /> Login
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
