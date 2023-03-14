import React, { useState } from "react";

import "../styles/action.css";

const List = (props) => {
  const [view, setView] = useState(false);

  return (
    <div
      className={props.class}
      key={props.item.id}
      a-key={props.item.id}
      onClick={(e) => {
        props.func1(e, props.newList);
        props.func2(props.newList);
      }}
    >
      {props.item.icon} {props.item.name}
      <i
        class="ri-delete-bin-6-line del__btn"
        onClick={() => {
          setView(!view);
        }}
      ></i>
      {view && (
        <div className="prompt">
          Are you sure:{" "}
          <div className="select__btn">
            <button
              b-key={props.newList.indexOf(
                props.item
              )}
              onClick={(e) =>
                props.func3(e, props.newList)
              }
            >
              Yes
            </button>
            <button
              onClick={() => setView(!view)}
            >
              No
            </button>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default List;
