import { useState } from "react";
import Banner from "../../assets/website/orange-pattern.jpg";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "error"

  const submit = (e) => {
    e.preventDefault();
    if (EMAIL_RE.test(email.trim())) {
      setStatus("ok");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <form onSubmit={submit} noValidate className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-semibold text-center sm:text-left">
            Get Notified About New Products
          </h1>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus(null);
            }}
            aria-label="Email address"
            placeholder="Enter your email"
            className="w-full p-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-white text-secondary font-semibold py-2 px-6 rounded-md hover:scale-105 duration-200"
            >
              Subscribe
            </button>
            <p role="status" className="text-sm font-medium">
              {status === "ok" && "Thanks for subscribing!"}
              {status === "error" && "Please enter a valid email address."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
