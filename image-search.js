const reverseImageSearch = require('reverse-image-search-google')

const doSomething = (results) => {
  console.log(results)
}

reverseImageSearch('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*', doSomething)
