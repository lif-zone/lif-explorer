#!/bin/bash -e
export PORT="1806"
export API_URL="http://localhost:8432/blockstream/"

babel-node dev-server.js
