# https://github.com/cypress-io/cypress-docker-images
FROM cypress/base:8

# install latest stable Chrome browser
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY ./cypress ./cypress/

ENTRYPOINT ["yarn", "cy:run"]
