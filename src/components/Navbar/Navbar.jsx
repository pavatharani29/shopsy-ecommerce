import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaBars, FaXmark } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";

// Links are in-page "#section" anchors, so they always resolve under the current
// page URL (e.g. /shopsy-ecommerce/#products) and never leave the site.
const Menu = [
  { id: "home", name: "Home", link: "#top" },
  { id: "top-rated", name: "Top Rated", link: "#top-rated" },
  { id: "kids", name: "Kids Wear", link: "#products" },
  { id: "mens", name: "Mens Wear", link: "#products" },
  { id: "electronics", name: "Electronics", link: "#products" },
];

const DropdownLinks = [
  { id: "trending", name: "Trending Products", link: "#products" },
  { id: "best", name: "Best Selling", link: "#products" },
  { id: "top", name: "Top Rated", link: "#top-rated" },
];

const SearchBox = ({ query, setQuery, className, inputClassName }) => {
  const goToProducts = (e) => {
    e.preventDefault();
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <form
      role="search"
      onSubmit={goToProducts}
      className={`relative group ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search products"
        placeholder="search"
        className={`rounded-full border border-gray-300 px-2 py-1 pr-8 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800 ${inputClassName}`}
      />
      <button
        type="submit"
        aria-label="Search"
        className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3"
      >
        <IoMdSearch />
      </button>
    </form>
  );
};

const Navbar = ({ handleOrderPopup, query, setQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <a href="#top" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
            <img src={Logo} alt="" className="w-10" />
            Shopsy
          </a>

          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* search bar (desktop) */}
            <SearchBox
              query={query}
              setQuery={setQuery}
              className="hidden sm:block"
              inputClassName="w-[200px] group-hover:w-[300px] focus:w-[300px] transition-all duration-300"
            />

            {/* order button */}
            <button
              type="button"
              onClick={handleOrderPopup}
              aria-label="Order"
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm" />
            </button>

            <DarkMode />

            {/* hamburger (mobile) */}
            <button
              type="button"
              className="sm:hidden text-2xl p-1"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* lower Navbar (desktop) */}
      <nav aria-label="Main" data-aos="zoom-in" className="hidden sm:flex justify-center">
        <ul className="flex items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 py-2 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
          {/* Dropdown: opens on hover and on keyboard focus */}
          <li className="group relative">
            <a href="#products" className="flex items-center gap-[2px] py-2">
              Trending Products
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </a>
            <div className="absolute z-[9999] hidden group-hover:block group-focus-within:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4"
        >
          <SearchBox
            query={query}
            setQuery={setQuery}
            className="mb-3"
            inputClassName="w-full"
          />
          <ul className="flex flex-col">
            {[...Menu, ...DropdownLinks.filter((d) => d.id !== "top")].map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-primary"
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
