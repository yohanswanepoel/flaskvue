#!/bin/bash
oc project myproject
odo create python
sleep 60
odo push --local ./book-api
odo url create

#Assuming build is done
odo create nginx
sleep 60
odo push --local ./book-ui/dist/
odo url create
