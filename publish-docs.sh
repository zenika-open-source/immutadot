#!/bin/sh
yarn docs
CIRCLE_TAG=0.1.13 # REMOVE
VERSION_TO_MINOR=$(echo $CIRCLE_TAG | sed -E 's/\.[0-9]+$//')
rm -rf docs/immutadot/$VERSION_TO_MINOR
mv docs/immutadot/$CIRCLE_TAG docs/immutadot/$VERSION_TO_MINOR
git config user.name $GIT_USER_NAME
git config user.email $GIT_USER_EMAIL
# git checkout master
git checkout enhancement/28
git add docs/immutadot
git commit -m ":memo: Publish documentation"
# git pull -r origin master && git push origin master
git pull -r origin enhancement/28 && git push origin enhancement/28
