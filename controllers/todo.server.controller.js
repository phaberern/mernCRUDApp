import mongoose from 'mongoose';

//import models
import Todo from '../models/todo.server.model';

//main controls for a crud app - get, add, update, delete
export const getTodos = (req, res) => {
    //use our Todo schema methods to query the database and handle exceptions
    Todo.find().exec((err, todos) => {
        if (err) {
            return (res.json({ 'success': false, 'message': 'Error occured in todo.server.controller gettodos' }));
        }
        return res.json({ 'success': true, 'message': 'Todos fetched', todos });
    });
}


export const getTodo = (req, res) => {

    Todo.find({ _id: req.params.id }).exec((err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        if (todo.length) {
            return res.json({ 'success': true, 'message': 'Todo fetched by id successfully', todo });
        } else {
            return res.json({ 'success': false, 'message': 'Todo with the given id not found' });
        }
    })
}

export const addTodo = (req, res) => {
    //create a new blank Todo object from request.body
    const newTodo = new Todo(req.body);

    newTodo.save((err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Error occured in saving new todo in todo.server.controller addTodo' });
        }
        return res.json({ 'success': true, 'message': 'New Todo has been successfully added', todo });
    });
}

export const updateTodo = (req, res) => {

    Todo.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Error occured in findOneAndUpdate in todo.server.controller update' });
        }
        if (res.length) {
            return res.json({ 'success': true, 'message': 'Successfully updated todo', todo });
        } else {
            return res.json({ 'success': false, 'message': 'Error has occured, todo was not found with given id' });
        }
    });
}

export const deleteTodo = () => {

    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Error has occured in deleteTodo in todo.server.controller' });
        }
        return res.json({ 'success': true, 'message': 'Successfully deleted' + todo.text + ' from collections' });
    });
}