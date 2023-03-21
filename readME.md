>POSTMAN DOCUMENTATION LINK:

[POSTMAN DOCUMENTATION](https://documenter.getpostman.com/view/25485568/2s93K1pzK9)


# QVF Farms Web Application
## Description
QVF Farms is an Agritech conglomerate based in Ibadan that manufactures and distributes processed food across Nigeria with the use of a SaaS platform and a digitized inflow and outflow of products. This project aims to create an endpoint that complements their pre-existing endpoint. The endpoint is required to have different features for both Users and Admin.

The User feature set includes:
- Sign Up
- Login
- View all farm produce in their categories (Fishery, Poultry, Piggery, Crops, etc.)
- Buy any product with a specified price tag
- Update his/her order
- Delete his/her order
- View all farm divisions (Trainings, House consultation, Health products, Feed analysis and research, Livestock Feeds)
The Admin feature set includes:
- View all registered users
- View all orders made on the web application

### Technologies
This web application was built with the following technologies:
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Token (JWT)
- bcrypt

### Installation and Setup
Clone the repository
```
git clone https://github.com/<username>/qvf-farms.git
```
### Install dependencies
```
npm install
```
### Create a .env file in the root directory and add the following environment variables:
```
MONGODB_URI=<mongodb_uri>
JWT_SECRET=<jwt_secret>
```
### Start the server
```
npm start
```
### API Endpoints
#### Sign Up
##### POST /api/users/signup
- [x] Request Body
```
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@example.com",
  "phoneNumber": "08012345678",
  "password": "password123"
}
```
- [x] Response Body
```
{
  "message": "User Created Successfully"
}
```
#### Login
##### POST /api/users/login
- [x] Request Body
```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- [x] Response Body
```
{
  "message": "Login Successful",
  "token": <jwt_token>
}
```
### Logout
POST /api/users/logout
- [x] Response Body
```
{
  "message": "Logout Successful"
}
```
#### Create Farm Produce
##### POST  /api/v1/users/createproduce
- [x] Request Body
```
{
    "name": "Titus",
    "category": "Fishery",
    "price": 1200,
    "stock": 8
}
```

- [x] Response Body
```
{
    "message": "Produce Created Successfully",
    "produce": {
        "name": "Titus",
        "category": "Fishery",
        "price": 1200,
        "stock": 8,
        "_id": "64142b8d528c226fb23d33b1",
        "createdAt": "2023-03-17T08:57:49.132Z",
        "updatedAt": "2023-03-17T08:57:49.132Z",
        "__v": 0
    }
}
```

#### Create Order

#### POST /api/users/createorder
- [x] Request Body
```
{
    "name": "Turkey",
    "category": "Poultry",
    "price": 1600,
    "quantity": 6
}
```
- [x] Response Body
```
{
    "message": "Order created successfully",
    "newOrder": {
        "userId": "64132e5166272e6c4975c53d",
        "name": "Turkey",
        "price": 1600,
        "quantity": 3,
        "total": 4800,
        "_id": "6418aa98b0b7f7d35276452b",
        "__v": 0
    }
}
```

#### Update Order

#### PUT /api/users/updateorder/:id

- [x] Request Body
```
{
    "name": "Turkey",
    "category": "Poultry",
    "price": 1600,
    "quantity": 1
}
```

- [x] Response Body
```
{
    "message": "Order updated successfully",
    "updatedOrder": {
        "_id": "641869e7f100e5e024043e44",
        "name": "Turkey",
        "price": 1600,
        "quantity": 5,
        "total": 8000,
        "__v": 0
    }
}
```

#### Get Produce By Categories

#### GET /api/v1/users/categories/Poultry

- [x] Response Body
```
{
    "categoryItems": [
        "Item: chicken, Price: 1600, Stock: 10",
        "Item: Turkey, Price: 1600, Stock: 0",
        "Item: Duck, Price: 1600, Stock: 35",
        "Item: egg, Price: 1600, Stock: 88"
    ]
}
```
#### Get All Produce in Each Categories

#### GET /api/v1/users/allproducecategory

- [x] Response Body
```
{
    "produceByCategory": {
        "Poultry": [
            {
                "_id": "64144c7b35e1d8a38c2fd941",
                "name": "chicken",
                "category": "Poultry",
                "price": 1600,
                "stock": 10,
                "createdAt": "2023-03-17T11:18:19.501Z",
                "updatedAt": "2023-03-20T21:18:39.640Z",
                "__v": 0
            },
            {
                "_id": "64144c8e35e1d8a38c2fd943",
                "name": "Turkey",
                "category": "Poultry",
                "price": 1600,
                "stock": 0,
                "createdAt": "2023-03-17T11:18:38.019Z",
                "updatedAt": "2023-03-20T21:21:32.901Z",
                "__v": 0
            },
            {
                "_id": "64144c9b35e1d8a38c2fd945",
                "name": "Duck",
                "category": "Poultry",
                "price": 1600,
                "stock": 35,
                "createdAt": "2023-03-17T11:18:51.068Z",
                "updatedAt": "2023-03-17T12:10:07.174Z",
                "__v": 0
            },
            {
                "_id": "64145c87cf7e28ff8d4b7d85",
                "name": "egg",
                "category": "Poultry",
                "price": 1600,
                "stock": 88,
                "createdAt": "2023-03-17T12:26:47.736Z",
                "updatedAt": "2023-03-17T13:18:38.114Z",
                "__v": 0
            }
        ],
        "Piggery": [
            {
                "_id": "64146c7406ba243ae3251cc7",
                "name": "piglet",
                "category": "Piggery",
                "price": 1000,
                "stock": 24,
                "createdAt": "2023-03-17T13:34:44.269Z",
                "updatedAt": "2023-03-17T13:34:48.119Z",
                "__v": 0
            },
            {
                "_id": "64146efb4fcf43ad53945513",
                "name": "pork meat",
                "category": "Piggery",
                "price": 500,
                "stock": 16,
                "createdAt": "2023-03-17T13:45:31.743Z",
                "updatedAt": "2023-03-17T13:46:34.101Z",
                "__v": 0
            }
        ],
        "Crops": [
            {
                "_id": "64146fce20fd8fd2924e55f7",
                "name": "yam",
                "category": "Crops",
                "price": 700,
                "stock": 0,
                "createdAt": "2023-03-17T13:49:02.358Z",
                "updatedAt": "2023-03-20T10:22:01.123Z",
                "__v": 0
            },
            {
                "_id": "6414704420fd8fd2924e5600",
                "name": "cassava",
                "category": "Crops",
                "price": 750,
                "stock": 0,
                "createdAt": "2023-03-17T13:51:00.924Z",
                "updatedAt": "2023-03-17T20:28:57.078Z",
                "__v": 0
            }
        ],
        "Fishery": [
            {
                "_id": "64187a2a49bad256612e285a",
                "name": "tilapia",
                "category": "Fishery",
                "price": 1200,
                "stock": 8,
                "createdAt": "2023-03-20T15:22:18.740Z",
                "updatedAt": "2023-03-20T15:22:18.740Z",
                "__v": 0
            },
            {
                "_id": "64187a3f49bad256612e285d",
                "name": "Titus",
                "category": "Fishery",
                "price": 1200,
                "stock": 8,
                "createdAt": "2023-03-20T15:22:39.248Z",
                "updatedAt": "2023-03-20T15:22:39.248Z",
                "__v": 0
            }
        ]
    }
}
```

#### Delete Order

#### DELETE /api/v1/users/deleteorder/:id
- [x] Response Body

```
{
    "message": "Order deleted succesfully",
    "deletedOrder": {
        "_id": "64183ca3ca7c35fbfcf20abf",
        "name": "Turkey",
        "price": 1600,
        "quantity": 3,
        "total": 4800,
        "__v": 0
    }
}
```

#### Get All Orders

#### GET /api/v1/users/allorders
- [x] Response Body

```
{
    "allorders": [
        {
            "_id": "64183e6a6de98e268b7658b4",
            "name": "Turkey",
            "price": 1600,
            "quantity": 1,
            "total": 1600,
            "__v": 0
        },
        {
            "_id": "64183ed201954f09e0643f5d",
            "name": "Turkey",
            "price": 1600,
            "quantity": 1,
            "total": 1600,
            "__v": 0
        },
        {
            "_id": "64183ed401954f09e0643f61",
            "name": "Turkey",
            "price": 1600,
            "quantity": 1,
            "total": 1600,
            "__v": 0
        },
        {
            "_id": "64183f97a136fc8c6a2a10c9",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64183fa731d9b5f86f3b5ab9",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418415e5fef1ed33ef07728",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418472b28cb7082b6a077e1",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "641847454f047c08b9b2b587",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418484df64240be96c0ffff",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64184a2186cf6d130bb1a6d7",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64184a49345cc4ca55eb49c6",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64184a6d97f6ffb964e02fd0",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64184ad14fa50789e9f0ea9d",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "641850ab8877325f63064397",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185295ecbb31b04b143862",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185297ecbb31b04b143866",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185298ecbb31b04b14386a",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185299ecbb31b04b14386e",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418529aecbb31b04b143872",
            "name": "Turkey",
            "price": 1600,
            "quantity": 1,
            "total": 1600,
            "__v": 0
        },
        {
            "_id": "6418529becbb31b04b143876",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418529becbb31b04b14387a",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418529cecbb31b04b14387e",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418529eecbb31b04b143882",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185369cb6b75b95b997011",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185527deb62c7ca49f7973",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418563fd8d035a552df6b9b",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185643d8d035a552df6b9f",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185672c7096225df7f468d",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185674c7096225df7f4691",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185675c7096225df7f4695",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418572bbf7a7e146b959688",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "6418572cbf7a7e146b95968c",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185ba07e7dd441bb312149",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185ba47e7dd441bb31214d",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185e9e03895c0eb318e999",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185ea103895c0eb318e99d",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "64185ea303895c0eb318e9a1",
            "name": "Turkey",
            "price": 1600,
            "quantity": 3,
            "total": 4800,
            "__v": 0
        },
        {
            "_id": "641869e7f100e5e024043e44",
            "name": "Turkey",
            "price": 1600,
            "quantity": 5,
            "total": 8000,
            "__v": 0
        }
    ]
}
```

#### Get All Farm Division

#### GET /api/v1/users/farm-divisions
- [x] Response Body
```
{
    "farm_divisions": [
        {
            "name": "Trainings",
            "description": "QVF Farms offers a range of training programs for farmers, covering topics such as crop cultivation, livestock management, and business planning.",
            "url": "http://localhost:{port}/trainings"
        },
        {
            "name": "House Consultation",
            "description": "QVF Farms provides expert consultation services for farmers who need help with issues such as pest control, soil management, and crop planning.",
            "url": "http://localhost:{port}/house-consultation"
        },
        {
            "name": "Health Products",
            "description": "QVF Farms produces a variety of health products for livestock, including vaccines, supplements, and medications.",
            "url": "http://localhost:{port}/health-products"
        },
        {
            "name": "Feed Analysis and Research",
            "description": "QVF Farms conducts extensive research on livestock feed, and offers a range of testing and analysis services to help farmers optimize their feed programs.",
            "url": "http://localhost:{port}/feed-analysis"
        },
        {
            "name": "Livestock Feeds",
            "description": "QVF Farms produces high-quality feed for a variety of livestock, including cattle, poultry, and swine.",
            "url": "http://localhost:{port}/livestock-feeds"
        }
    ]
}
```