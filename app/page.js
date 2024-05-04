"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Register from "@/components/register";
import Registreer from "@/components/registreer";
import { useState } from 'react';

const Home = () => {

  const [english, setEnglish] = useState(false);

  const handleFlagClick = (isEnglish) => {
    setEnglish(isEnglish);
  };

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto pt-3 max-w-screen-lg">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <img src="/bvdv-logo.png" alt="Logo" className="h-20" />

            {/* Flags */}
            <div className="flex space-x-4">
              {/* Flag of England */}
              <img
                src="/en.png"
                alt="Flag of England"
                className="h-4 cursor-pointer"
                onClick={() => handleFlagClick(true)}
              />

              {/* Flag of Netherlands */}
              <img
                src="/nl.png"
                alt="Flag of Netherlands"
                className="h-4 cursor-pointer"
                onClick={() => handleFlagClick(false)}
              />
            </div>
          </div>
          {english ? <Register /> : <Registreer />}
        </div>
      </div>
    </>
    
  );
};

export default Home;
