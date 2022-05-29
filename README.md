# UserVertification

A basic user vertification system for websites.

>**JWT token vertification**  
>**Password hashing**  
>**Email vertification**  
>**User Authorization**
### Setup
To run the app:
```
git clone git@github.com:ashwor11/UserVertification.git
cd UserVertification
npm install
```
Than create a file named ".env" and set this settings
```
DB_CONNECTION_URL=[Write your mongoDB connection]
PORT=3000 //If you want to run app on a different port you change here
BASE_URL=localhost:3000/ //If you change port or run the app on a different url change here
EMAIL_SERVICE=[Write the email service wanted to use]
EMAIL=[Email which mails will be sent from]
EMAIL_PASSWORD=[Password of email]
JWT_MAIL_SECRET_KEY=[A secret key for the jwt token in mail] //can be anything
JWT_LOGIN_SECRET=[A secret key for login jwt token] //can be anything
```

After this settings done. You should let mail you will be using to less secure apps. If you do not give the permission app will crash.

```
```