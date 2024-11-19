// pages/lettertest.js
import "@/app/globals.css";
import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import Register from "../components/register";

const lettertestPage = () => {

    const [english, setEnglish] = useState(true);
    const [test, setTest] = useState(false);
    const [completionMessage, setCompletionMessage] = useState('')

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
                    <Register />
                </div>
            </div>
        </>
        
      );
};

export default lettertestPage;