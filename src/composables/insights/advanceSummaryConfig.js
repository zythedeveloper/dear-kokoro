import { duration } from "../DateTime"

let mode;

const setup = async(records, m) => {
    (m) ? mode = true : mode = false
    return processData(records)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records) => {
    return new Promise((resolve) => {
        const dataArray = [[], [], []]
        records.forEach((record) => {
            const q = record.sleepQuality - 1
            const t = duration(record.sleepTime, record.wakeTime)
            const d = { x: q, y: t, r:1 }
            const index = (mode) ? record.weather-1 : record.mood-1
            let isFound = false

            for( let obj of dataArray[index]) {
                if (obj.y == t && obj.x == q) {obj.r++; isFound=true; break;}
            }
            if (!isFound) dataArray[index].push(d)
        
        })

        dataArray.forEach((subArray) => {
            subArray.forEach((record) => {
                const i = record.x
                record.x = generateX( ((i*5) % 25) + 0.5, ((i*5) % 25) + 4.5 )
                record.r = (record.r*2.5/31*100)
            })
        })

        const data = {
            datasets: [
                {
                    label: (mode) ? 'Cloudy' : 'Bad',
                    data: dataArray[0],
                    borderColor: (mode) ? '#b0b3b8' : '#c4bdbc',
                    backgroundColor: (mode) ? '#b0b3b8' : '#c4bdbc80',
                  },
                  {
                    label: (mode) ? 'Rainy' : 'Average',
                    data: dataArray[1],
                    borderColor: (mode) ? '#4d6aa3' : '#fad000',
                    backgroundColor: (mode) ? '#4d6aa3' : '#fad00080',
                  },
                  {
                    label: (mode)? 'Sunny' : 'Good',
                    data: dataArray[2],
                    borderColor: (mode) ? '#f2ba5e' : '#299438',
                    backgroundColor: (mode) ? '#f2ba5e' : '#29943880',
                  }
            ]
        }
        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            type: 'bubble',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom', },
                    title: { 
                        display: true, 
                        align: 'center', 
                        text: (mode) ? 'Weather, Duration, Quality' : 'Mood, Duration, Quality'
                    },
                    tooltip: {
                        callbacks: {
                            label: ((tooltipItem, data) => {
                                const x = tooltipItem.raw.x
                                const duration = tooltipItem.raw.y
                                let sleepQuality;
                                if(x > 0 && x < 5) sleepQuality = "very bad sleep"
                                else if(x > 5 && x < 10) sleepQuality = "bad sleep"
                                else if(x > 10 && x < 15) sleepQuality = "usual sleep"
                                else if(x > 15 && x < 20) sleepQuality = "good sleep"
                                else if(x > 20 && x < 25) sleepQuality = "very good sleep"
                                return `${sleepQuality}, ${duration} hours`
                            })
                        }
                    }
                },
                scales: { 
                    x: { 
                        display: false, 
                        beginAtZero: true, 
                        min: 0, max: 25, 
                        ticks: { stepSize: 5 }
                    },
                    y: { 
                        display: true, 
                        beginAtZero: false, 
                        grace: 0, 
                        title: { display: true, text: 'hours' },
                        ticks: { stepSize: 5 } 
                    }
                },
            },
            plugins: [canvasBackgroundColor]
        }
        resolve(config)
    })
}

export { setup }

const color = ['#b3cde080', '#6497b180', '#005b9680', '#03396c80', '#011f4b80']

const canvasBackgroundColor = {
    id: 'canvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const {
            ctx,
            chartArea: { top, right, bottom, left, width, height },
            scales: { x, y },
        } = chart
        bgColor(0, 5, color[0]);
        bgColor(5, 10, color[1]);
        bgColor(10, 15, color[2]);
        bgColor(15, 20, color[3]);
        bgColor(20, 25, color[4]);

        function bgColor(low, high, c) {
            ctx.fillStyle = c;
            ctx.fillRect(x.getPixelForValue(high), top, x.getPixelForValue(low) - x.getPixelForValue(high), height);
        }
    }
}

const generateX = (low, high) => {
    const value = Math.random() * high + low;
    return ( value > high ) ? generateX(low, high) : value;
}