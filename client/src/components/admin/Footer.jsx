import { LocationMarkerIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";



export default function Footer() {
  return (
    <div className="bg-[#403e38] p-5 flex flex-col md:grid space-y-10 md:grid-cols-4 space-x-2 py-12">
      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-white text-4xl font-semibold mb-5 tangerine">
          Perfumes and More Store
        </h1>
        <p className="text-gray-300 text-xs md:text-sm">
          Best online store to get qaulity perfumes at affordable prices from
          the ease of your home
        </p>
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-white font-semibold mb-5">EXPLORE</h1>
        <div className="flex flex-col items-start gap-2">
          <p className="text-gray-300 text-md font-bold">Home</p>
          <p className="text-gray-300 text-md font-bold">Products</p>
          <p className="text-gray-300 text-md font-bold">Contact Us</p>
          <p className="text-gray-300 text-md font-bold">Account</p>
        </div>
      </div>

      <div>
        <h1 className="text-2xl text-white font-semibold mb-5">Contact</h1>
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-1">
            <LocationMarkerIcon className="h-5 text-gray-300" />
            <p className="text-gray-300 text-xs">
              354 Dixie Path, South TobinChester 98336
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon className="h-5 text-gray-300" />
            <p className="text-gray-300 text-xs">+1 234 452 5266</p>
          </div>
          <div className="flex items-center gap-3">
            <MailIcon className="h-5 text-gray-300" />
            <p className="text-gray-300 text-xs">ishop@gmail.com</p>
          </div>
          {/* <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt=""
            className="w-full h-7 md:h-7 max-w-xs"
          /> */}
        </div>
        </div>
        <div>
          <h1 className="text-2xl text-white font-semibold mb-5">FOLLOW</h1>
          <div className="flex items-center justify-start gap-5">
          {/* Facebook icon */}
          <svg
            className="w-6 h-6 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {/* Twitter Icon */}
          <svg
            className="w-6 h-6 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          {/* Linked In */}
          <svg
            className="w-6 h-6 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
