const dayjs = require('dayjs');

// querySelectors

var welcomeHeading = document.querySelector('.welcome-heading')
var dashboardTotalSpent = document.querySelector('.trips-total')
var tripsGrid = document.querySelector('.all-trips-grid')
var destinationsGrid = document.querySelector('.destinations-grid')
var bookedTripMsgContainer = document.querySelector('#booked-trip-container')
var bookedTripGrid = document.querySelector('.booked-trip-grid')
const loginButton = document.querySelector('.login-submit-button')
const loginPage = document.querySelector('.login-page')
const mainPage = document.querySelector('.main-trip-page')
const header = document.querySelector('header')
const findTripButton = document.querySelector('.find-trip-button')
const findTripInputPage = document.querySelector('.find-trip-input-page')
const newTripDate = document.querySelector('#date-input')
const newTripDuration = document.querySelector('#duration-input')
const newTripTravelers = document.querySelector('#traveler-input')
const destinationsPage = document.querySelector('.destinations-page')
const bookedTripPage = document.querySelector('.trip-booked-page')
const findDestinationsButton = document.querySelector('.search-destinations-button')
const bookedTripPageDashBtn = document.querySelector('#button-to-dash')
const loginNameInput = document.querySelector('#login-name')
const loginPasswordInput = document.querySelector('#login-password')
const loginForm = document.querySelector('.login-message')

const hideLoginShowMain = () => {
  loginPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
}

const displayUser = (currentUser) => {
  let firstName = currentUser.userDetails.name.split(' ')[0]
  welcomeHeading.innerText = `Welcome ${firstName}`
  return firstName
}

const displayTrips = (userDestinations) => {
  tripsGrid.innerHTML = ''
  
  const totalSpent = userDestinations.reduce((sum, trip) => {
    sum += trip.cost
    return sum
  }, 0)
  const spendingThisYear = userDestinations.reduce((sum, trip) => {
    sum += trip.currentYearCost
    return sum
  }, 0)
  
  dashboardTotalSpent.innerHTML = `
  <h2>Current Year Spending:  $${spendingThisYear.toFixed(2)}</h2>
  <h2>Total Spent:  $${totalSpent.toFixed(2)}</h2>`

  userDestinations.forEach((destination) => {
    let color
    if (destination.status === 'pending') {
      color = 'red'
    } else if (destination.status === 'approved') {
      color = 'green'
    }
    tripsGrid.innerHTML += `<article class="trip-card">
    <img class="user-trips-img" src=${destination.image} alt=${destination.alt}>
    <h2 class="trip-card-destination">${destination.name}</h2>
    <h3 class="trip-card-dates">Dates: ${destination.dates}</h3>
    <h3 class="trip-card-travelers">Travelers: ${destination.travelers}</h3>
    <h3 class="trip-card-status ${color}">Status: ${destination.status}</h3>
    </article>`
  })
}

const hideTripPageShowTripInputPage = () => {
  mainPage.classList.add('hidden')
  findTripInputPage.classList.remove('hidden')
}

const hideTripInputPageShowDestinations = () => {
  findTripInputPage.classList.add('hidden')
  destinationsPage.classList.remove('hidden')
}

const displayDestinationCards = (destinationCardsInfo) => {
  destinationsGrid.innerHTML = ''

  const destinations = destinationCardsInfo.forEach((destination) => {
    const newTripCost = destination.cost
    const newTripDates = `${dayjs(destination.date).format('MM-DD-YYYY')} - ${dayjs(destination.date).add((destination.duration),'day').format('MM-DD-YYYY')}`

    destinationsGrid.innerHTML += `<article class="destination-card">
      <img class="destination-card-img" src=${destination.image} alt=${destination.alt}>
      <h3 class="destination-card-name">${destination.name}</h3>
      <h4 class="destination-card-dates">Dates: ${newTripDates}</h4>
      <h4 class="destination-card-duration">Duration: ${destination.duration} days</h4>
      <h4 class="destination-card-travelers">Travelers: ${destination.travelers}</h4>
      <h4 class="destination-card-trip-cost">Total Cost: $${newTripCost.toFixed(2)}</h4>
      <button class="button" id="${destination.destinationID}">Book Trip</button>
      </article>`
    })
}

const hideDestPageShowBookedPage = () => {
  destinationsPage.classList.add('hidden')
  bookedTripPage.classList.remove('hidden')
}

const displayBookedTripMessage = (bookedDest) => {
  bookedTripGrid.innerHTML = ''
  const bookedTripDates = `${dayjs(bookedDest.date).format('MM-DD-YYYY')} - ${dayjs(bookedDest.date).add((bookedDest.duration),'day').format('MM-DD-YYYY')}`

  bookedTripGrid.innerHTML += `<article class="booked-trip-card">
    <img class="booked-trip-img" src=${bookedDest.image} alt="${bookedDest.alt}>
    <h2 class="booked-trip-name">${bookedDest.name}</h2>
    <p class="booked-trip-card-details">Dates: ${bookedTripDates}</p>
    <p class="booked-trip-card-details">Travelers: ${bookedDest.travelers}</p>
    <p class="booked-trip-card-details">Cost: $${bookedDest.cost.toFixed(2)}</p>
    </article`
}

const hideBookedTripShowDash = () => {
  bookedTripPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
}

export {
  loginButton,
  loginPage,
  mainPage,
  header,
  findTripButton,
  findTripInputPage,
  newTripDate,
  newTripDuration,
  newTripTravelers,
  destinationsPage,
  bookedTripPage,
  findDestinationsButton,
  bookedTripPageDashBtn,
  loginNameInput,
  loginPasswordInput,
  loginForm,
  hideLoginShowMain,
  hideTripPageShowTripInputPage,
  displayUser,
  displayTrips,
  hideTripInputPageShowDestinations,
  displayDestinationCards,
  hideDestPageShowBookedPage,
  displayBookedTripMessage,
  hideBookedTripShowDash,
}