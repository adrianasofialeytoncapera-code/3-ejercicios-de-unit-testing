class TaskManager {
  constructor() {
    this._tasks = [];
    this._nextId = 1;
  }

  addTask(title) {
    if (!title || title.trim() === '') {
      throw new Error('El título no puede estar vacío.');
    }
    const tarea = {
      id: this._nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    this._tasks.push(tarea);
    return tarea;
  }

  completeTask(id) {
    const tarea = this._tasks.find(t => t.id === id);
    if (!tarea) throw new Error(`No existe una tarea con id ${id}.`);
    tarea.completed = true;
  }

  removeTask(id) {
    const index = this._tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error(`No existe una tarea con id ${id}.`);
    this._tasks.splice(index, 1);
  }

  getPending() {
    return this._tasks.filter(t => !t.completed);
  }

  getCompleted() {
    return this._tasks.filter(t => t.completed);
  }

  getAll() {
    return this._tasks;
  }
}

module.exports = TaskManager;