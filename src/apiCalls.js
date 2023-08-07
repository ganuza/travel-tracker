const dayjs = require('dayjs');

export const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
  .then(res => res.json())
  .catch(error => console.log(error))
}

export const promises = [
  fetchData('travelers'),
  fetchData('trips'),
  fetchData('destinations')
]

export const postData = (bookedDestination) => {

  console.log('bookedDest: ', bookedDestination)
  
  const postObject = {
    id: Date.now(), 
    userID: bookedDestination.userID, 
    destinationID: bookedDestination.destinationID, 
    travelers: bookedDestination.travelers, 
    date: `${dayjs(bookedDestination.date).format('YYYY/MM/DD')}`, 
    duration: bookedDestination.duration, 
    status: 'pending',
    suggestedActivities: [],
    }

  console.log('postObject: ', postObject)
  
  return fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  // .then(json => )
  // .catch(err => )
  
}
