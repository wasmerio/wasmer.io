#!/usr/bin/env bash

set -Eeuxo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR

# This seems to be left behind by build runs, but causes additional builds to fail.
rm -rf ./public/_next

pnpm run build

# This is a hack for https://github.com/wasmerio/wasmer/issues/3744
# Ideally, we would just have `"public" = "out"` under the `[fs]` table
# in `wasmer.toml`
rm -r public.bak
mv public public.bak
mv out public

# NOTE: must be either logged, or have a token in the `WASMER_TOKEN` env var.
wasmer-deploy publish \
  --publish-package \
  --registry=https://registry.wapm.io/graphql \
  --non-interactive
