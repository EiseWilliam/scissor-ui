"use client"


import { VectorMap } from "@react-jvectormap/core";
import worldMill from "@react-jvectormap/world/dist/worldMill.json";
import { useEffect, useRef, useState } from "react";



const regionStyle = {
	initial: {
		fill: "#e4e4e4",
		"fill-opacity": 0.9,
		stroke: "none",
		"stroke-width": 0,
		"stroke-opacity": 0,
	},
};

const containerStyle = {
	width: "100%",
	height: "300px",
};

export const colorScale = ["#E2AEFF", "#5E32CA"];

type MapData = Record<string, number>;

interface WMapProps {
	data: MapData;
	className?: string
}

function WMap({ data, ...props }: WMapProps) {
	const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); 
    }, []);
	const series = {
		regions: [
			{
				values: data,
				scale: ["#AAAAAA", "#0077be"],
				normalizeFunction: "polynomial",
			},
		],
	};

	return (
		<div className="m-auto w-full h-[300px] bg-slate-600">
			<VectorMap
				{...props}
				map={worldMill}
				zoomOnScroll={false}
				// Remove the containerStyle prop
				// containerStyle={containerStyle}
				regionStyle={regionStyle}
				backgroundColor="white"
				series={{
					regions: [
						{
							attribute: "value",
							values: data,
							scale: ["#AAAAAA", "#0077be"],
							normalizeFunction: "polynomial",
						},
					],
				}}
				onRegionTipShow={(event, label, code) => {
					label.innerHTML = `
				<div className="bg-white">
				  <p>
				  <b>
			
				  </b>
				  </p>
				  <p>
				  ${data[code]}
				  </p>
				  </div>`;
				}}
			/>
		</div>
	);
}

export default WMap;
