import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLinks } from './FooterLinks';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary py-6 mt-10 pb-o mb-0">
      <div className="container mx-auto px-3 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-museo">flood guard</h2>
            <p className="mt-4 text-sm">Your trusted source for rescue management and flood prediction.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {FooterLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:underline">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t border-secondary w-full max-w-6xl">
          <p className="text-center text-sm py-4">
            &copy; {new Date().getFullYear()} Flood Guard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
