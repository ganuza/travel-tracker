// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const dayjs = require('dayjs');

import {
  getUserDetails,
  getUserTripsDetails,
  getUserDestinations,
} from './data-model/user-data'

import {
  fetchData,
  promises,
} from './apiCalls'

import {
  displayUser,
  displayTrips
} from './domUpdates'

const loginButton = document.querySelector('.login-submit-button')
const loginPage = document.querySelector('.login-form')
const mainPage = document.querySelector('.main-trip-page')
const header = document.querySelector('header')
const findTripButton = document.querySelector('.find-trip-button')
const findTripInputPage = document.querySelector('.find-trip-input-page')

var mainData = {}

window.addEventListener('load', () => {
  Promise.all(promises)
  .then(data => {
    mainData.userDetails = getUserDetails(data[0], 33)
    mainData.userTrips = getUserTripsDetails(data[1], 33)
    mainData.destinations = data[2].destinations
    // console.log(getUserDestinations(mainData))
    getUserDestinations(mainData)
    console.log('mainData: ', mainData)
    displayUser(mainData)
    const userDestinations = getUserDestinations(mainData)
    console.log('HERE: ', userDestinations)
    displayTrips(userDestinations)
  })
  
})

const hideLoginShowMain = () => {
  loginPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
}

loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  hideLoginShowMain()
})

