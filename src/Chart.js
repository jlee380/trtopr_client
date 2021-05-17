import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
	const [chartData, setchartData] = useState({});

	const chart = async () => {
		let arr = [];
		let loopCount = 0;
		let sortedByDate = {};
		const date = [];
		const count = [];

		const dataFromServer = await fetch('http://localhost:3001/data');
		const json = await dataFromServer.json();

		for (const key in json) {
			arr.push(json[key]);
		}

		for (const data of arr) {
			loopCount++;
			dateExtraction(data, loopCount);
			date.push(data.time_stamp);
			count.push(data.pathwayCounter.CWE);
		}

		setchartData({
			labels: date,
			datasets: [
				{
					label: 'level of thiccness',
					data: count,
					backgroundColor: ['rgba(75, 192, 192, 0.6)'],
					borderWidth: 4,
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, []);

	const dateExtraction = (data, loopCount) => {
		let temp;
		let max;
		let currentTime = data.time_stamp;

		// console.log(data.time_stamp.slice(5, 10).replace('-', '/'));
	};

	return (
		<div className='App'>
			<h1>Chart</h1>
			<div>
				<Line
					data={chartData}
					options={{
						responsive: true,
						title: { text: 'THICCNESS SCALE', display: true },
						scales: {
							yAxes: [
								{
									ticks: {
										autoSkip: true,
										maxTicksLimit: 10,
										beginAtZero: true,
									},
									gridLines: {
										display: false,
									},
								},
							],
							xAxes: [
								{
									gridLines: {
										display: false,
									},
								},
							],
						},
					}}
				/>
			</div>
		</div>
	);
};

export default Chart;
