import React, { useState } from "react";
import { useContext } from "react";
import "./Home.css";
import MyImage from "../../image/food.jpg";
import MyImage1 from "../../image/burger1.jpeg";
import MyImage2 from "../../image/pizza1.jpeg";
import MyImage3 from "../../image/Harissa.jpeg";
import MyImage4 from "../../image/Teriyaki.jpeg";
import back1 from "../../image/burger.jpg";
import back2 from "../../image/pizza.png";
import back3 from "../../image/pasta.png";
import back4 from "../../image/frenchfries.png";
import back5 from "../../image/sauce.png";
import back6 from "../../image/pizza2.png";
import ButtonWithLogo from "../ButtonWithLogo/ButtonWithLogo";
import { FiChevronDown } from "react-icons/fi";
import Mcdo from "../../image/mcdo.png";
import logo from "../../image/favicon.png";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

const recommendation = [
  {
    id: "x",
    image: require("../../image/food.jpg"),
    name: "item x",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "y",
    image: require("../../image/food.jpg"),
    name: "item y",
    oldPrice: 230,
    newPrice: 200,
  },
  {
    id: "z",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "b",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
];

const products = [
  {
    id: "a",
    image: require("../../image/food.jpg"),
    name: "item x",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "c",
    image: require("../../image/food.jpg"),
    name: "item y",
    oldPrice: 230,
    newPrice: 200,
  },
  {
    id: "d",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "e",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "f",
    image: require("../../image/food.jpg"),
    name: "item x",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "j",
    image: require("../../image/food.jpg"),
    name: "item y",
    oldPrice: 230,
    newPrice: 200,
  },
  {
    id: "h",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
  {
    id: "i",
    image: require("../../image/food.jpg"),
    name: "item z",
    oldPrice: 200,
    newPrice: 140,
  },
];

const DropdownBox = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    //The onClick={() => setIsOpen(!isOpen)} toggles the isOpen state each time the user clicks the dropdown.
    <div className="isOpenState" onClick={() => setIsOpen(!isOpen)}>
      <div className="VisiblePart">
        {/*This is where the title prop is displayed.*/}
        <span className="text-lg">{title}</span>
        {/* FichevronDown rend la flèche orientée vers le bas 
        toggle te rotation of the FichevronDown icon */}
        <FiChevronDown
          className="fleche"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {isOpen && <div className="contentVisibility">{content}</div>}
    </div>
  );
};

function Home() {
  const { cart, AddToCart, UpdateQuantity } = useContext(CartContext);
  const [panier, setPanier] = useState([]);
  const AjouterPanier = (item) => {
    console.log(`${item.nom} ajouté au panier`);
    setPanier([...panier, item]); // Ajouter le produit au panier
  };
  return (
    <div className="HomeDiv">
      <div className="divcontent">
        {/* Titre */}
        <h1 className="pt-32 pl-40 text-5xl font-bold">
          <span className="Savory">Savory</span>Bites - Your Favorite Meals,
          <br />
          <span className="Delivered">Delivered</span>
        </h1>

        {/* Texte descriptif */}
        <div className="adtext pl-36 pt-12 text-xl ">
          <p className="adtext1 pl-40">
            Craving something delicious? With SavoryBites, you
          </p>
          <p className="adtext2 pl-40">
            can explore a variety of dishes, place your order in
          </p>
          <p className="adtext1 pl-40">
            seconds, and enjoy fresh meals delivered straight to
          </p>
          <p className="adtext2 pl-40">you—quick, easy, and hassle-free!</p>

          <Link
            to="/Our_Menu"
            className="relative inline-flex items-center ml-48 mt-5 px-12 py-3 overflow-hidden text-lg font-medium text-[#FD4C2A] border-2 border-[#FD4C2A] rounded-full hover:text-white group hover:bg-[#FD4C2A]"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-[#FD4C2A] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative">Explore</span>
          </Link>
        </div>
      </div>

      <img className="backgroundimg1" src={back1} alt="Burger background" />
      <img className="backgroundimg2" src={back2} alt="Pizza background" />

      <div className="section2">
        <h2 id="h2content">ON SALE</h2>
        <div id="imageContent">
          {recommendation.map((item) => (
            <div id="imageItem" key={item.id}>
              <span id="discountBadge">13%</span>
              <img src={item.image} />
              <div id="nameImg">{item.name}</div>
              <div id="PriceContainer">
                <div id="oldPrice">{item.oldPrice}DH</div>
                <div id="newPrice">{item.newPrice}DH</div>
              </div>
              <div id="AddToCart">
                <button onClick={() => AddToCart(item)} id="Add">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <img className="backgroundimg3" src={back3} alt="Pasta background" />

      <div className="Section3">
        <h2 id="h2content3">View Our Range Of Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] p-8">
          {/* Burgers & Fast Food */}
          <div className="relative pl-11">
            <img
              className="w-full h-[450px] object-cover rounded-lg"
              src={MyImage1}
              alt="Burger"
            />
            <div className="absolute bottom-4 left-4 pl-12 text-white px-4 py-2 text-xl font-bold">
              Burgers & Fast Food
            </div>
          </div>

          {/* Pizzas et Pasta */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <img
                className="w-full h-[220px] object-cover rounded-lg"
                src={MyImage2}
                alt="Pizza"
              />
              <div className="absolute bottom-4 left-1 text-white px-4 py-2 text-xl font-bold">
                Pizzas
              </div>
            </div>
            <div className="relative">
              <img
                className="w-full h-[220px] object-cover rounded-lg"
                src={MyImage3}
                alt="Pasta"
              />
              <div className="absolute bottom-4 left-1 text-white px-4 py-2 text-xl font-bold">
                Pasta
              </div>
            </div>
          </div>

          {/* Tacos */}
          <div className="relative pr-11">
            <img
              className="w-full h-[450px] object-cover rounded-lg"
              src={MyImage4}
              alt="Tacos"
            />
            <div className="absolute bottom-4 left-4 text-white px-4 py-2 text-xl font-bold">
              {" "}
              Tacos
            </div>
          </div>
        </div>
      </div>

      <div className="Section4">
        <h2 id="h2content1">Most Popular Products</h2>
        <div id="imageContent1">
          {products.map((item) => (
            <div id="imageItem1" key={item.id}>
              <span id="discountBadge1">13%</span>
              <img src={item.image} />
              <div id="nameImg1">{item.name}</div>
              <div id="PriceContainer1">
                <div id="oldPrice1">{item.oldPrice}DH</div>
                <div className="newPrice">{item.newPrice}DH</div>
              </div>
              <div id="AddToCart1">
                <button id="Add1" onClick={() => AddToCart(item)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <img className="backgroundimg4" src={back4} alt="French fries" />
      <img className="backgroundimg5" src={back5} alt="Sauce" />

      <div className="Section5">
        <h2 id="h2content2">Most Popular Restaurants</h2>
        <ButtonWithLogo />
      </div>

      <img className="backgroundimg6" src={back6} alt="Pizza background" />

      <div className="Section6 ">
        <h2 id="h2content4">Frequently Asked Questions</h2>
        <div className="container">
          <button className="AskQuestion">Ask A Question </button>
          <div className="dropdowns">
            <div className="drop1">
              <DropdownBox
                title="What is SavoryBites?"
                content="SavoryBites is a food delivery service that brings your favorite meals straight to your door."
              />
            </div>

            <div className="drop2">
              <DropdownBox
                title="How long does delivery take?"
                content="Delivery times vary depending on your location, but we strive to deliver as fast as possible!"
              />
            </div>

            <div className="drop3">
              <DropdownBox
                title="I placed an order, but would like to cancel it."
                content="We do not support canceled orders at this time."
              />
            </div>
            <div className="drop4">
              <DropdownBox
                title="My order was delivered, but the contents were damaged."
                content="We apologize that your order did not arrive as expected. Please contact the restaurant for assistance. If this does not resolve your issue, please contact our Digital Support team "
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="fotterPage ">
        <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-8 py-10 ">
          <div className="col-span-full mb-10 2xl:col-span-2 lg:mb-0 flex items-center flex-col 2xl:items-start">
            <img
              className="mcdoLogo w-20 h-15 mb-4"
              src={logo}
              alt="McDonald's Logo"
            />
            <Link to="/" className="text-2xl font-bold">
              <span className="text-[#FD4C2A]">Savory</span>Bites
            </Link>
            <div className="flex items-center justify-between w-full max-w-xl mx-auto flex-col  2xl:flex-col 2xl:items-start">
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
                Trusted by food lovers across the globe. Need help? We're here
                to help!
              </p>
              <Link to="/contact">
                {" "}
                <a
                  href=""
                  className="py-2.5 px-5 h-9 block w-fit bg-[#FD4C2A] rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-[#d63413] lg:mx-0"
                >
                  {" "}
                  Contact us{" "}
                </a>
              </Link>
            </div>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="titleLink">SavoryBites</h4>
            <ul className="text-sm  transition-all duration-500 ">
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Home
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  About
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="javascript:;" className="link">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="titleLink">Products</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Figma UI System
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Icons Assets
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Responsive Blocks
                </a>
              </li>
              <li>
                <a href="javascript:;" className="link">
                  Components Library
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="titleLink">Resources</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  FAQs
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Quick Start
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Documentation
                </a>
              </li>
              <li>
                <a href="javascript:;" className="link">
                  User Guide
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="titleLink">Blogs</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  News
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  Tips & Tricks
                </a>
              </li>
              <li className="mb-6">
                <a href="javascript:;" className="link">
                  New Updates
                </a>
              </li>
              <li>
                <a href="javascript:;" className="link">
                  Events
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="final_part">
          <p className="copyright">
            &copy; 2025 SavoryBites. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
