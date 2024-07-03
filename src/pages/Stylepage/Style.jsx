import { HeaderforStyle } from "../../components/Header";
import { Icon } from "../../assets/icon/icons";
import {
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  Tab,
  TabContainer,
} from "react-bootstrap";
import Footer from "../../components/Footer";
import "../../assets/styles/Style.scss";
import StrCard from "./StrCard";
import { StylePostMasonryLoop } from "../../components/Post_loop";
import { useState, useEffect } from "react";
import { ForYou, postPopular, postNewest } from "../../Test/Jsontest";
import Main from "../../ultils/container";

export default function Style() {
  const [activeKey, setActiveKey] = useState("forYou");

  useEffect(() => setActiveKey("forYou"), []);

  const renderNavItem = (eventKey, icon, title) => (
    <Nav.Item className="nav-item">
      <Nav.Link
        eventKey={eventKey}
        className={`nav-link ${activeKey === eventKey ? "active" : ""}`}
        onClick={() => setActiveKey(eventKey)}
      >
        <span>
          {icon} {title}
        </span>
      </Nav.Link>
    </Nav.Item>
  );

  const renderTabPane = (eventKey, content) => (
    <Tab.Pane className="update-container" eventKey={eventKey}>
      <Row className="update-row">{content || <span className="update">Updating...</span>}</Row>
    </Tab.Pane>
  );

  return (
    <Main>
      <main className="project" id="project">
        <Container className="container">
          <Row className="str-container">
            <Col>
              <div>
                <h2>Style</h2>
              </div>
              <Tab.Container
                className="tab-container"
                id="projects-tabs"
                defaultActiveKey="forYou"
              >
                <Nav className="menuHeader">
                  {renderNavItem(
                    "forYou",
                    <span className="icon">{Icon.House}</span>,
                    "For you"
                  )}
                  {renderNavItem("following", Icon.Following, "Following")}
                  {renderNavItem("friend", Icon.Friend, "Friend")}
                  {renderNavItem("trending", Icon.Trending, "Trending")}
                  {renderNavItem("bag", Icon.Bag, "Bag")}
                  {renderNavItem("accessory", Icon.Accessory, "Accessory")}
                </Nav>
                <Tab.Content className="tab-content">
                  {renderTabPane(
                    "forYou",
                    <div className="str-container">
                      <Row
                        className="str"
                        style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                      >
                        {ForYou.slice(0, 6).map((item, index) => (
                          <StrCard
                            className="projectCard"
                            key={index}
                            {...item}
                          />
                        ))}
                      </Row>
                      <TabContainer
                        className="tab-container"
                        defaultActiveKey="Popular"
                      >
                        <Nav className="sub-post">
                          <NavItem className="sub-item1">
                            <Nav.Link eventKey="Popular" className="Popular">
                              <span>Popular</span>
                            </Nav.Link>
                          </NavItem>
                          <NavItem className="sub-item2">
                            <Nav.Link eventKey="Newest" className="Newest">
                              <span>Newest</span>
                            </Nav.Link>
                          </NavItem>
                        </Nav>
                        <Col sm={12}>
                          <div className="postListContainer">
                            <div className="listContainer">
                              <Tab.Content className="post-content">
                                <Tab.Pane
                                  className="tab-pane"
                                  eventKey="Popular"
                                >
                                  <StylePostMasonryLoop Posts={postPopular} className="post"/>
                                </Tab.Pane>
                                <Tab.Pane
                                  className="tab-pane"
                                  eventKey="Newest"
                                >
                                  <StylePostMasonryLoop Posts={postNewest} className="post"/>
                                </Tab.Pane>
                              </Tab.Content>
                            </div>
                          </div>
                        </Col>
                      </TabContainer>
                    </div>
                  )}
                  {renderTabPane("following")}
                  {renderTabPane("friend")}
                  {renderTabPane("trending")}
                  {renderTabPane("bag")}
                  {renderTabPane("accessory")}
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </main>
    </Main>
  );
}
