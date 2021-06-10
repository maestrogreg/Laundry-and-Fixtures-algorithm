/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  //Sort the clean pile
  let sorted = cleanPile.sort((small, big) => small - big);
  let length = sorted.length;
  let result = [];
  let cleanPair = 0;
  let dirtyPileCount = [];
  let stack = [];


  //match clean pairs of socks
    for (let i = 0; i < length; i++) {
    if (result.length === 0) {
      result.push(sorted[i]);
    } else if (result.length > 0) {
      if (result[result.length - 1] === sorted[i]) {
        result.pop();
        cleanPair++;
      } else result.push(sorted[i]);
    }
  }


  //match a clean sock with a dirty sock to get a clean pair
   for(let k=0; k< result.length; k++){

        if(dirtyPile.includes(result[k])){
          stack.push(result[k]);
          let i = dirtyPile.indexOf(result[k]);
          dirtyPile.splice(i, 1)
          if(noOfWashes > 0){
            noOfWashes--;
            cleanPair++;
            stack.pop();

          }

        }

   }
   result = stack;

  //Match two matching dirty pair
  dirtyPile = dirtyPile.sort((small, big) => small - big);
  //console.log(dirtyPile)
  for(let m=0; m < dirtyPile.length; m++){
    if(dirtyPileCount.length === 0){
      dirtyPileCount.push(dirtyPile[m]);
    }else if(dirtyPileCount.length ){
      if(noOfWashes >= 2 && dirtyPileCount[dirtyPileCount.length-1] === dirtyPile[m]){
          dirtyPileCount.pop();
          cleanPair++;
          noOfWashes =noOfWashes- 2;
      }else dirtyPileCount.push(dirtyPile[m]);
    }

  }
  //}
  return cleanPair;
}
module.exports = getMaxPairs;

