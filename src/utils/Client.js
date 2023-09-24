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
    "/salon/1": [
        {
            id: "HAIR_CUT",
            name: "Hair Cut",
            image: "https://img.freepik.com/premium-photo/young-man-with-trendy-haircut-barber-shop-barber-does-hairstyle-beard-trim_179755-8607.jpg",
            description: "Transform your style, embrace confidence, and own the spotlight with us!",
        },
        {
            id: "FACE_MASSAGE",
            name: "Face Massage",
            image: "https://thumbs.dreamstime.com/z/face-massage-barbershop-smiling-men-beard-closed-eyes-black-cutting-hair-cape-barber-tattoo-black-t-80662652.jpg?w=992",
            description: "Rediscover radiant tranquility; rejuvenate your glow with our soothing face massage."
        }
    ],
    "/salon/1/stylists": [
        {
            id: "1",
            name: "Karan Johar",
            profilUrl: "https://media.istockphoto.com/id/494711330/photo/latin-young-man-in-a-studio.jpg?s=612x612&w=0&k=20&c=GAnGe6i43pLhhPPomrFF7aohc2uGsWGk1N2EHzLyJJw=",
        },
        {
            id: "2",
            name: "Katrina Kaif",
            profilUrl: "https://img.freepik.com/free-photo/young-woman-standing-with-arms-crossed_176474-95301.jpg?t=st=1694347310~exp=1694347910~hmac=d0f01fd5c8e40ba108e4377e019185f3e73f61616b113ee7634fe4e20a9e9f59",
        },
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
                name: 'Hair Cut',
            },
            {
                name: 'Face Massage',
            }
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
    "/user": {
        
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