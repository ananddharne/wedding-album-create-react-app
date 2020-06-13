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
import $ from 'jquery';
import './example.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = { width: -1, photos: [], currentPage: 1, photosPerPage: 69 };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    // mehendi photos
    this.loadPhotos("72157714640654906", "account1");
  }

  handleClick(event) {
    let currElem =  $(".number-link-active")
    if (currElem) {
      $(currElem).attr('class', 'number-link');
    }
    const elem = $('#page-numbers li');
    $(elem[event.target.id - 1]).attr('class', 'number-link-active');
    this.setState({
      currentPage: event.target.id,
    });
  }

  handleNavClick(event) {
    let currElem =  $("ul.navbar li.active")
    console.log(currElem)
    for (const li of currElem) {
      li.classList.remove("active");
    }
    console.log(event.currentTarget)
    event.currentTarget.classList.add("active")
  }

  loadPhotos(photoset_id, account, e) {
    this.setState({currentPage: 1})
    if(e) {
      let currElem =  $("ul.navbar li.active")
      console.log(currElem)
      for (const li of currElem) {
        li.classList.remove("active");
      }
      console.log(e.currentTarget)
      e.currentTarget.classList.add("active")
    }
    // mehendi
    if (photoset_id === '72157714640654906') {
      this.setState({ photosPerPage: 48 });
    }
    // wedding
    if (photoset_id === '72157714642026603') {
      this.setState({ photosPerPage: 120 });
    }
    // sangeet
    if (photoset_id === '72157714641822212') {
      this.setState({ photosPerPage: 120 });
    }
    // reception
    if(photoset_id === '72157714641076231') {
      this.setState({ photosPerPage: 120 });
    }
    if(photoset_id === '72157714386479743') {
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
    // let urly =
      
    // "https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=1c6b2276693aebd622b79c81c44b4250&photo_id=49989161861";
    // jsonp(urly, { name: "jsonFlickrApi" }, (err, data) => {
    //   console.log(data)
    // })
  }
  render() {
    const { photos, currentPage, photosPerPage } = this.state;
    console.log(this.state.currentPage);

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
          onClick={(e) => this.handleClick(e)}
        >
          {number}
        </li>
      );
    });

    if (this.state.photos) {
      const width = this.state.width;
      return (
        <div className="App">
          <div id="cover"></div>
          <div className="bg-text">
            {/* <span> Komal  ❤️ Anand </span> */}
              {/* <div> Komal </div>
              <img style={{ height: "31px", width: "30px" }} src={heart}></img>
              {/* <div class="heart heart1"></div> */}
              {/* <div> Anand</div> */}
            {/* </span>  */}
            
          </div>
          <div
            id="nav"
            style={{
              display: "flex",
              width: "100%",
              // overflowX: 'auto',
              backgroundColor: "#FBFBFB",
              margin: "0, 15px"
            }}
          >
            <ul className="navbar"
              style={{
                display: "flex",
                paddingInlineStart: "20px",
                justifyContent: "flex-start",
                listStyle: "none",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <li
                onClick={(e) => this.loadPhotos("72157714640654906", "account1", e)}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                <img
                  style={{ height: "30px", width: "30px" }}
                  src={henna}
                  className="mehendi"
                ></img>
                <span class="tab-name">Mehendi</span>
              </li>
              <li
                onClick={(e) => this.loadPhotos("72157714386479743", "account1", e)}
                style={{ marginRight: "20px" }}
              >
                <img
                  style={{
                    cursor: "pointer",
                    height: "28px",
                    className:"haldi",
                    width: "28px",
                    marginLeft: "3px"
                  }}
                  src={samosa}
                ></img>
                
                <span class="tab-name">Haldi</span>
              </li>
              <li
                onClick={(e) => this.loadPhotos("72157714642026603", "account2", e)}
                style={{ marginRight: "20px" }}
              >
                <img
                  style={{
                    cursor: "pointer",
                    height: "28px",
                    width: "28px",
                    marginLeft: "3px",

                    className:"wedding"                    
                  }}
                  src={wedding}
                ></img>
                <span class="tab-name">Wedding</span>
              </li>
              <li
                onClick={(e) => this.loadPhotos("72157714641822212", "account1", e)}
                style={{ marginRight: "20px" }}
              >
                <img className="sangeet"
                  style={{
                    cursor: "pointer",
                    height: "28px",
                    width: "28px",
                  }}
                  src={floor}
                ></img>
                <span class="tab-name">Sangeet</span>
              </li>
              <li
                onClick={(e) => this.loadPhotos("72157714641076231", "account2", e)}
                style={{ marginRight: "20px" }}
              >
                                  
                <img
                  style={{
                    cursor: "pointer",
                    height: "28px",
                    width: "28px",
                  }}
                  src={bride}
                ></img>
                <span class="tab-name">Reception</span>
                
              </li>
            </ul>
          </div>
          {/* {currentPhotos.map(photo => (
						<CountryCard key={country.cca3} country={country} />
					))} */}
          {<ExampleWithLightbox className="album" renderPageNumbers={renderPageNumbers} photos={currentPhotos} />}
          {/* <ul id="page-numbers">{renderPageNumbers}</ul> */}
          <Footer
            theme={"light"}
            columns={[
              {
                icon: <img src="" />,
                url: "https://yuque.com",
                description: "anand",
                openExternal: true
              }
            ]}
            bottom="Made with ❤️by <span> Anand <span>"
          />
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