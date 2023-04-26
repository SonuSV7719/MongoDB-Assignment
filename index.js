const express = require('express')
const dotenv = require('dotenv');
const cors = require("cors");
const db = require("./utils/db");
const User = require("./models/users");
const app = express()
app.use(express.json());
dotenv.config({ path: './.env' });
const port = process.env.PORT || 7000;

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declarationd


app.get('/users/low-income-bmw-mercedes', async (req, res) => {

    try {
        await db.db.connect();
        const users = await User.User.find({}).select('income car');
        const output = []
        users.forEach((user)=>{
            if (parseFloat(user.income.replace('$', '')) < 5.00 && (user.car.includes('BMW') || user.car.includes('Mercedes'))){
                output.push(user);
            }
        })

        // console.log(output)
        await db.db.disconnect();
        res.json(output);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.get('/male-phone-price', async(req, res)=>{
    try {
        await db.db.connect();
        const datas = await User.User.find({}).select('gender phone_price');
        // console.log(data);
        let output = []
        datas.forEach((data) =>{
            if (data.gender == "Male" && parseInt(data.phone_price) > 10000){
                output.push(data);
            }
        })
        await db.db.disconnect();  
        res.status(200).json(output);      
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/last-name-m', async(req, res)=>{

    try {
        await db.db.connect();
        const data = await User.User.find({ lastName: /^M/, quote: { $exists: true, $gt: 15 }, email: { $regex: /M/ } });
        await db.db.disconnect();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
        
    }

})

app.get('/top-cities', async (req, res)=>{
    try {
        await db.db.connect();
        const result = await User.User.aggregate([
          {
            $addFields: {
              incomeWithoutSymbol: { $substr: ["$income", 1, -1] },
              incomeAsNumber: { $toDouble: { $substr: ["$income", 1, -1] } }
            }
          },
          {
            $group: {
              _id: "$city",
              userCount: { $sum: 1 },
              avgIncome: { $avg: "$incomeAsNumber" }
            }
          },
          {
            $sort: { userCount: -1 }
          },
          {
            $limit: 10
          }
        ]);
      
        // console.log(result);
        await db.db.disconnect()

        res.json(result)
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
      
})

app.get('/user-bmw-mercedes-Audi', async (req, res)=>{
    try {
        await 
        
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
