// pages/chart.js
import "@/app/globals.css";
import React from 'react';
import Head from 'next/head';
import StakeholderChart from '../components/stakeholderchart'; // adjust the import path as necessary
import { useState } from 'react';

const ChartPage = () => {

    const [english, setEnglish] = useState(true);

    const handleFlagClick = (isEnglish) => {
        setEnglish(isEnglish);
      };

  return (
    <>
        <Head>
            <title>BVDV App</title>
            <link rel="icon" type="image/png" href="/bvdv-icon.png"/>
        </Head>
        
        <div>
            <div className="container mx-auto py-3 max-w-screen-lg">
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
                <h2 className="text-2xl text-center pt-6">{english ? "Focus points stakeholdering" : "Aandachtspunten Stakeholdering"}</h2>
                <p className="text-center pt-2 pb-6">{english ? "By hovering your cursor over each of the segments, you will find its meaning. Go through each of the twelve segments and choose two that you would like to focus on during the training for yourself. Write those down somewhere. Ask the same question to one or two people who know you well. By sending them the link to this page (https://bvdv.vercel.app/stakeholderingchart), they will have access to the same diagram." : "Door met je cursor door elk van de segmenten te gaan, vind je de betekenis ervan. Doorloop elk van de twaalf segmenten en kies er twee uit waarop je tijdens de training het liefst zou focussen voor jezelf. Schrijf die ergens op. Stel dezelfde vraag aan één of twee personen die jou goed kennen. Door hen de link van deze pagina te sturen (https://bvdv.vercel.app/stakeholderingchart) hebben zij toegang tot hetzelfde diagram." }</p>
                <StakeholderChart />
            </div>
        </div>
    </>
    
  );
};

export default ChartPage;