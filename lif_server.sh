#!/bin/bash -e
export PORT=1806
export API_URL=/blockstream/
export BASE_HREF=/lif-explorer/

npx babel-node dev-server.js
