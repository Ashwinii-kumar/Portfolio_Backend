const express=require('express');
const app=express();
const cors=require('cors');

require('dotenv').config();

const PORT=process.env.PORT || 4000;

app.use(cors({origin:true,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const routes=require("./routes/routes");

app.use("/api/v1",routes);

app.listen(PORT,()=>{
    console.log(`Server running at port:${PORT}`);
});

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is up and running",
    });
});
