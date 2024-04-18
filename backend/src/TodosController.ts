import { Request, Response } from 'express';
import { TodosService } from './TodosService';
import { NewTodoDto } from './types';

export class TodosController {
  todosService: TodosService;

  constructor(todosService: TodosService) {
    this.todosService = todosService;
  }

  async getAll(req: Request, res: Response) {
    const data = await this.todosService.getAll();
    res.status(200);
    return res.send(data);
  }

  async create(req: Request, res: Response) {
    console.log(req.body);
    if (req.body === undefined || req.body.description === undefined) {
      return res.status(400).end();
    }

    const { description, isComplete = false }: NewTodoDto = req.body;
    if (description.length < 1) {
      return res.status(400).end();
    }
    return res.status(200).send();
  }
}
