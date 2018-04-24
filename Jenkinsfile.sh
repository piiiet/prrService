#!/usr/bin/env bash
IMAGE_NAME=traffics/documentservice

# the branch which contain latest stable code, used to tag docker image with latest if this branch used for building
STABLE_BRANCH=master

# nexus url
NEXUS_URL=nexussrv.office.traffics-switch.de:8843
NEXUS_PULL_URL=nexussrv.office.traffics-switch.de:9843

# holder for command used to fetch docker image for this build
AVAILABLE_IMAGE_TAGS=()

# MY_GIT_BRANCH without origin/ part
MY_GIT_BRANCH=$(echo ${GIT_BRANCH} | cut -d'/' -f 2-)
# MY_GIT_BRANCH without special chracters
MY_GIT_BRANCH=$(echo ${MY_GIT_BRANCH//[^-0-9a-zA-Z]/-})


# create tag for image with first 8 chars in current commit id
IMAGE_COMMIT_ID=$(echo $GIT_COMMIT | cut -c1-8)

docker build --pull -t $IMAGE_NAME .

# tag and push this image with
  # if stabe branch used you will have images with tags
   # latest
  # branch
  # branch-GIT_COMMIT_ID
if [ "$MY_GIT_BRANCH" == "$STABLE_BRANCH" ]; then
   docker tag $IMAGE_NAME $NEXUS_URL/$IMAGE_NAME && \
   docker push $NEXUS_URL/$IMAGE_NAME && \
   AVAILABLE_IMAGE_TAGS+=("$NEXUS_URL/$IMAGE_NAME")
fi
docker tag $IMAGE_NAME $NEXUS_URL/$IMAGE_NAME:$MY_GIT_BRANCH && \
docker tag $IMAGE_NAME $NEXUS_URL/$IMAGE_NAME:$IMAGE_COMMIT_ID && \
docker push $NEXUS_URL/$IMAGE_NAME:$MY_GIT_BRANCH && \
docker push $NEXUS_URL/$IMAGE_NAME:$IMAGE_COMMIT_ID && \
AVAILABLE_IMAGE_TAGS+=("$NEXUS_URL/$IMAGE_NAME:$MY_GIT_BRANCH") && \
AVAILABLE_IMAGE_TAGS+=("$NEXUS_URL/$IMAGE_NAME:$IMAGE_COMMIT_ID")

printf " your image available to be pulled using any of next tags: \n"
printf '%s\n' "${AVAILABLE_IMAGE_TAGS[@]}"


#######################################kubernetes#######################################
if [ "$MY_GIT_BRANCH" == "develop" ]; then
   kubectl set image deployment/document documentService=$NEXUS_PULL_URL/$IMAGE_NAME:$IMAGE_COMMIT_ID --namespace=green-dev --context staging
elif [ "$MY_GIT_BRANCH" == "master" ]; then
   kubectl set image deployment/document documentService=$NEXUS_PULL_URL/$IMAGE_NAME:$IMAGE_COMMIT_ID --namespace=green-staging --context staging
fi
#######################################kubernetes#######################################

