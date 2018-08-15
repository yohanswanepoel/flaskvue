#!/bin/bash
npm run build
cp -r nginx-default-cfg dist/
cp -r nginx-start dist/
odo push --local dist/
