module RxJS.Subscriber
        (Subscriber)
        where

import Prelude (Unit)
import Effect (Effect)
import Effect.Exception (Error)

type Subscriber a
  = { next      :: a -> Effect Unit
    , error     :: Error -> Effect Unit
    , completed :: Unit -> Effect Unit
    }
