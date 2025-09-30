#!/bin/bash
set -ex

# Node Version Manager
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Jabba
[ -s "$HOME/.jabba/jabba.sh" ] && source "$HOME/.jabba/jabba.sh"

# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk/

git submodule update --init --recursive

jabba use temurin@18
corepack enable
nvm use 22

python3 ./scripts/version_bump.py

# RELEASE_SIGN_PWD=""
# echo "$RELEASE_SIGN_PWD" >> ./android/gradle.properties
# echo "$RELEASE_SIGN_PWD" > ./android/app/noxupload.jks

yarn install
yarn build

python3 ./scripts/fixHTTP.py

rm -rf android/app/build/generated/

cd android
chmod +x gradlew
./gradlew generateCodegenArtifactsFromSchema --rerun-tasks
./gradlew assembleRelease
cd -

ls -al android/app/build/outputs/apk/release/*.apk
