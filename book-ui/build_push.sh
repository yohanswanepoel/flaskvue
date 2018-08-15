#!/bin/bash
npm run build 
cp -r nginx-default-cfg dist/
odo push --local dist/

