
const form = document.getElementById('github-form');
form.addEventListener('submit', handleSubmit);


function handleSubmit(e){
    e.preventDefault();
    let input = e.target[0].value;
    fetch(`https://api.github.com/search/users?q=${input}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(json => renderUser(json))
}

function renderUser(data) {
    data.items.forEach(user => {
        gitUser = {
            login: user.login,
            img: user.avatar_url
        }
        const userList = document.getElementById('user-list')
        let userNameElement = document.createElement('li');
        userNameElement.textContent = user.login;
        let userImg = document.createElement('img');
        userImg.src = user.avatar_url;
        userImg.id = user.login;
        userImg.addEventListener('click', handleUserClick);
        userNameElement.appendChild(userImg);
        userList.appendChild(userNameElement);
    })
}

function handleUserClick(e){
    e.preventDefault();
    fetch(`https://api.github.com/users/${e.target.id}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(json => renderRepos(json))
}

function renderRepos(data){
    const repoList = document.getElementById('repos-list');
    data.forEach(repo => {
        
        let p = document.createElement('p');
        p.innerHTML = `<a href=${repo['html_url']}>${repo['name']}</a>`;
        repoList.appendChild(p); 
    })
}

