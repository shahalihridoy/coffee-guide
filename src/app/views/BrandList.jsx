import React, { Component, Fragment } from "react";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import { getBrandList } from "../firebase/FirebaseService";

class BrandList extends Component {
  state = {
    brandList: []
  };

  componentWillMount() {
    let brandList = [];
    getBrandList().then(doc => {
      doc.forEach(item => {
        brandList.push({
          id: item.id,
          ...item.data()
        });
      });
      this.setState({
        brandList
      });
    });
  }

  render() {
    let { brandList } = this.state;
    return (
      <Fragment>
        <Topbar title="coffee guide" />
        <div className="brand-list px-16 py-8 bg-dark position-relative">
          {brandList.map((brand, index) => (
            <Link to={`/methods/${brand.id}`} key={index}>
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
