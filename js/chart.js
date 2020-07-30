createChart();

async function createChart() {
    const ctx = document.getElementById('myChart');
    const data = await getData();

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xAxisYear,
            datasets: [{
                label: 'Global Average Temperature in °C',
                fill: false,
                data: data.yAxisTemperatureGlobal,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Southern Hemisphere Temperature in °C',
                fill: false,
                data: data.yAxisTemperatureNorth,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Northern Hemisphere Temperature in °C',
                fill: false,
                data: data.yAxisTemperatureSouth,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 0.5,
                        callback: function (value, index, values) {
                            return `${value} °`;
                        }
                    },
                }]
            },
            title: {
                display: true,
                text: 'Global Average Temperatures 1880-2018',
                padding: 20,
                fontSize: 20
            },
            aspectRatio: 2
        }
    });
}

async function getData() {
    const xAxisYear = [];
    const yAxisTemperatureGlobal = [];
    const yAxisTemperatureNorth = [];
    const yAxisTemperatureSouth = [];

    await fetch('../data.csv') //Data is downloaded from: https://data.giss.nasa.gov/gistemp/
        .then(res => res.text())
        .then(res => {
            const tableData = res.split("\n").slice(1);

            tableData.forEach(row => {
                const cols = row.split(",");
                const year = cols[0];
                const temperatureGlobal = cols[1];
                const temperatureNorth = cols[2];
                const temperatureSouth = cols[3];

                xAxisYear.push(year);
                yAxisTemperatureGlobal.push(+temperatureGlobal + 14); //need to +14 to get the actual temp https://earthobservatory.nasa.gov/world-of-change/global-temperatures
                yAxisTemperatureNorth.push(+temperatureNorth + 14);
                yAxisTemperatureSouth.push(+temperatureSouth + 14);
            })
        })
        .catch(err => console.log(err))

    return { xAxisYear, yAxisTemperatureGlobal, yAxisTemperatureNorth, yAxisTemperatureSouth };
}
