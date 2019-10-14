# car-retal-node-api
REST API for car-rental-service


Getting Started</br>
npm install


Dependencies used:</br>
body-parsers, express, mongoose, morgan, multer, nodemon


To start server:</br>
npm start


To check if server is running link:</br>
https://car-rental-api-node.herokuapp.com</br>
Response get by User for server is running{"error":{"message":"Server is running"}}


To post a product(POST Method)</br>
https://car-rental-api-node.herokuapp.com/products</br>
form-data having key-value pair</br>
name(String), price(Number), productImage(File size must not be greater than 5MB), ownerName(String), descriptionRegardingAvailability(String), fuelType(String), seats(Number), mobileNumber(String)


To get list of all products(GET Method)</br>
https://car-rental-api-node.herokuapp.com/products

To sort the list of all products based on price(GET Method)</br>
https://car-rental-api-node.herokuapp.com/products/sortByPrice

To get list of all products having fuel type as Petrol</br>
https://car-rental-api-node.herokuapp.com/products/Petrol

To get list of all products having fuel type as Diesel</br>
https://car-rental-api-node.herokuapp.com/products/Diesel</br>

To get list of all products having fuel type as CNG</br>
https://car-rental-api-node.herokuapp.com/products/CNG</br>


To update the details of any product(PATCH Method)</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>
pass JSON array having key defined under propName and value of key under value</br>
Example:</br>
[</br>
	{"propName":"price" ,"value":"110"} </br>
]</br>


To get details of a single product(GET METHOD)</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>


To delete details of any particular product(DELETE METHOD)</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>
