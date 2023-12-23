import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { AuthContext } from "../../../Provider/AuthProvider";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              colors={item.colors}
              badge={item.badge}
              des={item.des}
              sizes={item.sizes}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  // Always use Hooks at the top level
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const { allProduct } = useContext(AuthContext);

  // Check for allProduct existence and array type
  if (!allProduct || !Array.isArray(allProduct)) {
    console.error("No product data found or invalid data format.");
    return null; // Or handle this case according to your app logic
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProduct.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProduct.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProduct.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {/* Assuming Items is a component to render currentItems */}
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {allProduct.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
