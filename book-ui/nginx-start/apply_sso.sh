#!/bin/bash
if[$USE_SSO == ""]
 then
   export USE_SSO=false
   export SSO_PATH=''
fi

sed -i -e "s|__USE_SSO__|$USE_SSO|g" /opt/app-root/src/index.html
sed -i -e "s|__SSO_URL__|$SSO_PATH|g" /opt/app-root/src/index.html
