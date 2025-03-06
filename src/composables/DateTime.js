/* HELPER FUNCTION */
const date = (input = null) => {
    const d = (input) ? new Date(input) : new Date()
    const day = () => { 
        let m = d.getDate().toString()
        return (m.length < 2) ? '0' + m : m
    }
    const month = () => { 
        let m = (d.getMonth() + 1).toString()
        return (m.length < 2) ? '0' + m : m
    }
    const year = d.getFullYear().toString()
    return year + month() + day() //YYYYMMDD
}

const time = (input = null) => {
    const d = (input) ? new Date(input) : new Date()
    const hours = () => { 
        let h = d.getHours().toString()
        return (h.length < 2) ? '0' + h : h
    }
    const minutes = () => {
        let m = d.getMinutes().toString()
        return (m.length < 2) ? '0' + m : m
    }
    return hours() + minutes() // 0100, ... , 2300
}

const dayName = (input) => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    const d  = new Date(input)
    const index = d.getDay()
    return daysOfWeek[(index+6)%7] // Mon, .., Sun
}

const dateName = (dateString) => {
    const year = dateString.substr(0,4)
    const month = dateString.substr(4,2)
    const day = dateString.substr(6,2)
    return year + '-' + month + '-' + day // YYYY-MM--DD
}

const duration = (sleepTime, wakeTime) => {
    const sleep = new Date(sleepTime).getHours() + (new Date(sleepTime).getMinutes() / 60)
    const wake = new Date(wakeTime).getHours() + (new Date(wakeTime).getMinutes() / 60)
    const d = wake - sleep
    return (d < 0) ? d+24 : d
} 

const numOfDaysOfMonth = (input = null) => {
    const d = (input) ? new Date(input) : new Date()
    return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
}

export { date, time, dayName, dateName, duration, numOfDaysOfMonth }