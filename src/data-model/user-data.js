


const getUserDetails = (dataObject, user) => {
  console.log('dataObject.travelers: ', dataObject.travelers)
  const userDetails = dataObject.travelers.find((traveler) => {
    // console.log('dataObject: ', dataObject)
    // console.log('user: ', user)
    // console.log('traveler: ', [traveler])
    // console.log('[traveler].id: ', [traveler].id)
    return traveler.id === user
  })
  console.log('userDetails: ', userDetails)
  return userDetails
  // const userDestinations = array.trips[user]
  // console.log('array[user]: ', userDetails)
  // return array

}

const getUserTripsDetails = (dataObject, user) => {
  console.log('tripsdataObject: ', dataObject)
  const userTripsDetails = dataObject.trips.filter((trip) => {
    return trip.userID === user
  })
  console.log('userTripsDetails: ', userTripsDetails)
  return userTripsDetails
}





export {
  getUserDetails,
  getUserTripsDetails,
  getUserDestinationDetails,
}