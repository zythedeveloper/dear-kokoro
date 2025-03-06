import { date, dayName, duration } from "../DateTime"

const setup = async(records, targetYearMon) => {
    return processData(records, targetYearMon)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records, targetYearMon = null) => {
    return new Promise((resolve) => {
        let currentDateNumber = parseInt( date(targetYearMon) )
        const l = []
        const expect = []
        const actual = []
        let count = 0
        
        for (let record of records) { // recent 7 days of data
            if (count > 6) break;
            
            while (currentDateNumber > record.date) // check the record
            {
                let temp = currentDateNumber.toString()
                temp = temp.slice(0,4) + '-' + temp.slice(4,6) + '-' + temp.slice(6,8)
                l.push( dayName( new Date(temp)) )
                actual.push(null)
                expect.push(null)
                count++
                currentDateNumber--;
            }

            if ( record.date == currentDateNumber)
            {
                l.push( dayName( record.wakeTime ) )
                actual.push( duration(record.sleepTime, record.wakeTime) )
                expect.push (record.expectedSleepHour)
                count++
                currentDateNumber--;
            }
        }

        l.reverse()
        actual.reverse()
        expect.reverse()

        const data = {
            labels: l,
            datasets: [{
                label: 'Actual Sleep Hours',
                data: actual,
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 5,
                backgroundColor: '#005b9680',
                categoryPercentage: 0.7,
                order: 1
            },{
                label: 'Expected Sleep Hours',
                data: expect,
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 5,
                backgroundColor: '#005b96',
                categoryPercentage: 0.8,
                order: 0
            }]
        }

        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                aspectRatio: 1/1,
                maintainAspectRatio:false,
                scales: { 
                    x: { beginAtZero: true, stacked: false },
                    y: { 
                        beginAtZero: true, 
                        stacked: false, 
                        title: { display: true, text: 'hours' },
                        ticks: { maxTicksLimit: 5, display: true },
                        grid: { display: false} }
                },
                plugins: {
                    legend: { display: false, position: 'top' },
                    title: { display: false, text: 'Sleep Quality' }
                }
            }
        }

        resolve(config)
    })
}

export { setup }