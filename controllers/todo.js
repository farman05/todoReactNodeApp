const Todo = require('../models/todo');
const { validationResult } = require('express-validator/check');
const {globalResponse} = require('../helpers')
const {ERR_MSG,STATUS_CODE} = require('../config/constant')
module.exports = {
            
            getAllTodo : async(req,res)=>{
                  

                try{
                    const result = await Todo.find().sort({duedate: 1});
                    if(result.length){
                        globalResponse(res,STATUS_CODE.success,1,'Todo list',result);
                    }else{
                        globalResponse(res,STATUS_CODE.success,0,'No Todo Found',[]);

                    }
                    return
                }catch(e){
                    globalResponse(res,STATUS_CODE.error,0,ERR_MSG,'',e)

                }

            },

            addTodo : async(req,res)=>{

                    try{
                        const errors = validationResult(req); 
                        if (!errors.isEmpty()) {
                            globalResponse(res,STATUS_CODE.success,0,'Validation Errors','',errors.array())
                            return;
                        }
                        const {name,detail,duedate} = req.body
                        const createTodo = new Todo({
                                            name:name,
                                            detail:detail,
                                            duedate:duedate,
                                            done:false
                        })
                        const result = await createTodo.save();

                        if(result){
                            globalResponse(res,STATUS_CODE.success,1,'Todo Added successfully',result);

                        }else{
                            globalResponse(res,STATUS_CODE.success,0,'Error while adding the todo',result);

                        }
                        return;

                    }catch(e){
                        globalResponse(res,STATUS_CODE.error,0,ERR_MSG,'',e)
                        return;
                    }

             

            },

            deleteTodo:async(req,res)=>{
                try {
                    const errors = validationResult(req); 
                    if (!errors.isEmpty()) {
                        globalResponse(res,STATUS_CODE.success,0,'Validation Errors','',errors.array())
                        return;
                    }        
                    const {id} = req.params
                    
                    const result = await Todo.deleteOne({_id:id});
                    if(result){
                        globalResponse(res,STATUS_CODE.success,1,'Todo Deleted successfully',result);
                    }else{
                        globalResponse(res,STATUS_CODE.success,1,'Error while deleting the todo',result);
                    }
                } catch (e) {
                    globalResponse(res,STATUS_CODE.error,0,ERR_MSG,'',e)
                    return;
                }
            },
            completeTodo:async(req,res)=>{
                try {
                    const errors = validationResult(req); 
                    if (!errors.isEmpty()) {
                        globalResponse(res,STATUS_CODE.success,0,'Validation Errors','',errors.array())
                        return;
                    }        
                    const {id} = req.params
                    const result = await Todo.findByIdAndUpdate({_id:id},{done:true},{new:true})
                    if(result){
                        globalResponse(res,STATUS_CODE.success,1,'Todo Updated successfully',result);
                    }else{
                        globalResponse(res,STATUS_CODE.success,1,'Error while deleting the todo',result);
                    }
                } catch (e) {
                    globalResponse(res,STATUS_CODE.error,0,ERR_MSG,'',e)
                    return;
                }
            }
}