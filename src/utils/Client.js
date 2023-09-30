// import axios from "axios";

// import { apiBaseUrl } from '../utils';
// const client = axios.create({
//     baseURL:  apiBaseUrl()
// });

const getMocks = {
    "/salons": {
        city: 'Pune',
        salons: [
        {
            "id": "1",
            "name": "Bob Unisex Saloon and Total Transformation for Hair ",
            "address": "Gachibowli, Hyderabad",
            "phone": "+919876543210",
            "type": "HE",
            "photo": "https://picsum.photos/200?1",
            "workingTime": "9:00 AM - 9:00 PM", 
            "price": "90"
        },
        {
            "id": "2",
            "name": "Pretty Parlor",
            "address": "Gachibowli, Hyderabad",
            "phone": "+919876543210",
            "type": "HE",
            "photo": "https://picsum.photos/200?2",
            "workingTime": "9:00 AM - 9:00 PM", 
            "price": "90"
        },
        {
            "id": "3",
            "name": "Serenity Salon",
            "address": "Gachibowli, Hyderabad",
            "phone": "+919876543210",
            "type": "HE",
            "photo": "https://picsum.photos/200?3",
            "workingTime": "9:00 AM - 9:00 PM", 
            "price": "90"
        },
        {
            "id": "4",
            "name": "Tres Beaux",
            "address": "Gachibowli, Hyderabad",
            "phone": "+919876543210",
            "type": "HE",
            "photo": "https://picsum.photos/200?4",
            "workingTime": "9:00 AM - 9:00 PM", 
            "price": "90"
        },
        {
            "id": "5",
            "name": "Total Transformation",
            "address": "Gachibowli, Hyderabad",
            "phone": "+919876543210",
            "type": "HE",
            "photo": "https://picsum.photos/200?5",
            "workingTime": "9:00 AM - 9:00 PM", 
            "price": "90"
        }
    ]},
    "/salon/1": {
		id: 1,
		name: 'Toni & Guy Hairdressing Salon Gachibowli ',
		rating: {
			value: 4.5,
			count: '11,305',
		},
		location: 'Gachibowli, Hyderabad',
		workingTime: '9:00 AM - 9:00 PM',
	},
    "/salon/1/services": [
        {
            id: "1",
            name: 'Hair Wash',
            pic: 'https://i.imgur.com/1Yf8BX0.png',
        },
        {
            id: "2",
            name: 'Hair Cut',
            pic: 'https://i.imgur.com/1Yf8BX0.png',
        },
        {
            id: "3",
            name: 'Face Massage',
            pic: 'https://i.imgur.com/l3Xs7rR.png',
        },
        {
            id: "4",
            name: 'Body Massage',
            pic: 'https://i.imgur.com/l3Xs7rR.png',
        },
    ],
    "/salon/1/stylists": [
        {
            id: "1",
            name: "Karan Johar",
            photo: "https://i.imgur.com/bD3cbp5.png",
        },
        {
            id: "2",
            name: "Katrina Kaif",
            photo: "https://i.imgur.com/xGNHCt5.png",
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
    ],
    "/booking/123/checkout": {
        "price_info": {
          "convenienceFee": 30,
          "totalAmount": 270,
          "discount": 10,
          "amountToPay": 290
        },
        "services": [
          "HAIR_CUT",
          "FACE_MASSAGE"
        ],
        "stylist": "Karan Johar",
        "salon": "Sample Salon",
        "start_time": "2023-09-12 21:04:58"
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
    }
};

const postMocks = {
    "/slot/reserve": {
        "booking_id": "123",
        "status": "RESERVED"
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
        date: "2023-06-01",
        slots: [
            {
                id: '1',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
            {
                id: '2',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
            {
                id: '3',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
            {
                id: '4',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
            {
                id: '5',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
            {
                id: '6',
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            },
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
    }
};

const deleteMocks = {
    "/auth": {}
};

const patchMocks = {
    "/user": {
        "name": "sagar",
        "gender": "male",
        "city": {
            "id": 1
        }
    }
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
};

export default client;