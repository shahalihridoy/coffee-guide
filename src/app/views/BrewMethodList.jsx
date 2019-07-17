import React, { Component, Fragment } from "react";
import Topbar from "../components/Topbar";

class BrewMethodList extends Component {
  state = {
    brewMethodList: [
      {
        img: "/assets/images/1.png",
        name: "Los Altos",
        origin: "Brazil"
      },
      {
        img: "/assets/images/2.png",
        name: "Los Altos",
        origin: "Brazil"
      },
      {
        img: "/assets/images/4.png",
        name: "La huella",
        origin: "Guatemala"
      },
      {
        img: "/assets/images/3.png",
        name: "La huella",
        origin: "Guatemala"
      }
    ],

    brand: {
      img: "/assets/images/4.png",
      name: "La huella",
      origin: "Guatemala"
    }
  };

  render() {
    let { brewMethodList, brand } = this.state;
    return (
      <Fragment>
        <Topbar title="brew selection" previousPage="home" />
        <div className="brew-method-list bg-dark">
          <div className="brand-image-holder mb-8 position-relative">
            <img src={brand.img} alt="brand" />
            <div className="brand-details pl-16 pb-8">
              <h4 className="text-white uppercase">{brand.name}</h4>
              <h4 className="text-white uppercase">{`(${brand.origin})`}</h4>
            </div>
          </div>

          <div className="px-16">
            {brewMethodList.map((method, index) => (
              <div
                className="method-list-image-holder my-8 position-relative"
                key={index}
              >
                <div className="overlay">
                  <img src={method.img} alt="method image" />
                </div>
                <h5 className="text-white uppercase pl-16">{method.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BrewMethodList;
