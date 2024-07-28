"use client";
import { urlToUrlWithoutFlightMarker } from "next/dist/client/components/app-router";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const page = () => {
  const [title, setTitle] = useState("");
  const [desci, setDesci] = useState("");
  const [priority, setPriority] = useState("Low");
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault(); // it stops the page from refreshing
    setTask([...task, { title, desci, priority, completed: false }]);
    setTitle("");
    setDesci("");
    setPriority("Low");
  };

  const deleteHandler = (i) => {
    let copytask = [...task];
    copytask.splice(i, 1);
    setTask(copytask);
  };

  const toggleCompletion = (i) => {
    let copytask = [...task];
    copytask[i].completed = !copytask[i].completed;
    setTask(copytask);
  };

  let renderTask = <h3 className="p-10 bg-slate-300">NO TASK AVAILABLE</h3>;

  if (task.length > 0) {
    renderTask = (
      <TransitionGroup component="ol" className="list-decimal px-10 py-5 bg-white border border-gray-300 rounded-md shadow-md w-full">
        {task.map((t, i) => (
          <CSSTransition key={i} timeout={500} classNames="task">
            <li className="mb-6">
              <div className={`flex justify-between items-center mb-5 p-5 rounded-md shadow-inner ${t.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div>
                  <div className={`text-2xl font-bold ${t.completed ? 'line-through text-green-800' : ''}`}>{t.title}</div>
                  <div className="text-xl text-gray-600">{t.desci}</div>
                  <div className={`text-md ${t.priority === 'High' ? 'text-red-500' : t.priority === 'Medium' ? 'text-yellow-700' : 'text-green-500'}`}>
                    Priority: {t.priority}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleCompletion(i)}
                    className="mr-4 w-6 h-6"
                  />
                  <button
                    onClick={() => {
                      deleteHandler(i);
                    }}
                    className="ml-4 px-3 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {i < task.length - 1 && <hr className="border-gray-300" />}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <h1 className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 text-center font-bold text-3xl shadow-md">
        TODO List(karma)
      </h1>
      <form
        onSubmit={submitHandler}
        className="bg-white mx-auto p-10 border border-gray-300 rounded-b-md shadow-md w-full max-w-screen-xl"
      >
        <input
          type="text"
          placeholder="Enter the title here"
          className="block w-full text-2xl border border-blue-400 p-4 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter description here"
          className="block w-full text-2xl border border-blue-400 p-4 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={desci}
          onChange={(e) => {
            setDesci(e.target.value);
          }}
        />
        <select
          className="block w-full text-2xl border border-blue-400 p-4 mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button className="w-full bg-blue-500 px-5 py-3 text-2xl text-white rounded-md hover:bg-blue-600 transition">
          ADD TASK
        </button>
      </form>
      <hr className="my-10 border-gray-300" />
      <div className="w-full max-w-screen-xl mx-auto">{renderTask}</div>
    </div>
  );
};

export default page;
