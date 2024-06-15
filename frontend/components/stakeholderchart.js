// components/StakeholderPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const StakeholderPieChart = () => {
    const labels = [
        'Informeren',
        'Input',
        'Bijdrage',
        'Meningsverschil',
        'Grenzen',
        'Flexibiliteit',
        'Kritisch',
        'Waarderen',
        'Alliantie',
        'Engagement',
        'Emoties',
        'Zichtbaarheid'
    ];

    const descriptions = [
        'Informeert alle Stakeholders proactief over de voortgang van het project',
        'Vraagt expliciet en herhaaldelijk input van Stakeholders',
        'Kadert het eigen project als een bijdrage tot de doelstellingen van elke Stakeholder',
        'Verdiept zich bij meningsverschillen met Stakeholders in de denkwereld van de andere',
        'Kan in de samenwerking met Stakeholders de grenzen bewaken van persoonlijke werkbelasting',
        'Kan de eigen aanpak aanpassen aan de behoeftes van de Stakeholders',
        'Kan de eigen zienswijze in vraag stellen',
        'Uit expliciet waardering voor de bijdrage van Stakeholders',
        'Is in staat om bondgenootschappen te smeden met Stakeholders',
        'Zorgt ervoor dat Stakeholders zich engageren voor zijn/haar project',
        'Is in staat om emotionele reacties van Stakeholders te "lezen" en er constructief mee om te gaan',
        'Kan aan zichzelf en aan zijn/haar werk zichtbaarheid geven binnen de organisatie'
    ];

    const dataValues = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Placeholder values for each label

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stakeholder Interactions',
                data: dataValues,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return descriptions[tooltipItem.dataIndex];
                    }
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                },
                color: '#fff',
                font: {
                    weight: 'bold'
                }
            }
        }
    };

    return (
        <div className="pie-chart-container">
            <h2 className="text-center text-2xl font-bold">Stakeholder Interactions</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default StakeholderPieChart;
