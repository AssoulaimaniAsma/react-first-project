import React, { useState } from "react";
import "./Home.css";
import MyImage from "./food.jpg";
import MyImage1 from "./burger1.jpeg";
import MyImage2 from "./pizza1.jpeg";
import MyImage3 from "./Harissa.jpeg";
import MyImage4 from "./Teriyaki.jpeg";
import back1 from "./burger.jpg";
import back2 from "./pizza.png";
import back3 from "./pasta.png";
import back4 from "./frenchfries.png";
import back5 from "./sauce.png";
import back6 from "./pizza2.png";
import ButtonWithLogo from "./ButtonWithLogo";
import { FiChevronDown } from "react-icons/fi";
import Mcdo from "./mcdo.png"; 


const DropdownBox = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    //The onClick={() => setIsOpen(!isOpen)} toggles the isOpen state each time the user clicks the dropdown.
    <div 
      className="isOpenState" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="VisiblePart">
      { /*This is where the title prop is displayed.*/ }
        <span className="text-lg">{title}</span>
        {/* FichevronDown rend la flèche orientée vers le bas 
        toggle te rotation of the FichevronDown icon */}
        <FiChevronDown 
          className="fleche"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />

      </div>
      

      {isOpen && (
        <div className="contentVisibility">
          {content}
        </div>
      )}
    </div>
  );
};

function Home() {
  return (
    <div className="HomeDiv">
      <div className="divcontent">
        <h1>
          <span className="Savory">Savory</span>Bites - Your Favorite Meals,
          <br />
          <span className="Delivered">Delivered</span>
        </h1>
        <div className="adtext">
          <p className="adtext1">
            Craving something delicious? With SavoryBites, you
          </p>
          <p className="adtext2">
            can explore a variety of dishes, place your order in
          </p>
          <p className="adtext1">
            seconds, and enjoy fresh meals delivered straight to
          </p>
          <p className="adtext2">you—quick, easy, and hassle-free!</p>
          <button className="explore">Explore →</button>
        </div>
      </div>
      
      <img className="backgroundimg1" src={back1} alt="Burger background" />
      <img className="backgroundimg2" src={back2} alt="Pizza background" />
      
      <h2 className="h2content">ON SALE</h2>
      <div className="pic1234">
          <div className="picItem1">
            <img className="pic1" src={MyImage} alt="Food item" />
            <div className="item1234">Item1</div>
          </div>
          <div className="picItem1">
            <img className="pic2" src={MyImage} alt="Food item" />
            <div className="item1234">Item2</div>
          </div>
          <div className="picItem1">
            <img className="pic3" src={MyImage} alt="Food item" />
            <div className="item1234">Item3</div>
          </div>
          <div className="picItem1">
            <img className="pic4" src={MyImage} alt="Food item" />
            <div className="item1234">Item1</div>
        </div>
      </div>

      <img className="backgroundimg3" src={back3} alt="Pasta background" />

      <h2 className="h2content">View Our Range Of Categories</h2>
      <div className="pic5678">
        <div className="pic5Content">
          <img className="pic5" src={MyImage1} alt="Burger" />
          <div className="BurgersFastFood">Burgers & Fast Food</div>
        </div>
        <div className="pic67">
          <div>
            <img className="pic6" src={MyImage2} alt="Pizza" />
            <div className="Pizzas">Pizzas</div>
          </div>
          <div>
            <img className="pic7" src={MyImage3} alt="Harissa" />
            <div className="Pastapic">Pasta</div>
          </div>
        </div>
        <div>
          <img className="pic8" src={MyImage4} alt="Teriyaki" />
          <div className="Tacos">Tacos</div>
        </div>
      </div>

      <h2 className="h2content1">Most Popular Products</h2>
      <div className="pic1234">
        <img className="pic1" src={MyImage} alt="Food item" />
        <img className="pic2" src={MyImage} alt="Food item" />
        <img className="pic3" src={MyImage} alt="Food item" />
        <img className="pic4" src={MyImage} alt="Food item" />
      </div>

      <div className="pic9101112">
        <img className="pic9" src={MyImage} alt="Food item" />
        <img className="pic10" src={MyImage} alt="Food item" />
        <img className="pic11" src={MyImage} alt="Food item" />
        <img className="pic12" src={MyImage} alt="Food item" />
      </div>

      <img className="backgroundimg4" src={back4} alt="French fries" />
      <img className="backgroundimg5" src={back5} alt="Sauce" />

      <div>
        <h2 className="h2content1">Most Popular Restaurants</h2>
        <ButtonWithLogo />
      </div>

      <img className="backgroundimg6" src={back6} alt="Pizza background" />

      <div>
        <h2 className="h2content2">Frequently Asked Questions</h2>
        <div className="drop1">
          <DropdownBox
            title="What is SavoryBites?"
            content="SavoryBites is a food delivery service that brings your favorite meals straight to your door."
          />
        </div>
        <div class="dropo">
          <button className="AskQuestion">Ask A Question > </button>
          <div className="drop2">
            <DropdownBox
              title="How long does delivery take?"
              content="Delivery times vary depending on your location, but we strive to deliver as fast as possible!"
            />
          </div>
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
      <div id="fotterPage">
            <img className="mcdoLogo"src={Mcdo} alt="McDonald's Logo" />
            <div className="fotterPageContent">
            <div className="links">
                <div className="title">ijfirj</div>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
            </div>
            <div className="links">
                <div className="title">ijfirj</div>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
            </div>
            <div className="links">
                <div className="title">ijfirj</div>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
            </div>
            <div className="links">
                <div className="title">ijfirj</div>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
            </div>
            <div className="links">
                <div className="title">ijfirj</div>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
                <a class="link" href="hh" target="_blank">uhu</a><br/>
            </div>
            </div>
        <div className="final_part">
        <p className="copyright">© 2025 SavoryBites</p>

        </div>
      </div>

    </div>
  );
}

export default Home;
