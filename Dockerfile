FROM node:8-alpine As base

WORKDIR /src

ENV NODE_ENV production

RUN apk add --no-cache python make git
#g++ krb5-dev krb5-libs expat

ADD package.json package-lock.json /src/

RUN git config --global http.sslVerify false && \
    npm install



FROM node:8-alpine

EXPOSE 3010

ENV HOME /src

ENV NODE_ENV production

WORKDIR /src

ADD . /src

COPY --from=base /src/node_modules /src/node_modules

CMD ["npm", "start"]
