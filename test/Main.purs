module Test.Main where

import Effect (Effect)
import ObservableSpec (observableOperatorSpec, observableCreationSpec)
import ObservableTSpec  (observableTOperatorSpec, observableTCreationSpec)
import Prelude (Unit, discard)
import Test.Unit.Main (exit, runTest)

main :: Effect Unit
main = do
  runTest do
    observableOperatorSpec
    observableCreationSpec
    observableTOperatorSpec
    observableTCreationSpec
  (exit 0)
