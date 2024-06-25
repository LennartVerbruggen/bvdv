"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Link from 'next/link';
import Register from "@/components/register";
import Registreer from "@/components/registreer";
import StakeholderPieChart from '@/components/stakeholderchart';
import { useState } from 'react';
import Head from "next/head";

const Home = () => {

  const [english, setEnglish] = useState(false);
  const [test, setTest] = useState(false);
  const [chart, setChart] = useState(false)
  const [message, setMessage] = useState('')

  const handleFlagClick = (isEnglish) => {
    setEnglish(isEnglish);
  };

  const handleTestButtonClick = () => {
    setTest(prevState => !prevState);
    setChart(false);
  }

  const handleChartButtonClick = () => {
    setChart(prevState => !prevState);
    setTest(false);
  }

  const handleTestSubmit = () => {
    setTest(false);
    if (english) {
      setMessage('Test completed')
    } else {
      setMessage('Test voltooid')
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>BVDV App</title>
        <link rel="icon" type="image/png" href="/bvdv-icon.png"/>
      </Head>
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
                className={`${english ? "opacity-50" : ""} h-4 md:h-5 cursor-pointer hover:opacity-50 hover:duration-500`}
                onClick={() => handleFlagClick(true)}
              />

              {/* Flag of Netherlands */}
              <img
                src="/nl.png"
                alt="Flag of Netherlands"
                className={`${english ? "" : "opacity-50"} h-4 md:h-5 cursor-pointer hover:opacity-50 hover:duration-500`}
                onClick={() => handleFlagClick(false)}
              />
            </div>
          </div>
          {english ? (<p className="pt-5 text-center">Welcome. In preparation for the training, you can complete the letter experiment below.<br/> Together with the registration, this will take approximately 1 minute.<br/> You will also find a button here to get an overview of the focus points.</p>
          ) : (<p className="pt-5 text-center">Welkom. Als voorbereiding op de training vind je hierna twee sets van informatie:<br/> Eén rond lettercombinaties en één rond aandachtspunten.<br/> Je wordt vriendelijk verzocht om elk van beiden te doorlopen.</p>)}
          
          <div className="flex flex-col sm:flex-row justify-center pt-5 gap-5 mb-6">
            <button className={`${test ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-900 transition-all duration-300 text-white font-bold rounded py-2 px-4 mx-4`} onClick={() => handleTestButtonClick()}>{english ? "Letter combinations": "Lettercombinaties"}</button>
            <Link href="/stakeholderingchart" legacyBehavior>
                <a target="_blank">
                  <button className={`${chart ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-900 transition-all duration-300 text-white font-bold rounded py-2 px-4 mx-4`}>{english ? "Focus points stakeholdering" : "Aandachtspunten Stakeholdering"}</button>
                </a>
            </Link>
          </div>

          {message === '' ? null : <h2 className="text-xl text-center text-green-600 py-6">{message}</h2>}

          <div className="mb-6">
            {test ? (<>{english ? <Register onTestSubmit={handleTestSubmit}/> : <Registreer onTestSubmit={handleTestSubmit}/>}</>) : (<></>)}
          </div>
          
        </div>
      </body>
    </>
    
  );
};

export default Home;
