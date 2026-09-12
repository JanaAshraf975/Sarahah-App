

export const bootstrap=async(app,express)=>{
    app.use(express.json());
    app.get("/",(req,res)=>{
        res.send("Hello World");
    });

}

