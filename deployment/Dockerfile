# DEPLOY_DIR should be either /operator-a/ or /operator-b/
# SRC_DIR is the local directory where the frontend deploy files are

FROM nginx

# ARG SRC_DIR

WORKDIR /etc/nginx

# We only need to set up a folder and copy the build files there
RUN mkdir /work

# ADD $SRC_DIR work
ADD build /work
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"
