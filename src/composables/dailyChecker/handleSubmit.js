import setCollection from './setCollection'
import { date, dateName } from '../DateTime'

// convert into expected data type before uploadiing to database
const handleSubmit = (obj,user_id) => {
    const todayDate = date()
    const yesterDate = (parseInt(todayDate) - 1).toString()
    const sleepTime = dateName(yesterDate) + 'T' + obj.sleepTime.slice(0,2) + ':' + obj.sleepTime.slice(2,4)
    const wakeTime = dateName(todayDate) + 'T' + obj.wakeTime.slice(0,2) + ':' + obj.wakeTime.slice(2,4)
    const data = {
        date: parseInt(todayDate),
        mood: parseInt(obj.mood),
        expectedSleepHour: parseInt(obj.expectedSleepHour),
        sleepTime: new Date(sleepTime).getTime(),
        wakeTime: new Date(wakeTime).getTime(),
        sleepQuality: parseInt(obj.sleepQuality),
        weather: parseInt(obj.weather)
    }

    setCollection(user_id, data)
    console.log(data)
}

export { handleSubmit }