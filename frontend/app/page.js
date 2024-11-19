"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Link from 'next/link';
import Register from "@/components/register";
import Registreer from "@/components/registreer";
import StakeholderPieChart from '@/components/stakeholderchart';
import { useState } from 'react';

const Home = () => {

  const [english, setEnglish] = useState(true);
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
      setMessage('The test has been completed. Thank you. You can close this screen.')
    } else {
      setMessage('Test voltooid. De gegevens zullen enkel gebruikt worden tijdens de training. Zo meteen kom je terug op het startscherm.')
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 8000);
  };

  return (
    <>
      <head>
        <title>BVDV App</title>
        <link rel="icon" type="image/x-icon" href="/bvdv-icon.png"/>
      </head>
      <body className="">
        <div className="container mx-auto pt-3 max-w-screen-lg">
          <div className="flex items-center justify-between mb-4 px-3">
            {/* Logo */}
            <a href="https://burovandervurst.com/" target="_blank" rel="noopener noreferrer">
              <img src="/bvdv-logo.png" alt="Logo" className="h-10 md:h-20 cursor-pointer" />
            </a>

            {/* Disable dutch versio */}

            {/* Flags */}
            {/* <div className="flex-col space-y-2"> */}
              {/* Flag of England */}
              {/* <img
                src="/en.png"
                alt="Flag of England"
                className={`${english ? "opacity-50" : ""} h-4 md:h-5 cursor-pointer hover:opacity-50 hover:duration-500`}
                onClick={() => handleFlagClick(true)}
              /> */}

              {/* Flag of Netherlands */}
              {/* <img
                src="/nl.png"
                alt="Flag of Netherlands"
                className={`${english ? "" : "opacity-50"} h-4 md:h-5 cursor-pointer hover:opacity-50 hover:duration-500`}
                onClick={() => handleFlagClick(false)}
              />
            </div> */}

          </div>
          {english ? (
            <>
              <p className="pt-5 text-center text-2xl font-semibold">Welcome</p>
              <p className="pt-5 text-center"> In preparation for the next session, please complete the task below.<br/> Together with the registration, this will take no more then 2 minute.</p>
            </>
            ) : (<p className="pt-5 text-center">Welkom. Als voorbereiding op de training vind je hierna twee sets van informatie:<br/> Eén rond lettercombinaties en één rond aandachtspunten.<br/> Je wordt vriendelijk verzocht om elk van beiden te doorlopen.</p>)}
          
          <div className="flex flex-col sm:flex-row justify-center pt-5 gap-5 mb-6">
            <Link href="/lettertest" legacyBehavior>
              <a target="_blank">
                <button className={`${test ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-900 transition-all duration-300 text-white font-bold rounded py-2 px-4 mx-4`} onClick={() => handleTestButtonClick()}>{english ? "Letter pairs": "Lettercombinaties"}</button>
              </a>
            </Link>
            
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
