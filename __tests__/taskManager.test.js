const TaskManager = require('../src/taskManager');

describe('TaskManager', () => {
  let manager;

  // Antes de cada test se crea una instancia nueva y limpia
  beforeEach(() => {
    manager = new TaskManager();
  });

  describe('addTask()', () => {
    it('una tarea recién creada tiene completed: false', () => {
      // Arrange & Act
      const tarea = manager.addTask('Estudiar Jest');
      // Assert
      expect(tarea.completed).toBe(false);
    });

    it('después de addTask el total de tareas aumenta en 1', () => {
      manager.addTask('Tarea 1');
      expect(manager.getAll().length).toBe(1);

      manager.addTask('Tarea 2');
      expect(manager.getAll().length).toBe(2);
    });

    it('la tarea creada tiene id, title, completed y createdAt', () => {
      const tarea = manager.addTask('Revisar código');
      expect(tarea).toHaveProperty('id');
      expect(tarea).toHaveProperty('title', 'Revisar código');
      expect(tarea).toHaveProperty('completed', false);
      expect(tarea).toHaveProperty('createdAt');
    });

    it('lanza Error si el título está vacío', () => {
      expect(() => manager.addTask('')).toThrow(Error);
    });

    it('lanza Error si el título es solo espacios', () => {
      expect(() => manager.addTask('   ')).toThrow(Error);
    });
  });

  describe('completeTask()', () => {
    it('marca la tarea como completed: true', () => {
      const tarea = manager.addTask('Tarea a completar');
      manager.completeTask(tarea.id);
      expect(manager.getAll()[0].completed).toBe(true);
    });

    it('completar una tarea no afecta a las demás', () => {
      const tarea1 = manager.addTask('Tarea 1');
      const tarea2 = manager.addTask('Tarea 2');

      manager.completeTask(tarea1.id);

      expect(tarea1.completed).toBe(true);
      expect(tarea2.completed).toBe(false);
    });

    it('lanza Error si el id no existe', () => {
      expect(() => manager.completeTask(999)).toThrow(Error);
    });
  });

  describe('removeTask()', () => {
    it('eliminar una tarea disminuye el total en 1', () => {
      const tarea = manager.addTask('Tarea a eliminar');
      manager.removeTask(tarea.id);
      expect(manager.getAll().length).toBe(0);
    });

    it('lanza Error si el id no existe', () => {
      expect(() => manager.removeTask(999)).toThrow(Error);
    });
  });

  describe('getPending()', () => {
    it('devuelve solo tareas pendientes', () => {
      const tarea1 = manager.addTask('Pendiente');
      const tarea2 = manager.addTask('A completar');

      manager.completeTask(tarea2.id);

      const pendientes = manager.getPending();
      expect(pendientes.length).toBe(1);
      expect(pendientes[0].id).toBe(tarea1.id);
    });

    it('no incluye tareas completadas', () => {
      const tarea = manager.addTask('Completada');
      manager.completeTask(tarea.id);

      expect(manager.getPending()).toEqual([]);
    });
  });

  describe('getCompleted()', () => {
    it('devuelve solo tareas completadas', () => {
      const tarea1 = manager.addTask('Completada');
      manager.addTask('Pendiente');

      manager.completeTask(tarea1.id);

      const completadas = manager.getCompleted();
      expect(completadas.length).toBe(1);
      expect(completadas[0].id).toBe(tarea1.id);
    });

    it('no incluye tareas pendientes', () => {
      manager.addTask('Solo pendiente');
      expect(manager.getCompleted()).toEqual([]);
    });
  });

  describe('getAll()', () => {
    it('devuelve todas las tareas sin importar su estado', () => {
      const tarea1 = manager.addTask('Tarea 1');
      const tarea2 = manager.addTask('Tarea 2');
      manager.completeTask(tarea1.id);

      expect(manager.getAll().length).toBe(2);
    });

    it('devuelve array vacío si no hay tareas', () => {
      expect(manager.getAll()).toEqual([]);
    });
  });

});