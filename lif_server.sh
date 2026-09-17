#!/bin/bash -e
export PORT="1806"
export API_URL="http://localhost:1842/blockstream/"

babel-node dev-server.js
