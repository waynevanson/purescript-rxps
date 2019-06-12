/* global exports */
"use strict";

// module RxJS.Observable
var Rx = require('rxjs');
var RxOp = require('rxjs/operators');
var RxAjax = require('rxjs/ajax');


function removeEff(fn) {
  return function (a) {
    return fn(a)()
  }
}

/**** Scheduling ****/

exports.observeOn_ = function (s) {
  return function (obs) {
    return RxOp.observeOn(obs, s); 
  };
}

exports.subscribeOn_ = function (s) {
  return function (obs) {
    return RxOp.subscribeOn(obs, s); 
  };
}

/**** Subscription ****/
exports.subscribe_ = function (sub) {
  return function (obs) {
    return function () {
      return obs.subscribe(
        function (val) { sub.next(val)(); },
        function (err) { sub.error(err)(); },
        function () { sub.complete()(); }
      );
    };
  };
}

exports.subscribeNext_ = function (eff) {
  return function (obs) {
    return function () {
      return obs.subscribe(
        function (val) { eff(val)() }
      );
    };
  };
}


/**** Creation Operators ****/

exports.ajax_ = function (req) {
  return function () {
    return RxAjax.ajax(req).pipe( 
      RxOp.map(function (res) {
        var body = res.responseText || JSON.stringify(res.response)
        return { body: body, status: res.status, responseType: res.responseType }
      }))
  }
}

exports.ajaxWithBody_ = exports.ajax_;

exports._empty_ = Rx.EMPTY; 

exports.fromArray_ = Rx.from; //Rx.Observable.from;

exports.fromEventImpl_ = Rx.fromEvent; 

exports.interval_ = Rx.interval; 

exports.just_ = Rx.of; 

exports.never_ = Rx.NEVER; 

exports.rangeImpl_ = Rx.range; 

exports.throw_ = Rx.throw; 

exports.timerImpl_ = Rx.timer; 

/**** Transformation Operators ****/

exports.buffer_ = function (obs1) {
  return function (obs2) {
    return obs1.pipe(RxOp.buffer(obs2));
  };
}

exports.bufferCount_ = function (maxSize) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.bufferCount(maxSize, startNewAt));
    };
  };
}

exports.bufferTimeImpl_ = function (timespan, creationInterval, maxSize, obs) {
  return obs.pipe(RxOp.bufferTime(timespan, creationInterval, maxSize));
}

exports.bufferToggleImpl_ = function (obs, openings, closingSelector) {
  return obs.pipe(RxOp.bufferToggle(openings, closingSelector));
}

exports.bufferWhen_ = function (closing) {
  return function (obs) {
    return obs.pipe(RxOp.bufferWhen(closing));
  };
}

exports.concatMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.concatMap(f));
  };
}

exports.exhaustMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.exhaustMap(f));
  };
}

exports.expand_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.expand(f));
  };
}

exports.share_ = function (obs) {
  return obs.pipe(RxOp.share());
}

exports.groupBy_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.groupBy(f));
  };
}

exports._map_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.map(f));
  };
}

exports.mapTo_ = function (val) {
  return function (obs1) {
    return obs1.pipe(RxOp.mapTo(val));
  };
}

exports.mergeMap_ = function (obs) {
  return function (f) {
    return obs.pipe(RxOp.mergeMap(f));
  };
}


exports.mergeMapTo_ = function (obs1) {
  return function (obs2) {
    return obs1.pipe(RxOp.mergeMapTo(obs2));
  };
}

exports.pairwiseImpl_ = function (obs) {
  return obs.pipe(RxOp.pairwise());
}

exports.partitionImpl_ = function (pred) {
  return function (obs) {
    return obs.pipe(RxOp.partition(pred));
  };
}

exports.scan_ = function (f) {
  return function (seed) {
    return function (ob) {
      return ob.pipe(RxOp.scan(function (acc, value) {
        return f(value)(acc);
      }, seed));
    };
  };
}

exports.switchMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.switchMap(f));
  };
}

exports.switchMapTo_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.switchMapTo(obs2));
  };
}

exports.window_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.window(obs2));
  };
}

exports.windowCount_ = function (maxSize) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.windowCount(maxSize, startNewAt));
    };
  };
}

exports.windowTime_ = function (timeSpan) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.windowTime(timeSpan, startNewAt));
    };
  };
}



/**** Filtering Operators ****/

exports.audit_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.audit(f));
  };
}

exports.auditTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.auditTime(ms));
  };
}

exports.debounce_ = function (f) {
  return function (ob) {
    return ob.pipe(RxOp.debounce(f));
  };
}

exports.debounceTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.debounceTime(ms));
  };
}

exports.distinct_ = function (ob) {
  return ob.pipe(RxOp.distinct());
}

exports.distinctUntilChanged_ = function (ob) {
  return ob.pipe(RxOp.distinctUntilChanged());
}

exports.elementAt_ = function (i) {
  return function (obs) {
    return obs.pipe(RxOp.elementAt(i));
  };
}

exports.filter_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.filter(p));
  };
}

exports.first_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.first(p));
  };
}

exports.ignoreElements_ = function (obs) {
  return obs.pipe(RxOp.ignoreElements());
}

exports.last_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.last(p));
  };
}

exports.sample_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.sample(obs2));
  };
}

exports.sampleTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.sampleTime(ms));
  };
}

exports.skip_ = function (n) {
  return function (obs) {
    return obs.pipe(RxOp.skip(n));
  };
}

exports.skipUntil_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.skipUntil(obs2));
  };
}

exports.skipWhile_ = function (p) {
  return function (obs) {
    return obs.pipe(RxOp.skipWhile(p));
  };
}

exports.take_ = function (n) {
  return function (ob) {
    return ob.pipe(RxOp.take(n));
  };
}

exports.takeUntil_ = function (other) {
  return function (ob) {
    return ob.pipe(RxOp.takeUntil(other));
  };
}

exports.takeWhile_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.takeWhile(obs2));
  };
}

exports.throttle_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.throttle(f));
  };
}

exports.throttleTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.throttleTime(ms));
  };
}

/**** Combination Operators ****/

exports.combineLatest_ = function (f) {
  return function (ob1) {
    return function (ob2) {
      return Rx.combineLatest(ob1, ob2, function (x, y) {
        return f(x)(y);
      });
    };
  };
}

exports.combineLatest3_ = function (f) {
  return function (obs1) {
    return function (obs2) {
      return function (obs3) {
        return Rx.combineLatest(obs1, obs2, obs3, function (x, y, z) {
          return f(x)(y)(z);
        });
      };
    };
  };
}

exports.concat_ = function (obs1) {
  return function (obs2) {
    return Rx.concat(obs1, obs2);
  };
}

exports.concatAll_ = function (obsobs) {
  return obsobs.pipe(RxOp.concatAll());
}

exports.exhaust_ = function (obsobs) {
  return obsobs.pipe(RxOp.exhaust());
}

exports.merge_ = function (ob) {
  return function (other) {
    return ob.pipe(RxOp.merge(other));
  };
}

exports.mergeAll_ = function (obsobs) {
  return obsobs.pipe(RxOp.mergeAll());
}

exports.race_ = function (arrOfObs) {
  return Rx.race.apply(this, arrOfObs);
}

exports.startWith_ = function (start) {
  return function (ob) {
    return ob.pipe(RxOp.startWith(start));
  };
}

exports.withLatestFrom_ = function (f) {
  return function (ob2) {
    return function (ob1) {
      return ob1.pipe(RxOp.withLatestFrom(ob2, function (x, y) {
        return f(x)(y);
      }))
    };
  };
}

exports.zip_ = function (arrOfObs) {
  return Rx.zip.apply(this, arrOfObs);
}

/**** Error Handling Operators ****/

exports.catch_ = function (obs) {
  return function (f) {
    return obs.pipe(RxOp.catchError(f));
  };
}

exports.retry_ = function (nTimes) {
  return function (obs) {
    return obs.pipe(RxOp.retry(nTimes));
  };
}


/**** Utility Operators ****/

exports.delay_ = function (ms) {
  return function (ob) {
    return ob.pipe(RxOp.delay(ms));
  };
}

exports.delayWhen_ = function (f) {
  return function (obs1) {
    return obs1.pipe(RxOp.delayWhen(f));
  };
}

exports.materializeImpl = function (ob, Next, Error, Complete) {
  return ob.pipe(
    RxOp.materialize(),
    RxOp.map(function (x) {
      switch (x.kind) {
        case 'N': return Next(x.value);
        case 'E': return Error(x.error);
        case 'C': return Complete;
      }
    }));
}

exports.create_ = function (subscriberToEff) {
  return function () {
    return Rx.Observable.create(subscriberToObserverFn(subscriberToEff))
  }
}

function subscriberToObserverFn(subscriberFn) {
  return removeEff(function (observer) {
    var subscriber = observerToSubscriber(observer)
    return subscriberFn(subscriber)
  })
}

function observerToSubscriber(observer) {
  return {
    next: function (a) {
      return function () { observer.next(a) }
    },
    error: function (e) {
      return function () { observer.error(e) }
    },
    completed: function () {
      return function () { observer.completed() }
    }

  }
}

exports.dematerialize_ = function (ob) {
  return ob.pipe(
    RxOp.map(function (a) {
      switch (a.constructor.name) {
        case "OnNext": return Rx.Notification.createNext(a.value0);
        case "OnError": return Rx.Notification.createError(a.value0);
        case "OnComplete": return Rx.Notification.createComplete();
      }
    }),
    dematerialize());
}


exports.toArray_ = function (obs) {
  return obs.pipe(RxOp.toArray());
}

/**** Conditional and Boolean Operators ****/

exports.defaultIfEmpty_ = function (val) {
  return function (obs) {
    return obs.pipe(RxOp.defaultIfEmpty(val));
  };
}

exports.every_ = function (pred) {
  return function (obs) {
    return obs.pipe(RxOp.every(pred));
  };
}

exports.isEmpty_ = function (obs) {
  return obs.pipe(RxOp.isEmpty());
}

/**** Aggregate Operators ****/

exports.count_ = function (obs) {
  return obs.pipe(RxOp.count());
}


exports.reduce_ = function (f) {
  return function (seed) {
    return function (ob) {
      return ob.pipe(RxOp.reduce(function (x, y) {
        return f(x)(y);
      }, seed));
    };
  };
}


/**** Helpers ****/

exports.unwrap_ = function (obs) {
  return function () {
    return obs.pipe(RxOp.map(function (eff) {
      return eff();
    }));
  };
}
