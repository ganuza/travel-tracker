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
  if (userDetails === undefined) {
    const result = 'Please Enter a Valid User id'
    return result
  } else {
      return userDetails
  }
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
  if (userTripsDetails.length === 0) {
    const result = 'There are no trips for this user'
    return result
  } else {
      return userTripsDetails
  } 
}

const getUserDestinations = (globalData) => {
  console.log('mainData: ', globalData)
  const userDestinations = globalData.userTrips.map((trip) => {
    
    // console.log('trip.destinationID: ', trip.destinationID)
    // console.log('globalData.destinations.id: ', globalData.destinations)
    
    const currentDestination = globalData.destinations.find((destination) => 
      // console.log('trip.destinationID: ', trip.destinationID)
      // console.log('destination.id: ', destination.id)
      destination.id === trip.destinationID 
    )

    console.log('currentDestination: ', currentDestination)

    console.log(dayjs(trip.date).add(10,'day').format('MM-DD-YYYY'))
    const dates = `${dayjs(trip.date).format('MM-DD-YYYY')} - ${dayjs(trip.date).add((trip.duration),'day').format('MM-DD-YYYY')}`
    console.log('<<<<trip.date: ', trip.date)
    console.log('<<<<<tripStatus: ', trip.status)
    console.log('dates: ', dates)
    if (currentDestination === undefined) {
      return 'bad data'
    } else {
      return {
       name: currentDestination.destination,
       dates: dates,
       alt: currentDestination.alt,
       travelers: trip.travelers,
       cost: findCost(currentDestination, trip),
       currentYearCost: findCurrentYearTripCosts(currentDestination, trip),
       image: currentDestination.image,
       status: trip.status
      }
    }
  })

  console.log('userDestinations: ', userDestinations)
  // if (currentDestination.destination === undefined) {
  //   return 'bad data'
  // } else {
      if (userDestinations.includes('bad data')) {
        return 'bad data'
      } else {
          return userDestinations
        }
    // } 
}

const findCost = (currentDestination, trip) => {
  const cost = (((trip.travelers * currentDestination.estimatedFlightCostPerPerson) + (trip.duration * currentDestination.estimatedLodgingCostPerDay)) * 1.1)
  if (trip.travelers < 1 || trip.duration < 1) {
    return 'bad data'
  } else {
    return cost
  }
}

const findCurrentYearTripCosts = (currentDestination, trip) => {
 
  if (trip.status !== 'approved' && trip.date.startsWith('2023')) {
    return (((trip.travelers * currentDestination.estimatedFlightCostPerPerson) + (trip.duration * currentDestination.estimatedLodgingCostPerDay)) * 1.1)
  } else {
    return 0
  }
}

const findNewDestinationCost = (duration, travelers, destinationData) => {
  console.log('-->duration: ', destinationData)
  console.log('-->travelers: ', destinationData.estimatedLodgingCostPerDay)
  if (travelers < 1 || duration < 1) {
    return 'bad data'
  } else {
    return (((travelers * destinationData.estimatedFlightCostPerPerson) + (duration * destinationData.estimatedLodgingCostPerDay)) * 1.1)
  }
}

const createDestinationsInfo = (globalData, date, duration, travelers) => {
  const destinationsWithout45 = globalData.destinations.filter((destination => {
    return destination.id !== 45
  }))
  const destinationCardsInfo = destinationsWithout45.map((destination) => {

    

    return {
      name: destination.destination,
      id: globalData.destinations.length + 1, 
      userID: globalData.userDetails.id, 
      destinationID: destination.id,
      image: destination.image,
      alt: destination.alt,
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
  findCost,
}