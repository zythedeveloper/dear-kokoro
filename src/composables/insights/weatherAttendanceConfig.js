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
            data.push({ date: dateName(record.date.toString()), weather: record.weather})
        })

        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            range: 1,
            itemSelector: '#weatherAttendance',
            domain: { type: 'month', label: { position: 'top' } },
            subDomain: { type: 'day', label: 'D', radius: 10, width: 45, height: 45 },
            data: { source: data, x: 'date', y: 'weather', defaultValue: 0},
            // Change to month or week to view result
            date: { start: new Date(`${data[0].date}`) },
            scale: { color: { range: ['#e6ecfc', '#b0b3b8', '#4d6aa3', '#f2ba5e'], 
            // cloudy: #b0b3b8, rainy: #4d6aa3, sunny: #f2ba5e
            type: 'linear', domain: [ 0, 1, 2, 3] } },
        }
        resolve(config)
    })
}

export { setup }