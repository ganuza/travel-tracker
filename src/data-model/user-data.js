const dayjs = require('dayjs');


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

const getUserDestinations = (globalData) => {
  console.log('mainData: ', globalData)
  const userDestinations = globalData.userTrips.map((trip) => {
    
    // console.log('trip.destinationID: ', trip.destinationID)
    // console.log('globalData.destinations.id: ', globalData.destinations)
    
    const currentDestination = globalData.destinations.find((destination) => {
      // console.log('trip.destinationID: ', trip.destinationID)
      // console.log('destination.id: ', destination.id)
      return trip.destinationID === destination.id
    })

    console.log('currentDestination: ', currentDestination)

    console.log(dayjs(trip.date).add(10,'day').format('MM-DD-YYYY'))

    const dates = `${dayjs(trip.date).format('MM-DD-YYYY')} - ${dayjs(trip.date).add((trip.duration),'day').format('MM-DD-YYYY')}`

    console.log('dates: ', dates)

    return {
       name: currentDestination.destination,
       dates: dates,
       travelers: trip.travelers,
       cost: findCost(currentDestination, trip),
       image: currentDestination.image,
    }
    
  })
  console.log('userDestinations: ', userDestinations)
  return userDestinations
}

const findCost = (currentDestination, trip) => {
  return (((trip.travelers * currentDestination.estimatedFlightCostPerPerson) + (trip.duration * currentDestination.estimatedLodgingCostPerDay)) * 1.1)
}

const findNewDestinationCost = (duration, travelers, destinationData) => {
  console.log('-->duration: ', destinationData)
  console.log('-->travelers: ', destinationData.estimatedLodgingCostPerDay)
  return (((travelers * destinationData.estimatedFlightCostPerPerson) + (duration * destinationData.estimatedLodgingCostPerDay)) * 1.1)
}

const createDestinationsInfo = (globalData, date, duration, travelers) => {
  const destinationCardsInfo = globalData.destinations.map((destination) => {

    

    return {
      name: destination.destination,
      id: globalData.destinations.length + 1, 
      userID: globalData.userDetails.id, 
      destinationID: destination.id,
      image: destination.image,
      travelers: travelers,
      cost: findNewDestinationCost(duration, travelers, destination),
      date: date, 
      duration: duration, 
      status: 'pending', 
      suggestedActivities: [],
    }


  })
  console.log('destinationCardsInfo: ', destinationCardsInfo)
  return destinationCardsInfo
}

export {
  getUserDetails,
  getUserTripsDetails,
  getUserDestinations,
  findNewDestinationCost,
  createDestinationsInfo,
}