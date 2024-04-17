import { Request, Response } from 'express';
import { TodosService } from './TodosService';

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
}
