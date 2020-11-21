import React from "react";
import {
	Chart,
	Tooltip,
	Interval,
	Interaction
} from "bizcharts";


export const MyDiagram = ({data}) => {
	
	return (
		<Chart height={"85vh"} padding="auto" data={data}  autoFit filter={[
			['avgRainfall', val => val != null] 
		]}>
			<Interval
				adjust={[
					{
						type: 'dodge',
						marginRatio: 0,
					},
				]}
				color="name"
				position="x*avgRainfall"
			   
			/>
			<Tooltip shared />
			<Interaction type="active-region" />
		</Chart>
	);
}


