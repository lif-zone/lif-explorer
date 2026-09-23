#!/bin/bash -e
export PORT=1806
export API_URL=http://localhost:1842/.lif.net/blockstream/
export NATIVE_ASSET_LABEL=LIF
#export PORT=1807
#export API_URL=https://blockstream.info/api/

babel-node dev-server.js
