export const mapOrder = (array, order, key) => {
  
  array.sort( function (a, b) {
    var A = a[key], B = b[key]
    
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1
    } else {
      return -1
    }
    
  })
  
  return array
}
