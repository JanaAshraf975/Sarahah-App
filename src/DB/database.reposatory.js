
//CRUD


export const create=async({model,data,options={validateBeforeSave:true}}={})=>{
    return await model.create(data,options)

}


export const insertMany=async({model,data,options={validateBeforeSave:true}}={})=>{
    return await model.insertMany(data,options)
}


export const findOne=async({model,filter,options={}, select=""}={})=>{
    const doc=model.findOne(filter)
    if(options.lean) doc.lean(options.lean)
    if(options.populate) doc.populate(options.populate)
    if(select.length) doc.select(select)
    return await doc.exec()

}

export const find=async({model,filter,options={}, select=""}={})=>{
    const doc=model.find(filter)
    if(options.lean) doc.lean(options.lean)
    if(options.populate) doc.populate(options.populate)
    if(select.length) doc.select(select)
    if(options?.limit) doc.limit(options.limit);
    if(options?.skip) doc.skip(options.skip);
    return await doc.exec()

}



export const findById=async({model,id,options={}, select=""}={})=>{
    const doc=model.findById(id)
    if(options.lean) doc.lean(options.lean)
    if(options.populate) doc.populate(options.populate)
    if(select.length) doc.select(select)
    if(options?.limit) doc.limit(options.limit);
    if(options?.skip) doc.skip(options.skip);
    return await doc.exec()

}



export const updateOne=async({model,filter,update,options={}}={})=>{
    return model.updateOne(filter,{...update , $inc:{_v:1}},options)
}

export const updateMany=async({model,filter,update,options={}}={})=>{
    return await model.updateMany(filter,{...update,$inc:{_v:1}},options);

}

export const findOneAndUpdate=async({model,filter,update,options={}}={})=>{
    return await model.findOneAndUpdate(filter,{...update,$inc:{_v:1}},{...options , new:true,runValidators:true});

}

export const findByIdAndUpdate=async({model,id,update,options={}}={})=>{
    return await model.findByIdAndUpdate(id,{...update , $inc:{_v:1}} ,{...options , new:true,runValidators:true});

}



export const deleteOne=async({model,filter}={})=>{
    return await model.deleteOne(filter);

}

export const deleteMany=async({model,filter}={})=>{
    return await model.deleteMany(filter);

}

export const findOneAndDelete=async({model,filter}={})=>{
    return await model.findOneAndDelete(filter);

}
