module ObservableSpec (observableOperatorSpec, observableCreationSpec) where

import RxJS.Observable
import Control.Comonad (extract)
import Effect (Effect)
import Effect.Class (liftEffect)
import Control.MonadPlus (empty)
import Data.String (length)
import Prelude (Unit, bind, const, map, pure, unit, (#), (<), (>), discard)
import Test.Unit (TestSuite, suite, test)

observableCreationSpec :: TestSuite
observableCreationSpec =
  suite "observable creation methods" do
    test "interval" do
      liftEffect ((interval 200 # take 2) # subObservable)
    test "timer" do
      liftEffect ((timer 200 100 # take 2) # subObservable)
    test "never" do
      liftEffect ((never) # subObservable)
    test "empty" do
      liftEffect ((empty) # subObservable)
    test "range" do
      liftEffect ((range 0 5) # subObservable)
    test "fromArray" do
      liftEffect ((fromArray [1,2,3,4,5]) # subObservable)
    test "just" do
      liftEffect ((just "Hello World!") # subObservable)

observableOperatorSpec :: TestSuite
observableOperatorSpec =
  suite "observable operators" do
    test "auditTime" do
      liftEffect ((auditTime 200 observable) # subObservable)
    test "bufferCount" do
      liftEffect ((bufferCount 2 1 observable) # subObservable)
    test "combineLatest" do
      liftEffect ((combineLatest (\acc cur -> acc) observable observable2) # subObservable)
    test "concat" do
      liftEffect ((concat observable observable3) # subObservable)
    test "concatAll" do
      liftEffect ((concatAll higherOrder) # subObservable)
    test "concatMap" do
      liftEffect ((concatMap (\n -> just n) observable) # subObservable)
    test "count" do
      liftEffect ((count observable) # subObservable)
    test "debounce" do
      liftEffect ((debounce (\x -> observable) observable3) # subObservable)
    test "debounceTime" do
      liftEffect ((debounceTime 1000 observable) # subObservable)
    test "defaultIfEmpty" do
      liftEffect ((defaultIfEmpty 0 observable) # subObservable)
    test "delay" do
      liftEffect ((delay 200 observable) # subObservable)
    test "delayWhen" do
      liftEffect ((delayWhen (\x -> observable2) observable) # subObservable)
    test "distinct" do
      liftEffect ((distinct observable) # subObservable)
    test "distinctUntilChanged" do
      liftEffect ((distinctUntilChanged observable) # subObservable)
    test "exhaust" do
      liftEffect ((exhaust higherOrder) # subObservable)
    test "exhaustMap" do
      liftEffect ((exhaustMap (\x -> observable3) observable) # subObservable)
    test "elementAt" do
      liftEffect ((elementAt 2 observable) # subObservable)
    test "every" do
      liftEffect ((every (_ > 3) observable # subObservable))
    test "filter" do
      liftEffect ((filter (_ > 2) observable) # subObservable)
    test "groupBy" do
      liftEffect ((groupBy length observable2) # subObservable)
    test "ignoreElements" do
      liftEffect ((ignoreElements observable) # subObservable)
    test "isEmpty" do
      liftEffect ((isEmpty observable) # subObservable)
    test "first" do
      liftEffect ((first (const true) observable # subObservable))
    test "last" do
      liftEffect ((last (const true) observable # subObservable))
    test "map" do
      liftEffect ((map length observable2) # subObservable)
    test "mapTo" do
      liftEffect ((mapTo "A" observable) # subObservable)
    test "merge" do
      liftEffect ((merge observable observable3) # subObservable)
    test "mergeAll" do
      liftEffect ((mergeAll higherOrder) # subObservable)
    test "mergeMap" do
      liftEffect ((mergeMap observable (\a -> observable3)) # subObservable)
    test "mergeMapTo" do
      liftEffect ((mergeMapTo observable observable3) # subObservable)
    test "race" do
      liftEffect ((race [observable, observable3]) # subObservable)
    test "reduce" do
      liftEffect ((reduce (\acc cur -> acc) 0 observable) # subObservable)
    test "scan" do
      liftEffect ((scan (\acc cur -> acc) 0 observable) # subObservable)
    test "retry" do
      liftEffect ((retry 10 observable) # subObservable)
    test "sample" do
      liftEffect ((sample observable observable2) # subObservable)
    test "sampleTime" do
      liftEffect ((sampleTime 1000 observable) # subObservable)
    test "share" do
      liftEffect ((share observable) # subObservable)
    test "skip" do
      liftEffect ((skip 2 observable) # subObservable)
    test "skipUntil" do
      liftEffect ((skipUntil observable observable2) # subObservable)
    test "skipWhile" do
      liftEffect ((skipWhile (_ < 2) observable) # subObservable)
    test "startWith" do
      liftEffect ((startWith 0 observable) # subObservable)
    test "switchMap" do
      liftEffect ((switchMap (\x -> observable2) observable) # subObservable)
    test "switchMapTo" do
      liftEffect ((switchMapTo observable2 observable) # subObservable)
    test "take" do
      liftEffect ((take 3 observable) # subObservable)
    test "takeWhile" do
      liftEffect ((takeWhile (_ < 4) observable) # subObservable)
    test "takeUntil" do
      liftEffect ((takeUntil observable observable3) # subObservable)
    test "throttle" do
      liftEffect ((throttle (\x -> observable3) observable) # subObservable)
    test "throttleTime" do
      liftEffect ((throttleTime 200 observable) # subObservable)
    test "window" do
      liftEffect ((window observable observable2) # subObservable)
    test "windowCount" do
      liftEffect ((windowCount 1 1 observable) # subObservable)
    test "windowTime" do
      liftEffect ((windowTime 100 100 observable) # subObservable)
    test "withLatestFrom" do
      liftEffect ((withLatestFrom (\a b -> a) observable observable2) # subObservable)
    test "zip" do
      liftEffect ((zip [observable, observable3]) # subObservable)

observable :: Observable Int
observable = fromArray [1,2,3,4,5,6]

observable2 :: Observable String
observable2 = fromArray ["h","e","ll","o"]

observable3 :: Observable Int
observable3 = fromArray [7]

higherOrder :: Observable (Observable String)
higherOrder = just observable2

subObservable :: forall a. Observable a -> Effect Unit
subObservable obs = do
    sub <- extract (obs # subscribeNext noop)
    pure unit

noop :: forall a. a -> Effect Unit
noop a = pure unit
