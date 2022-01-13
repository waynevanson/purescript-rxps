{-
Welcome to a Spago project!
You can edit this file as you like.

Need help? See the following resources:
- Spago documentation: https://github.com/purescript/spago
- Dhall language tour: https://docs.dhall-lang.org/tutorials/Language-Tour.html

When creating a new Spago project, you can use
`spago init --no-comments` or `spago init -C`
to generate this file without the comments in this block.
-}
{ name = "my-project"
, dependencies =
  [ "arrays"
  , "control"
  , "effect"
  , "exceptions"
  , "foldable-traversable"
  , "functions"
  , "identity"
  , "partial"
  , "prelude"
  , "psci-support"
  , "strings"
  , "test-unit"
  , "transformers"
  , "tuples"
  , "web-events"
  , "control"
  , "foldable-traversable"
  , "identity"
  , "partial"
  , "strings"
  , "transformers"
  , "tuples"
  , "web-events"
  , "foreign-object"
  ]
-- , devDependencies = ["test-unit"]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
