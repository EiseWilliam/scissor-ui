interface ApiReturnData {
	overview: overviewData;
	timeline: timelineData;
	referrers: referrersData;
	location: locationData;
}

type overviewData = {
	clicks: number;
	scans: number;
	last_activity: string;
	total_engagement: number;
};

type timelineData = {
	count: dict;
};
type referrersData = dict;

type locationData = {
	countries: dict;
	cities: dict;
	country_codes: dict;
};

type dict = Record<string, number>;

export type { ApiReturnData, overviewData, timelineData, referrersData, locationData, dict}