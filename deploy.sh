#!/bin/bash

# compile code
ng build --prod || exit 1

# build tarball
(cd dist/raar-admin-ui && gzip -kf *.{css,js} && tar czf ../raar-admin-ui.tar.gz .)

# upload archive
scp dist/raar-admin-ui.tar.gz raar@archiv:/var/www/raar-ui/admin/raar-admin-ui.new.tar.gz

# install archive
ssh raar@archiv /bin/bash << EOF
  cd /var/www/raar-ui/admin/
  tar xzf raar-admin-ui.new.tar.gz
  if [ -f "raar-admin-ui.tar.gz" ]; then
    mv raar-admin-ui.tar.gz raar-admin-ui.old.tar.gz
  fi
  mv raar-admin-ui.new.tar.gz raar-admin-ui.tar.gz
EOF
