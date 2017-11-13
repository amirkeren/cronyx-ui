#!/bin/bash

sed -i -e "s/localhost/$PROXY/" /cronyx-ui/package.json
exec "$@"
