import React, { useState, useRef } from "react";

import "./App.css";
import "./styles/action.css";
import "./styles/detail.css";
import "./styles/login.css";

// import Login from "./Login";
import Tasks from "./task-data/taskData";

function App() {
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
  const email = useRef(null);

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
      )
        item.display = "yes";

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

    if (userDate === today) {
      return "Today";
    } else if (userDate === stringTomorow) {
      return "Tomorrow";
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
    email,
    overlay,
    loginpage
  ) => {
    e.preventDefault();
    let emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      firstname.current.value !== "" &&
      lastname.current.value !== "" &&
      email.current.value !== "" &&
      email.current.value.match(emailregex)
    ) {
      const fullname = `${firstname.current.value} ${lastname.current.value}`;
      setUser({
        fullname: fullname,
        email: email.current.value,
      });

      setInitial(userInitials(fullname));

      loginpage.current.classList.add("hidden");
      overlay.current.classList.add("hidden");
    }
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
                <p className="initials"> {initial}
                </p>
              </div>
              <div className="username--email">
                <p className="username">
                  {user.fullname}
                </p>
                <p className="email">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="line"></div>
            <div className="list--type">
              {defaultList.map((item) => (
                <div
                  className="todo--type"
                  key={item.id}
                  a-key={item.id}
                  onClick={(e) => {
                    activeList(e, newList);
                    assignTask(newList);
                  }}
                >
                  {item.icon} {item.name}
                </div>
              ))}
            </div>

            <div className="line line2"></div>

            <div className="added--task">
              {addedList.map((item) => (
                <div
                  className="task--added"
                  key={item.id}
                  a-key={item.id}
                  onClick={(e) => {
                    activeList(e, newList);
                    assignTask(newList);
                  }}
                >
                  {item.icon} {item.name}
                </div>
              ))}
            </div>

            <div className="new-n-settings">
              <div className="new--list">
                <i class="ri-add-line"></i>
                <form
                  onSubmit={(e) =>
                    createNewList(
                      e,
                      newList,
                      message,
                      removeFocus
                    )
                  }
                >
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
                  <div
                    class="tasks--1"
                    key={value.detail.indexOf(d)}
                  >
                    <div class="task">
                      <p class="task--detail">
                        {d.duty}
                      </p>
                      <p class="time">
                        <i class="ri-calendar-event-fill"></i>{" "}
                        {stDate(d.date)}
                      </p>
                    </div>
                    <div className="to__important">
                      <i class="ri-star-line"></i>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div class="add--task">
            <i class="ri-add-line"></i>{" "}
            <form
              onSubmit={(e) => {
                addTask(
                  e,
                  newList,
                  inputRef,
                  dateRef
                );
                assignTask(newList);
              }}
            >
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
            </form>
          </div>
        </section>
      </main>
      <div class="signup" ref={loginPage}>
        <form name="form" action="#">
          <p class="login-text">Login</p>
          <div class="user--data">
            Email:
            <input
              type="email"
              class="input email--input"
              required
              ref={email}
            />
          </div>
          <div class="user--data">
            First Name:
            <input
              type="text"
              class="input first--name"
              required
              ref={firstName}
            />
          </div>
          <div class="user--data">
            Last Name:
            <input
              type="text"
              class="input last--name"
              required
              ref={lastName}
            />
          </div>
          <br />
          <button
            type="submit"
            class="submitForm"
            onClick={(e) =>
              userDetail(
                e,
                firstName,
                lastName,
                email,
                overLay,
                loginPage
              )
            }
          >
            Login
          </button>
        </form>
      </div>
      <div class="overlay" ref={overLay}></div>
    </div>
  );
}

export default App;
