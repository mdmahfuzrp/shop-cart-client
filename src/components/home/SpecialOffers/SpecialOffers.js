import React, { useContext } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { AuthContext } from "../../../Provider/AuthProvider";

const SpecialOffers = () => {
  const {allProduct} = useContext(AuthContext);
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {allProduct.slice(2, 10).map((product, index) => (
          <Product
            key={product._id}
            _id={product._id}
            img={product.img}
            productName={product.productName}
            price={product.price}
            colors={product.colors}
            badge={product.badge}
            des={product.des}
            sizes={product.sizes}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
