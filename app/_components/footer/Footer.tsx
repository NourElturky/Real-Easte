import React from "react";
import Link from "next/link";
import { FacebookIcon } from "../svgs";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links?: FooterLink[];
  content?: string[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Discover",
      links: [
        { label: "New Cairo", href: "#" },
        { label: "Future City", href: "#" },
        { label: "Shikh Zayid", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "FAQ's", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Pricing Plans", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
      ],
    },
    {
      title: "Contact Us",
      content: ["hi@justhome.com", "(20) 1021184647"],
    },
    {
      title: "Our Address",
      content: ["99 Fifth Avenue, 3rd Floor", "San Francisco, CA 1980"],
    },
  ];

  return (
    <div className="bg-[#1F4B43] text-white text-[15px] py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex-1 min-w-[150px] mb-6">
              <h3 className="text-base font-semibold mb-2 text-gray-400">
                {section.title}
              </h3>
              {section.links && (
                <ul className="list-none">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="mb-2">
                      <a href={link.href} className="">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {section.content &&
                section.content.map((line, lineIdx) => (
                  <p key={lineIdx} className=" mb-1">
                    {line}
                  </p>
                ))}
            </div>
          ))}
          <div className="flex-1 gap-4 min-w-[100px] text-center">
            <h3 className="font-bold mb-2 text-white">Follow Us On</h3>
            <div className="flex justify-center space-x-4">
             <Link href={""}>
             <FacebookIcon/>
             </Link>
             <Link href={""}>
             <FacebookIcon/>
             </Link>
             <Link href={""}>
             <FacebookIcon/>
             </Link>
            </div>
          </div>
        </div>
        <div className="text-center py-4 text-sm ">
          <p>Copyright &copy; 2024 JustHome</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
