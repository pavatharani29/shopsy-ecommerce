import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const ImportantLinks = [
  { title: "Home", link: "#top" },
  { title: "Products", link: "#products" },
  { title: "Top Rated", link: "#top-rated" },
  { title: "Offers", link: "#offers" },
];

const MoreLinks = [
  { title: "Subscribe", link: "#subscribe" },
  { title: "Testimonials", link: "#testimonials" },
  { title: "Contact", link: "#contact" },
];

const Socials = [
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/" },
];

const LinkList = ({ title, links }) => (
  <div>
    <div className="py-8 px-4">
      <h2 className="text-xl font-bold sm:text-left mb-3">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.title}>
            <a
              href={link.link}
              className="inline-block hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h2 className="sm:text-3xl text-xl font-bold sm:text-left mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              Shopsy
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
              beatae ea recusandae blanditiis veritatis.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <LinkList title="Important Links" links={ImportantLinks} />
            <LinkList title="More" links={MoreLinks} />

            {/* social links */}

            <div>
              <div className="flex items-center gap-3 mt-6">
                {Socials.map(({ name, icon: Icon, link }) => (
                  <a
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="hover:text-primary duration-200"
                  >
                    <Icon className="text-3xl" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Chennai, Tamil Nadu</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+91 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
