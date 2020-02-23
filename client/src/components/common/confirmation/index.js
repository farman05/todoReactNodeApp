import React from 'react';
import Modal from '../modal';
import {Button} from 'react-bootstrap'
const Confirmation = (props)=>{



        return(
            <Modal title = {props.title}  footer = {props.footer} show = {props.show} onHide = {()=>{props.closeConfirmModal()}} >

            </Modal>
        )
}

export default Confirmation