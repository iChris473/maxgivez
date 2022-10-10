import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser"

export default function Newsletter() {

  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const formRef = useRef()
  const email = useRef()
  const message = useRef()

  const handleSubmit = (e) => {

    e.preventDefault();

    const timeout = () => {
      setTimeout(() => {
        setErr(false);
        setDone(false);
      }, 6000);
    } 

    emailjs
      .sendForm(
        "service_s3uc3uw",
        "template_2n94gtm",
        formRef.current,
        "user_GZoXBKzJqzFLxxYVoFFk0"
      )
      .then(
        (result) => {
          console.log(result.text);
          email.current.value = ""
          message.current.value = ""
          setDone(true)
          timeout()
        },
        (error) => {
          email.current.value = ""
          message.current.value = ""
          setErr(true)
          timeout()
        }
      );
  };

  return (
    <div id='contactUs' className="bg-green-50 p-2 my-10 py-10">
      <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-800">
          Contact Us
        </h1>
        <p className={`${done ? "bg-green-500 p-2 text-white" : err ? "bg-red-500 p-2 text-white" : "text-gray-600"} text-lg`}>
         {done ? "Message Sent Succesfully" : err ? "Ann error occured" : " Send us a message and we will get back to you Immediately"}
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-[500px]">
          <textarea
            required
            name="message"
            ref={message}
            type="text"
            placeholder="write a message"
            className="w-full bg-transparent border border-gray-300 p-2 px-4 outline-none focus:ring-0"
          />
          <div className="flex items-center">
            <input
              required
              name="user_email"
              ref={email}
              type="email"
              placeholder="your email"
              className="flex-1 p-1 outline-none focus:ring-0"
            />
            <button type="submit">
              <PaperAirplaneIcon className="p-1 bg-green-600 text-white h-8 rotate-90" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
