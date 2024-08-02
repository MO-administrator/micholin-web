import type { EventDispatcher } from 'svelte';
import {
  type Subscriber,
  type Updater,
  type Writable,
  get,
  writable,
} from "svelte/store";

export type Todo = {
  id: string;
  title: string;
  body?: string;
  completed: boolean;
};

const actions = {
  add: "todo-added",
  updated: "todo-updated",
  removed: "todo-deleted",
  error: "todo-error",
};

let instance: TodoStore;

class TodoStore {
  private _todos: Writable<Todo[]>;
  private _todos_source_url: string;
  private _todos_default_options?: RequestInit;

  constructor() {
    if (instance) {
      throw new Error('Only one instance is permitted.');
    }
    instance = this;
    this._todos = writable([]);
    this._todos_source_url = `${window.location.origin}/api/todos`;
    this._todos_default_options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    };
    this.fetchTodos();
  }

  subscribe(run: Subscriber<Todo[]>) {
    return this._todos.subscribe(run);
  }

  update(run: Updater<Todo[]>) {
    return this._todos.update(run);
  }

  async fetchTodos() {
    const todos = get(this._todos);
    if (!todos.length) {
      const response = await fetch(
        this._todos_source_url,
        this._todos_default_options
      );
      const data: Todo[] = await response.json();
      this._todos.set(data);
    }
  }

  getTodo(todoId: string) {
    return get(this._todos).find(({ id }) => id === todoId);
  }

  async addTodo(
    newTodo: Todo,
    dispatch: EventDispatcher<Record<string, object | unknown>>
  ) {
    try {
      const response = await fetch(this._todos_source_url, {
        ...this._todos_default_options,
        method: "POST",
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(actions.add, { ...data, newTodo });
      }
    } catch (error) {
      dispatch(actions.error, error);
    }
    return this.update(prev => [...prev, newTodo]);
  }

  async updateTodo(
    todoId: string,
    updatedTodo: Todo,
    dispatch: EventDispatcher<Record<string, object | unknown>>
  ) {
    try {
      const response = await fetch(`${this._todos_source_url}/${todoId}`, {
        ...this._todos_default_options,
        method: "PUT",
        body: JSON.stringify(updatedTodo),
      });
      if (response.ok) {
        const data = response.json();
        dispatch(actions.updated, data);
      }
    } catch (error) {
      dispatch(actions.error, error);
    }

    const todos = get(this._todos).map(todo => {
      if (todo.id === todoId) {
        return updatedTodo;
      }
      return todo;
    });
    return this.update(() => todos);
  }

  async deleteTodo(
    todoId: string,
    dispatch: EventDispatcher<Record<string, object | unknown>>
  ) {
    try {
      const response = await fetch(`${this._todos_source_url}/${todoId}`, {
        ...this._todos_default_options,
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(actions.removed, data);
      }
    } catch (error) {
      dispatch(actions.error, error);
    }
    const todos = get(this._todos).filter(({ id }) => id !== todoId);
    return this.update(() => todos);
  }
}

export const todoStore = new TodoStore();
