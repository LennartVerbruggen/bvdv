"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Register from "@/components/register";
import Registreer from "@/components/registreer";
import StakeholderPieChart from '@/components/stakeholderchart';
import { useState } from 'react';

const Home = () => {

  const [english, setEnglish] = useState(false);
  const [test, setTest] = useState(false);
  const [chart, setChart] = useState(false)

  const handleFlagClick = (isEnglish) => {
    setEnglish(isEnglish);
  };

  const handleTestButtonClick = () => {
    if (test) (
      setTest(false)
    )
    else (
      setTest(true)
    )
  }

  const handleChartButtonClick = () => {
    if (chart) (
      setChart(false)
    )
    else (
      setChart(true)
    )
  }

  return (
    <>
      <head>
        <title>BVDV App</title>
        <link rel="icon" type="image/png" href="/bvdv-icon.png"/>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </head>
      <body className="bg-slate-200">
        <div className="container mx-auto pt-3 max-w-screen-lg">
          <div className="flex items-center justify-between mb-4 px-3">
            {/* Logo */}
            <a href="https://burovandervurst.com/" target="_blank" rel="noopener noreferrer">
              <img src="/bvdv-logo.png" alt="Logo" className="h-10 md:h-20 cursor-pointer" />
            </a>

            {/* Flags */}
            <div className="flex-col space-y-2">
              {/* Flag of England */}
              <img
                src="/en.png"
                alt="Flag of England"
                className="h-4 md:h-5 cursor-pointer"
                onClick={() => handleFlagClick(true)}
              />

              {/* Flag of Netherlands */}
              <img
                src="/nl.png"
                alt="Flag of Netherlands"
                className="h-4 md:h-5 cursor-pointer"
                onClick={() => handleFlagClick(false)}
              />
            </div>
          </div>
          {english ? (<p className="pt-5 text-center">Welcome user, here u can prepare yourself for the seminar.<br/>Complete the registration and study the stakeholder interaction chart by clicking the buttons.</p>
          ) : (<p className="pt-5 text-center">Welkom gebruiker, hier kan u zichzelf voorbereiden voor het seminarie.<br/>Vul de registratie in en bekijk de stakeholder interaction chart door op de knoppen te klikken.</p>)}
          
          <div className="flex justify-center pt-5 gap-5 mb-6">
            <button className={`${test ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-900 text-white font-bold rounded py-2 px-4`} onClick={() => handleTestButtonClick()}>{english ? "Register": "Registratie"}</button>
            <button className={`${chart ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-900 text-white font-bold rounded py-2 px-4`} onClick={() => handleChartButtonClick()}>Stakeholder interaction chart</button>
          </div>

          <div className="mb-6">
            {test ? (<>{english ? <Register /> : <Registreer />}</>) : (<></>)}
          </div>
          
          {chart ? (<StakeholderPieChart />) : (<></>)} 
        </div>
      </body>
    </>
    
  );
};

export default Home;
