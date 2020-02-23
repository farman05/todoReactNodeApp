const self = module.exports = {

        convertDate : (givenDate)=>{
            let today = new Date(givenDate);
            const tDate = parseInt(today.getDate())
            const tMonth = parseInt(today.getMonth()+1)
            const tYear = today.getFullYear();
            let date= tYear + '-' + (tMonth < 10 ? '0'+tMonth : tMonth) + '-' + (tDate < 10 ? '0'+tDate : tDate);
            return date;

        },
        commonSuccErrMsg : (result,type = '')=>{
            const {status,msg,err} = result
            const returnData = {
                success:status,
                msg:msg + ' ' + self.extractErrArray(err),
                type:type,
                variant:status ? 'success' : 'danger'
            }
            return returnData
        },
        commonFatalErrMsg : (error,type='')=>{
            const returnData = {
                success:false,
                msg:error.message ? error.message : 'Something Went Wrong ! Please try again later',
                type:type,
                variant:'danger'

            }
            return returnData
        },
        extractErrArray : (err)=>{
            if(err && err.length){
                   const returnMsg = err.map(({msg})=>{
                        return msg
                   }) 

                   return returnMsg.join(` ,`) 
            }
            return '';
        }




        
}