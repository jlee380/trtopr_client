import React from 'react';
import { render } from 'react-dom';
// Import Highcharts
import Highcharts from 'highcharts/highstock';
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from 'highcharts-react-official';

import HC_more from 'highcharts/highcharts-more'; //module
HC_more(Highcharts); //init module

class StockLiveChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					events: {
						load: function () {
							// set up the updating of the chart each second
							var series = this.series[0];
							setInterval(function () {
								var x = new Date().getTime(), // current time
									y = Math.round(Math.random() * 100);
								series.addPoint([x, y], true, true);
							}, 1000);
						},
					},
				},

				time: {
					useUTC: false,
				},

				rangeSelector: {
					buttons: [
						{
							count: 1,
							type: 'minute',
							text: '1M',
						},
						{
							count: 5,
							type: 'minute',
							text: '5M',
						},
						{
							type: 'all',
							text: 'All',
						},
					],
					inputEnabled: false,
					selected: 0,
				},

				title: {
					text: 'Live random data',
				},

				exporting: {
					enabled: false,
				},

				series: [
					{
						name: 'Random data',
						data: (function () {
							// generate an array of random data
							var data = [],
								time = new Date().getTime(),
								i;

							for (i = -999; i <= 0; i += 1) {
								data.push([
									time + i * 1000,
									Math.round(Math.random() * 100),
								]);
							}
							return data;
						})(),
					},
				],
			},
		};
	}

	render() {
		return (
			<HighchartsReact
				constructorType={'stockChart'}
				ref={this.chartComponent}
				highcharts={Highcharts}
				options={this.state.options}
			/>
		);
	}
}

export default StockLiveChart;
