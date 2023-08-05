


var welcomeHeading = document.querySelector('.welcome-heading')



const displayUser = (currentUser) => {
  console.log('currentUser: ', currentUser.userDetails.name)

  let firstName = currentUser.userDetails.name.split(' ')[0]
  console.log('firstName: ', firstName)

  welcomeHeading.innerText = `Welcome ${firstName}`

  return firstName
}



export {
  displayUser
}