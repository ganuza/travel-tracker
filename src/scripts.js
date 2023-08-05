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

var mainData = {}

window.addEventListener('load', () => {
  Promise.all(promises)
  .then(data => {
    mainData.userDetails = getUserDetails(data[0], 38)
    mainData.userTrips = getUserTripsDetails(data[1], 38)
    mainData.destinations = data[2].destinations
    // console.log(getUserDestinations(mainData))
    getUserDestinations(mainData)
  })
})