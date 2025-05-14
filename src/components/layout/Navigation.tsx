'use client'

import React from 'react';
import Image from 'next/image';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/images/MMLogo.png" alt="Logo" width={220} height={220} className="rounded-full" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-3 text-right">
        <a href="#home" className="text-white text-[14px] font-semibold uppercase tracking-wider hover:text-blue-200 transition-colors">Home</a>
        <a href="#listings" className="text-white text-[14px] font-semibold uppercase tracking-wider hover:text-blue-200 transition-colors">Listings</a>
        <a href="#move" className="text-white text-[14px] font-semibold uppercase tracking-wider hover:text-blue-200 transition-colors">Let&apos;s move</a>
        <a href="#about" className="text-white text-[14px] font-semibold uppercase tracking-wider hover:text-blue-200 transition-colors">About us</a>
      </div>
    </nav>
  );
};

export default Navigation;