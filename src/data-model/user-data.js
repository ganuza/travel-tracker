const dayjs = require('dayjs');

const getUserDetails = (dataObject, user) => {
  const userDetails = dataObject.travelers.find((traveler) => {
    return traveler.id === user
  })
  if (userDetails === undefined) {
    const result = 'Please Enter a Valid User id'
    return result
  } else {
      return userDetails
  }
}

const getUserTripsDetails = (dataObject, user) => {
  const userTripsDetails = dataObject.trips.filter((trip) => {
    return trip.userID === user
  })
  if (userTripsDetails.length === 0) {
    const result = 'There are no trips for this user'
    return result
  } else {
      return userTripsDetails
  } 
}

const getUserDestinations = (globalData) => {
  const userDestinations = globalData.userTrips.map((trip) => {
    const currentDestination = globalData.destinations.find((destination) => 
      destination.id === trip.destinationID)
    const dates = `${dayjs(trip.date).format('MM-DD-YYYY')} - ${dayjs(trip.date).add((trip.duration),'day').format('MM-DD-YYYY')}`
    
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
    if (userDestinations.includes('bad data')) {
      return 'bad data'
    } else {
        return userDestinations
      }
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