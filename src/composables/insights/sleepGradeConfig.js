const setup = async(records) => {
    return processData(records)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records) => {
    return new Promise((resolve) => {
        let count = {veryBad: 0, bad: 0, neutral: 0, good: 0, veryGood: 0}
   
        records.forEach( (record) => {
            switch (record.sleepQuality) {
                case 1: count.veryBad++; break;
                case 2: count.bad++; break;
                case 3: count.neutral++; break;
                case 4: count.good++; break;
                case 5: count.veryGood++; break;
            }
        })

        const data = {
            labels: ['very bad', 'bad', 'usual', 'good', 'very good'],
            datasets: [
              {
                label: 'sleep quality',
                data: [count.veryBad, count.bad, count.neutral, count.good, count.veryGood],
                backgroundColor: ['#b3cde080', '#6497b180', '#005b9680', '#03396c80', '#011f4b90']
              }
            ]
        }
        resolve(data)
    })
}

const processConfig = (data) => {
    return new Promise((resolve) => {
        const config = {
            type: 'doughnut',
            data: data,
            options: {
              responsive: true,
              aspectRatio: 1/1,
            maintainAspectRatio:false,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: false, text: 'Quality' }
              }
            },
        }
    
        resolve(config)
    })
}

export { setup }