module.exports =
{
	getSenData: async (id, time) => {
		return new Promise(async (resolve, rejects) => {
			try {
				const body = {
					id: id,
					time: time
				}
				fetch('http://localhost:3001/Sensor/Chart',
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						credentials: "include",
						body: JSON.stringify(body)
					}).then(res => res.json()).then(sen => {
						resolve(sen);
					});
			} catch (err) {
				console.log(err);
				rejects(err);
			}
		})
	},
	getList: async (id) => {
		return new Promise(async (resolve, rejects) => {
			try {
				const body = {
					id: id
				}
				fetch('http://localhost:3001/Sensor/List',
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						credentials: "include",
						body: JSON.stringify(body)
					}).then(res => res.json()).then(sen => {
						resolve(sen);
					});
			}
			catch (err) {
				console.log(err);
				rejects(err);
			}
		})
	},

	currentTime: (time) => {
		let today = new Date();
		let year = today.getFullYear();
		let month = ('0' + (today.getMonth() + 1)).slice(-2);
		let day = ('0' + today.getDate()).slice(-2);
		let dateString = year + '-' + month + '-' + day;
		if (time == 'today') return dateString;
		else return 'all';
	},

	setChartData: (data) => {
		data = data.results;
		console.log(data);

		let result = [{
			labels: data.map(x => x.time),
			datasets: [
				{
					title: '전기전도도 차트',
					label: '전기전도도',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					fill: 'start',
					backgroundColor: 'rgb(54, 162, 235, 0.2)',
					borderWidth: 2,
					responsive: 'false',
					data: data.map(x => x.ec_value),
					yAxisID: 'y_sub',
				}]
		}, {
			labels: data.map(x => x.time),
			datasets: [
				{
					label: '온도(섭씨)',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					fill: 'start',
					backgroundColor: 'rgb(54, 162, 235, 0.2)',
					borderWidth: 2,
					data: data.map(x => x.tem),
					yAxisID: 'y_sub'
				}]
		}, {
			labels: data.map(x => x.time),
			datasets: [
				{
					label: '습도',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					fill: 'start',
					backgroundColor: 'rgb(54, 162, 235, 0.2)',
					borderWidth: 2,
					data: data.map(x => x.hum),
					yAxisID: 'y_sub'
				}]
		}, {
			labels: data.map(x => x.time),
			datasets: [
				{
					label: '물 수위',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					fill: 'start',
					backgroundColor: 'rgb(54, 162, 235, 0.2)',
					borderWidth: 2,
					data: data.map(x => x.water_level),
					yAxisID: 'y_sub'
				}]
		}]
		return result
	}
}
