import React from "react";
import jsonp from "jsonp";
import ExampleWithLightbox from "./ExampleWithLightbox";
import henna from "./henna-painted-hand.svg";
import bride from "./wedding.svg";
import wedding from "./indian.svg";
import samosa from "./samosa.svg";
import heart from "./heart.svg";
import floor from "./floor.svg";
import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import $ from "jquery";
import "./example.css";
// import "./slick.css"
import "./css/slick-theme.css"
// import "./style.css"
import "./css/style.css"
import "./css/animate.css"
import "./css/flaticon.css"
import "./css/font-awesome.min.css"
import "./css/bootstrap.min.css"
import "./css/magnific-popup.css"
import "./css/owl.carousel.css"
import WOW from 'wowjs';


class App extends React.Component {
  constructor() {
    super();
    this.state = { width: -1, photos: [], currentPage: 1, photosPerPage: 69 };
    this.loadPhotos = this.loadPhotos.bind(this);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // mehendi photos
    this.loadPhotos("72157714640654906", "account1");
   
    setTimeout(function(){ 
      const elem = $("li.number-link")
      $(elem[0]).attr("class", "number-link-active")
    }, 1000);

    this.preloader()

    // let x = elem[0]

  }

  popupSaveTheDateCircle() {
    var saveTheDateCircle = $(".save-the-date");
    saveTheDateCircle.addClass("popup-save-the-date");
  }

   preloader() {
    if($('.preloader').length) {
        $('.preloader').delay(100).fadeOut(500, function() {
        
            //active wow
            var wow = new WOW.WOW();
            wow.init();

            if($(".save-the-date").length) {
              var saveTheDateCircle = $(".save-the-date");
              saveTheDateCircle.addClass("popup-save-the-date");
            }

        });
    }
}

  handleClick(event) {
    // $(window).scrollTop(0, '100vh')
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#nav").offset().top
      },
      2000
    );
    let currElem = $(".number-link-active");
    if (currElem) {
      $(currElem).attr("class", "number-link");
    }
    const elem = $("#page-numbers li");
    $(elem[event.target.id - 1]).attr("class", "number-link-active");
    this.setState({
      currentPage: event.target.id
    });
  }

  // not used
  handleNavClick(event) {
    let currElem = $("ul.navbar li.active");
    for (const li of currElem) {
      li.classList.remove("active");
    }
    event.currentTarget.classList.add("active");

    setTimeout(function(){ 
    const elem = $("#page-numbers li");
      $(elem[0]).attr("class", "number-link-active")
    }, 1000);
  }

  loadPhotos(photoset_id, account, e) {
    this.setState({ currentPage: 1 });
    if (e) {
      let currElem = $("ul.navbar li.active");
      for (const li of currElem) {
        li.classList.remove("active");
      }
      e.currentTarget.classList.add("active");
      // setTimeout(function(currentPage) { 
        const elem = $("#page-numbers li.number-link-active");
        for (const li of elem) {
          li.classList.remove("number-link-active");
        }
        const elemNotActive = $("#page-numbers li");

          $(elemNotActive[0]).attr("class", "number-link-active")
          // let currentPageElement = $(elem[this.state.currentPage - 1])
          // console.log(this.state.currentPage)
          // console.log(currentPageElement)
        // }, 1000);
    } else {
      let mehendiElem = $("li.mehendi")
      mehendiElem.addClass("active");
     
      // const elem = $("li#1");
      // setTimeout(function(){  $(elem).attr("class", "number-link-active"); }, 3000);
      // setTimeout(function(){ 
      //   const elem = $("#page-numbers li");
      //     $(elem[0]).attr("class", "number-link-active")
      //   }, 1000);
    }
    // mehendi
    if (photoset_id === "72157714640654906") {
      this.setState({ photosPerPage: 48 });
    }
    // wedding
    if (photoset_id === "72157714642026603") {
      this.setState({ photosPerPage: 120 });
    }
    // sangeet
    if (photoset_id === "72157714641822212") {
      this.setState({ photosPerPage: 120 });
    }
    // reception
    if (photoset_id === "72157714641076231") {
      this.setState({ photosPerPage: 120 });
    }
    if (photoset_id === "72157714386479743") {
      this.setState({ photosPerPage: 68 });
    }
    let urlParams;
    if (account === "account1") {
      urlParams = {
        api_key: "e2e05e02d85c1df8c9cae4f4792b6d49",
        photoset_id: photoset_id,
        // photoset_id: "72157714386479743",
        user_id: "188602664@N08",
        format: "json",
        per_page: "600",
        extras: "url_m,url_c,url_l,url_h,url_o"
      };
    } else {
      urlParams = {
        api_key: "1c6b2276693aebd622b79c81c44b4250",
        photoset_id: photoset_id,
        // photoset_id: "72157714386479743",
        user_id: "188893556@N08",
        format: "json",
        per_page: "600",
        extras: "url_m,url_c,url_l,url_h,url_o"
      };
    }

    let url =
      "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos";
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + "&" + item + "=" + urlParams[item];
    }, url);

    jsonp(url, { name: "jsonFlickrApi" }, (err, data) => {
      let photos = data.photoset.photo.map(item => {
        let aspectRatio = parseFloat(item.width_o / item.height_o);
        return {
          src: item.url_l,
          width: parseInt(item.width_o),
          height: parseInt(item.height_o),
          title: item.title,
          alt: item.title,
          key: item.id,
          srcSet: [
            `${item.url_m} ${item.width_m}w`,
            `${item.url_c} ${item.width_c}w`,
            `${item.url_l} ${item.width_l}w`,
            `${item.url_h} ${item.width_h}w`
          ],
          sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
        };
      });
      this.setState({
        photos: photos
      });
    });
  }
  render() {
    const { photos, currentPage, photosPerPage } = this.state;

    // Logic for displaying current photos
    const indexOfLastTodo = currentPage * photosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number, index) => {
      return (
        <li
          className={"number-link"}
          key={number}
          id={number}
          onClick={e => this.handleClick(e)}
        >
          {number}
        </li>
      );
    });

    if (this.state.photos) {
      const width = this.state.width;
      return (
        <div className="App">

<div class="preloader">
            <div class="inner">
                <span class="icon"><i class="fi flaticon-two"></i></span>
            </div>
        </div>

<section class="hero">
            <div class="hero-slider hero-slider-s1">
                <div class="slide-item">
                    <img src="./images/ours/IMG_4334.jpeg" alt class="slider-bg"/>
                </div>

                <div class="slide-item">
                    <img src="images/ours/IMG_4321.jpg" alt class="slider-bg"/>
                </div>
            </div>
            <div class="wedding-announcement">
                <div class="couple-name-merried-text">
                    <h2 className="wow slideInUp" data-wow-duration="1s">Komal &amp; Anand</h2>
                    <div className="married-text wow fadeIn" data-wow-delay="1s">
                        <h4 class="" >
                        <span className=" wow fadeInUp" style={{textAlign: "center"}} data-wow-delay="1.05s">W</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.10s">e</span>
                        <span>&nbsp;</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.30s">g</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.35s">o</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.40s">t</span>
                        <span>&nbsp;</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.65s">m</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.70s">a</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.75s">r</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.80s">r</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.85s">i</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.90s">e</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.95s">d</span>
                        <span className=" wow fadeInUp" data-wow-delay="1.95s">!</span>
                        </h4>
                    </div>
                </div>

                <div class="save-the-date">
                    <h4>Remember the date!</h4>
                    <p></p>
                    <p></p>
                    <span className="date">4th March 2020</span>
                </div>
            </div>
        </section>






          {/* <div id="cover">
         
          </div>
          <div class="save-the-date">
                    <h4>Save the date</h4>
                    <span class="date">25 DEC 2017</span>
          </div> */}
         
          <div
            id="nav"
            // ref={this.myRef}
            style={{
              display: "flex",
              width: "100%",
              // overflowX: 'auto',
              backgroundColor: "#FBFBFB",
              margin: "0, 15px"
            }}
          >
            <ul
              className="navbar"
            >
              <li
                onClick={e =>
                  this.loadPhotos("72157714640654906", "account1", e)
                }
                className="mehendi"
              >
                {/* <img
                alt="mehendi"
                  style={{ height: "30px", width: "30px" }}
                  src={henna}
                ></img> */}
                <span className="tab-name"> MEHENDI</span>
              </li>
              <li
                onClick={e =>
                  this.loadPhotos("72157714386479743", "account1", e)
                }
              >
                {/* <img
                  className="mehendi"
                  alt="mehendi"
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "30px"
                  }}
                  src={samosa}
                ></img> */}

                <span className="tab-name">HALDI</span>
              </li>
              <li
                onClick={e =>
                  this.loadPhotos("72157714642026603", "account2", e)
                }
              >
                {/* <img
                  alt="haldi"
                  className = "haldi"
                  style={{
                    cursor: "pointer",
                    height: "28px",
                    width: "28px",

                  }}
                  src={wedding}
                ></img> */}
                <span className="tab-name">WEDDING</span>
              </li>
              <li
                onClick={e =>
                  this.loadPhotos("72157714641822212", "account1", e)
                }
                // style={{ marginRight: "30px" }}
              >
                {/* <img
                  alt="sangeet"
                  className="sangeet"

                  style={{
                    cursor: "pointer",
                    height: "28px",
                    width: "28px"
                  }}
                  src={floor}
                ></img> */}
                <span className="tab-name">SANGEET</span>
              </li>
              <li
                onClick={e =>
                  this.loadPhotos("72157714641076231", "account2", e)
                }
              >
                {/* <img
                  alt="reception"
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "30px"
                  }}
                  src={bride}
                ></img> */}
                <span className="tab-name">RECEPTION</span>
              </li>
            </ul>
          </div>

          {
            <ExampleWithLightbox
              className="album"
              renderPageNumbers={renderPageNumbers}
              photos={currentPhotos}
            />
          }

          <footer
            style={{
              display: "flex",
              paddingTop: "120px",
              paddingBottom: "16px",
              justifyContent: "center"
            }}
            className="footer-container"
          >
            <span className="footer-text">
              {"Made"} with ❤️ by{" "}
              <a href="https://github.com/ananddharne" target="blank">
                {" "}
                <span>Anand</span>{" "}
              </a>
            </span>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}

export default App;
