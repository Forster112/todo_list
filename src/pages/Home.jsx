import React, { useState, useRef } from "react";

import "../App.css";
import List from "../components/List";
import Task from "../components/Task";
import "../styles/action.css";
import "../styles/detail.css";
import "../styles/login.css";

import Login from "../components/Login";
import Tasks from "../task-data/taskData";

const Home = () => {
  // my use states
  const [message, setMessage] = useState("");

  const [newList, setNewList] = useState(Tasks);

  const [value, setValue] = useState(newList[0]);

  const [user, setUser] = useState({});
  const [initial, setInitial] = useState("");

  // my use refs
  const showAction = useRef("");
  const removeFocus = useRef(null);

  const inputRef = useRef(null);
  const dateRef = useRef(null);

  const loginPage = useRef(null);
  const overLay = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const nickName = useRef(null);

  // others
  const defaultList = newList.slice(0, 4);
  const addedList = newList.slice(4);

  const cur = new Date();
  const scur = cur.toISOString().substring(0, 10);

  // toggle action section for mobile view
  const toggleAction = () => {
    showAction.current.classList.toggle(
      "show-taskbar"
    );
  };

  // set current task to be displayed
  const assignTask = (newlist) => {
    newlist.map((item) => {
      if (item.display === "yes") setValue(item);
      return item;
    });
  };

  // add display to the clicked list
  const activeList = (e, tasks) => {
    tasks.map((item) => {
      delete item.display;

      if (
        item.id ===
        Number(e.target.getAttribute("a-key"))
      ) {
        item.display = "yes";
      }

      return item;
    });
  };

  // Feature for user to create new list type
  const createNewList = (
    e,
    lists,
    message,
    ref
  ) => {
    e.preventDefault();
    if (message !== "") {
      setNewList([
        ...lists,
        {
          name: message,
          id: lists.length,
          icon: <i class="ri-menu-add-fill"></i>,
          detail: [],
        },
      ]);
    }
    ref.current.blur();
    ref.current.value = "";
  };

  // Feature for user to add tasks to list
  const addTask = (e, newlist, input, udate) => {
    e.preventDefault();
    if (input.current.value !== "") {
      setNewList(
        newlist.map((item) => {
          if (item?.display === "yes") {
            item.detail.push({
              duty: input.current.value,
              date: udate.current.value,
            });
          }
          return item;
        })
      );
    }
    input.current.value = "";
  };

  // set date
  const stDate = (userDate) => {
    const today = new Date()
      .toISOString()
      .substring(0, 10);

    let tomorrow = new Date().setDate(
      new Date(today).getDate() + 1
    );
    const stringTomorow = new Date(tomorrow)
      .toISOString()
      .substring(0, 10);
    
    let yesterday = new Date().setDate(
      new Date(today).getDate() - 1
    );
    const stringYesterday = new Date(yesterday)
      .toISOString()
      .substring(0, 10);

    if (userDate === today) {
      return "Today";
    } else if (userDate === stringTomorow) {
      return "Tomorrow";
    } else if (userDate === stringYesterday) {
      return "Yesterday"
    } else {
      return userDate;
    }
  };

  // user details
  const userInitials = function (uname) {
    let displayedInitials = uname
      .toUpperCase()
      .split(" ")
      .map((name) => name.slice(0, 1))
      .join("");
    return displayedInitials;
  };

  const userDetail = (
    e,
    firstname,
    lastname,
    nickName,
    overlay,
    loginpage
  ) => {
    e.preventDefault();
    if (
      firstname.current.value !== "" &&
      lastname.current.value !== "" &&
      nickName.current.value !== ""
    ) {
      const fullname = `${firstname.current.value} ${lastname.current.value}`;
      setUser({
        fullname: fullname,
        nickName: nickName.current.value,
      });

      setInitial(userInitials(fullname));

      loginpage.current.classList.add("hidden");
      overlay.current.classList.add("hidden");
    }
  };

  const deleteList = (e, list) => {
    const key = Number(
      e.target.getAttribute("b-key")
    );
    setNewList(
      list.filter((item) => {
        return list.indexOf(item) !== key;
      })
    );
  };

  const deleteTask = (e, alist) => {
    const key = Number(
      e.target.getAttribute("b-key")
    );

    setNewList(
      alist.map((item) => {
        if (item?.display === "yes") {
          item.detail.splice(key, 1);
        }
        return item;
      })
    );
  };

  return (
    <div>
      <header>
        <h1>MIG TODO</h1>
        <i
          class="ri-menu-line"
          onClick={toggleAction}
        ></i>
      </header>
      <main>
        {/** Action */}
        <section
          className="action"
          ref={showAction}
          onClick={toggleAction}
        >
          <div className="action__container">
            <div className="user">
              <div className="user--initials">
                <p className="initials">
                  {" "}
                  {initial}
                </p>
              </div>
              <div className="username--nickname">
                <p className="nickname">
                  {user.nickName}
                </p>
                <p className="username">
                  {user.fullname}
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className="list--type">
              {defaultList.map((item) => (
                <List
                  key={item.id}
                  class="todo--type"
                  item={item}
                  newList={newList}
                  func1={activeList}
                  func2={assignTask}
                />
              ))}
            </div>

            <div className="line line2"></div>

            <div className="added--task">
              {addedList.map((item) => (
                <List
                  key={item.id}
                  class="task--added"
                  item={item}
                  newList={newList}
                  func1={activeList}
                  func2={assignTask}
                  func3={deleteList}
                />
              ))}
            </div>

            <div className="new-n-settings">
              <div className="new--list">
                <i class="ri-add-line"></i>
                <form>
                  <input
                    type="text"
                    name="newlist"
                    id="newlist"
                    placeholder="New List"
                    className="new-list-input"
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    ref={removeFocus}
                  />
                  <button
                    type="submit"
                    className="create__list"
                    onClick={(e) =>
                      createNewList(
                        e,
                        newList,
                        message,
                        removeFocus
                      )
                    }
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/** detail */}
        <section class="details">
          <h2 class="task--title">
            {value.icon} {value.name}
          </h2>
          <div class="tasks--container">
            <div class="task--undone">
              {value.detail.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#F68084",
                  }}
                >
                  Create tasks below and plan your
                  day
                </p>
              ) : (
                value?.detail?.map((d) => (
                  <Task
                    detail={d}
                    datefunc={stDate}
                    parent={value.detail}
                    delFunc={deleteTask}
                    list={newList}
                    key={value.detail.indexOf(d)}
                  />
                ))
              )}
            </div>
          </div>
          <div class="add--task">
            <i class="ri-add-line"></i>{" "}
            <form>
              <input
                type="text"
                name="addtask"
                id="addtask"
                placeholder="Add a task"
                class="add--task--input"
                ref={inputRef}
              />
              <input
                type="date"
                name=""
                id=""
                className="newtask--date"
                defaultValue={scur}
                ref={dateRef}
              />
              <button
                type="submit"
                className="add__task__btn"
                onClick={(e) => {
                  addTask(
                    e,
                    newList,
                    inputRef,
                    dateRef
                  );
                  assignTask(newList);
                }}
              >
                Add
              </button>
            </form>
          </div>
        </section>
      </main>
      <Login
        firstname={firstName}
        lastname={lastName}
        nickname={nickName}
        overlay={overLay}
        wrap={loginPage}
        func={userDetail}
      />
    </div>
  );
};

export default Home;
