FROM node:latest
LABEL maintainer "Amir Keren <amir.k@taboola.com>"

RUN git clone https://github.com/amirkeren/cronyx-ui /cronyx-ui/
WORKDIR /cronyx-ui
RUN npm install
EXPOSE 3000
ENTRYPOINT ["/cronyx-ui/setproxy.sh"]
CMD ["npm", "start"]
