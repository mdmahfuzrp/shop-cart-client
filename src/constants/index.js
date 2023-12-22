import {
  spfOne,
  spfThree,
  spfFour,
  newArrFour,
} from "../assets/images/index";

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Product",
    link: "/product",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: newArrFour,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============

export const paginationItems = [
  {
    _id: 1001,
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    colors: [
      "#00000",
      "ff0000",
      "22D3EF"
    ],
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== PaginationItems End here =================