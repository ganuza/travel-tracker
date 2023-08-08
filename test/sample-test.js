import chai from 'chai';
const expect = chai.expect;

import {
  getUserDetails,
  getUserTripsDetails,
  getUserDestinations,
  findCost,
  findNewDestinationCost,
  createDestinationsInfo,
} from '../src/data-model/user-data'

describe('User Data', () => {
  let sampleDestinationsData
  let sampleTravelersData

  beforeEach(() => {
    sampleDestinationsData = 
    { destinations: [
      {
      id: 1,
      destination: "Lima, Peru",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",alt: "overview of city buildings with a clear sky",
      },
      {
      id: 11,
      destination: "Mikonos, Greece",
      estimatedLodgingCostPerDay: 140,estimatedFlightCostPerPerson: 1000,
      image: "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",alt: "cityscape along the water during the day"
      },
      {
      id: 34,
      destination: "Seoul, South Korea",estimatedLodgingCostPerDay: 1200,estimatedFlightCostPerPerson: 150,
      image: "https://images.unsplash.com/photo-1578193661644-dee2e67b779b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2025&q=80",alt: "aerial photography of city during daytime"
      }
    ]}

    sampleTravelersData = 
    { travelers: [
      {id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
      },
      {
      id: 2,
      name: "Rachael Vaughten",
      travelerType:"thrill-seeker"
      },
      {id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper"
      }]
    } 
  })

  it('Should return the user info by id', function () {
    let userOne = getUserDetails(sampleTravelersData, 1)
    expect(userOne).to.be.an('object')
  })

  it('Should return the correct user by id', function () {
    let userOne = getUserDetails(sampleTravelersData, 1)
    expect(userOne).to.equal(sampleTravelersData.travelers[0])
  })

  it('Should return the user info by id', function () {
    let userOne = getUserDetails(sampleTravelersData, 4)
    expect(userOne).to.equal('Please Enter a Valid User id')
  })
})

describe('Trips Data', () => {
  let sampleTripsData

  beforeEach(() => {
    sampleTripsData = { trips: [
    {
      id: 1,
      userID: 44,
      destinationID: 49,
      travelers: 1,
      date: "2022/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 33,
      userID: 6,
      destinationID: 36,
      travelers:5,
      date: "2020/03/26",
      duration: 19,
      status: "approved",
      suggestedActivities:[]
    },
    {
      id: 64,
      userID: 45,
      destinationID: 25,
      travelers: 3,
      date:"2020/08/26",
      duration:7,
      status:"approved",
      suggestedActivities: []
    },
    ]}
  })

  it('Should return a trip array by id', function () {
    let trip = getUserTripsDetails(sampleTripsData, 45)
    expect(trip).to.be.an('array')
  })

  it('Should return the correct trip by id', function () {
    let userTrip = getUserTripsDetails(sampleTripsData, 6)
    expect(userTrip).to.deep.equal([sampleTripsData.trips[1]])
    let userTrip2 = getUserTripsDetails(sampleTripsData, 45)
    expect(userTrip2).to.deep.equal([sampleTripsData.trips[2]])
  })

  it('Should return a message if a user with no trips is passed', function () {
    let userTrip = getUserTripsDetails(sampleTripsData, 2)
    expect(userTrip).to.equal('There are no trips for this user')
  })
})

describe('User Data', () => {
  let sampleDestinationsData
  let sampleDestinationsData2

  beforeEach(() => {
    sampleDestinationsData = 
      { destinations: [
      {
        id: 49,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",alt: "overview of city buildings with a clear sky",
      },
      {
        id: 11,
        destination: "Mikonos, Greece",
        estimatedLodgingCostPerDay: 140,estimatedFlightCostPerPerson: 1000,
        image: "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",alt: "cityscape along the water during the day"
      },
      {
        id: 34,
        destination: "Seoul, South Korea",estimatedLodgingCostPerDay: 1200,estimatedFlightCostPerPerson: 150,
        image: "https://images.unsplash.com/photo-1578193661644-dee2e67b779b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2025&q=80",alt: "aerial photography of city during daytime"
      }
      ],
      userTrips: [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: []
      },
      {
        id: 33,
        userID: 6,
        destinationID: 11,
        travelers:5,
        date: "2020/03/26",
        duration: 19,
        status: "approved",
        suggestedActivities:[]
      },
      {
        id: 64,
        userID: 45,
        destinationID: 34,
        travelers: 3,
        date:"2020/08/26",
        duration:7,
        status:"approved",
        suggestedActivities: []
      },
      ]}

    sampleDestinationsData2 = 
      { destinations: [
      {
        id: 49,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",alt: "overview of city buildings with a clear sky",
      },
      {
        id: 11,
        destination: "Mikonos, Greece",
        estimatedLodgingCostPerDay: 140,estimatedFlightCostPerPerson: 1000,
        image: "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",alt: "cityscape along the water during the day"
      },
      {
        id: 34,
        destination: "Seoul, South Korea",estimatedLodgingCostPerDay: 1200,estimatedFlightCostPerPerson: 150,
        image: "https://images.unsplash.com/photo-1578193661644-dee2e67b779b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2025&q=80",alt: "aerial photography of city during daytime"
      }
      ],
      userTrips: [
      {
        id: 1,
        userID: 44,
        destinationID: 45,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: []
      },
      {
        id: 33,
        userID: 6,
        destinationID: 11,
        travelers:5,
        date: "2020/03/26",
        duration: 19,
        status: "approved",
        suggestedActivities:[]
      },
      {
        id: 64,
        userID: 45,
        destinationID: 34,
        travelers: 3,
        date:"2020/08/26",
        duration:7,
        status:"approved",
        suggestedActivities: []
      },
      ]}
})
  
  it('Should return a list of destinations', function () {
    let trip = getUserDestinations(sampleDestinationsData)
    expect(trip).to.be.an('array')
  })

  it('Should return a list of destinations', function () {
    let trip = getUserDestinations(sampleDestinationsData)
    expect(trip[0].name).to.equal('Lima, Peru')
  })

  it('Should return an error message if there is an undefined', function () {
    let trip = getUserDestinations(sampleDestinationsData2)
    expect(trip).to.equal('bad data')
  })
})

describe('Current Destination and trip data', () => {
  let sampleCurrentDestinationData
  let sampleTripData
  let sampleTripData2

  beforeEach(() => {
    sampleCurrentDestinationData = {
      id: 34,
      destination: 'Seoul, South Korea',
      estimatedLodgingCostPerDay: 1200,
      estimatedFlightCostPerPerson: 150,
      image: 'https://images.unsplash.com/photo-1578193661644-dee2e67b779b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2025&q=80',
      alt: 'aerial photography of city during daytime'
    }

    sampleTripData = {
      travelers: 2,
      duration: 8,
    }

    sampleTripData2 = {
      travelers: 0,
      duration: 7
    }

  })
    it ('Should return a number', function() {
      let cost = findCost(sampleCurrentDestinationData, sampleTripData)
      expect(cost).to.equal(10890)
    })

    it ('Should return an error message if travelers number or trip duration is not defined', function() {
      let cost = findCost(sampleCurrentDestinationData, sampleTripData2)
      expect(cost).to.equal('bad data')
    })
})

describe('User input data and chosen destination data', () => {
  let sampleDuration
  let sampleTravelers
  let sampleDestinationData
  let sampleDuration2
  let sampleTravelers2

  beforeEach(() => {
    sampleDuration = 10
    sampleTravelers = 2
    sampleDestinationData = {
      estimatedFlightCostPerPerson: 800,
      estimatedLodgingCostPerDay: 150
    }
    sampleDuration2 = 0
    sampleTravelers2 = 1
  })
    it ('Should return a number', function() {
      let cost = findNewDestinationCost(sampleDuration, sampleTravelers, sampleDestinationData)
      expect(cost).to.be.a('number')
    })
    
    it ('Should calculate the cost', function() {
      let cost = findNewDestinationCost(sampleDuration, sampleTravelers, sampleDestinationData)
      expect(cost).to.equal(3410.0000000000005)
    })

    it ('Should return an error if travelers data or duration data is less than one', function() {
      let cost = findNewDestinationCost(sampleDuration2, sampleTravelers2, sampleDestinationData)
      expect(cost).to.equal('bad data')
    })
})

describe('User input data and chosen destination data', () => {
  let sampleGlobalData
  let sampleDate
  let sampleDuration
  let sampleTravelers

  beforeEach(() => {
    sampleGlobalData = {
      userDetails: {id: 17},
      destinations:[{
        alt: "overview of city buildings with a clear sky",
        destination: "Lima, Peru",
        estimatedFlightCostPerPerson: 400,
        estimatedLodgingCostPerDay: 70,
        id: 1,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"}]
    }

    sampleDate =  "2023-09-15"
    sampleDuration = 7
    sampleTravelers = 2
  })

    it ('Should return an array of objects', () => {
      let cardInfo = createDestinationsInfo(sampleGlobalData, sampleDate, sampleDuration, sampleTravelers)
      expect(cardInfo).to.be.an('array')
    })

    it ('Should have a status of pending', () => {
      let cardInfo = createDestinationsInfo(sampleGlobalData, sampleDate, sampleDuration, sampleTravelers)
      expect(cardInfo[0].status).to.equal('pending')
    })
})