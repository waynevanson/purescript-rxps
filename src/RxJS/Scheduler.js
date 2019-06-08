/* global exports */
"use strict";

// module RxJS.Scheduler

var Rx = require('rxjs');

exports.queue = Rx.queueScheduler;
exports.asap = Rx.asapScheduler;
exports.async = Rx.asyncScheduler;
exports.animationFrame = Rx.animationFrameScheduler;
