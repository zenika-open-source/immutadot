#!/bin/sh
set -e

# Git configuration
git config user.name $GIT_USER_NAME
git config user.email $GIT_USER_EMAIL

# Build documentation
yarn docs

# Move to new branch based on master
git checkout master
git checkout -b docs/$CIRCLE_TAG

# Apply modifications to minor version
VERSION_TO_MINOR=$(echo $CIRCLE_TAG | sed -E 's/\.[0-9]+$//')
rm -rf docs/immutadot/$VERSION_TO_MINOR
mv docs/immutadot/$CIRCLE_TAG docs/immutadot/$VERSION_TO_MINOR

# Commit and push modifications
git add docs/immutadot
git commit -m ":memo: Publish $CIRCLE_TAG documentation"
git push --set-upstream origin docs/$CIRCLE_TAG
