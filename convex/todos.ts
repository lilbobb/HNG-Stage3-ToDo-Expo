import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('todos')
      .order('desc')
      .collect();
  },
});

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert('todos', {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
    });
    return todoId;
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id('todos'),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      completed: args.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query('todos')
      .withIndex('by_completed', (q) => q.eq('completed', true))
      .collect();

    await Promise.all(completedTodos.map((todo) => ctx.db.delete(todo._id)));
  },
});
