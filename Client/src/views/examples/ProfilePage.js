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
import MyTable from "components/MyTable";
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

export default function ProfilePage() {
  const [demoModal, setDemoModal] = React.useState(false);
  const [regularNFTModal, setRegularNFTModal] = React.useState(false);
  const [premiumNFTModal, setPremiumNFTModal] = React.useState(false);
  const [miniModalInvest, setMiniModalInvest] = React.useState(false);
  const [tabs, setTabs] = React.useState(1);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [regulaNFTmessageFocus, setregulaNFTmessageFocus] = React.useState(false);
  const [regulaNFTwalletFocus, setregulaNFTwalletFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  Axios.defaults.withCredentials = true
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  },[]);

  var investamount = "0"
  const [hash, setHash] = useState("");
  const [investStatus, setInvestStatus] = useState("");

  const [income0List, setIncome0List] = useState([]);
  const [totall0, settotall0] = useState(0);
  const [profitl0, setprofitl0] = useState(0);
  const [totall1, settotall1] = useState(0);
  const [profitl1, setprofitl1] = useState(0);
  const [totall2, settotall2] = useState(0);
  const [profitl2, setprofitl2] = useState(0);
  const [totall3, settotall3] = useState(0);
  const [profitl3, setprofitl3] = useState(0);
  const [walletid, setwalletid] = useState("");
  const [totalwithraw, settotalwithraw] = useState(0);
  const [totalregularnft, settotalregularnft] = useState(0);
  const [totalpremiumnft, settotalpremiumnft] = useState(0);
  const [withrawamount, setwithrawamount] = useState("");
  const [directtotal, setdirecttotal] = useState(0);
  const [directprofit, setdirectprofit] = useState(0);
  const [income1List, setIncome1List] = useState([]);
  const [income2List, setIncome2List] = useState([]);
  const [income3List, setIncome3List] = useState([]);
  const [miniModaloverwithraw, setMiniModaloverwithraw] = React.useState(false);
  const [miniModalUnsufficientBalance, setMiniModalUnsufficientBalance] = React.useState(false);
  const [miniModalunderwithraw, setMiniModalunderwithraw] = React.useState(false);
  const [miniModaldonewithraw, setMiniModaldonewithraw] = React.useState(false);
  const [miniModaldoneRegularNFT, setMiniModaldoneRegularNFT] = React.useState(false);
  const [miniModalunprocessedwithraw, setminiModalunprocessedwithraw] = React.useState(false);
  const [miniModalunprocessedRegularNFT, setminiModalunprocessedRegularNFT] = React.useState(false);
  const [miniModalNoNFT, setMiniModalNoNFT] = React.useState(false);
  const [miniModalFill, setMiniModalFill] = React.useState(false);
  const [WithrawStatus, setWithrawStatus] = useState("");
  const [nftPhrase, setNFTPhrase] = useState("");
  const [nftwallet, setNFTWallet] = useState("");
  const [regularNFTStatus, setRegularNFTStatus] = useState("");
  const [currentuseridconst, setcurrentuseridconst] = useState("");
  var currentuserinfo = [];
  var currentuserid = "0"
  const [currentusername, setcurrentusername] = useState("");
  const [currentusersurname, setcurrentusersurname] = useState("");
  Axios.defaults.withCredentials = true

  const [nftList, setnftList] = useState([]);

  const collectnft = () => {
    Axios.post('http://127.0.0.1:3001/collectnft', {
      basicid:currentuserid,
    }).then((response) =>{
        setnftList(response.data)
        console.log(response.data)
    });

  };


  const showNFT = () => {
    if (nftList.message){
      console.log(nftList.message)
      console.log("111111111111111111111111111111111111111111111")
      setMiniModalNoNFT(true)
    }else{
      console.log("222222222222222222222222222222222222222222222")
      setDemoModal(true)}};





  const invest = () => {
    if(hash=="" | investamount=="0"){
      setMiniModalFill(true)
    }else{
    Axios.get("http://127.0.0.1:3001/login").then((response)=>{
      if(response.data.loggedIn == false){
        window.open("/login-page","_self")
      }else{
        currentuserinfo = response.data.user["0"]
        currentuserid = response.data.user["0"]["id"]
        setcurrentuseridconst(currentuserid)
        Axios.post('http://127.0.0.1:3001/invest', {
          investamount:investamount,
          hash:hash,
          basicid:currentuserid
        }).then((response) =>{
          setInvestStatus(response.data.message);
          if (response.data.message){
            setMiniModalInvest(true)
          } else {
            setMiniModalInvest(true)
          }
        });
      
      }
    })
  }
  };

  const income0 = () => {
    Axios.post('http://127.0.0.1:3001/income0', {
      basicid:currentuserid,
    }).then((response) =>{
        setIncome0List(response.data)
        
        var sum = 0
        var profittemp=0
        var datedeference=0

        for (let index = 0; index < response.data.length; index++) {
          sum += Number(response.data[index]['investamount'])
          datedeference=fromToday(response.data[index]['investdate'])

          if(Number(response.data[index]['investamount'])==100){
            profittemp += (Number(response.data[index]['investamount']))*0.8*datedeference/100
          }
          if(Number(response.data[index]['investamount'])==200){
            profittemp += (Number(response.data[index]['investamount']))*1*datedeference/100
          }
          if(Number(response.data[index]['investamount'])==500){
            profittemp += (Number(response.data[index]['investamount']))*1.2*datedeference/100
          }

        }

        var profit = parseFloat(profittemp).toFixed(2)
        settotall0(sum)
        setprofitl0(profit)

    });
  };

  const income1 = () => {
    Axios.post('http://127.0.0.1:3001/income1', {
      basicid:currentuserid,
    }).then((response) =>{
        setIncome1List(response.data)
        var sum = 0
        var profittemp=0
        var datedeference=0
        
        for (let index = 0; index < response.data.length; index++) {
          sum += Number(response.data[index]['investamount'])
          datedeference=fromToday(response.data[index]['approvedate'])
          if(Number(response.data[index]['investamount'])==100){
            profittemp += (Number(response.data[index]['investamount']))*16*0.8*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==200){
            profittemp += (Number(response.data[index]['investamount']))*16*1*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==500){
            profittemp += (Number(response.data[index]['investamount']))*16*1.2*datedeference/10000
          }
        }
        var profit = parseFloat(profittemp).toFixed(2)
        settotall1(sum)
        setprofitl1(profit)
        setdirecttotal(sum)
        var directprofittemp=sum*0.05
        var directprofit = parseFloat(directprofittemp).toFixed(2)
        setdirectprofit(directprofit)
    });
  };

  const income2 = () => {
    Axios.post('http://127.0.0.1:3001/income2', {
      basicid:currentuserid,
    }).then((response) =>{
        setIncome2List(response.data)
        var sum = 0
        var profittemp=0
        var datedeference=0
        
        for (let index = 0; index < response.data.length; index++) {
          sum += Number(response.data[index]['investamount'])
          datedeference=fromToday(response.data[index]['approvedate'])

          if(Number(response.data[index]['investamount'])==100){
            profittemp += (Number(response.data[index]['investamount']))*8*0.8*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==200){
            profittemp += (Number(response.data[index]['investamount']))*8*1*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==500){
            profittemp += (Number(response.data[index]['investamount']))*8*1.2*datedeference/10000
          }
        }
        var profit = parseFloat(profittemp).toFixed(2)
        settotall2(sum)
        setprofitl2(profit)
    });
  };

  const income3 = () => {
    Axios.post('http://127.0.0.1:3001/income3', {
      basicid:currentuserid,
    }).then((response) =>{
        setIncome3List(response.data)
        var sum = 0
        var profittemp=0
        var datedeference=0
        
        for (let index = 0; index < response.data.length; index++) {
          sum += Number(response.data[index]['investamount'])
          datedeference=fromToday(response.data[index]['approvedate'])

          if(Number(response.data[index]['investamount'])==100){
            profittemp += (Number(response.data[index]['investamount']))*4*0.8*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==200){
            profittemp += (Number(response.data[index]['investamount']))*4*1*datedeference/10000
          }
          if(Number(response.data[index]['investamount'])==500){
            profittemp += (Number(response.data[index]['investamount']))*4*1.2*datedeference/10000
          }
        }
        var profit = parseFloat(profittemp).toFixed(2)
        settotall3(sum)
        setprofitl3(profit)
    });
  };

  
  function fromToday(date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var date2=new Date()
    var difference = moment(date2).diff(date1)
    return Math.floor(difference / _MS_PER_DAY);
  }

  const column = [
    {heading:'Type',value:'kind'},
    {heading:'Phrase',value:'phrase'},
    {heading:'Link',value:'link'},
  ]

useEffect(()=>{
  Axios.get("http://127.0.0.1:3001/login").then((response)=>{
    if(response.data.loggedIn == false){
      window.open("/login-page","_self")
    }else{
      currentuserinfo = response.data.user["0"]
      currentuserid = response.data.user["0"]["id"]
      setcurrentusername(response.data.user["0"]["name"])
      setcurrentusersurname(response.data.user["0"]["surname"])
      income0()
      income1()
      income2()
      income3()
      totalWithraw()
      totalRegularNFT()
      totalPremiumNFT()
      collectnft()
    }
  })
},[])

const changeInvestAmount = (Amount)=>{investamount=Amount};


const totalWithraw = () => {
  setcurrentuseridconst(currentuserid)
  Axios.post('http://127.0.0.1:3001/totalwithraw', {
    basicid:currentuserid,
  }).then((response) =>{
      var sum = 0
      for (let index = 0; index < response.data.length; index++) {
        if (response.data[index]['rejected']==0){
        sum += Number(response.data[index]['amount'])
        }
      }
      var withraw = parseFloat(sum).toFixed(2)
      settotalwithraw(withraw)
  });
};


const totalRegularNFT = () => {
  setcurrentuseridconst(currentuserid)
  Axios.post('http://127.0.0.1:3001/totalregularnft', {
    basicid:currentuserid,
  }).then((response) =>{
      var amount = Number(response.data.length)
      var sum = amount * 30
      var sumfloat = parseFloat(sum).toFixed(2)
      settotalregularnft(sumfloat)
  });
};

const totalPremiumNFT = () => {
  setcurrentuseridconst(currentuserid)
  Axios.post('http://127.0.0.1:3001/totalpremiumnft', {
    basicid:currentuserid,
  }).then((response) =>{
      var amount = Number(response.data.length)
      var sum = amount * 50
      var sumfloat = parseFloat(sum).toFixed(2)
      settotalpremiumnft(sumfloat)
  });
};

const withraw = () => {
  if(walletid=="" | withrawamount==""){
    setMiniModalFill(true)
  }else{
  var maxwithrawable = Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)-Number(totalwithraw)-Number(totalregularnft)-Number(totalpremiumnft)
  var minwithrawable = 50
  if (withrawamount<=maxwithrawable){
    if(withrawamount>=minwithrawable){
    Axios.post('http://127.0.0.1:3001/withraw', {
      basicid:currentuseridconst,
      wallet:walletid,
      amount:withrawamount,
    }).then((response) =>{
      if (response.data.message){
        setWithrawStatus(response.data.message);
        setminiModalunprocessedwithraw(true)
      } else {
        
        setMiniModaldonewithraw(true)

      }
    });
    }else{
      setMiniModalunderwithraw(true)
    }
  }else{
      setMiniModaloverwithraw(true)
  }}
};


const createRegularNFT = () => {
  if(nftPhrase=="" | nftwallet==""){
    setMiniModalFill(true)
  }else{
  var maxwithrawable =  Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)-Number(totalwithraw)-Number(totalregularnft)-Number(totalpremiumnft)
  var localNFTPhrase = nftPhrase
  var localNFTWallet = nftwallet
  
  if (maxwithrawable>=30){
    Axios.post('http://127.0.0.1:3001/createRegularNFT', {
      basicid:currentuseridconst,
      wallet:localNFTWallet,
      phrase:localNFTPhrase,
      kind:"regular",
      balance:maxwithrawable
    }).then((response) =>{
      if (response.data.message){
        setRegularNFTStatus(response.data.message);
        setminiModalunprocessedRegularNFT(true)
      } else {
        console.log("test")
        setMiniModaldoneRegularNFT(true)
      }
    });
  }else{
      setMiniModalUnsufficientBalance(true)
  }}
};


const createPremiumNFT = () => {
  if(nftPhrase=="" | nftwallet==""){
    setMiniModalFill(true)
  }else{
  var maxwithrawable =  Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)-Number(totalwithraw)-Number(totalregularnft)-Number(totalpremiumnft)
  var localNFTPhrase = nftPhrase
  var localNFTWallet = nftwallet
  
  if (maxwithrawable>=50){
    Axios.post('http://127.0.0.1:3001/createPremiumNFT', {
      basicid:currentuseridconst,
      wallet:localNFTWallet,
      phrase:localNFTPhrase,
      kind:"premium",
      balance:maxwithrawable
    }).then((response) =>{
      if (response.data.message){
        setRegularNFTStatus(response.data.message);
        setminiModalunprocessedRegularNFT(true)
      } else {
        console.log("test")
        setMiniModaldoneRegularNFT(true)
      }
    });
  }else{
      setMiniModalUnsufficientBalance(true)
  }}
};




  return (
    <>
                        {/* Start Mini Modal Over Withraw*/}
                            
                        <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModaloverwithraw}
                        toggle={() => setMiniModaloverwithraw(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModaloverwithraw(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-simple-remove" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>Your requested amount is higher than Maximum withrawable amount</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}


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


{/* Start Mini Modal No NFT */}
<Modal
            modalClassName="modal-mini modal-primary modal-mini"
            isOpen={miniModalNoNFT}
            toggle={() => setMiniModalNoNFT(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setMiniModalNoNFT(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                <i className="tim-icons icon-bell-55" />
              </div>
            </div>
            <div className="modal-body">
              <p>you currently do not have any Created NFT yet.</p>
            </div>
            <div className="modal-footer">              
              <Button
                color="danger"
                type="button"
                onClick={() => setMiniModalNoNFT(false)}
              >
                Done
              </Button>
            </div>
          </Modal>
          {/* End Mini Modal No NFT */}

                      {/* Start Mini Modal unsufficient balance for nft*/}
                            
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModalUnsufficientBalance}
                        toggle={() => setMiniModalUnsufficientBalance(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModalUnsufficientBalance(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-simple-remove" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>You have not enough balance for creating this NFT</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}



                      {/* Start Mini Modal under Withraw*/}
                            
                            <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModalunderwithraw}
                        toggle={() => setMiniModalunderwithraw(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModalunderwithraw(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-simple-remove" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>Your requested amount is lower than Minimum withrawable amount</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}



                      {/* Start Mini Modal done Withraw*/}
                            
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModaldonewithraw}
                        toggle={() => setMiniModaldonewithraw(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModaldonewithraw(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-check-2" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>Successful. your request will be processed ASAP</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}



                      {/* Start Mini Modal done regular NFT*/}
                            
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModaldoneRegularNFT}
                        toggle={() => setMiniModaldoneRegularNFT(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModaldoneRegularNFT(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-check-2" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>Successful. your request will be processed ASAP</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}



                      {/* Start Mini Modal unprocessed withraw */}
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModalunprocessedwithraw}
                        toggle={() => setminiModalunprocessedwithraw(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setminiModalunprocessedwithraw(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-simple-remove" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>{WithrawStatus}</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}



                      {/* Start Mini Modal unprocessed NFT */}
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModalunprocessedRegularNFT}
                        toggle={() => setminiModalunprocessedRegularNFT(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setminiModalunprocessedRegularNFT(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-simple-remove" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>{regularNFTStatus}</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}




                      {/* Start Mini Modal invest */}
                            
                      <Modal
                        modalClassName="modal-mini modal-primary modal-mini"
                        isOpen={miniModalInvest}
                        toggle={() => setMiniModalInvest(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button className="close" onClick={() => setMiniModalInvest(false)}>
                            <i className="tim-icons icon-simple-remove text-white" />
                          </button>
                          <div className="modal-profile">
                            <i className="tim-icons icon-check-2" />
                          </div>
                        </div>
                        <div className="modal-body">
                          <p>{investStatus}</p>
                        </div>
                        
                      </Modal>
                      {/* End Mini Modal */}

      <IndexNavbar />
      <div className="wrapper">
      
        <div className="page-header">
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
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">Start & Monitor Your Bussiness</h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">
                  Offices parties lasting outward nothing age few resolve.
                  Impression to discretion understood to we interested he
                  excellence. Him remarkably use projection collecting. Going
                  about eat forty world has round miles.
                </p>
                <div className="btn-wrapper profile pt-3">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href="https://twitter.com/creativetim"
                    id="tooltip639225725"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip639225725">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="facebook"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href="https://dribbble.com/creativetim"
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
                    Follow us
                  </UncontrolledTooltip>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="5" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <Button
                    className="btn-simple"
                    color="info"
                  >
                    {currentusername} {currentusersurname}
                  </Button>                
                  <Button
                    className="btn-simple"
                    color="warning"
                  >
                  ID : {currentuseridconst}
                  </Button>
                    
                  </CardHeader>
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
                          Income
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          Balance
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 4,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(4);
                          }}
                          href="#pablo"
                        >
                          Withraw
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Row>
                          <Label sm="3">TX HASH*</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                maxLength="64"
                                placeholder="e.g. 1Nasd92348hU984353..."
                                type="text"
                                onChange={(event) => {
                                  setHash(event.target.value);
                                }}
                              />
                              <FormText color="default" tag="span">
                                Enter your TRANSACTION HASH.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount*</Label>
                          <Col sm="9">
                          <FormGroup check className="form-check-radio">
                            <Label check>
                              <Input
                                defaultValue="option1"
                                id="exampleRadios1"
                                name="exampleRadios"
                                type="radio"
                                onClick={() => changeInvestAmount("100")}
                              />
                              <span className="form-check-sign" />
                              100 USDT
                            </Label>
                          </FormGroup>
                          <FormGroup check className="form-check-radio">
                            <Label check>
                              <Input
                                defaultValue="option2"
                                id="exampleRadios1"
                                name="exampleRadios"
                                type="radio"
                                onClick={() => changeInvestAmount("200")}
                              />
                              <span className="form-check-sign" />
                              200 USDT
                            </Label>
                          </FormGroup>
                          <FormGroup check className="form-check-radio">
                            <Label check>
                              <Input
                                defaultValue="option3"
                                id="exampleRadios1"
                                name="exampleRadios"
                                type="radio"
                                onClick={() => changeInvestAmount("500")}
                              />
                              <span className="form-check-sign" />
                              500 USDT
                            </Label>
                          </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                          onClick={invest}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>

                      <TabPane tabId="tab2">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">LEVEL</th>
                              <th className="header">TOTAL INVEST</th>
                              <th className="header">YOUR PROFIT</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                                
                                    <tr>
                                  <td>Yourself</td>
                                  <td>{totall0}</td>
                                  <td>{profitl0}</td>
                                </tr><tr>
                                    <td>DIRECT</td>
                                    <td>{directtotal} USDT</td>
                                    <td>{directprofit} USDT</td>
                                  </tr><tr>
                                    <td>FIRST</td>
                                    <td>{totall1} USDT</td>
                                    <td>{profitl1} USDT</td>
                                  </tr><tr>
                                    <td>SECOND</td>
                                    <td>{totall2} USDT</td>
                                    <td>{profitl2} USDT</td>
                                  </tr><tr>
                                    <td>THIRD</td>
                                    <td>{totall3} USDT</td>
                                    <td>{profitl3} USDT</td>
                                  </tr><tr>
                                    <td>TOTAL</td>
                                    <td>{totall1+totall2+totall3+directtotal+totall0} USDT</td>
                                    <td>{Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)} USDT</td>
                                  </tr>
                          </tbody>
                        </Table>
                      </TabPane>

                      <TabPane tabId="tab3">
                      <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">TITLE</th>
                              <th className="header">AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Principal Invest</td>
                              <td>{totall0} USDT</td>
                            </tr>
                            <tr>
                              <td>Profit</td>
                              <td>{Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)} USDT</td>
                            </tr>
                            <tr>
                              <td>Withraw</td>
                              <td>{Number(totalwithraw)} USDT</td>
                            </tr>
                            <tr>
                              <td>Regular NFT</td>
                              <td>{Number(totalregularnft)} USDT</td>
                            </tr>
                            <tr>
                              <td>Premium NFT</td>
                              <td>{Number(totalpremiumnft)} USDT</td>
                            </tr>
                            <tr>
                              <td>Balance</td>
                              <td>{parseFloat(Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)-Number(totalwithraw)-Number(totalregularnft)-Number(totalpremiumnft)).toFixed(2)} USDT</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>

                      <TabPane tabId="tab4">
                        <Row>
                          <Label sm="3">Wallet ID*</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                maxLength="40"
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                                onChange={(event) => {
                                  setwalletid(event.target.value);
                                }}
                              />
                              <FormText color="default" tag="span">
                              Enter your USDT wallet address on TRC20 NET.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount*</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                maxLength="5"
                                placeholder="USDT"
                                type="text"
                                onChange={(event) => {
                                  setwithrawamount(event.target.value);
                                }}
                              />
                              <FormText color="default" tag="span">
                              Minimum withrawable amount = 50 USDT<br></br>
                              Your balance = {parseFloat(Number(profitl1)+Number(profitl2)+Number(profitl3)+Number(directprofit)+Number(profitl0)-Number(totalwithraw)-Number(totalregularnft)-Number(totalpremiumnft)).toFixed(2)} USDT
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                          onClick={withraw}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
       
          <Modal isOpen={demoModal} toggle={() => setDemoModal(false)}>
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setDemoModal(false)}>
                <i className="tim-icons icon-simple-remove" />
              </button>
              <h4 className="title title-up">My NFTs</h4>
            </div>
            <div className="modal-body">
              <MyTable data={nftList} column={column}/>
            </div>
            <div className="modal-footer">
            <Button className="btn-neutral" color="link" type="button" onClick={() => setDemoModal(false)}>
                Close
              </Button>              
              <Button
                color="danger"
                type="button"
                onClick={() => window.open("https://opensea.io/login?referrer=%2Faccount")}
              >
                See On OpenSea
              </Button>
            </div>
          </Modal>


          {/* Start regular nft Modal */}
          <Modal
            modalClassName="modal-black"
            isOpen={regularNFTModal}
            toggle={() => setRegularNFTModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setRegularNFTModal(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">Please insert your phrase</h3>
              </div>
            </div>
            <div className="modal-body">
              <div className="text-center text-muted mb-4 mt-3">
                <small>Our AI Engine will create an image based on your phrase</small>
              </div>

              <Form role="form">
                <FormGroup className="mb-3">
              <Row>
                          <Label sm="3">Phrase*</Label>
                          <Col sm="9">
                          <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": regulaNFTmessageFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxLength="100"
                      placeholder="Max 100 Characters"
                      type="email"
                      onFocus={(e) => setregulaNFTmessageFocus(true)}
                      onBlur={(e) => setregulaNFTmessageFocus(false)}
                      onChange={(event) => {
                        setNFTPhrase(event.target.value);
                      }}
                    />
                  </InputGroup>
                            
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Wallet ID*</Label>
                          <Col sm="9">
                          <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": regulaNFTwalletFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-bank" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxLength="40"
                      placeholder="e.g. 1Nasd92348hU984353hfid"
                      type="text"
                      onFocus={(e) => setregulaNFTwalletFocus(true)}
                      onBlur={(e) => setregulaNFTwalletFocus(false)}
                      onChange={(event) => {
                        setNFTWallet(event.target.value);
                      }}
                    />
                  </InputGroup>


                          </Col>
                        </Row>

                        </FormGroup>


                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button" onClick={createRegularNFT}>
                      Create NFT
                    </Button>
                  </div>

                  </Form>
                  </div>
                  </Modal>
                  {/* End regular nft Modal */}




          {/* Start premium nft Modal */}
          <Modal
            modalClassName="modal-black"
            isOpen={premiumNFTModal}
            toggle={() => setPremiumNFTModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setPremiumNFTModal(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">Please insert your phrase</h3>
              </div>
            </div>
            <div className="modal-body">
              <div className="text-center text-muted mb-4 mt-3">
                <small>Our AI Engine will create an image based on your phrase</small>
              </div>

              <Form role="form">
                <FormGroup className="mb-3">
              <Row>
                          <Label sm="3">Phrase*</Label>
                          <Col sm="9">
                          <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": regulaNFTmessageFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxLength="100"
                      placeholder="Max 100 Characters"
                      type="email"
                      onFocus={(e) => setregulaNFTmessageFocus(true)}
                      onBlur={(e) => setregulaNFTmessageFocus(false)}
                      onChange={(event) => {
                        setNFTPhrase(event.target.value);
                      }}
                    />
                  </InputGroup>
                            
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Wallet ID*</Label>
                          <Col sm="9">
                          <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": regulaNFTwalletFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-bank" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxLength="40"
                      placeholder="e.g. 1Nasd92348hU984353hfid"
                      type="email"
                      onFocus={(e) => setregulaNFTwalletFocus(true)}
                      onBlur={(e) => setregulaNFTwalletFocus(false)}
                      onChange={(event) => {
                        setNFTWallet(event.target.value);
                      }}
                    />
                  </InputGroup>


                          </Col>
                        </Row>

                        </FormGroup>


                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button" onClick={createPremiumNFT}>
                      Create NFT
                    </Button>
                  </div>

                  </Form>
                  </div>
                  </Modal>
                  {/* End premium nft Modal */}



        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">NFT Section</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                  An artist of considerable range, Ryan — the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure.<br></br><br></br>* You need 30 USDT for Creating Regular NFT and 50 USDT for Premium NFT
                </p>

                <div className="btn-wrapper pt-3">

                <Button
                    className="btn-simple"
                    color="info"
                    href="#pablo"
                    onClick={showNFT}
                  >
                    <i className="tim-icons icon-bulb-63" /> My NFTs
                  </Button>
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={() => setRegularNFTModal(true) }
                  >
                    <i className="tim-icons icon-book-bookmark" /> Regular NFT
                  </Button>
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={() => setPremiumNFTModal(true)}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Premium NFT
                  </Button>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
                <Footer />
      </div>
    </>
  );
}
