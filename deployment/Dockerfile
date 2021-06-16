# DEPLOY_DIR should be either /operator-a/ or /operator-b/
# SRC_DIR is the local directory where the frontend deploy files are
# and defaults to src/

FROM nginx

ARG DEPLOY_DIR
ARG SRC_DIR=src/

WORKDIR /etc/nginx

# We only need to set up a folder and copy the build files there
RUN echo $DEPLOY_DIR
RUN mkdir $DEPLOY_DIR

ADD $SRC_DIR $DEPLOY_DIR

CMD nginx -g "daemon off;"
