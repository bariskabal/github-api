// Select Elements
const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');

const github = new Github();
const ui = new UI();



eventListener();

function eventListener() {
    githubForm.addEventListener('submit',getData);
    clearLastUsers.addEventListener('click',clearAllSearched);
    document.addEventListener('DOMContentLoaded', getAllSeached);
}

function getData(e) {
    let username = nameInput.value.trim();
    if(username === '') {
        ui.showAlert('danger','Lütfen bir kullanıcı adı girin')
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === 'Not Found'){
                ui.showAlert('danger','Böyle bir kullanıcı bulunamadı...')
            }
            else {
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
                Storage.addSearchedUserToStorage(username)
                getAllSeached();
                ui.showAlert('success','Kullanıcı bulundu')
            }
        })
        .catch(err => console.log(err))
    }


    ui.clearInput();
    e.preventDefault();
}


function clearAllSearched() {
    if(confirm('Emin misiniz?')) {
        Storage.clearAllSearchedUsersFromStorage();
        getAllSeached();
    }
}

function getAllSeached(){
    ui.getAllSearched(Storage.getSearchedUsersFromStorage());
}
