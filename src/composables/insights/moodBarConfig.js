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
        let count = {bad: 0, avg:0, good: 0}
        
        records.forEach((record) => {
            switch(record.mood){
                case 1: count.bad++; break;
                case 2: count.avg++; break;
                case 3: count.good++; break;
            }  
        })

        const data = {
            labels: ['Mood'],
            datasets: [{
                label: 'Bad',
                data: [count.bad],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.avg == 0 && count.good == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else return { bottomLeft: 10, topLeft: 10 }
                },
                borderSkipped: false,
                backgroundColor: '#db403580'
            },{
                label: 'Average',
                data: [count.avg],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.bad == 0 && count.good == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else if (count.bad == 0) return { bottomLeft: 10, topLeft: 10 }
                    else if (count.good == 0) return { topRight: 10, bottomRight: 10 }                   
                },
                borderSkipped: false,
                backgroundColor: '#fad00080'
            }, {
                label: 'Good',
                data: [count.good],
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: () => {
                    if (count.bad == 0 && count.avg == 0) return { bottomLeft: 10, bottomRight: 10, topRight: 10, topLeft: 10 }
                    else return { topRight: 10, bottomRight: 10 }
                },
                borderSkipped: false,
                backgroundColor: '#29943880'
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
                    title: { display: false, text: 'Mood Bar' }
                },
                animation
            }
        }
        resolve(config)
    })
}

export { setup }