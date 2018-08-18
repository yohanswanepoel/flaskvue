#!/bin/bash
if [ -z "${USE_SSO}" ]
then
   export USE_SSO=no
   export SSO_PATH='default'
   export API_PATH='default'
fi

sed -i -e "s|__USE_SSO__|$USE_SSO|g" /opt/app-root/src/index.html
sed -i -e "s|__SSO_URL__|$SSO_PATH|g" /opt/app-root/src/index.html
sed -i -e "s|__API_URL__|$API_PATH|g" /opt/app-root/src/index.html
