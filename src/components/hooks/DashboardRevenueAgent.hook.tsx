import { ApexOptions } from 'apexcharts';
import data from "@/domain/creator/create_agent/__mock__/dashboard_agent.json"

const options: ApexOptions = {
    chart: {
        height: '100%',
        width: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: 'yellow',
            gradientToColors: ['yellow'],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0,
        },
    },
    series: [
        {
            name: 'revenue',
            data: data.data_revenue,
            color: 'yellow',
        },
    ],
    xaxis: {
        categories: data.categories,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
};

export default options