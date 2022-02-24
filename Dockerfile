# Dockerfile for React client

# Build react client
FROM node:14-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install react-beautiful-dnd axios moment react-file-base64 redux redux-thunk react-icons jwt-decode react-router-dom react-color react-edit-text @syncfusion/ej2-react-diagrams @syncfusion/ej2-react-navigations @material-ui/core @mui/icons-material @syncfusion/ej2-react-inputs --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]