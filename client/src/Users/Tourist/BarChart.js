import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const ToursPerMonthBarChart = ({ tourData }) => {
    // Assuming tourData is an array of numbers representing tours per month
    // Example: tourData = [10, 15, 20, ..., 5]

    // Define months array for x-axis labels
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Dummy data for testing
    const dummyTourData = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: months }]} // Set x-axis with month labels
            series={[{ data: tourData || dummyTourData }]} // Pass tour data as series
            width={800} // Set chart width
            height={400} // Set chart height
        />
    );
}

export default ToursPerMonthBarChart;
