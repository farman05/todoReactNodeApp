const express = require('express');
const router = express.Router();
const {addTodo,getAllTodo,deleteTodo,completeTodo} = require('../controllers/todo');
const {validate}  = require('../middleware/validation')



//add todo route
router.post('/',validate('addTodo'), addTodo);

//get all todo
router.get('/', getAllTodo)

//delete single todo
router.delete('/:id',validate('validateTodoId'), deleteTodo)

//mark todo complete
router.put('/completeTodo/:id',validate('validateTodoId'), completeTodo)

module.exports = router;