// alert('I am here');
const initWidget = function (apiKey) {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  alert('Key:' + apiKey);
};
// var SomeName = (function () {
//   var function1 = function (number) {
//     return number + 1;
//   };

//   var anotherFunction = function (number) {
//     return number + 2;
//   };

//   return {
//     function1: function (number) {
//       return function1(number);
//     },
//     function2: function (number) {
//       return anotherFunction(number);
//     },
//   };
// })();
