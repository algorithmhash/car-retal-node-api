# REST API for car-rental-service

**1. Getting Started**</br>
npm install


**2. Dependencies used:**</br>
 * body-parsers</br>
 * express</br>
 * mongoose</br>
 * morgan</br>
 * multer</br>
 * nodemon


**3. To start server:**</br>
npm start


To check if server is running link: </br>
https://car-rental-api-node.herokuapp.com</br>
**Response:**{"error":{"message":"Server is running"}}

## Method and Response ##

### a. To post a product(POST Method) ###</br>
**Link:-** https://car-rental-api-node.herokuapp.com/products</br>
**Format for form-data**</br>
* name(String)
* price(Number)
* productImage(File size must not be greater than 5MB)
* ownerName(String)
* descriptionRegardingAvailability(String)
* fuelType(String)
* seats(Number)
* mobileNumber(String)
>>>>>>> edb767b65e9ee5c7e8bf25ee3a84928770da7605


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


How to access Orders API?</br>


To place an order for a product(POST METHOD)</br>
https://car-rental-api-node.herokuapp.com/orders</br>
raw-data having key-value pair in JSON format having key as productId and value as any id of car</br>
{</br>
	"productId" : "5da3d4919f76c1002402cfb7"
}</br>

To get list of all order for a products(GET Method)</br>
https://car-rental-api-node.herokuapp.com/orders</br>


To get the details of a prticular order(GET Method)</br>
https://car-rental-api-node.herokuapp.com/orders/+'productId'


To delete a particular Order(DELETE Method)</br>
https://car-rental-api-node.herokuapp.com/orders/+'productId'</br>


Please message if found any error or for any upgradation.
