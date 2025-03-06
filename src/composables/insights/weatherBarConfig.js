let delayed
const animation = {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
}

const setup = async(records) => {
    return processData(records)
    .then((data) => { return processConfig(data) })
    .then((config) => { return config })  
}

const processData = (records) => {
    return new Promise((resolve) => {
        let count = {cloudy: 0, rainy:0, sunny: 0}
        
        records.forEach((record) => {
            switch(record.weather){
                case 1: count.cloudy++; break;
                case 2: count.rainy++; break;
                case 3: count.sunny++; break;
            } 
        })

        const data = {
            labels: ['Weather'],
            datasets: [{
                label: 'Cloudy',
                data: [count.cloudy],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.rainy == 0 && count.sunny == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else return { bottomLeft: 10, topLeft: 10 }
                },
                borderSkipped: false,
                backgroundColor: '#b7b8ba80'
            },{
                label: 'Rainy',
                data: [count.rainy],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.cloudy == 0 && count.sunny == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else if (count.cloudy == 0) return { bottomLeft: 10, topLeft: 10 }
                    else if (count.sunny == 0) return { topRight: 10, bottomRight: 10 }
                    else return 5                    
                },
                borderSkipped: false,
                backgroundColor: '#0075b580'
            }, {
                label: 'Sunny',
                data: [count.sunny],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.cloudy == 0 && count.rainy == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else return { topRight: 10, bottomRight: 10 }
                },
                borderSkipped: false,
                backgroundColor: '#fc500995'
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
                indexAxis: 'y',
                aspectRatio: 4/1,
                barPercentage: '0.9',
                responsive: true,
                maintainAspectRatio:false,
                
                scales: { 
                    x: { display: false, beginAtZero: true, stacked: true, max: data.length },
                    y: { display: false, beginAtZero: true, stacked: true },
                },
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: false, text: 'Weather Bar' }
                },
                animation
            }
        }
        resolve(config)
    })
}
export { setup }