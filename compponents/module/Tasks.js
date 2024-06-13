import React from "react";
import { RiMastodonLine,RiEditLine  } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Link from "next/link";

const Tasks = ({ data, back, next, fetchTodos }) => {


  const changeStatusHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };
  return (
    <div className="tasks">
      {data?.map((task) => (
        <div key={task._id} className="tasks__card">
          <span className={task.status}></span>
          <div className="tasks__card--details">
            <RiMastodonLine />
            <div>
              <h4>{task.title}</h4>
              <h6>{task.caption}</h6>
            </div>
            <Link href={`/tasks/${task._id}`}><RiEditLine/></Link>
          </div>
          <div className="tasks__card--buttons">
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatusHandler(task._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatusHandler(task._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;


