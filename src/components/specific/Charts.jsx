import React from 'react'

import { Line, Doughnut } from 'react-chartjs-2'

import {
    Chart as ChartJs,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    CategoryScale,
    Legend

} from 'chart.js'
import { orange, orangeLight, purple, purpleLight } from '../../constants/color'
import { getLast7Days } from '../../libs/feature'


ChartJs.register(
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    CategoryScale,
    Legend
)

const labels = getLast7Days()

const linechatOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        },
    }

}


const LineChart = ({ value = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: true,
                backgroundColor: purpleLight,
                borderColor: purple,
            },


        ]
    }
    return (
        <Line
            data={data}
            options={linechatOptions}
        />


    )
}


const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legends: {
            display: false,
        },
    },
    cutout: 120,
}

const DoughnutChart = ({ value = [], labels = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [purpleLight, orangeLight],
                hoverBackgruundColor : [purple, orange],
                borderColor: [purple, orangeLight],
                offset: 40
            },


        ]
    }
    return (
        <Doughnut 
        style={{
            zIndex : 10
        }}
        data={data} 
        options={doughnutChartOptions}>

        </Doughnut>
    )
}

export { LineChart, DoughnutChart }
