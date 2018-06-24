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
.   Episode: Understanding this with call, apply & bind                                                       .
.   Twitter: @GissiSim / @thisdotCODE                                                                         .
.   Github: https://github.com/GissiSim/callapplybind                                                         .
.                                                                                                             .
.............................................................................................................*/

// FIRST... THIS.

console.log(this) // In nodejs, this = empty object. On the web it's the Window Object
console.log(this === exports) // Why does this = exports in Node?
const exploreThis = (function() {
  console.log(this === exports) // Why is this no longer = exports inside a function?
  console.log(this) // In nodejs this becomes the global nodejs object inside a function. Why?
})()

const thisContext = {
  life: 100,
  getLife: function() {
    this //?
    return this.life
  }
}
thisContext.getLife() //?

// NOW... CALL, APPLY & BIND

// objects
var human = {
  name: 'Gissur Simonarson',
  life: 100
}

var ogre = {
  name: 'Ogre McOgreson',
  life: 150
}

// functions
function characterHit(hitpoints, critpoints) {
  console.log(this)
  return this.life - hitpoints - critpoints
}

// results
var hp = 10 // hitpoints
var cp = 5 // critpoints

// call & apply

//RUN FUNCTION FIRST WITHOUT CALL. REMEMBER TO TAKE OFF () BEFORE CALL
characterHit.call(human, hp, cp) //?
characterHit.apply(ogre, [hp, cp]) //?

// bind
const personHit = characterHit.bind(human)
const ogreHit = characterHit.bind(ogre)

personHit(hp, cp) //?
ogreHit(hp, cp) //?

// CALLBACKS

let insertText = {
  asyncInsert(callBack) {
    callBack()
  },
  insert(textToInsert) {
    return `Text that was inserted is: ${textToInsert}` //?
  },
  // BEFORE ES2015
  render1(insertThis) {
    this.asyncInsert(
      function() {
        this.insert(insertThis)
      }.bind(this)
    )
  },
  // AFTER ES2015
  render2(insertThis) {
    this.asyncInsert(() => this.insert(insertThis)) // Arrow functions in callbacks allow this context to flow into that function
  }
}

insertText.render1('Render 1')
insertText.render2('Render 2')

// FINALLY, (NODEJS) THIS...
console.log(this === exports)
console.log(this)

var module = { exports: {} }
var context = function(exports, require, module, __filename, __dirname) {
  console.log(this) // This is my code
  console.log(exports)
}

context.apply(module.exports, [module.exports, require, module, __filename, __dirname]) // This is how NodeJS calls modules
console.log(exports)
console.log(module)
console.log(module.exports)
console.log(this)
console.log(require)
console.log(__filename)
console.log(__dirname)
