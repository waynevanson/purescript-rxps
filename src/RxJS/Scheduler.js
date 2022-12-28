/* global exports */
"use strict";

// module RxJS.Scheduler

import Rx from 'rxjs';

export const queue = Rx.queueScheduler;
export const asap = Rx.asapScheduler;
export const async = Rx.asyncScheduler;
export const animationFrame = Rx.animationFrameScheduler;
