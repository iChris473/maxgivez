
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Signin from "../components/Signin";

export default function Login() {
  return (
    <div>
        <Navbar />
        <Signin />
        <a href='https://www.instagram.com/maxgivez/' target='_blank' >
        <img
          src={require("../images/insta.png")}
          className="fixed bottom-10 right-10 h-[50px] object-contain animate-pulse"
        />
      </a>
    </div>
  )
}
