import { Schema, models, model } from 'mongoose';

const userTodoSchema = new Schema({
  email: {
    type: 'String',
    require: true,
  },
  password: {
    type: 'String',
    require: true,
  },
  firstName: 'string',
  lastName: 'string',
  task: {
    type: [{}],
  },
  createdAt: {
    type: 'Date',
    default: () => Date.now(),
    immutable: true,
  },
});

const UserTodo = models.UserTodo || model('UserTodo', userTodoSchema);

export default UserTodo;
