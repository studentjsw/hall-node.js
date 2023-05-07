const express = require('express');
const app = express();

/*
    CREATE A WEB SERVER WITH EXPRESS INSTANT
*/
const PORT = 4000;

/**
 * EXPRESS MIDDLEWARE
 */
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

/**
 * STORE THE ALL DATA IN LOCAL STORAGE FOR ROOM BOOKING
 */
 const  Booking =[
     {
       Customer_Id: "0001",
       Customer_Name: "hema ",
       Date: "2023-05-01",
       Start_Time: "11-00-00 Am",
       End_Time: "11-00-00 Pm",
       Room_Id: "100",
       Room_Name: "queen room",
       Booking_Id: "001",
       Booking_Status: false,
       Price_For_1Hour: 1500,
       Repeated_Booking: false
     },
     {
       Customer_Id: "0002",
       Customer_Name: "priya",
       Date: "2023-05-02",
       Start_Time: "12-00-00 Am",
       End_Time: "10-00-00 Pm",
       Room_Id: "101",
       Room_Name: "single room",
       Booking_Id: "002",
       Booking_Status: true,
       Price_For_1Hour: 3000,
       Repeated_Booking: false
     },
     {
       Customer_Id: "0003",
       Customer_Name: "pavithra",
       Date: "2023-05-03",
       Start_Time: "09-00-00 Am",
       End_Time: "09-30-00 Pm",
       Room_Id: "102",
       Room_Name: "double room",
       Booking_Id: "003",
       Booking_Status: true,
       Price_For_1Hour: 1000,
       Repeated_Booking: false
     }, 
     {
         Customer_Id: "0004",
         Customer_Name: "rani",
         Date: "2023-05-04",
         Start_Time: "09-00-00 Am",
         End_Time: "09-30-00 Pm",
         Room_Id: "103",
         Room_Name: "single room",
         Booking_Id: "004",
         Booking_Status: true,
         Price_For_1Hour: 1000,
         Repeated_Booking: true
     },
     {
         Customer_Id: "0005",
         Customer_Name: "Praveen",
         Date: "2023-05-05",
         Start_Time: "09-00-00 Pm",
         End_Time: "09-30-00 Am",
         Room_Id: "104",
         Room_Name: "queen room",
         Booking_Id: "005",
         Booking_Status: true,
         Price_For_1Hour: 1000,
         Repeated_Booking: false
     },
     {
         Customer_Id: "0006",
         Customer_Name: "pooja",
         Date: "2022-05-06",
         Start_Time: "06-00-00 Pm",
         End_Time: "06-30-00 Am",
         Room_Id: "105",
         Room_Name: " Flower",
         Booking_Id: "006",
         Booking_Status: true,
         Price_For_1Hour: 1000,
         Repeated_Booking: false
     },
     {
         Customer_Id: "0007",
         Customer_Name: "krishna",
         Date: "2022-03-10",
         Start_Time: "06-00-00 Pm",
         End_Time: "06-30-00 Am",
         Room_Id: "105",
         Room_Name: "tower room",
         Booking_Id: "006",
         Booking_Status: true,
         Price_For_1Hour: 1000,
         Repeated_Booking: true
     }
  ]

// /**
//  * REST API HOME PAGE
//  */
 app.get('/', function(req,res){
     res.send("API ENDPOINT HOME PAGE ");
 });

app.get('/Booking', function(req,res) {
     res.send(Booking);
 });

// /**
//  * BOOK NEW CUSTOMER
//  */
 app.post('/addBookNewCustomer',function (req,res)  {
    const {Customer_Name} = req.body;
   Booking.push(req.body);
     res.send({message:"Added the new customer"});
 });

// /**
//  * LIST THE  ALL BOOKED DATA OF ROOM DETAILS WITH ROOM_NAME, BOOKED_STATUS,CUSTOMER_NAME,DATE,START_TIME,END_TIME.
//  */
 app.get('/getBookedRoomAllDetails',function (req,res)  {
     const {Customer_Name} = req.query;
     console.log(req.query,Customer_Name);
     const filterNames = [];
     Booking.map((data)=>{
         if(data.Booking_Status === true)
         {
             filterNames.push({
                 "RoomName":data.Room_Name,
                "Booking_Status":data.Booking_Status,
                "CustomerName":data.Customer_Name,
                "Date":data.Date,
                "Start_Time":data.Start_Time,
               "End_Time":data.End_Time,
           });
       }
   })
   res.send(filterNames);
 });

// /**
//  * LIST THE  ALL BOOKED DATA OF CUSTOMER DETAILS  CUSTOMER_NAME,ROOM_NAME,DATE,START_TIME,END_TIME.
//  */
 app.get('/getBookedCustomerAllDetails',function (req,res)  {
    const {Customer_Name} = req.query;
     console.log(req.query,Customer_Name);
     const filterNames = [];
    Booking.map((dataAll)=>{
        if(dataAll.Booking_Status === true)
      {
             filterNames.push({
                 "CustomerName":dataAll.Customer_Name,
                 "RoomName":dataAll.Room_Name, 
                 "Date":dataAll.Date,
                 "Start_Time":dataAll.Start_Time,
                 "End_Time":dataAll.End_Time,
             });
         }
     })
     res.send(filterNames);
});

// /**
//  * HOW MANY TIMES CUTERMER BOOKED THE ROOM REPEATEDLY CUSTOMER_NAME,ROOM_NAME,DATE,START_TIME,END_TIME,BOOKING_iD,BOOKING_DATE,BOOKING_STATUS
//  */
 app.get('/getBookedCustomerCount',function (req,res)  {
     const {Customer_Name} = req.query;
     console.log(req.query,Customer_Name);
     const filterNames = [];
     var NoCount = 1;
     Booking.map((dataCount)=>{
         if((dataCount.Booking_Status === true) && (dataCount.Repeated_Booking == true))
         {
              NoCount++;
            filterNames.push({
                 "CustomerName":dataCount.Customer_Name,
                 "RoomName":dataCount.Room_Name, 
                 "Date":dataCount.Date,
                 "Start_Time":dataCount.Start_Time,
                 "End_Time":dataCount.End_Time,
                 "Booking_Id":dataCount.Booking_Id,
                 "Booking_Status":dataCount.Booking_Status,
                 "NoCount":NoCount,
             });
         }
     })
     res.send(filterNames);
 });

/* 
    START THE SERVER AND LISTEN TO PORT {4000}
*/
app.listen(PORT,() => {
    console.log(`SERVER STARTED ${PORT}`);
})