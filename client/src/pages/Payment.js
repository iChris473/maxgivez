

import PaymentDetails from "../components/PaymentDetails";
import PaymentModal from "../components/PaymentModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Payment() {

  const [modal, setModal] = useState(null)

  return (
    <div className={`${modal && "h-screen overflow-hidden"} relative`}>
        <Navbar />
        {modal && <div onClick={() => setModal(null)} className="h-screen w-screen absolute top-0 bg-transparent z-40" />}
        <div className={modal && "blur"}>
          <PaymentDetails setModal={setModal} />
        </div>
        {modal &&
          <div className="z-50 bg-white absolute left-1/2 top-10 w-[95%] max-w-[800px] transform -translate-x-1/2 -transalate-y-1/2">
            <PaymentModal setModal={setModal} modal={modal} />
          </div>
        }
        <Footer />
    </div>
  )
}
