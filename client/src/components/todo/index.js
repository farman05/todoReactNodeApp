import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {getTodoList,addTodoApi,getTodoApi,markCompleteApi,deleteTodoApi} from '../../redux/action/todo'
import Table from '../common/table';
import AddTodo from './addTodo'
import {Container,Row,Col,Button} from 'react-bootstrap';
import {convertDate} from '../../helpers'
import Confirmation from '../common/confirmation';
import Alert from '../common/alert'
const thead = ["Name","Detail","Due Date","Action"]
const Todo = (props)=>{
        const [showModal,setShowModal] = useState(false);
        const [selectedId,setSelectedId] = useState('');
        const [selectedType,setSelectedType] = useState('');
        const [confirmModal,setConfirmModal] = useState(false)
        useEffect(()=>{
            props.getTodoApi()
        },[])

        useEffect(()=>{
            handleModalChange()
        },[props.common.msg])

        const handleModalChange = ()=>{
            if(props.common.msg){
                if(props.common.type === "complete" || props.common.type === "delete")
                    closeConfirmModal(!confirmModal)

                if(props.common.type === "addTodo")
                    closeButton(!showModal)

            }
        }

        const closeButton = (modal)=>{
            setShowModal(modal)

        }


        const saveTodo = (data)=>{
            props.addTodoApi(data)
        }

        const TodoListTable = ()=>{
            const {todoList} = props
            if(todoList.length){
               const html = todoList.map((v,k)=>{
                   return(
                       <tr key = {v._id}>
                           <td>{v.name}</td>
                           <td>{v.detail}</td>
                           <td>{convertDate(v.duedate)}</td>
                           <td>
                            {!v.done &&   
                                <span className = "iconFa" onClick = {()=>{completeDeleteTodo('complete',v._id)}} >   
                                <i className="fa fa-check-circle-o completeTodo" aria-hidden="true"></i>
                                </span>
                            }
                            <span  className = "iconFa" onClick = {()=> {completeDeleteTodo('delete',v._id)}} >
                             <i className="fa fa-times removeTodo" aria-hidden="true"></i>
                            </span>
                           </td>
                        </tr>
                   )
               }) 
               return html
            }else{
                return(
                    <tr>
                       <td>No Todo Added yet</td> 
                    </tr>
                )
            }

        }

        //common confiramtion for marking and deleting todo
        const completeDeleteTodo = (type,id)=>{
                setSelectedId(id);
                setSelectedType(type)
                setConfirmModal(!confirmModal)
        }

        const closeConfirmModal = ()=>{

            setConfirmModal(!confirmModal)
            setSelectedId('');
            setSelectedType('')
        }

        const confirmationClick = ()=>{
            const data = {
                        id:selectedId
            }
            selectedType === "delete" ? props.deleteTodoApi(data) :  props.markCompleteApi(data)
        }


        const FooterDiv = ()=>{
            return(
                <>
                <Button variant="success" onClick = {confirmationClick}  >
                        Yes
                </Button>
                <Button variant="secondary" onClick = {closeConfirmModal} >
                        Close
                </Button>
                </>
            )
        }
 

        const {todoList} = props
        return(
            <Container>
                <div className = "todoDiv">
                    <Alert/> 
                    <Confirmation show = {confirmModal}  title = {`You sure you want to ${selectedType === "complete" ? '  mark it complete ? ' : ' delete this todo ?'} `} footer = {<FooterDiv/>} closeConfirmModal = {closeConfirmModal} />
                    <Row>
                        <Col xs = {12} >
                            <div className = "addTodoDiv">
                                  <Button onClick = {()=>setShowModal(!showModal)}  variant="primary" >Add Todo</Button>
                            </div>
                            <AddTodo show = {showModal} saveTodo = {saveTodo} closeButton = {closeButton}  />
                            <Table thead = {thead}>
                                <TodoListTable todoList = {todoList} />
                            </Table>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
}
    
let mapStateToProps = (state)=>{
    return {
           todoList: state.todo.todoList,
           common:state.common 
    };
  }
  
  let mapActionToProps = {
        getTodoList:getTodoList,
        addTodoApi:addTodoApi,
        getTodoApi:getTodoApi,
        markCompleteApi:markCompleteApi,
        deleteTodoApi:deleteTodoApi,
  }
  
export default connect(mapStateToProps,mapActionToProps)(Todo);
  
