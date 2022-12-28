/* global exports */
"use strict";

// module RxJS.Subscription

import Rx from 'rxjs';

export const unsubscribe = function(sub){
  return function(){
    sub.unsubscribe();
  };
};
