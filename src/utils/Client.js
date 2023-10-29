import axios from "axios";

import { apiBaseUrl } from './CommonUtil';

// export const client = axios.create({
//     baseURL:  apiBaseUrl()
// });

// client.post

const getMocks = {
    "/user/detailsPreferences": {
        "user": {
          "user_id": "U1S9XZ42AH",
          "name": null,
          "phone": "7696441092",
          "email": "atreides@gmail.com"
        },
        "city": 1,
        "locality": 1,
        "gender": "HE"
      },
    "/salonsForUser": {
        "salon_list": [
          {
            "salon_id": "SLESD1R1T5BOC19S",
            "name": "Toni & Guy",
            "address_link": "string",
            "address": "string",
            "phone": "7696441092",
            "salon_type": "HE",
            "start_time": 8,
            "end_time": 22
          },
          {
            "salon_id": "SLESD1R1T5BOC19S",
            "name": "Bob Unisex Saloon and Total Transformation for Hair",
            "address_link": "string",
            "address": "string",
            "phone": "7696441092",
            "salon_type": "HE",
            "start_time": 8,
            "end_time": 22
          }
        ]
      },
    "/salon/SLESD1R1T5BOC19S": {
        "salon_id": "",
        "name": "Toni & Guy",
        "address_link": "string",
        "address": "string",
        "phone": "7696441092",
        "salon_type": "HE",
        "start_time": 8,
        "end_time": 22
      },
    "/salon/SLESD1R1T5BOC19S/services": {
        "services": [
          {
            "name": "HAIR_CUT",
            "display_name": "Hair Cut",
            "time": 30,
            "price": 100
          },
          {
            "name": "FACE_MASSAGE",
            "display_name": "Face Massage",
            "time": 30,
            "price": 200
          }
        ]
      },
    "/city": {
        "city_list": [
          {
            "id": 1,
            "city": "Bangalore"
          }
        ]
      },
    "/locality/city/1": {
        "locality_response_list": [
          {
            "id": 1,
            "locality": "Green Glen Layout"
          }
        ]
      },  
    
    
    // [
    //     {
    //         id: "1",
    //         name: 'Hair Wash',
    //         pic: 'https://i.imgur.com/1Yf8BX0.png',
    //     },
    //     {
    //         id: "2",
    //         name: 'Hair Cut',
    //         pic: 'https://i.imgur.com/1Yf8BX0.png',
    //     },
    //     {
    //         id: "3",
    //         name: 'Face Massage',
    //         pic: 'https://i.imgur.com/l3Xs7rR.png',
    //     },
    //     {
    //         id: "4",
    //         name: 'Body Massage',
    //         pic: 'https://i.imgur.com/l3Xs7rR.png',
    //     },
    // ],
    "/salon/SLESD1R1T5BOC19S/stylists/available": 
        {
            "stylist_list": [
              {
                "stylist_id": "ST-1RE9NK30A75DVCNFE",
                "phone": null,
                "name": "Tyler Durden",
                "gender": "HE"
              },
              {
                "stylist_id": "ST-1RE9NK30A75DVCNFG",
                "phone": null,
                "name": "Harley Quinn",
                "gender": "SHE"
              }
            ]
          },
        // {
        //     id: "1",
        //     name: "Karan Johar",
        //     photo: "https://i.imgur.com/bD3cbp5.png",
        // },
        // {
        //     id: "2",
        //     name: "Katrina Kaif",
        //     photo: "https://i.imgur.com/xGNHCt5.png",
        // },
        // {
        //     id: "1",
        //     name: "Karan Johar",
        //     photo: "https://i.imgur.com/bD3cbp5.png",
        // },
        // {
        //     id: "2",
        //     name: "Katrina Kaif",
        //     photo: "https://i.imgur.com/xGNHCt5.png",
        // },
        // {
        //     id: "1",
        //     name: "Karan Johar",
        //     photo: "https://i.imgur.com/bD3cbp5.png",
        // },
        // {
        //     id: "2",
        //     name: "Katrina Kaif",
        //     photo: "https://i.imgur.com/xGNHCt5.png",
        // },
    "/booking/123/checkout": {
        "price_info": {
          "convenienceFee": 20.0,
          "totalAmount": 20.0,
          "discount": 10.0,
          "amountToPay": 10.0
        },
        "services": [
          "Hair Cut",
          "Face Massage"
        ],
        "stylist": "Tyler Durden",
        "salon": "Test Salon",
        "start_time": "28-10-2023 18:07:36",
        "end_time": "28-10-2023 18:37:36"
      },
    "/bookings": [
        {
            id: '123',
            salon: 'Sample Salon',
            startTime: '2023-09-12 21:04:58',
            status: 'Confirmed'
        },
        {
            id: '1234',
            salon: 'Sample Salon',
            startTime: '2023-09-12 21:04:58',
            status: 'Failed'
        },
        {
            id: '12356',
            salon: 'Sample Salon',
            startTime: '2023-09-12 21:04:58',
            status: 'In Progress'
        },
    ],
    "/booking/123": {
        "booking_id": "4535323",
        "status": "confirmed",
        "otp": "123 232",
        "stylist": "Karan Jogar",
        salon: 'Sample Salon',
        services: [
            {
                name: 'Hair Wash',
                pic: 'https://i.imgur.com/1Yf8BX0.png',
            },
            {
                name: 'Hair Cut',
                pic: 'https://i.imgur.com/1Yf8BX0.png',
            },
            {
                name: 'Body Massage',
                pic: 'https://i.imgur.com/l3Xs7rR.png',
            },
            {
                name: 'Face Massage',
                pic: 'https://i.imgur.com/l3Xs7rR.png',
            },
        ],
        startTime: '2023-09-12 21:04:58'
    },
    "/booking/1234": {
        "booking_id": "4535323",
        "status": "failed",
        "stylist": "Karan Jogar",
        salon: 'Sample Salon',
        services: [
            {
                name: 'Hair Cut',
            },
            {
                name: 'Face Massage',
            }
        ],
        startTime: '2023-09-12 21:04:58'
    },
    "/user": {
        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NDMzOTQxMSwiZXhwIjoxNjg0NDI1ODExfQ.gCkBS1OKgQFNN-9PbrVaAGErpXyU5bImQlJD3fDEFjHoF5RI4AXvWIpm4QHQc6S-w_wzoQfsWMvuae3PzJrkfA",
        "username":"admin",
        "expireAt":"2026-10-05T14:48:00.000Z",
        "name": "Sagar Pawar",
        "city": {
            "id":"1",
            "name":
            "Pune"
        },
        "gender":"male"
    },
    "/booking/B3XRM42AHCNFE/checkout": {
        "price_info": {
          "convenienceFee": 20.0,
          "totalAmount": 20.0,
          "discount": 10.0,
          "amountToPay": 10.0
        },
        "services": [
          "Hair Cut"
        ],
        "stylist": "Tyler Durder",
        "salon": "Toni & Guy",
        "start_time": "28-10-2023 18:37:17",
        "end_time": "28-10-2023 19:07:17"
      },
      "/slotsToDisplay": {
        "default_slots": [
          {
            "display_name": "After 10 min",
            "value": 10
          },
          {
            "display_name": "After 15 min",
            "value": 15
          },
          {
            "display_name": "After 20 min",
            "value": 20
          }
        ],
        "current_slots": [
            {
                "display_name": "8am - 10am",
                "value": 8
              },
            {
                "display_name": "10am - 12pm",
                "value": 10
              },
            {
                "display_name": "12pm - 2pm",
                "value": 12
              },
            {
                "display_name": "2pm - 4pm",
                "value": 14
              },
            {
                "display_name": "4pm - 6pm",
                "value": 16
              },  
          {
            "display_name": "6pm - 8pm",
            "value": 18
          },
          {
            "display_name": "8pm - 10pm",
            "value": 20
          }
        ]
      }
};

const postMocks = {
    "/slot/reserve": {
        "booking_id": "B3XRM42AHCNFE",
        "status": "RESERVED",
        "otp": null,
        "stylist": null,
        "user": null,
        "date_time": null
      },
    "/payment/init": {
        "redirect_url": "/test/paymentLink?bookingId=123",
        "payment_id": "45677654567",
        "status": "INIT"
    },
    "/payment/recon": {
        "payment_id": "45677654567",
        "booking_id": "123",
        "status": "SUCCESS"
    },
    "/nextSlot": {
        "available_slots": [
          {
            "slot": "18-20",
            "start_time": 1837,
            "end_time": 1907,
            "display_start_time": "28-10-2023 18:37:26",
            "display_end_time": "28-10-2023 19:07:26"
          }
        ]
      },
    "/auth": {
        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NDMzOTQxMSwiZXhwIjoxNjg0NDI1ODExfQ.gCkBS1OKgQFNN-9PbrVaAGErpXyU5bImQlJD3fDEFjHoF5RI4AXvWIpm4QHQc6S-w_wzoQfsWMvuae3PzJrkfA",
        "username":"admin",
        "expireAt":"2026-10-05T14:48:00.000Z",
        "name": "Sagar Pawar",
        "city": {
            "id":"1",
            "name":
            "Pune"
        },
        "gender":"male"
    },
    "/login": {
        token: "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6IlUxUzlYWjQyQUgiLCJpYXQiOjE2OTg0OTk3NTcsImV4cCI6MTY5ODY3MjU1N30.1yBAl8YRHtJARC0L0oU_nNLrwzkbJlWL4V4UeFEzxyttjeFynb1Apo1vzmLKgDz8qTUjP_58MIbKrobstAydGQ"
    },
    "/send_otp": {
        "user_id": null,
        "created_at": 1698499738789,
        "phone": null
      }
};

const deleteMocks = {
    "/auth": {}
};

const patchMocks = {
    "/user": {
        "user_id": "U1GDTJPUJNOG5TES5I",
        "name": "Atreides",
        "phone": "7696441091",
        "email": "tylerdurden@gmail.com"
    },
    "/updatePreference": {}
}

export const client = {
    get: (url) => Promise.resolve({
        data: getMocks[url] 
    }),
    post: (url) => Promise.resolve({
        data: postMocks[url] 
    }),
    delete: (url) => Promise.resolve({
        data: deleteMocks[url] 
    }),
    patch: (url) => Promise.resolve({
        data: patchMocks[url] 
    }),
    defaults : {
        headers : {
            common : {
                Authorization : ''
            }
        }}
};

export default client;