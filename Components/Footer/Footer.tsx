import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-5">
        <div className="">
          <Image src="/imgs/logo1.png" alt="logo" width={120} height={120} />
        </div>

        <ul className="flex flex-col md:flex-row gap-4 text-sm  text-center">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-primary transition-colors">
              About
            </a>
          </li>
          <li className="hidden md:block">|</li>
          <li>
            <a
              href="/comming-soon"
              className="hover:text-primary transition-colors"
            >
              comming soon
            </a>
          </li>
          <li className="hidden md:block">|</li>
          <li>
            <a
              href="https://essam-portfolio-nine.vercel.app/"
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 mt-8 md:mt-0">
          <a
            target="blank"
            href="https://www.linkedin.com/in/muhamed-essam-9a8983247/"
            className="hover:text-primary transition-colors"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            target="blank"
            href="https://www.instagram.com/muhamed.essam1911/?utm_source=ig_web_button_share_sheet"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            target="blank"
            href="https://www.facebook.com/muhamed.essam.50/"
            className="hover:text-primary transition-colors"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            target="blank"
            href="https://wa.me/201272570775www.linkedin.com/in/muhamed-essam-9a8983247"
            className="hover:text-primary transition-colors"
          >
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6">
        © 2025 MyPortfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
