var arg = process.argv[2];

var factorial = function(n) {
  var ret = 1;
  for(var i=2;i<=n;i++) {
    ret *=i;
  }
  return ret;

}
console.log(factorial(arg));
