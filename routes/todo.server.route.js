import express from 'express';

import * as todoController from '../controllers/todo.server.controller';

//get an instance of express router and route the 3 basic actions of GET, POST, PUT
const router = express.Router();

router.route('/')
	.get(todoController.getTodos)
	.post(todoController.addTodo)
	.put(todoController.updateTodo);

router.route('/:id')
	.get(todoController.getTodo)
	.delete(todoController.deleteTodo)

export default router;