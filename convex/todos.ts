import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('todos')
      .withIndex('by_created')
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

// Add this new mutation for drag and drop reordering
export const updateTodoOrder = mutation({
  args: { 
    orderedIds: v.array(v.id('todos')) 
  },
  handler: async (ctx, args) => {
    // Update each todo with its new order position
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], { 
        order: i 
      });
    }
  },
});