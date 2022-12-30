/* global exports */
"use strict";

// module RxJS.Observable
import * as Rx from 'rxjs';

import * as RxOp from 'rxjs/operators';
import * as RxAjax from 'rxjs/ajax';


function removeEff(fn) {
  return function (a) {
    return fn(a)()
  }
}

/**** Scheduling ****/

export const observeOn_ = function (s) {
  return function (obs) {
    return RxOp.observeOn(obs, s);
  };
};

export const subscribeOn_ = function (s) {
  return function (obs) {
    return RxOp.subscribeOn(obs, s);
  };
};

/**** Subscription ****/
export const subscribe_ = function (sub) {
  return function (obs) {
    return function () {
      return obs.subscribe(
        function (val) { sub.next(val)(); },
        function (err) { sub.error(err)(); },
        function () { sub.complete()(); }
      );
    };
  };
};

export const subscribeNext_ = function (eff) {
  return function (obs) {
    return function () {
      return obs.subscribe(
        function (val) { eff(val)() }
      );
    };
  };
};

/**** Creation Operators ****/

export const ajax_ = function (req) {
  return function () {
    return RxAjax.ajax(req).pipe(
      RxOp.map(function (res) {
        var body = res.responseText || JSON.stringify(res.response)
        return { body: body, status: res.status, responseType: res.responseType }
      }))
  }
};

export const ajaxWithBody_ = ajax_;
export const _empty_ = Rx.EMPTY;
export const fromArray_ = Rx.from; //Rx.Observable.from;
export const fromEventImpl_ = Rx.fromEvent;
export const interval_ = Rx.interval;
export const just_ = Rx.of;
export const never_ = Rx.NEVER;
export const rangeImpl_ = Rx.range;
export const throw_ = Rx.throw;
export const timerImpl_ = Rx.timer;

/**** Transformation Operators ****/

export const buffer_ = function (obs1) {
  return function (obs2) {
    return obs1.pipe(RxOp.buffer(obs2));
  };
};

export const bufferCount_ = function (maxSize) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.bufferCount(maxSize, startNewAt));
    };
  };
};

export const bufferTimeImpl_ = function (timespan, creationInterval, maxSize, obs) {
  return obs.pipe(RxOp.bufferTime(timespan, creationInterval, maxSize));
};

export const bufferToggleImpl_ = function (obs, openings, closingSelector) {
  return obs.pipe(RxOp.bufferToggle(openings, closingSelector));
};

export const bufferWhen_ = function (closing) {
  return function (obs) {
    return obs.pipe(RxOp.bufferWhen(closing));
  };
};

export const concatMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.concatMap(f));
  };
};

export const exhaustMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.exhaustMap(f));
  };
};

export const expand_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.expand(f));
  };
};

export const share_ = function (obs) {
  return obs.pipe(RxOp.share());
};

export const groupBy_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.groupBy(f));
  };
};

export const _map_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.map(f));
  };
};

export const mapTo_ = function (val) {
  return function (obs1) {
    return obs1.pipe(RxOp.mapTo(val));
  };
};

export const mergeMap_ = function (obs) {
  return function (f) {
    return obs.pipe(RxOp.mergeMap(f));
  };
};

export const mergeMapTo_ = function (obs1) {
  return function (obs2) {
    return obs1.pipe(RxOp.mergeMapTo(obs2));
  };
};

export const pairwiseImpl_ = function (obs) {
  return obs.pipe(RxOp.pairwise());
};

export const partitionImpl_ = function (pred) {
  return function (obs) {
    return obs.pipe(RxOp.partition(pred));
  };
};

export const scan_ = function (f) {
  return function (seed) {
    return function (ob) {
      return ob.pipe(RxOp.scan(function (acc, value) {
        return f(value)(acc);
      }, seed));
    };
  };
};

export const switchMap_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.switchMap(f));
  };
};

export const switchMapTo_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.switchMapTo(obs2));
  };
};

export const window_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.window(obs2));
  };
};

export const windowCount_ = function (maxSize) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.windowCount(maxSize, startNewAt));
    };
  };
};

export const windowTime_ = function (timeSpan) {
  return function (startNewAt) {
    return function (obs) {
      return obs.pipe(RxOp.windowTime(timeSpan, startNewAt));
    };
  };
};

/**** Filtering Operators ****/

export const audit_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.audit(f));
  };
};

export const auditTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.auditTime(ms));
  };
};

export const debounce_ = function (f) {
  return function (ob) {
    return ob.pipe(RxOp.debounce(f));
  };
};

export const debounceTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.debounceTime(ms));
  };
};

export const distinct_ = function (ob) {
  return ob.pipe(RxOp.distinct());
};

export const distinctUntilChanged_ = function (ob) {
  return ob.pipe(RxOp.distinctUntilChanged());
};

export const elementAt_ = function (i) {
  return function (obs) {
    return obs.pipe(RxOp.elementAt(i));
  };
};

export const filter_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.filter(p));
  };
};

export const first_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.first(p));
  };
};

export const ignoreElements_ = function (obs) {
  return obs.pipe(RxOp.ignoreElements());
};

export const last_ = function (p) {
  return function (ob) {
    return ob.pipe(RxOp.last(p));
  };
};

export const sample_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.sample(obs2));
  };
};

export const sampleTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.sampleTime(ms));
  };
};

export const skip_ = function (n) {
  return function (obs) {
    return obs.pipe(RxOp.skip(n));
  };
};

export const skipUntil_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.skipUntil(obs2));
  };
};

export const skipWhile_ = function (p) {
  return function (obs) {
    return obs.pipe(RxOp.skipWhile(p));
  };
};

export const take_ = function (n) {
  return function (ob) {
    return ob.pipe(RxOp.take(n));
  };
};

export const takeUntil_ = function (other) {
  return function (ob) {
    return ob.pipe(RxOp.takeUntil(other));
  };
};

export const takeWhile_ = function (obs2) {
  return function (obs1) {
    return obs1.pipe(RxOp.takeWhile(obs2));
  };
};

export const throttle_ = function (f) {
  return function (obs) {
    return obs.pipe(RxOp.throttle(f));
  };
};

export const throttleTime_ = function (ms) {
  return function (obs) {
    return obs.pipe(RxOp.throttleTime(ms));
  };
};

/**** Combination Operators ****/

export const combineLatest_ = function (f) {
  return function (ob1) {
    return function (ob2) {
      return Rx.combineLatest(ob1, ob2, function (x, y) {
        return f(x)(y);
      });
    };
  };
};

export const combineLatest3_ = function (f) {
  return function (obs1) {
    return function (obs2) {
      return function (obs3) {
        return Rx.combineLatest(obs1, obs2, obs3, function (x, y, z) {
          return f(x)(y)(z);
        });
      };
    };
  };
};

export const concat_ = function (obs1) {
  return function (obs2) {
    return Rx.concat(obs1, obs2);
  };
};

export const concatAll_ = function (obsobs) {
  return obsobs.pipe(RxOp.concatAll());
};

export const exhaust_ = function (obsobs) {
  return obsobs.pipe(RxOp.exhaust());
};

export const merge_ = function (ob) {
  return function (other) {
    return ob.pipe(RxOp.merge(other));
  };
};

export const mergeAll_ = function (obsobs) {
  return obsobs.pipe(RxOp.mergeAll());
};

export const race_ = function (arrOfObs) {
  return Rx.race.apply(this, arrOfObs);
};

export const startWith_ = function (start) {
  return function (ob) {
    return ob.pipe(RxOp.startWith(start));
  };
};

export const withLatestFrom_ = function (f) {
  return function (ob2) {
    return function (ob1) {
      return ob1.pipe(RxOp.withLatestFrom(ob2, function (x, y) {
        return f(x)(y);
      }))
    };
  };
};

export const zip_ = function (arrOfObs) {
  return Rx.zip.apply(this, arrOfObs);
};

/**** Error Handling Operators ****/

export const catch_ = function (obs) {
  return function (f) {
    return obs.pipe(RxOp.catchError(f));
  };
};

export const retry_ = function (nTimes) {
  return function (obs) {
    return obs.pipe(RxOp.retry(nTimes));
  };
};

/**** Utility Operators ****/

export const delay_ = function (ms) {
  return function (ob) {
    return ob.pipe(RxOp.delay(ms));
  };
};

export const delayWhen_ = function (f) {
  return function (obs1) {
    return obs1.pipe(RxOp.delayWhen(f));
  };
};

export const materializeImpl = function (ob, Next, Error, Complete) {
  return ob.pipe(
    RxOp.materialize(),
    RxOp.map(function (x) {
      switch (x.kind) {
        case 'N': return Next(x.value);
        case 'E': return Error(x.error);
        case 'C': return Complete;
      }
    }));
};

export const create_ = function (subscriberToEff) {
  return function () {
    return Rx.Observable.create(subscriberToObserverFn(subscriberToEff))
  }
};

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

export const dematerialize_ = function (ob) {
  return ob.pipe(
    RxOp.map(function (a) {
      switch (a.constructor.name) {
        case "OnNext": return Rx.Notification.createNext(a.value0);
        case "OnError": return Rx.Notification.createError(a.value0);
        case "OnComplete": return Rx.Notification.createComplete();
      }
    }),
    dematerialize());
};

export const toArray_ = function (obs) {
  return obs.pipe(RxOp.toArray());
};

/**** Conditional and Boolean Operators ****/

export const defaultIfEmpty_ = function (val) {
  return function (obs) {
    return obs.pipe(RxOp.defaultIfEmpty(val));
  };
};

export const every_ = function (pred) {
  return function (obs) {
    return obs.pipe(RxOp.every(pred));
  };
};

export const isEmpty_ = function (obs) {
  return obs.pipe(RxOp.isEmpty());
};

/**** Aggregate Operators ****/

export const count_ = function (obs) {
  return obs.pipe(RxOp.count());
};

export const reduce_ = function (f) {
  return function (seed) {
    return function (ob) {
      return ob.pipe(RxOp.reduce(function (x, y) {
        return f(x)(y);
      }, seed));
    };
  };
};

/**** Helpers ****/

export const unwrap_ = function (obs) {
  return function () {
    return obs.pipe(RxOp.map(function (eff) {
      return eff();
    }));
  };
};
