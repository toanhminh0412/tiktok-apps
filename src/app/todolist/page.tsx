"use client";

import { SyntheticEvent, useRef, useState } from "react";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export default function TodolistPage() {
    const newTodoItemRef = useRef<HTMLInputElement>(null);
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

    // Add a new todo item
    const addTodoItem = (e: SyntheticEvent) => {
        e.preventDefault();
        if (newTodoItemRef.current && newTodoItemRef.current.value !== "") {
            const lastTodoItemId = todoItems.length > 0 ? todoItems[todoItems.length - 1].id : 1;
            const newTodoItem: TodoItem = {
                id: lastTodoItemId + 1,
                title: newTodoItemRef.current.value,
                completed: false
            }
            setTodoItems([...todoItems, newTodoItem]);
            newTodoItemRef.current.value = "";
        }
    }

    // Mark a todo item as completed
    const markTodoItemAsCompleted = (id: number) => {
        setTodoItems(todoItems.filter(item => item.id !== id));
    }

    return (
        <div className="prose max-w-none text-center p-8 bg-slate-100 min-h-screen">
            <h1>Todo list</h1>
            <form onSubmit={addTodoItem} className="mt-4">
                <div className="join">
                    <input ref={newTodoItemRef} type="text" className="input border border-black join-item" placeholder="Add a todo item"></input>
                    <button className="btn btn-primary join-item">Add</button>
                </div>
            </form>
            <div className="mt-4 flex flex-row justify-center gap-2 flex-wrap">
                {todoItems.map(item => (
                <div key={item.id} className="p-4 rounded-lg shadow-xl border border-slate-300 bg-white w-fit min-w-[200px]">
                    <h4 className="my-0">{item.title}</h4>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-500 text-sm">Mark as complete</span>
                            <input type="checkbox" className="checkbox checkbox-sm ml-4" onChange={() => {markTodoItemAsCompleted(item.id)}}></input>
                        </label>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}