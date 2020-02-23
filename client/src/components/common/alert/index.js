import React,{useEffect} from 'react'
import {Alert} from 'react-bootstrap'
import {connect} from 'react-redux';
import {hideMsg} from '../../../redux/action/common'
const AlertMsg = (props)=>{
            useEffect(()=>{
                callHideMsg()
            },[props.common])
            
            const callHideMsg = ()=>{
                console.log(props.common)
                if(props.common.msg){
                    setTimeout(()=>{
                        console.log('yes')
                        props.hideMsg()
                    },5000)
                }
                
            }

            if(props.common.msg){
                return(
                    <Alert variant= {props.common.variant}>
                            {props.common.msg}
                    </Alert>
                )
            }else{
                return(null)
            }
        // }else{
        //     return null
        // }
}

const mapStateToProps = (state)=>{
        return {
            common:state.common
        }
}

const mapActionToProps = {
    hideMsg:hideMsg
}
export default connect(mapStateToProps,mapActionToProps)(AlertMsg)