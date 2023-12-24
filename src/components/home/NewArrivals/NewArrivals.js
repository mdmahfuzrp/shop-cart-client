import React, { useContext } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { AuthContext } from "../../../Provider/AuthProvider";

const NewArrivals = () => {
  const { allProduct } = useContext(AuthContext);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {allProduct.map((product, index) => (
          <div className="px-2" key={product._id}>
            <Product
              _id={product._id}
              img={product.img}
              productName={product.productName}
              price={product.price}
              colors={product.colors}
              badge={product.badge}
              des={product.des}
              sizes={product.sizes}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
