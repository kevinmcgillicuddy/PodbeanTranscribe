var myCallback = function(data) {
  console.log('got data: '+data);
};
var usingItNow = function(FunctToCall) {
    FunctToCall('get it?'); //calling the passed in paramter function
};
usingItNow(myCallback) //passing in paramter of a function myCallBack
////


////
var thisVarEqualsAFunction = function(){
  console.log('yeehaw');
}
function TheFunction(functionToCall){ //takes function as a paramter
    functionToCall(); //calling my passed in function paramter
}
TheFunction(thisVarEqualsAFunction)



//function expression

var sayBye = function(){
    console.log('bye');
}

sayBye();