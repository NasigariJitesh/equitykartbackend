const development = {
    name : "development",
    session_cookie_key: 'blahsomething',
    db:'mongodb+srv://equitykart:3iqIZVHifxYZlgQr@cluster0.vrl1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        port: 587 , 
        auth: {
            user: 'hello@organiq.in' ,
            pass: 'iAL4j>33R'
        }
    } ,
    // google_clientID: "302162156750-mktlj2ng4vo2ol9lqnh8hkjmobelgf79.apps.googleusercontent.com",
    // google_clientSecret: "i4rsRwC1oz3lVHQCQllSbAIK",
    // google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key: 'equitykart',
    saltRounds :10,
    expiry: 1000000000,

};

const production = {
    name: "production",
    jwt_key: process.env.JWT_KEY,
    saltRounds: 10,
    expiry: 10000000,
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        port: 587 , 
        auth: {
            user: process.env.SMTP_USER,
            pass : process.env.SMTP_PASS,
        }
    } ,
}

module.exports = development; 
