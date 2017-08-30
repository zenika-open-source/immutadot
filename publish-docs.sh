#!/bin/sh
set -e

yarn docs
VERSION_TO_MINOR=$(echo $CIRCLE_TAG | sed -E 's/\.[0-9]+$//')
rm -rf docs/immutadot/$VERSION_TO_MINOR
mv docs/immutadot/$CIRCLE_TAG docs/immutadot/$VERSION_TO_MINOR
git config user.name $GIT_USER_NAME
git config user.email $GIT_USER_EMAIL
git checkout master
git add docs/immutadot
git commit -m ":memo: Publish documentation"
git pull -r origin master && git push origin master
