import React,{useState,useEffect} from 'react';
import Modal from '../common/modal'
import {Form,Button} from 'react-bootstrap'
import validation from '../../validation/todoValidation';
import useForm from '../../validation/useForm';
import Error from '../common/error';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {convertDate} from '../../helpers'
const AddTodo = (props)=>{
            const [startDate, setStartDate] = useState(new Date());
            const [modal,setModal] = useState(false)
            useEffect(()=>{
                closeModal(props.show)
            },[props.show])

            const save = ()=>{
                   props.saveTodo(values);
            }

            const {
                values,
                errors,
                handleChange,
                handleSubmit,
                setValues,
                setErrors,
                setIsSubmitting,
                isSubmitting
            } = useForm(save, validation);   
            
            const dateChange = (date)=>{
                setStartDate(date)
                setValues(inputs => ({
                    ...inputs,
                    duedate: convertDate(date)
                }))
            }

            const closeModal = (modalState)=>{
                setValues(inputs => ({
                    ...inputs,
                    name:'',
                    detail:'',
                    duedate: convertDate(startDate)
                }))
                setModal(modalState)
            }
           return( 
            <Modal title = "Add Todo" footer = '' show = {modal} onHide = {()=>{
                closeModal(!modal);
                props.closeButton(!modal)
                }}>
                   <div>
                    <Form onSubmit = {handleSubmit}  >
                            <Form.Group controlId="formTodoName">
                                <Form.Label>Todo Name</Form.Label>
                                <Form.Control name = "name"  value = {values.name || ''} placeholder = "Enter Todo Name"  onChange = {handleChange}  type="text" />
                                <Error errors = {errors} name = "name" />
                            </Form.Group>
                            <Form.Group controlId="formTodoDetails">
                                <Form.Label>Todo Details</Form.Label>
                                <Form.Control name= "detail" value = {values.detail || ''} placeholder = "Enter Todo Details"  onChange = {handleChange}  type="text" />
                                <Error errors = {errors} name = "detail" />
                            </Form.Group>
                            <Form.Group controlId="formTodoDate">
                                <Form.Label>Due Date</Form.Label>
                                <br/>
                                <DatePicker className = "form-control" selected={startDate} onChange={date => dateChange(date)} />
                                <Error errors = {errors} name = "duedate" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div> 
            </Modal> 
           ) 
}

export default AddTodo