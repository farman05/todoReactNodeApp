const { body,param } = require('express-validator/check')
const {isValidDate,chkIdExists} = require('../helpers')
const Todo = require('../models/todo')
exports.validate = (method) => {
  switch (method) {
    case 'addTodo': {
     return [ 
        body('name', 'Name is required').exists(),
        body('detail', 'Detail is required').exists(),
        body('duedate', 'Date is required').custom((value,{req})=>{
                if(!value){
                    throw new Error('Date is required')
                } 
                if(!isValidDate(value)){
                    throw new Error('Invalid Date')
                }
                return true
        }),
       ]   
    }
    case 'validateTodoId':{
        return[
            param('id','Id is required').custom(async(value)=>{
                    try {
                        const result = await  chkIdExists(Todo,value);
                        if(!result){
                         throw new Error('Todo Id not exists')
                        }  
                        return true
                    } catch (e) {
                        throw new Error('Invalid Todo Id')
                    }
            })
        ]
    }
  }
}

exports.validateId = (req,res)=>{
        console.log(req);
}

