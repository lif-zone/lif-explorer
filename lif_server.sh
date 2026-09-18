#!/bin/bash -e
export PORT="1806"
export API_URL="http://localhost:1842/.lif.net/blockstream/"

babel-node dev-server.js
