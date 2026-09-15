export const errorResponseGlobal=async({status=409,message="Error" , extra=undefined})=>{
    const error=new Error(typeof message === "string" ? message:message?.message)
    error.status=status;
    error.extra=extra;
    throw error;
}

export const BadRequestException = (message = "BadRequestException!",extra = undefined) => {
    return errorResponseGlobal({
        message,
        status: 400,
        extra
    });
};


export const conflictException = (message = "ConflictException!",extra = undefined) => {
    return errorResponseGlobal({
        message,
        status: 409,
        extra
    });
};


export const NotFoundException = (message = "NotFound!",extra = undefined) => {
    return errorResponseGlobal({
        message,
        status: 404,
        extra
    });
};


export const UnauthorizedException = (message = "UnauthorizedException!",extra = undefined) => {
    return errorResponseGlobal({
        message,
        status: 401,
        extra
    });
};


export const ForbiddenException = (message = "ForbiddenException!", extra = undefined) => {
    return errorResponseGlobal({
        message,
        status: 403,
        extra
    });
};

export const errorGlobalHandler=async(err,req,res,next)=>{
    const status=err.status

    return res.status(status).json({message:err.message,stack:err.stack,status,extra:err.extra});

}