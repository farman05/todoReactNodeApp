module.exports = {

            globalResponse:(res,statusCode,flag,msg,result='',err='')=>{
                    return res.status(statusCode).json(
                        {
                         status:flag,
                         msg:msg,
                         data:result,
                         err:err   
                        }
                        );


            },
            isValidDate:(value)=>{
                if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  
                const date = new Date(value);
                if (!date.getTime()) return false;
                return date.toISOString().slice(0, 10) === value;
            },
            chkIdExists:async(Model,id)=>{

                    try {
                         const result = await Model.findById({_id:id});
                        if(result){
                            return true
                        }
                        return false;
                    } catch (error) {
                            throw new Error(error)
                    }
            }
}