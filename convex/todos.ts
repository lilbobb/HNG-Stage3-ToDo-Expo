import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const todosByOrder = await ctx.db
      .query('todos')
      .withIndex('by_order')
      .order('asc')
      .collect();
    
    if (todosByOrder.length === 0) {
      return await ctx.db
        .query('todos')
        .withIndex('by_created')
        .order('desc')
        .collect();
    }
    
    return todosByOrder;
  },
});

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query('todos').collect();
    const highestOrder = Math.max(...todos.map(t => t.order || 0), 0);
    
    const todoId = await ctx.db.insert('todos', {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
      order: highestOrder + 1,
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
    // More efficient approach using query with filter
    const completedTodos = await ctx.db
      .query('todos')
      .filter((q) => q.eq(q.field('completed'), true))
      .collect();
    
    console.log(`Clearing ${completedTodos.length} completed todos`);
    
    // Delete all completed todos
    await Promise.all(
      completedTodos.map(todo => ctx.db.delete(todo._id))
    );
    
    return completedTodos.length;
  },
});

export const updateTodoOrder = mutation({
  args: { 
    orderedIds: v.array(v.id('todos')) 
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], { 
        order: i 
      });
    }
  },
});