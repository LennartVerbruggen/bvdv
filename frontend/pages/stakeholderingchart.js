// pages/chart.js
import "@/app/globals.css";
import React from 'react';
import Head from 'next/head';
import StakeholderChart from '../components/stakeholderchart'; // adjust the import path as necessary
import { useState } from 'react';

const ChartPage = () => {

    const [english, setEnglish] = useState(false);

    const handleFlagClick = (isEnglish) => {
        setEnglish(isEnglish);
      };

  return (
    <>
        <Head>
            <title>BVDV App</title>
            <link rel="icon" type="image/png" href="/bvdv-icon.png"/>
        </Head>
        
        <div className="bg-slate-200">
            <div className="container mx-auto py-3 max-w-screen-lg">
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
                <h2 className="text-2xl text-center pt-6">{english ? "Focus points stakeholdering" : "Aandachtspunten Stakeholdering"}</h2>
                <p className="text-center pt-2 pb-6">Door met je cursor door elk van de segmenten te gaan, vind je de betekenis ervan. Doorloop elk van de twaalf segmenten en kies er twee uit waarop je tijdens de training het liefst zou focussen voor jezelf. Schrijf die ergens op. Stel dezelfde vraag aan één of twee personen die jou goed kennen. Zij hebben toegang tot hetzelfde diagram.</p>
                <StakeholderChart />
            </div>
        </div>
    </>
    
  );
};

export default ChartPage;