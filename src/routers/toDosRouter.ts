import express, { Router } from 'express';
import TodosController from '../controllers/toDosController';

const router = Router();
const todosController = new TodosController();

router.get('/todos', todosController.get);

export default router;