import React, { Component, Fragment } from "react";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";

class BrandList extends Component {
  state = {
    brandList: [
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
        img: "/assets/images/3.png",
        name: "La huella",
        origin: "Guatemala"
      },
      {
        img: "/assets/images/3.png",
        name: "La huella",
        origin: "Guatemala"
      }
    ]
  };
  render() {
    let { brandList } = this.state;
    return (
      <Fragment>
        <Topbar title="coffee guide" />
        <div className="brand-list px-16 py-8 bg-dark position-relative">
          {brandList.map((brand, index) => (
            <Link to="/methods" key={index}>
              <div className="brand-image-holder my-8 position-relative">
                <img src={brand.img} alt="brand" />
                <div className="brand-details pl-16 pb-8">
                  <h4 className="text-white uppercase">{brand.name}</h4>
                  <h4 className="text-white uppercase">{`(${
                    brand.origin
                  })`}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default BrandList;
