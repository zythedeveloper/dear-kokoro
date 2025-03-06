import { date, dayName } from '../DateTime'

const setup = async(records, targetYearMon) => {
    return processData(records, targetYearMon)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records, targetYearMon = null) => {
    return new Promise((resolve) => {
        const l = []
        const d = []
        let count = 0
        let currentDateNumber = parseInt( date(targetYearMon) )
        
        for (let record of records) { // recent 7 days of data
            if (count > 6) break;

            while (currentDateNumber > record.date)
            {
                let temp = currentDateNumber.toString()
                temp = temp.slice(0,4) + '-' + temp.slice(4,6) + '-' + temp.slice(6,8)
                l.push( dayName( new Date(temp)) )
                d.push(null)
                count++
                currentDateNumber--;
            }

            if ( record.date == currentDateNumber) // check for record
            {
                l.push( dayName( record.wakeTime ) )
                d.push( record.weather )
                count++
                currentDateNumber--;
            }
        }

        l.reverse()
        d.reverse()
       
        const data = {
            labels: l,
            datasets: [{
                label: 'Weather',
                data: d,
                borderColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if ( chartArea ) return getGradient(ctx, chartArea);
                },
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if ( chartArea ) return getGradient(ctx, chartArea);
                },
                segment: {
                    borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)'),
                    borderDash: ctx => skipped(ctx, [6, 6]),
                },
                spanGaps: true,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7.5,
                fill: true
            }]
        }
        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                fill: false,
                aspectRatio: 1/1,
                maintainAspectRatio:false,
                scales: { 
                    x: { 
                        beginAtZero: true, 
                        grid: { display: false}
                    },
                    y: { 
                        beginAtZero: false,
                        ticks: { maxTicksLimit: 3, grace:1, display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: { display: false, text: 'Weather Flow' }
                }
            }
        }

        resolve(config)
    })
}

const getGradient = (ctx, chartArea) => {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, '#b7b8ba80');
        gradient.addColorStop(0.5, '#0075b580');
        gradient.addColorStop(1, '#fc500995');
    }
    return gradient;
}

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

export { setup }