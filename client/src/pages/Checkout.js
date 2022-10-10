import CheckoutItem from "../components/CheckoutItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function Checkout() {
  return (
    <div>
        <Navbar />
        <CheckoutItem />
        <Footer />
        <a href='https://www.instagram.com/maxgivez/' target='_blank' >
        <img
          src={require("../images/insta.png")}
          className="fixed bottom-10 right-10 h-[50px] object-contain animate-pulse"
        />
      </a>
    </div>
  )
}
