

const SuccessResponse=async({res,status=200,message="Done" , data={}})=>{
    return res.status(status).json({message,data})
}


export default SuccessResponse;