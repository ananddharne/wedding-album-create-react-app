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
import "./css/slick-theme.css"
import "./css/style.css"
import "./css/animate.css"
import "./css/flaticon.css"
import "./css/font-awesome.min.css"
import "./css/bootstrap.min.css"
import "./css/magnific-popup.css"
import "./css/owl.carousel.css"
import WOW from 'wowjs';
import StickyHeader from 'react-sticky-header';



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
    this.toggleMobileNavigation()
    this.smallNavFunctionality()
    // let x = elem[0]

    window.addEventListener("scroll", function() {
//       function  bgParallax() {
//         if ($(".parallax").length) {
//             $(".parallax").each(function() {
//                 var height = $(this).position().top;
//                 var resize     = height - $(window).scrollTop();
//                 var parallaxSpeed = $(this).data("speed");
//                 var doParallax = -(resize / parallaxSpeed);
//                 var positionValue   = doParallax + "px";
//                 var img = $(this).data("bg-image");
    
//                 $(this).css({
//                     backgroundImage: "url(" + img + ")",
//                     backgroundPosition: "50%" + positionValue,
//                     backgroundSize: "cover"
//                 });
    
//                 if ( window.innerWidth < 768) {
//                     $(this).css({
//                         backgroundPosition: "center center"
//                     });
//                 }
//             });
//         }
//     }
//       console.log('HA')
//       bgParallax();

     function activeMenuItem($links) {
      var top = $(window).scrollTop(),
          windowHeight = $(window).height(),
          documentHeight = $(document).height(),
          cur_pos = top + 2,
          sections = $("section"),
          nav = $links,
          nav_height = nav.outerHeight();
    
    
      sections.each(function() {
          var top = $(this).offset().top - nav_height,
              bottom = top + $(this).outerHeight();
    
          if (cur_pos >= top && cur_pos <= bottom) {
              nav.find("> ul > li > a").parent().removeClass("current-menu-item");
              nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current-menu-item");
          } else if (cur_pos === 2) {
              nav.find("> ul > li > a").parent().removeClass("current-menu-item");
          }
    
      });
    }
    
    activeMenuItem($(".navigation-holder"));


  });

  }







toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".navbar-header .open-btn");
    var closeBtn = $(".navigation-holder .close-navbar");
    var navLinks = $("#navbar > ul > li > a[href^='#']");

    openBtn.on("click", function() {
        if (!navbar.hasClass("slideInn")) {
            navbar.addClass("slideInn");
        }
        return false;
    })

    closeBtn.on("click", function() {
        if (navbar.hasClass("slideInn")) {
            navbar.removeClass("slideInn");
        }
        return false;
    })

    navLinks.on("click", function() {
        if (navbar.hasClass("slideInn")) {
            navbar.removeClass("slideInn");
        }
        return false;
    })
}

smallNavFunctionality() {
  var windowWidth = window.innerWidth;
  var mainNav = $(".navigation-holder");
  var smallNav = $(".navigation-holder > .small-nav");
  var subMenu = smallNav.find(".sub-menu");
  var megamenu = smallNav.find(".mega-menu");
  var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

  if (windowWidth <= 991) {
      subMenu.hide();
      megamenu.hide();
      menuItemWidthSubMenu.on("click", function(e) {
          var $this = $(this);
          $this.siblings().slideToggle();
           e.preventDefault();
          e.stopImmediatePropagation();
      })
  } else if (windowWidth > 991) {
      mainNav.find(".sub-menu").show();
      mainNav.find(".mega-menu").show();
  }
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

scrollToGallery() {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#our-gallery").offset().top
    },
    2000
  );
}

scrollToCouple() {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#couple").offset().top
    },
    2000
  );
}

scrollToStory() {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#story").offset().top
    },
    2000
  );
}

  handleClick(event) {
    // $(window).scrollTop(0, '100vh')
    this.scrollToGallery()
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
   
    } else {
      let mehendiElem = $("li.mehendi")
      mehendiElem.addClass("active");
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
        <div id="home" className="App">

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
                    <h4>Date!</h4>
                    <p></p>
                    <p></p>
                    <span className="date">4th March 2020</span>
                </div>
            </div>
        </section>



        <header id="header" class="site-header header-style-1">
            <nav class="navigation navbar navbar-default">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="open-btn">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <div class="couple-logo">
                            <h1><a href="#home">K & A</a></h1>
                        </div>
                    </div>
                    <div id="navbar" class="navbar-collapse collapse navbar-right navigation-holder">
                        <button class="close-navbar"><i class="fa fa-close"></i></button>
                        <ul class="nav navbar-nav">
                            <li style={{cursor: "pointer"}} onClick={() => this.scrollToCouple()}><a>Couple</a></li>
                            <li style={{cursor: "pointer"}} onClick={() => this.scrollToStory()}><a>Story</a></li>
                            <li style={{cursor: "pointer"}} onClick={() => this.scrollToGallery()}><a>Gallery</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        {/* couple */}
        <section class="wedding-couple-section section-padding" id="couple">
            <div class="container">
                <div class="row">
                    <div class="col col-xs-12">
                        <div class="gb groom">
                            <div class="img-holder wow fadeInLeftSlow">
                                <img src="images/ours/IMG_4340.jpg" alt/>
                            </div>
                            <div class="details">
                                <div class="details-inner">
                                    <h3>The groom</h3>
                                    <p>Hi I am Anand , dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                                    <span class="signature">Anand</span>
                                    <ul class="social-links">
                                        <li><a href="https://github.com/ananddharne" target="blank"><i class="fa fa-github"></i></a></li>
                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="gb bride">
                            <div class="details">
                                <div class="details-inner">
                                    <h3>The Bride</h3>
                                    <p>Hi I am Komal , dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                                    <span class="signature">Komal</span>
                                    <ul class="social-links">
                                        <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="img-holder wow fadeInRightSlow">
                                <img src="images/ours/IMG_4340.jpg" alt/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </section>

        {/* our story */}
        <section class="story-section section-padding" id="story">
            <div class="container">
                <div class="row">
                    <div class="col col-xs-12">
                        <div class="section-title">
                            <div class="vertical-line"><span><i class="fi flaticon-two"></i></span></div>
                            <h2>Our love story</h2>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col col-xs-12">
                        <div class="story-timeline">
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="story-text right-align-text">
                                        <h3>First meet</h3>
                                        <span class="date">Jan 12 2017</span>
                                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, </p>
                                    </div>
                                </div>
                                <div class="col col-md-6">
                                    <div class="img-holder">
                                        <img src="images/story/img-1.jpg" alt class="img img-responsive"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="img-holder right-align-text story-slider">
                                        <img src="images/story/img-2.jpg" alt class="img img-responsive"/>
                                        <img src="images/story/img-3.jpg" alt class="img img-responsive"/>
                                    </div>
                                </div>
                                <div class="col col-md-6 text-holder">
                                    <span class="heart">
                                        <i class="fa fa-heart"></i>
                                    </span>
                                    <div class="story-text">
                                        <h3>First date</h3>
                                        <span class="date">Feb 14 2017</span>
                                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6 text-holder right-heart">
                                    <span class="heart">
                                        <i class="fa fa-heart"></i>
                                    </span>
                                    <div class="story-text right-align-text">
                                        <h3>Proposal</h3>
                                        <span class="date">Apr 14 2017</span>
                                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, </p>
                                    </div>
                                </div>
                                <div class="col col-md-6">
                                    <div class="img-holder right-align-text story-slider">
                                        <img src="images/story/img-7.jpg" alt class="img img-responsive"/>
                                        <img src="images/story/img-5.jpg" alt class="img img-responsive"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="img-holder video-holder">
                                        <img src="images/story/img-8.jpg" alt class="img img-responsive"/>
                                        <a href="https://www.youtube.com/embed/XSGBVzeBUbk?autoplay=1" data-type="iframe" class="video-play-btn">
                                            <i class="fa fa-play"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="col col-md-6 text-holder">
                                    <span class="heart">
                                        <i class="fa fa-heart"></i>
                                    </span>
                                    <div class="story-text">
                                        <h3>Enagagement</h3>
                                        <span class="date">Jul 14 2017</span>
                                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>

        <section class="gallery-section section-padding" id="gallery">
            <div class="container">
                <div class="row">
                    <div class="col col-xs-12">
                        <div id="our-gallery" class="section-title">
                            <div class="vertical-line"><span><i class="fi flaticon-two"></i></span></div>
                            <h2>Our gallery</h2>
                        </div>
                    </div>
                </div>
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

<nav>  
  <ul style={{display: "flex"}} class="container-nav-gallery">  
    <li style={{marginLeft: "10px", marginRight: "20px"}}>
                <a onClick={e =>
                  this.loadPhotos("72157714640654906", "account1", e)
                } className="tab-name"> MEHENDI</a>
              </li>
              <li style={{marginRight: "20px"}}>
                <a onClick={e =>
                  this.loadPhotos("72157714386479743", "account1", e)
                } className="tab-name"> HALDI</a>
              </li>
    <li style={{marginRight: "20px"}}>
              <a onClick={e =>
                  this.loadPhotos("72157714642026603", "account2", e)
                } className="tab-name">WEDDING</a>
              </li>

              <li style={{marginRight: "20px"}}
              >
               
                <a onClick={e =>
                  this.loadPhotos("72157714641822212", "account1", e)
                } className="tab-name">SANGEET</a>
              </li>

              <li style={{marginRight: "20px"}}
               
               >
               
                 <a  onClick={e =>
                   this.loadPhotos("72157714641076231", "account2", e)
                 } className="tab-name">RECEPTION</a>
               </li>

    <li class="search">  
    </li>  
  </ul>  
</nav>
      {/* <header id="header" class="site-header header-style-1" style={{display: "flex", justifyContent: "center"}}>
            <nav class="navigation navbar navbar-default">
                <div class="container1">
                    <div class="navbar-header1">
                    </div>
                    <div id="navbar1" style={{display: "flex", justifyContent: "center", marginRight: "200px"}} class="navbar-collapse collapse navbar-right navigation-holder">
                        <ul
              className="nav navbar-nav1"
            >
              <li>
                <a onClick={e =>
                  this.loadPhotos("72157714640654906", "account1", e)
                } className="tab-name"> MEHENDI</a>
              </li>

              <li>
                <a onClick={e =>
                  this.loadPhotos("72157714386479743", "account1", e)
                } className="tab-name"> HALDI</a>
              </li>
            
              <li>
              
                <a onClick={e =>
                  this.loadPhotos("72157714642026603", "account2", e)
                } className="tab-name">WEDDING</a>
              </li>

              <li
              >
               
                <a onClick={e =>
                  this.loadPhotos("72157714641822212", "account1", e)
                } className="tab-name">SANGEET</a>
              </li>

              <li
               
              >
              
                <a  onClick={e =>
                  this.loadPhotos("72157714641076231", "account2", e)
                } className="tab-name">RECEPTION</a>
              </li>
            </ul>
                    </div>
                </div>
            </nav>
        </header> */}
            
          </div>

          {
            <ExampleWithLightbox
              className="album"
              renderPageNumbers={renderPageNumbers}
              photos={currentPhotos}
            />
          }
                </div>
          </section>

          <footer class="site-footer">
            <div class="back-to-top">
                <a href="#" class="back-to-top-btn"><span><i class="fi flaticon-cupid"></i></span></a>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col col-xs-12">
                        <h2>Forever and Always Our Love</h2>
                        <a href="https://github.com/ananddharne" target="blank">
                {" "}
                <span>Anand (The groom)</span>{" "}
              </a>
                    </div>
                </div> 
            </div>
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
