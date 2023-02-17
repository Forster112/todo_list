import React from "react";

const Action = () => {
  return (
    <section class="action">
      <div class="user">
        <div class="user--initials">
          <p class="initials">FU</p>
        </div>
        <div class="username--email">
          <p class="username">Forster Udemezue</p>
          <p class="email">
            forstermichael112@gmail.com
          </p>
        </div>
      </div>
      <div class="line"></div>
      <div class="list--type">
        <div class="my--day todo--type">
          <i class="fas fa-sun"></i> My Day List
        </div>
        <div class="important todo--type">
          <i class="fa-regular fa-star"></i>{" "}
          Important List
        </div>
        <div class="long--plan todo--type">
          <i class="fa-solid fa-calendar-days"></i>{" "}
          Long Plan
        </div>
        <div class="tasks todo--type">
          <i class="fa-solid fa-list-check"></i>{" "}
          Tasks
        </div>
      </div>
      <div class="line line2"></div>

      <div class="added--task"></div>

      <div class="new-n-settings">
        <div class="new--list">
          <i class="fa-solid fa-plus"></i>
          <input
            type="text"
            name="newlist"
            id="newlist"
            placeholder="New List"
            class="new-list-input"
          />
        </div>
        <div class="settings">
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>
    </section>
  );
};

export default Action;
