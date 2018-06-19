/*.............................................................................................................
.                                                                                                             .
.     ###\         ##\     ##\       ##\               ######\   ######\  #######\  ########\       ###\      .
.    ##  _|        ## |    ## |      \__|             ##  __##\ ##  __##\ ##  __##\ ##  _____|      \_##\     .
.    ## |        ######\   #######\  ##\  #######\    ## /  \__|## /  ## |## |  ## |## |              ## |    .
.   ### |        \_##  _|  ##  __##\ ## |##  _____|   ## |      ## |  ## |## |  ## |#####\            ###\    .
.   \## |          ## |    ## |  ## |## |\######\     ## |      ## |  ## |## |  ## |##  __|           ##  |   .
.    ## |          ## |##\ ## |  ## |## | \____##\    ## |  ##\ ## |  ## |## |  ## |## |              ## /    .
.    \###\         \####  |## |  ## |## |#######  |##\\######  | ######  |#######  |########\       ###  |    .
.     \___|         \____/ \__|  \__|\__|\_______/ \__|\______/  \______/ \_______/ \________|      \___/     .
.                                                                                                             .
.   Episode: Javascript => Call, Apply & Bind                                                                 .          .
.   Twitter: @GissiSim                                                                                        .
.   Github: https://github.com/GissiSim                                                                       .
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
console.log(characterHit.call(human, hitpoints, criticalHP))
console.log(characterHit.apply(ogre, [hitpoints, criticalHP]))

const personHit = characterHit.bind(human)
const ogreHit = characterHit.bind(ogre)

console.log(personHit(hitpoints, criticalHP))
console.log(ogreHit(hitpoints, criticalHP))

// Further example, and how to get rid of bind with ES6

let insertText = {
  asyncInsert(callBack) {
    callBack()
  },
  insert(textToInsert) {
    console.log(`Text that was inserted is: ${textToInsert}`)
  },
  // BEFORE ES2015
  render1(insertThis) {
    this.asyncInsert(
      function() {
        this.insert(insertThis)
      }.bind(this)
    )
  },
  // WITH ES2015
  render2(insertThis) {
    this.asyncInsert(() => this.insert(insertThis))
  }
}

insertText.render1('Render 1')
insertText.render2('Render 2')
