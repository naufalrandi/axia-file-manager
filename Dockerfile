FROM node:alpine as filemanager

# Create app directory
WORKDIR /usr/src/app

RUN apk add g++ make py3-pip
RUN apk add git
RUN apk add nano
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
RUN echo "Asia/Jakarta" >  /etc/timezone
RUN date

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 5999

CMD [ "npm", "start" ]
