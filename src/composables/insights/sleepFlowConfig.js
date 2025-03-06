import { date, dayName, duration } from "../DateTime"

const setup = async(records, targetYearMon) => {
    return processData(records, targetYearMon)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records, targetYearMon = null) => {
    return new Promise((resolve) => {
        const l = []
        const actual = []
        let count = 0;
        let currentDateNumber = parseInt( date(targetYearMon) )

        for (let record of records) { // recent 7 days of data
            if (count > 6) break;
            while (currentDateNumber > record.date)
            {
                let temp = currentDateNumber.toString()
                temp = temp.slice(0,4) + '-' + temp.slice(4,6) + '-' + temp.slice(6,8)
                l.push( dayName( new Date(temp)) )
                actual.push(null)
                count++
                currentDateNumber--;
            }

            if ( record.date == currentDateNumber) // check for record
            {
                l.push( dayName( record.wakeTime ) )
                actual.push( duration(record.sleepTime, record.wakeTime) )
                count++
                currentDateNumber--;
            }
        }

        l.reverse()
        actual.reverse()
        
        const data = {
            labels: l,
            datasets: [{
                label: 'Duration',
                data: actual,
                borderColor: '#005b9680',
                backgroundColor: '#005b9680',
                segment: {
                    borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)'),
                    borderDash: ctx => skipped(ctx, [6, 6]),
                },
                spanGaps: true,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7.5
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
                        beginAtZero: true,
                        title: { display: true, text: 'hours' },
                        ticks: { maxTicksLimit: 5, display: true }
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: { display: false, text: 'Sleep Flow' }
                }
            }
        }

        resolve(config)
    })
}

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

export { setup }