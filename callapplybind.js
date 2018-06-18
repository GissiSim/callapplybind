/*.............................................................................................................
.                                                                                                             .
.    ######\   ######\  #######\  ########\       ##\    ##\ ######\ ##\   ##\ ######\ ##\   ##\  ######\     .
.   ##  __##\ ##  __##\ ##  __##\ ##  _____|      ## |   ## |\_##  _|## | ##  |\_##  _|###\  ## |##  __##\    .
.   ## /  \__|## /  ## |## |  ## |## |            ## |   ## |  ## |  ## |##  /   ## |  ####\ ## |## /  \__|   .
.   ## |      ## |  ## |## |  ## |#####\          \##\  ##  |  ## |  #####  /    ## |  ## ##\## |## |####\    .
.   ## |      ## |  ## |## |  ## |##  __|          \##\##  /   ## |  ##  ##<     ## |  ## \#### |## |\_## |   .
.   ## |  ##\ ## |  ## |## |  ## |## |              \###  /    ## |  ## |\##\    ## |  ## |\### |## |  ## |   .
.   \######  | ######  |#######  |########\          \#  /   ######\ .# | \##\ ######\ ## | \## |\######  |   .
.    \______/  \______/ \_______/ \________|          \_/    \______|\__|  \__|\______|\__|  \__| \______/    .
.                                                                                                             .
.   Episode: Javascript => Call, Apply & Bind                                                                           .
.   Twitter: @GissiSim                                                                                        .
.   Github: https://github.com/gissisim                                                                       .
.                                                                                                             .
.............................................................................................................*/

// OBJECTS
var human = {
  name: 'Gissur Simonarson',
  life: 100
}

var ogre = {
  name: 'Ogre McOgreson',
  life: 150
}

// FUNCTIONS
function characterHit(hpTaken, additionalCritHp) {
  return this.life - hpTaken - additionalCritHp
}

// RESULTS
var hitpoints = 10
var criticalHP = 5
console.log(characterHit.call(human, hitpoints, criticalHP)) // 85
console.log(characterHit.apply(ogre, [hitpoints, criticalHP])) // 135

const personHit = characterHit.bind(human)
const ogreHit = characterHit.bind(ogre)

console.log(personHit(hitpoints, criticalHP)) // 85
console.log(ogreHit(hitpoints, criticalHP)) //135

// Further example, and how to get rid of bind with ES6

let insertText = {
  asyncInsert(callBack) {
    callBack()
  },
  insert(INSERTME) {
    console.log(`Text that was inserted is: ${INSERTME}`)
  },
  // BEFORE ES2015
  render1(INSERTTHIS) {
    this.asyncInsert(
      function() {
        this.insert(INSERTTHIS)
      }.bind(this)
    )
  },
  // WITH ES2015
  render2(INSERTTHIS) {
    this.asyncInsert(() => this.insert(INSERTTHIS))
  }
}

insertText.render1('Render 1')
insertText.render2('Render 2')
