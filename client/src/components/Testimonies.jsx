

import bg from "../images/faqbg.jpg"

export default function Testimonies() {

  return (
    <div className="relative bg-black bg-opacity-80 min-h-[100vh]">
        <img src={bg} alt="" className="absolute top-0 w-screen h-full -z-10 object-cover sopacity-40" />
        <div className="flex items-center justify-center flex-col gap-3 p-5 ">
            <h1 className="text-gray-200 text-2xl mt-16 sm:text-3xl md:text-5xl tracking-widest font-bold russo">Testimonies</h1>
            <div className="flex flex-wrap items-center justify-center gap-5 shadow-md mt-10">
                <div className="flex flex-col items-center justify-center gap-2 bg-black bg-opacity-40 p-5">
                    <img src={require("../images/man1.png")} className="object-contain w-60 rounded-md" alt="" />
                    <p className="text-gray-400 text-sm">17th May, 2022</p>
                    <p className="font-bold text-xl text-pink-200">I won an iPhone 12 Pro after buying a ticket of just $300</p>
                    <a href="/" className="text-md text-gray-300 border-b pb-1 border-gray-600">Continue Reading</a>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-black bg-opacity-40 p-5">
                    <img src={require("../images/man4.jpg")} className="object-contain w-60 rounded-md" alt="" />
                    <p className="text-gray-400 text-sm">20th May, 2022</p>
                    <p className="font-bold text-xl text-pink-200">I won an iPhone 13 Pro Max after buying a ticket of just $620</p>
                    <a href="/" className="text-md text-gray-300 border-b pb-1 border-gray-600">Continue Reading</a>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-black bg-opacity-40 p-5">
                    <img src={require("../images/man2.png")} className="object-contain w-60 rounded-md" alt="" />
                    <p className="text-gray-400 text-sm">24th May, 2022</p>
                    <p className="font-bold text-xl text-pink-200">I won a Nissan Versa Car with a ticket of $300</p>
                    <a href="/" className="text-md text-gray-300 border-b pb-1 border-gray-600">Continue Reading</a>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-black bg-opacity-40 p-5">
                    <img src={require("../images/man3.png")} className="object-contain w-60 rounded-md" alt="" />
                    <p className="text-gray-400 text-sm">28th May, 2022</p>
                    <p className="font-bold text-xl text-pink-200">A PS5 console got shipped to me after paying for a ticket worth $220</p>
                    <a href="/" className="text-md text-gray-300 border-b pb-1 border-gray-600">Continue Reading</a>
                </div>
            </div>
        </div>
    </div>
  );
}
