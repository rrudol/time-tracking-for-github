let state = {
  timeSpent: 0,
  timeEstimated: 0
};

function generateMarkup(username) {
  var content = "";
  return `
  <details class="details-reset details-overlay select-menu js-select-menu js-dropdown-details is-dirty">

        <summary class="text-bold discussion-sidebar-heading discussion-sidebar-toggle" aria-haspopup="menu" data-hotkey="m">
          <svg class="octicon octicon-gear" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></svg>
          Time tracking
        </summary>
    
        <div class="select-menu-modal js-navigation-container position-absolute right-0 js-active-navigation-container" style="z-index: 99; overflow: visible;">
          <div class="select-menu-header">
            <span class="select-menu-title">Set estimations or log time</span>
          </div>
          
            <div class="js-select-menu-deferred-content " data-url="/${username}/self-development/issues/31/show_partial?partial=issues%2Fsidebar%2Fmilestone_menu_content">
    <tab-container>
    <div class="select-menu-filters">
      <div class="select-menu-tabs" role="tablist">
        <ul>
          <li class="select-menu-tab">
            <button type="button" role="tab" class="select-menu-tab-nav" aria-selected="true">Log time</button>
          </li>
          <li class="select-menu-tab">
            <button type="button" role="tab" class="select-menu-tab-nav">Estimate work</button>
          </li>
        </ul>
      </div>
    </div>
    
    <div style="padding: 10px 20px;" class="select-menu-list" role="tabpanel">
      <input min="0" style="width: 160px" placeholder="Log spent time" class="form-control" type="number" id="input-new-spent" value="">
      <button style="margin: 0 0 0 10px;" class="btn btn-md" id="submit-new-spent" value="default">Log time</button>
    </div>
      
    <div style="display: flex; padding: 10px 20px;" class="select-menu-list filterable-empty" role="tabpanel" hidden="">
      <input min="0" placeholder="Estimate issue" class="form-control" type="number" id="input-new-estimate" value="0">
      <button style="margin: 0 0 0 10px;" class="btn btn-md" id="submit-new-estimate" value="default">Estimate</button>
    </div>
    </tab-container>
    </div>
            <div class="select-menu-loading-overlay anim-pulse">
              <svg height="32" class="octicon octicon-octoface" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M14.7 5.34c.13-.32.55-1.59-.13-3.31 0 0-1.05-.33-3.44 1.3-1-.28-2.07-.32-3.13-.32s-2.13.04-3.13.32c-2.39-1.64-3.44-1.3-3.44-1.3-.68 1.72-.26 2.99-.13 3.31C.49 6.21 0 7.33 0 8.69 0 13.84 3.33 15 7.98 15S16 13.84 16 8.69c0-1.36-.49-2.48-1.3-3.35zM8 14.02c-3.3 0-5.98-.15-5.98-3.35 0-.76.38-1.48 1.02-2.07 1.07-.98 2.9-.46 4.96-.46 2.07 0 3.88-.52 4.96.46.65.59 1.02 1.3 1.02 2.07 0 3.19-2.68 3.35-5.98 3.35zM5.49 9.01c-.66 0-1.2.8-1.2 1.78s.54 1.79 1.2 1.79c.66 0 1.2-.8 1.2-1.79s-.54-1.78-1.2-1.78zm5.02 0c-.66 0-1.2.79-1.2 1.78s.54 1.79 1.2 1.79c.66 0 1.2-.8 1.2-1.79s-.53-1.78-1.2-1.78z"></path></svg>
            </div>
        </div>
      <div class="sr-only" data-filterable-notice="" aria-live="polite">0 results found.</div></details>
      
      <div class="labels css-truncate js-issue-labels update-it">
        ${content}
      </div>`;
}

setInterval(() => {
  var content = "";
  if (!state.timeSpent && !state.timeEstimated) {
    content = `None yet`;
  } else if (state.timeSpent && !state.timeEstimated) {
    content =
      `Spent ${state.timeSpent} hour` + (state.timeSpent > 1 ? "s" : "");
  } else if (!state.timeSpent && state.timeEstimated) {
    content =
      `Issue estimated for ${state.timeEstimated} hour` + state.timeEstimated >
      1
        ? "s"
        : "";
  } else {
    content = `Spent ${state.timeSpent} from ${state.timeEstimated} hours
    <span class="progress-bar progress-bar-small"><span class="progress" style="${
      state.timeSpent > state.timeEstimated ? "background: red;" : ""
    } width: ${(state.timeSpent < state.timeEstimated
      ? state.timeSpent / state.timeEstimated
      : 1) * 100}%">&nbsp;</span></span>
    `;
  }
  document.getElementsByClassName("update-it")[0].innerHTML = content;
}, 1000);

console.log("WORKING", Math.random());

let lastUrl = "";
let sidebar = null;

function initialize() {
  const username = document.getElementsByClassName("user-profile-link")[0]
    .children[0].innerText;

  state = {
    timeSpent: 0,
    timeEstimated: 0
  };

  const comments = Array.from(
    document.getElementsByClassName("timeline-comment-wrapper")
  );
  console.log(comments);
  comments.forEach((comment, i) => {
    try {
      console.log("i=" + i);
      const links = Array.from(comment.getElementsByTagName("a"));
      console.log(links);
      if (!links) return;
      const link = links.filter(l =>
        l.href.includes("time-tracking-for-github")
      );
      if (!link) return;
      const href = link[0].href.split("#")[1];
      console.log(href);
      if (!href) return;
      const data = JSON.parse(atob(href));
      console.log(data);
      comment.style.display = "none";

      if (comment.parentNode.children.length === 1) {
        const info = document.createElement("div");
        info.innerHTML = `
        <div class="discussion-item discussion-item-labeled" data-team-hovercards-enabled="">
  <h3 class="discussion-item-header f5 text-normal" id="event-2500214473">

    <span class="discussion-item-icon">
      <svg class="octicon octicon-watch" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M6 8h2v1H5V5h1v3zm6 0c0 2.22-1.2 4.16-3 5.19V15c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-1.81C1.2 12.16 0 10.22 0 8s1.2-4.16 3-5.19V1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1.81c1.8 1.03 3 2.97 3 5.19zm-1 0c0-2.77-2.23-5-5-5S1 5.23 1 8s2.23 5 5 5 5-2.23 5-5z"></path></svg>
    </span>

        <a class="d-inline-block" data-hovercard-type="user" data-hovercard-url="/hovercards?user_id=9325182" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/${username}"></a>
  <a class="author text-inherit" data-hovercard-type="user" data-hovercard-url="/hovercards?user_id=9325182" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/${username}">${username}</a>
  
  ${
    data.timeSpent
      ? `
  spent
  <span class="IssueLabel d-inline-block v-align-middle" style="background-color: #2cbe4e;">
    <a class="lh-condensed-ultra" href="#" style="color: #fff;">${
      data.timeSpent
    } hours</a>
  </span>
  on that issue
  `
      : ""
  }

  ${
    data.timeEstimated
      ? `
  estimated this issue for
  <span class="IssueLabel d-inline-block v-align-middle" style="background-color: #5d47e8;">
    <a class="lh-condensed-ultra" href="#" style="color: #ffffff;">${
      data.timeEstimated
    } hours</a>
  </span>
  `
      : ""
  }


${comment.getElementsByClassName("timestamp")[0].innerHTML}

  </h3>
</div>
        `;
        comment.parentNode.appendChild(info);
        const dots = comment.getElementsByClassName("details-overlay")[0];
        dots.children[0].style.padding = "0";
        dots.children[0].style.transform = "translate(4px,2px)";
        const dropdown = dots.getElementsByClassName("dropdown-menu-sw")[0];
        Array.from(dropdown.children).forEach((e, i, a) => {
          if (i != a.length - 1) dropdown.removeChild(e);
        });
        info.children[0].children[0].appendChild(dots);
      }

      if (data.timeSpent) {
        state.timeSpent = Number(state.timeSpent) + Number(data.timeSpent);
      }
      if (data.timeEstimated) {
        state.timeEstimated = Number(data.timeEstimated);
      }

      console.log({ state });
    } catch (err) {
      console.log(err);
    }
  });

  console.log("initializing");
  if (lastUrl === location.href) return;
  lastUrl = location.href;
  if (location.href.includes("/issues/")) {
    let spam = document.createElement("div");
    spam.innerHTML = generateMarkup(username);
    spam.className = "discussion-sidebar-item sidebar-time-tracking-widget";
    sidebar = document.getElementById("partial-discussion-sidebar");
    sidebar.insertBefore(spam, sidebar.children[1]);

    setTimeout(
      () =>
        document
          .getElementById("submit-new-estimate")
          .addEventListener("click", event => {
            console.log({ event });
            const data = btoa(
              JSON.stringify({
                timeEstimated: document.getElementById("input-new-estimate")
                  .value,
                doNotConcat: Math.random()
              })
            );
            document.getElementById(
              "new_comment_field"
            ).value = `<a href="https://github.com/${username}">${username}</a> estimate this task for <a href="https://time-tracking-for-github.rudol.eu/#${data}">${
              document.getElementById("input-new-estimate").value
            }</a> hours`;
            const button = document.getElementById(
              "partial-new-comment-form-actions"
            ).children[0];
            button.disabled = false;
            button.click();
          }),
      500
    );

    setTimeout(
      () =>
        document
          .getElementById("submit-new-spent")
          .addEventListener("click", event => {
            console.log({ event });
            const data = btoa(
              JSON.stringify({
                timeSpent: document.getElementById("input-new-spent").value,
                doNotConcat: Math.random()
              })
            );
            document.getElementById(
              "new_comment_field"
            ).value = `<a href="https://github.com/${username}">${username}</a> spent <a href="https://time-tracking-for-github.rudol.eu/#${data}">${
              document.getElementById("input-new-spent").value
            }</a> hours`;
            const button = document.getElementById(
              "partial-new-comment-form-actions"
            ).children[0];
            button.disabled = false;
            button.click();
          }),
      500
    );
  }
}

document.addEventListener("transitionend", initialize);
document
  .getElementsByClassName("js-new-comment-form")[0]
  .addEventListener("reset", () => {
    lastUrl = "";
    setTimeout(() => {
      initialize();
    }, 1000);
  });

initialize();
