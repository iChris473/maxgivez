
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SingleProductItem from "../components/SingleProductItem";
import CustomProductItem from "../components/CustomProductItem";
import Recommendation from "../components/Recomendation";

export default function CustomProduct() {

  return (
    <div>
      <Navbar />
      <CustomProductItem />
      {/* <SingleProductItem /> */}
      {/* <Recommendation /> */}
      <Footer />
      <a href='https://www.instagram.com/maxgivez/' target='_blank' >
        <img
          src={require("../images/insta.png")}
          className="fixed bottom-10 right-10 h-[50px] object-contain animate-pulse"
        />
      </a>
    </div>
  );
}
