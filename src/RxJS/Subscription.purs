module RxJS.Subscription
  ( Subscription(..)
  , unsubscribe
  ) where

import Prelude (Unit)
import Effect (Effect)

-- | When you subscribe, you get back a Subscription, which represents the
-- | ongoing execution.
foreign import data Subscription :: Type

-- | Call unsubscribe() to cancel the execution.
foreign import unsubscribe :: Subscription -> Effect Unit
