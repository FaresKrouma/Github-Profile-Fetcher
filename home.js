const GITHUBAPIKEY = "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";
const API = "https://api.github.com/users/";
const form = document.getElementById("form");
const main = document.getElementById("main");

async function searchUser(user) {
   const resp = await fetch("https://api.github.com/users/" + user);
   const respData = await resp.json();
   console.log(respData);
   fetchUserDetails(respData);
}

form.addEventListener("submit", (e) => {
   const input = document.getElementById("input");
   const search = input.value;
   e.preventDefault();
   searchUser(search);
   input.value = "";
});

function fetchUserDetails(user) {
   if (user.message !== "Not Found") {
      const userCard = document.createElement("div");
      userCard.classList.add("body-container");
      userCard.innerHTML = `
            <div class="body-header">
                <img src="${user.avatar_url}" alt="">
                <div class="header-info">
                    <p><i class="fas fa-user-circle"></i>${user.login}</p> 
                    <h4>${user.name}</h4>
                    <div class="followers">
                        <span><i class="far fa-arrow-alt-circle-down"></i> Followers:<pre>${
                           user.followers
                        }</pre></span>
                        <span><i class="far fa-arrow-alt-circle-up"></i> Following:<pre>${
                           user.following
                        }</pre></span>
                    </div>
                </div>
            </div>
            <div class="body-main">
                <ul class="info-list">
                <li><i class="fas fa-map-marker-alt"></i> Location: <pre>${
                   user.location
                }</pre></li>
                <li><i class="fas fa-user-check"></i> Member Since: <pre>${user.created_at.slice(
                   0,
                   10
                )}</pre></li>
                <li><i class="fas fa-file-code"></i> Public Repositories (${
                   user.public_repos
                }): <pre><a target="_blank">${user.repos_url}</a></pre></li>
                </ul>
            </div>
            `;
      main.innerHTML = "";
      main.appendChild(userCard);
   }

   if (user.message === "Not Found") {
      const h3 = document.createElement("h3");
      main.innerHTML = "";
      h3.innerHTML = "Sorry 😢 could not find user.";
      main.appendChild(h3);
   }
}
main.innerHTML = "";
