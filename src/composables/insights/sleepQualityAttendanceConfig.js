import { dateName } from "../DateTime"

const setup = async(records) => {
    return processData(records)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records) => {
    return new Promise((resolve) => {
        const data = []

        records.forEach((record) => {
            data.push({ date: dateName(record.date.toString()), sleepQuality: record.sleepQuality})
        })
        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            range: 1,
            itemSelector: '#sleepQualityAttendance',
            domain: { type: 'month', label: { position: 'top', offset:{ y: -10 } } },
            subDomain: { type: 'day', label: 'D', radius: 10, width: 45, height: 45 },
            data: { source: data, x: 'date', y: 'sleepQuality', defaultValue: 0},
            // Change to month or week to view result
            date: { start: new Date(`${data[0].date}`) },
            scale: { 
                color: { 
                    range: ['#e6ecfc', '#b3cde080', '#6497b180', '#005b9680', '#03396c80', '#011f4b90'], 
                    type: 'linear', 
                    domain: [ 0, 1, 2, 3, 4, 5] 
                }
            },
        }
        resolve(config)
    })
}

export { setup }