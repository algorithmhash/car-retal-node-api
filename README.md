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

**a. To post a product(POST Method)** </br>
**Link:-** https://car-rental-api-node.herokuapp.com/products</br>
**Format for form-data**</br>
* name(String)
* price(Number)
* productImage(File size must not be greater than 5MB)
* ownerName(String)
* descriptionRegardingAvailability(String)
* fuelType(String)
* seats(Number)
* mobileNumber(String)</br>

<img src = "https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Product%20POST.png"
alt="Product POST"/>


**b. To get list of all products(GET Method)** </br>
https://car-rental-api-node.herokuapp.com/products</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Product%20GET.png"
alt="Product GET" />

**c. To sort the list of all products based on price(GET Method)**</br>
https://car-rental-api-node.herokuapp.com/products/sortByPrice</br>

<img src = "https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/sortByPrice.png"
alt = "sort by price"/>

**d. To get list of all products having fuel type as Petrol**</br>
https://car-rental-api-node.herokuapp.com/products/Petrol</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Petrol.png"
alt="Petrol"/>

**e. To get list of all products having fuel type as Diesel**</br>
https://car-rental-api-node.herokuapp.com/products/Diesel</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Diesel.png"
alt="Diesel"/>

**f. To get list of all products having fuel type as CNG**</br>
https://car-rental-api-node.herokuapp.com/products/CNG</br>

<img src = "https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/CNG.png"
alt="CNG"/>

**g. To update the details of any product(PATCH Method)**</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>
Example: for passing raw-data in body in JSON format</br>
[</br>
	{"propName":"price" ,"value":"110"} </br>
]</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Update%20the%20Product.png"
alt = "Update the Product"/>

**h. To get details of a single product(GET METHOD)**</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Get%20Individual%20Product.png"
alt="Get Individual Product"/>

**i. To delete details of any particular product(DELETE METHOD)**</br>
https://car-rental-api-node.herokuapp.com/products/+'productId'</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Product/Delete%20the%20Product.png"
alt="Delete the Individual Product" />

## How to access Orders API?</br>

**a. To place an order for a product(POST METHOD)**</br>
https://car-rental-api-node.herokuapp.com/orders</br>
Example: for passing raw-data in body in JSON format</br>
{</br>
	"productId" : "5da3d4919f76c1002402cfb7"
}</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Order/Order%20Post.png"
alt = "Order POST" />

**b. To get list of all order for a products(GET Method)**</br>
https://car-rental-api-node.herokuapp.com/orders</br>

<img src="https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Order/Order%20Get.png"
alt = "Order GET" />

**c. To get the details of a prticular order(GET Method)**</br>
https://car-rental-api-node.herokuapp.com/orders/+'productId'</br>

<img src = "https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Order/Get%20Individual%20Order.png"
alt = "Get Details of individual Order"/>

**d. To delete a particular Order(DELETE Method)**</br>
https://car-rental-api-node.herokuapp.com/orders/+'productId'</br>

<img src = "https://github.com/adityabajpai/car-retal-node-api/blob/master/Responses/Order/Delete%20Individual%20Order.png"
alt = "Delete individual Order"/>


### Please message if found any error or for any upgradation.
