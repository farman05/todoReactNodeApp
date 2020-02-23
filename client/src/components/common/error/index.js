import React from 'react';

const Error = ({errors,name})=>{

    if(errors[name]){
        return(
            <span className = "error">{errors[name]}</span>
        )
    }else{
        return(null)
    }
}

export default Error