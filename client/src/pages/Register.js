

import Navbar from "../components/Navbar";
import Signup from "../components/Signup";



export default function Register() {
  return (
    <div>
        <Navbar />
        <Signup />
        <a href='https://www.instagram.com/maxgivez/' target='_blank' >
        <img
          src={require("../images/insta.png")}
          className="fixed bottom-10 right-10 h-[50px] object-contain animate-pulse"
        />
      </a>
    </div>
  )
}
