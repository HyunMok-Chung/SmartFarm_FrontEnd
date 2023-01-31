import React, { Component, useState, useEffect } from 'react';
var getXY = require('./convertXY');

function WeatherInfo() {
	const [Date2, setDate2] = useState("");
	const [Time, setTime] = useState("");
	const [Latitude, setLatitude] = useState(false);
	const [Longitude, setLongitude] = useState(false);
	const [Data, setData] = useState(false);

	const getBaseDateTime = ({ minutes = 0, provide = 40 } = {}, dt = Date.now()) => {
		const pad = (n, pad = 2) => ('0'.repeat(pad) + n).slice(-pad)
		const date = new Date(dt - (provide * 60 * 1000)) // provide분 전
		return {
			base_date: date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()),
			base_time: pad(date.getHours()) + pad(minutes)
		}
	}
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log((position.coords.latitude), position.coords.longitude);
				var xy = getXY.toXY(position.coords.latitude, position.coords.longitude);
				console.log(xy);
				setLatitude(xy.x);
				setLongitude(xy.y);
			})
		}
		else
			return (-1);
	}

	const getWeatherInfo = () => {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
		let queryParams = '?' + encodeURIComponent('serviceKey') + '=' +
			'hdzJlamqcI9RadMq1bNFB06T1dXVd5zzs6/dN50zUW2fpJMTfxlgs8yI54BIstOyE3VXPC9Hw1uCb7yD7VblVA=='; /*Service Key*/
		queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
		queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
		queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
		queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(Date2); /**/
		queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(Time); /**/
		queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(Latitude); /**/
		queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(Longitude); /**/
		console.log(Date2, Time, Latitude, Longitude);
		fetch('/api' + url + queryParams,
			{
				headers:
				{
					'Accept': 'application/json'
				}
			}).then(res => res.json()).then(data => {
				if (data.response.header.resultCode == '00') {
					setData(data);
					console.log(data);
				}
			})
	}
	//렌더링 끝나고
	useEffect(() => {
		setDate2(getBaseDateTime().base_date);
		console.log("date값 바뀜");
	}, [Date2])

	useEffect(() => {
		setTime(getBaseDateTime().base_time);
		console.log("time값 바뀜");
	}, [Time])

	useEffect(() => {
		getLocation();
		console.log("location use effect");
		//getWeatherInfo();
		if (Latitude != false && Longitude != false) {
			fetch('http://localhost:3001/Weather',
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						{
							date: Date2,
							time: Time,
							latitude: Latitude,
							longitude: Longitude
						}
					)
				}).then(res => res.json()).then(data =>
					{
						console.log(data);
					})
		}
	}, [Latitude, Longitude])

	useEffect(() => {
		console.log("asdf");
	}, [Data])

	return (
		<div>
			<a>{Date2}</a>
			<br></br>
			<a>{Time}</a>
			<br></br>
			<a>{Latitude}</a>
			<br></br>
			<a>{Longitude}</a>
			<br></br>
			{
				`{Data}` === true
					? <a>{console.log(Data, "in return")}</a>
					: <a>{console.log(Data, "in return")} </a>
			}
		</div>
	);
}

export default WeatherInfo;
