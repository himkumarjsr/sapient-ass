import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import styles from './NewsChart.module.scss';

function NewsChart(props) {
    const { data } = props;
    const canvasRef = useRef();
    const chartRef = useRef();
    //console.log(props);

    // const labels = data.map(item => item.objectID);
    // const dataSet = data.map(item => item.points);
    //console.log(dataSet);

    // initialize the chart
    useEffect(() => {
        const labels = data.map(item => item.objectID);
        const dataSet = data.map(item => item.points);
        if (canvasRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        backgroundColor: '#2196f2',
                        borderColor: "#2196f2",
                        data: dataSet,
                        fill: false,
                        lineTension: 0,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "News ID"
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                padding: -8,
                                autoSkip: false,
                                minRotation: 90
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Points"
                            },
                            gridLines: {
                                display: true,
                                drawTicks: false,
                            },
                            ticks: {
                                padding: 10,
                                maxTicksLimit: 5,
                            }
                        }],
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [canvasRef, data]);


    return (
        <div className={styles.chart}>
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}

NewsChart.propTypes = {
    data: PropTypes.array,
};

NewsChart.defaultProps = {
    data: [],
};

export default NewsChart;
