# flaskvue
Learning Flask and Vue by using MiniShift and the Developer CLI

This project is my learning of Flask and Vue working together. 

You can run the components seperately on the local environment.

It is more interesting using the OpenShift Developer CLI: https://github.com/redhat-developer/odo/blob/master/docs/cli-reference.md

To set it up, point it at your OpenShift Cluster with an OC login. 
If using MiniShift run: minishift oc-env and execute the path command.
Do an OC login.

## Once logged in:
### For API layer
* odo create python
* odo push --local ./book-api
* odo url create

(Note the URI and test it - you need this to point the UI to the API Layer.)

For now you have to update the API Url in the Books.vue component to point to your Flask API server.

## For front-end run (build the front-end code using: npm run build)
* odo create nginx
* odo push --local ./book-ui/dist/
* odo url create 

(Note the URI and test it)

The components should now talk to each other.

