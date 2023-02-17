import React from "react";

const Detail = () => {
  return (
    <section class="details">
      <header class="detailed--header"></header>
      <div class="tasks--container">
        <div class="task--undone">
          <div class="tasks--1">
            <div class="tasks">
              <div class="do--task">
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  class="completed--checkbox"
                />
              </div>
              <div class="task">
                <p class="task--detail">
                  Pay electricity bill
                </p>
                <p class="time">
                  <i class="fa-regular fa-calendar"></i>{" "}
                  Today
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator">
          Completed{" "}
          <i class="fa-solid fa-caret-down"></i>
        </div>
        <div class="tasks-done-wrap">
          <div class="tasks-done">
            <div class="task-done">
              <div class="task-done-checkbox-wrap">
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  class="task-done-checkbox"
                />
              </div>
              <div class="task-done-detail">
                <p class="task-done-value">
                  Pay electricity bill
                </p>
                <p class="time-done">
                  <i class="fa-regular fa-calendar"></i>{" "}
                  Today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-list">
        <div class="add--task">
          <i class="fa-solid fa-plus"></i>{" "}
          <input
            type="text"
            name="addtask"
            id="addtask"
            placeholder="Add a task"
            class="add--task--input"
          />
        </div>
      </div>
    </section>
  );
};

export default Detail;
