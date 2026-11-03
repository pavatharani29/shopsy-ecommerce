import { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

const App = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [query, setQuery] = useState("");

  const openOrder = useCallback(() => setOrderPopup(true), []);
  const closeOrder = useCallback(() => setOrderPopup(false), []);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once: true,
      disable: () =>
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    });
    // images change the page height once loaded, so recalculate positions
    window.addEventListener("load", AOS.refresh);
    return () => window.removeEventListener("load", AOS.refresh);
  }, []);

  return (
    <div
      id="top"
      className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden"
    >
      <Navbar handleOrderPopup={openOrder} query={query} setQuery={setQuery} />
      <Hero handleOrderPopup={openOrder} />
      <section id="products">
        <Products query={query} clearQuery={() => setQuery("")} />
      </section>
      <section id="top-rated">
        <TopProducts handleOrderPopup={openOrder} />
      </section>
      <section id="offers">
        <Banner />
      </section>
      <section id="subscribe">
        <Subscribe />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <footer id="contact">
        <Footer />
      </footer>
      <Popup open={orderPopup} onClose={closeOrder} />
    </div>
  );
};

export default App;
