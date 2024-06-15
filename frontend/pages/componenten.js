// pages/stakeholder-chart.js
import "@/app/globals.css";
import React from 'react';
import StakeholderPieChart from '@/components/stakeholderchart';

const StakeholderChartPage = () => {
    return (
        <div className="container mx-auto pt-3 max-w-screen-lg">
            <h1 className="text-2xl">Stakeholder Interaction Chart</h1>
            <StakeholderPieChart />
        </div>
    );
};

export default StakeholderChartPage;
