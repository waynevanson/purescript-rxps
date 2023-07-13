/* global exports */
"use strict";

// module RxJS.Subscription

export const unsubscribe = function(sub){
  return function(){
    sub.unsubscribe();
  };
};
