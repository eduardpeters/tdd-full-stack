import { Request, Response } from 'express';
import { TodosService } from './TodosService.js';
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
    if (req.body === undefined || req.body.description === undefined) {
      return res.status(400).end();
    }

    const { description, isComplete = false }: NewTodoDto = req.body;
    if (description.length < 1) {
      return res.status(400).end();
    }

    const newTodo = await this.todosService.create({ description, isComplete });
    return res.status(200).send(newTodo);
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    if (
      req.body === undefined ||
      (req.body.description === undefined && req.body.isComplete === undefined)
    ) {
      return res.status(400).end();
    }
    const { description, isComplete } = req.body;
    const updatedTodo = await this.todosService.update(parseInt(id), {
      description,
      isComplete,
    });
    if (updatedTodo === undefined) {
      return res.status(400).end();
    }
    return res.status(200).send(updatedTodo);
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    await this.todosService.deleteById(parseInt(id));
    return res.status(204).end();
  }
}
