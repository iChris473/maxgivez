

import Category from '../components/Category'
import Featured from '../components/Featured'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewArrival from '../components/NewArrival'
import Newsletter from '../components/Newsletter'
import Products from '../components/Product'
import Slide from '../components/Slide'
import SpecialOffer from '../components/SpecialOffer'
import LatestOffer from '../components/LatestOffer'
// import Testimonies from '../components/Testimonies'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Slide />
      <Category />
      <Featured />
      {/* <Products /> */}
      <SpecialOffer />
      <NewArrival />
      <LatestOffer />
      <Newsletter />
      {/* <Testimonies /> */}
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
