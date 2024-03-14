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
import classnames from "classnames";
// reactstrap components
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function Tabs() {
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [textTabs, setTextTabs] = React.useState(4);
  return (
    <div className="section section-tabs">
      <Container>

        <Row>
          <Col className="ml-auto mr-auto" md="16" xl="10">

            <Card>
              <CardHeader>
                <Nav className="nav-tabs-info" role="tablist" tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 1,
                      })}
                      onClick={(e) => setIconsTabs(1)}
                      href="#pablo"
                    >
                      <i className="tim-icons icon-spaceship" />
                      Staking
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 2,
                      })}
                      onClick={(e) => setIconsTabs(2)}
                      href="#pablo"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                      Yield farming
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 3,
                      })}
                      onClick={(e) => setIconsTabs(3)}
                      href="#pablo"
                    >
                      <i className="tim-icons icon-bag-16" />
                      NFT Staking
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                  <TabPane tabId="link1">
                    <p>
                    • Staking offers crypto holders a way of putting their digital assets to work and earning passive income without needing to sell them.<br /><br />
                    • when you stake your digital assets, you lock up the coins in order to participate in running the blockchain and maintaining its security. In exchange for that, you earn rewards calculated in percentage yields. These returns are typically much higher than any interest rate offered by banks.<br /><br />
                    • Staking has become a popular way to make a profit in crypto without trading coins. As of April 2022, the total value of cryptocurrencies staked exceeded the $280 billion threshold, according to Staking Rewards.<br /><br />
                    </p>
                  </TabPane>
                  <TabPane tabId="link2">
                    <p>
                    • Yield farming is the process of using decentralized finance (DeFi) to maximize returns. Users lend or borrow crypto on a DeFi platform and earn cryptocurrency in return for their services.<br /><br />
                    • Yield farmers who want to increase their yield output can employ more complex tactics. For example, yield farmers can constantly shift their cryptos between multiple loan platforms to optimize their gains.<br /><br />
                    • Yield farming allows investors to earn yield by putting coins or tokens in a decentralized application, or dApp. Examples of dApps include crypto wallets, DEXs, decentralized social media and more.<br /><br />
                    • Yield farmers generally use decentralized exchanges (DEXs) to lend, borrow or stake coins to earn interest and speculate on price swings. Yield farming across DeFi is facilitated by smart contracts — pieces of code that automate financial agreements between two or more parties.<br /><br />
                    </p>
                  </TabPane>
                  <TabPane tabId="link3">
                  <h3>
                    • What is NFT staking?</h3><p>
Staking your NFTs is a way to put your unique token to work on the blockchain. Often NFTs areassociated with digital images, such as the Bored Ape Yacht Club collection, but they can be all kinds of objects, from digital art to video files to items in a game. NFT staking means that you attach your nonfungible tokens to a platform or protocol. In exchange for this action, you receive staking rewards. In this way, you can earn extra while you remain the owner of the NFT.<br /><br />
You can compare this way of staking with decentralized finance (DeFi) yield farming, where cryptocurrencies are lent or deployed to liquidity providers to earn rewards through interest or the transaction costs incurred by others. This way of earning interest is similar to that earned through a bank but in this case, there is no middleman. NFT staking belongs to the decentralized finance world while the banking form is centralized.<br /><br />
<h3>
• How does NFT staking work?</h3>
NFT staking works the same as staking cryptocurrencies because NFTs are tokenized assets. Also, for NFTs, not every nonfungible token can be staked, just as this is not possible for every token. Because NFTs are tokenized assets, you can deploy them on NFT staking platforms where you can keep them safe. This is possible via a smart contract on the appropriate blockchain protocol.<br /><br />
Even though staking NFTs is a relatively new concept, many NFT holders are very excited about this development. That is because a nonfungible token is unique, making holders reluctant to sell. This is the big difference with cryptocurrencies, where you can easily buy and sell crypto. To stake NFTs, you need a crypto wallet, which must be suitable for the NFT in question.<br /><br />
First, check if your favorite wallet also fits the blockchain on which the NFT is located. Then you need to connect the wallet to the staking platform so you can send your NFTs to the platform. This operation can be compared to staking your coins. Both can be performed by going to the staking section of the platform.<br /><br />
<h3>• How to earn passive income staking NFTs?</h3>
If you have NFTs in your crypto wallet, you can use them to earn passive income. NFT staking is the newest way to build passive income with blockchain technology. With any source of such income, you must make an investment upfront Although this can be in money or in time, a passive income through NFTs is primarily achieved through an investment with money. When looking for a way to build passive income.<br /><br />

                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
