// components/StakeholderPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

const StakeholderPieChart = () => {
    // const labels = [
    //     'Informeren',
    //     'Input',
    //     'Bijdrage',
    //     'Meningsverschil',
    //     'Grenzen',
    //     'Flexibiliteit',
    //     'Kritisch',
    //     'Waarderen',
    //     'Alliantie',
    //     'Engagement',
    //     'Emoties',
    //     'Zichtbaarheid'
    // ];

    // const descriptions = [
    //     'Informeert alle Stakeholders proactief over de voortgang van het project',
    //     'Vraagt expliciet en herhaaldelijk input van Stakeholders',
    //     'Kadert het eigen project als een bijdrage tot de doelstellingen van elke Stakeholder',
    //     'Verdiept zich bij meningsverschillen met Stakeholders in de denkwereld van de andere',
    //     'Kan in de samenwerking met Stakeholders de grenzen bewaken van persoonlijke werkbelasting',
    //     'Kan de eigen aanpak aanpassen aan de behoeftes van de Stakeholders',
    //     'Kan de eigen zienswijze in vraag stellen',
    //     'Uit expliciet waardering voor de bijdrage van Stakeholders',
    //     'Is in staat om bondgenootschappen te smeden met Stakeholders',
    //     'Zorgt ervoor dat Stakeholders zich engageren voor zijn/haar project',
    //     'Is in staat om emotionele reacties van Stakeholders te "lezen" en er constructief mee om te gaan',
    //     'Kan aan zichzelf en aan zijn/haar werk zichtbaarheid geven binnen de organisatie'
    // ];

    const labels = [
        'Informing',
        'Input',
        'Contribution',
        'Disagreement',
        'Boundaries',
        'Flexibility',
        'Critical',
        'Appreciating',
        'Alliance',
        'Engagement',
        'Emotions',
        'Visibility'
    ];

    const descriptions = [
        'Proactively informs all stakeholders about the project\'s progress.',
        'Explicitly and repeatedly asks for input from stakeholders.',
        'Frames the project as a contribution to each stakeholder\'s objectives.',
        'Delves into the other party\'s perspective during disagreements with stakeholders.',
        'Can maintain personal workload boundaries in collaboration with stakeholders.',
        'Can adapt their approach to the needs of the stakeholders.',
        'Can question their own viewpoint.',
        'Explicitly expresses appreciation for stakeholders\' contributions.',
        'Is capable of forging alliances with stakeholders.',
        'Ensures stakeholders are committed to their project.',
        'Can "read" and constructively handle stakeholders\' emotional reactions.',
        'Can give visibility to themselves and their work within the organization.'
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
        layout: {
            padding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return descriptions[tooltipItem.dataIndex];
                    }
                },
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14,
                    weight: 'bold'
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                },
                color: '#000',
                font: {
                    weight: 'bold',
                    size: 20
                },
                anchor: 'end',  // Position the label outside the arc
                align: 'start',   // Align the label away from the center
                offset: 15      // Move the label further outward
            }
        }
    };

    return (
        <div className="pie-chart-container m-16">
            <Pie data={data} options={options} />
        </div>
    );
};

export default StakeholderPieChart;
