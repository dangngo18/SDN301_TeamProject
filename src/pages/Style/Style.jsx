import { HeaderAfterLogin } from "../../components/Header";
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
import PostCard from "./PostCard";
// import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Macy from "macy";
import { StylePostMasonryLoop } from "../../components/Post_loop";

export default function Style() {
  const ForYou = [
    {
      name: "@h_anh",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      name: "@h_anh",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      name: "@h_anh",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },

    {
      name: "@h_dang",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      name: "@h_anh",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      name: "@h_dang",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
  ];

  const postPopular = [
    {
      name: "@a_khoi",
      title: "hihi",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "hihi",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "hihi",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "hihi",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },
  ];

  const postNewest = [
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },

    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
    },

    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
      heihgt: 384,
    },
    {
      name: "@a_khoi",
      title: "haha",
      avt: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
      imgURL:
        "https://videos.pexels.com/video-files/2098988/2098988-uhd_2560_1440_30fps.mp4",
      lover: "123",
      heihgt: 285,
    },
  ];
  const [activeKey, setActiveKey] = useState("forYou");

  useEffect(() => {
    // Thiết lập activeKey mặc định khi component được render lần đầu
    setActiveKey("forYou");
  }, []);

  const [activeTab, setActiveTab] = useState("forYou");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <HeaderAfterLogin />
      <section className="project" id="project">
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
                activeKey={activeTab}
                onSelect={handleTabSelect}
              >
                <Nav className="nav-menu" activeKey={activeTab}>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="forYou"
                      className={`nav-link ${
                        activeKey === "forYou" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("forYou")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/44c2/71d2/489c60ba24ded805f0dcf490f0ff3d7b?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtVBjJkMIrRrZjkOf46jm2hZH9Xl7RXwP1xwghJJ8xk1tm~vqQApIckjURmmbvxM7cz-Aw7sQ5nDHuYod7wAO2gT5czIwA2f4g8ZxtHCIl3SvtvoMZjmDqS-OlPhVQrgHReJ1O8XXmYlTLka778SJii6~~bZ2PAr5QvQOTH-EDjOyEpCq2axzGnUtSFuI68A9urHfqM0VhFFlHDod~18u4DNI3uzgVbg76yNSLJpK6HsQr~~aNoSw63jwXrBckeho37B0fv-SwNkgvUi55Oaw1FkvfdUemXxJzMbftUIRwyw8ASePhGrEGC-YFfXTv6u0pWklxsTIXwbrBw2AH3LGQ__"
                          alt="for you"
                        />{" "}
                        For you{" "}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="following"
                      className={`nav-link ${
                        activeKey === "following" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("following")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/00ff/a571/9c79eb8d34dc7bd9c0624280f37341c4?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oT~8ZBKzYj6OK8t8Ck7a1xmB-Lds4kZcXE7xqvrGzgx7xJ0ZEAh7r6uGgpvWRcBB1MdCEqF7U8RzVXAu~AF6IoJftjRN9u8Oeq1FyplxtEeDpMcc6Th3iBrHKyDNW~vX0csqv~gISeXGEq1TjNC0JZS-DbmHis1h05T6YtablGkN-U868sJZu6FbKoX6ue~8HeKZvZac1QhBqiBGpcb8TEcvj8-6fp-D4aA2rJfAmLQDqeSkyYEKlcSwUmMFlrDuy67yFEXdLGtwH96uB5EDLJteDigzL8e7dXfbidtZH0aXtvTZGcl71iNCWaU7qfGdvwirwVaoPGtqubP54enJow__"
                          alt="following"
                        />{" "}
                        Following
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="friend"
                      className={`nav-link ${
                        activeKey === "friend" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("friend")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/15ed/62af/1f3d40ccd3d2af25a511d2f310f88627?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OgR307Q5nAheBGZXqDQCppPDMLeEfiC0nUYsaxsujcV6EhaN0vUiN7i3REJ0jubE5j6GN50r3SP4hge5FIVHMCfIQrVw9x5Y~IolwbvVzT50asUYeK9S9hmBalmV9CiMq0ma0IRydXx8eBaEcxIQsaYUcNAnZoeD~ZqDew7Tm9LXeHNVEx0z7iSri7rZ9rCPMQcvwrNks8WotTCjsBXri8yi7Q5~dOdOCVEL7Bsi5JmxVzXP6RMgjVU000F7ImSrP-kVlvXTfiHP0fWypSy7EThzh0xU9Qn-L~x-CxaM1Sd3hibufb3yjvbsQ35OTGTHmNGs9eC7JsTfexf1Q9WKEQ__"
                          alt="friend"
                        />{" "}
                        Friend
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="trending"
                      className={`nav-link ${
                        activeKey === "trending" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("trending")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/a6ff/253f/ace782000e117b310223e76bec7fd78c?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E1y21IC~9EQyhsUyYbIQhdyBNusUoOSr~x3uV8b8kdfQmJjQChKUjSvoPWo4CYDL8Dfwwyf7lOcvcjM4kWplXVec5sM~WyZlBA6jDd5pdYa4izD5TuX~im2EYPP-nAb3NbNTdR-5IhhfxHEsyPcjQwu3kgfYT5ty~0XGluDMhgZAKCv6HKlDpvTfBnvhgUMZ8EjYMzu6UFRQWAhSCt9g8zMkxuc57vo-ra0N26KSUevVGzvE2wxMH2YwKf2ma7OuYMdiWT6TpjOvgw7pMd5sSFrP7J-kyOt0NZ-iiLoDBViKjoCUjL9BUKduqcm-HVLgKTlG2HIb-okz3ihyPHzOzw__"
                          alt="trending"
                        />{" "}
                        Trending
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="bag"
                      className={`nav-link ${
                        activeKey === "bag" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("bag")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/007d/2932/53a80108078c37d69974fc753f0117ee?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bfNTQAFtGHAa0wB-C5WOAN3Y7-kqmr5aedzNK-6TnotzcRtX9KiDV1O33NdDn5H0CPb4VX7dY23AT~8Hk2w05m6Bc3X1FyBJ8tDK479465HFuDeduc7MD3J7QhSq9ORsoS2q7UE09zZFEK10AgwODaP25u6L6g91ES-wizyrCz5DJ17XoVzg6uROg63WRScqFL85bNAmEOtY2rLAI4buS1OKFTeoBdl7BFHxv9HudY9K70zGQkk7VWC9Mcv2HuQlc0eQQRe0IdaFiuYJDjKb7uHXHFHMr11Y7GuODIIp16f-811TckJ1tCn2KRGlYDZIbmz3XvayyYaOmxDRNpwRoA__"
                          alt="bag"
                        />{" "}
                        Bag
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      eventKey="accessory"
                      className={`nav-link ${
                        activeKey === "accessory" ? "active" : ""
                      }`}
                      onClick={() => setActiveKey("accessory")}
                    >
                      <span>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/c22d/9a6b/4601ef476d410071609fd760a94e206b?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kclaspq8ixY8p-tFoMVft3Z~3AuPArWGauE0gPzXFXFc6Z0AYJIp8N1Iv54pMhBy29EZRgvyCUOtDRAr9CL5UFYghZjl0H9nQVn2jhnCzhhYUTlEqeuRawPkfvo2YoPseAnkgPTZW1E~U4kOQ5hdwEBq1l-MEmdUNLjHs57htfLqDrGeICgQMqTbNFredfVCEFX8Pp1IfB~-0F5vWt-jqzkF8oN628RGl156UUhEYRkQF21~SSY3UdYjU9lTyLFo23S0ujP-f32XWWFrmPHfgApZAajIBxsnLSs~ibI37jz8KNeYAQJN7sJMQGkQpxqu62lqhEFYiJrTyHDhWDd0rw__"
                          alt="bag"
                        />{" "}
                        Accessory
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="tab-content">
                  <Tab.Pane className="tab-pane" eventKey="forYou">
                    <div className="str-container">
                      <Row
                        className="row"
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
                    </div>

                    <TabContainer
                      className="tab-container"
                      defaultActiveKey="Popular"
                    >
                      <Nav className="sub-post">
                        <NavItem className="sub-item1">
                          <Nav.Link eventKey="Popular" className="nav-link">
                            <span>Popular</span>
                          </Nav.Link>
                        </NavItem>

                        <NavItem className="sub-item2">
                          <Nav.Link eventKey="Newest">
                            <span>Newest</span>
                          </Nav.Link>
                        </NavItem>
                      </Nav>
                      <Col sm={12}>
                        <div className="postListContainer">
                          <div className="listContainer">
                            <Tab.Content className="post-content">
                              <Tab.Pane className="tab-pane" eventKey="Popular">
                                <StylePostMasonryLoop Posts={postPopular} />
                              </Tab.Pane>
                              <Tab.Pane className="tab-pane" eventKey="Newest">
                                <div className="postMacyContainer">
                                  <StylePostMasonryLoop Posts={postNewest} />
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </div>
                      </Col>
                    </TabContainer>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane" eventKey="following">
                    <Row className="row">
                      <span>Updating...</span>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane" eventKey="friend">
                    <Row>
                      <span>Updating...</span>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane" eventKey="trending">
                    <Row>
                      <span>Updating...</span>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane" eventKey="bag">
                    <Row>
                      <span>Updating...</span>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane" eventKey="accessory">
                    <Row>
                      <span>Updating...</span>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
}
