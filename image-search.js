const reverseImageSearch = require('reverse-image-search-google')

const doSomething = (results) => {
  console.log(results)
}

reverseImageSearch('dog-img.jpg', doSomething)
