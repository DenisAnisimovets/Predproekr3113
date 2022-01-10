
allUser()

function allUser() {
    fetch('/api/users').then(res => {
        res.json().then(data => {
            if (data.length > 0) {
                data.forEach(u => {
                    let temp = ""
                    let idStr = "id" + u.id
                    temp += '<tr id=' + idStr + '>'
                    temp += '<td>' + u.id + '</td>'
                    temp += '<td>' + u.name + '</td>'
                    temp += '<td>' + u.lastname + '</td>'
                    temp += '<td>' + u.age + '</td>'
                    temp += '<td>' + u.email + '</td>'
                    temp += '<td>' + u.roles.map(r => r.role) + '</td>'
                    temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-primary"' +
                        'data-bs-target="#editStatic" onclick=moduleEdit(' + u.id + ')' + '>Edit</button>' + '</td>'
                    temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-danger"' +
                        'data-bs-target="#deleteStatic" onclick=moduleDelete(' + u.id + ')' + '>Delete</button>' + '</td>'
                    document.getElementById('tableAllUsers').innerHTML += temp
                })
            }
        })
    })

    let newRoles = document.getElementById('newRoles')
    fetch('http://localhost:8080/api/users/roles').then(rol => {
        return rol.json()
    }).then(data => {
        editRoles.innerHTML = ''
        data.forEach((el) => {
            const option = document.createElement('option')
            option.innerHTML = el.role
            newRoles.innerHTML += `<option value="${el.role}">${el.role}</option>`

        })

    })
}

// модальное окно Edit
let editRoles = document.getElementById('userRoles')
let option = document.getElementById('option')

function moduleEdit(id) {
    fetch('/api/users/' + id).then(res => {
        res.json().then(userData => {
                document.getElementById('editId').value = userData.id
                document.getElementById('editFirstName').value = userData.name
                document.getElementById('editLastName').value = userData.lastname
                document.getElementById('editAge').value = userData.age
                document.getElementById('editEmail').value = userData.email
                document.getElementById('editPassword').value = userData.password
            }
        )
    })
    fetch('http://localhost:8080/api/users/roles').then(rol => {
        return rol.json()
    }).then(data => {
        editRoles.innerHTML = ''
        data.forEach((el) => {
            const option = document.createElement('option')
            option.innerHTML = el.role
            editRoles.innerHTML += `<option value="${el.role}">${el.role}</option>`
        })
    })
}

document.querySelector('#updateUser').addEventListener('click', (e) => {
    let roles = getRoles($('#userRoles').val())
    let editUser = {
        id: parseInt($('#editId').val()),
        name: $('#editFirstName').val(),
        lastname: $('#editLastName').val(),
        age: $('#editAge').val(),
        email: $('#editEmail').val(),
        password: $('#editPassword').val(),
        roles: roles
    }
    fetch('/api/users/' + parseInt($('#editId').val()), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editUser)
    }).then(u => u.json())
        .then(u => {
            let temp = ""
            let idStr = "id" + u.id
            temp += '<tr id=' + idStr + '>'
            temp += '<td>' + u.id + '</td>'
            temp += '<td>' + u.name + '</td>'
            temp += '<td>' + u.lastname + '</td>'
            temp += '<td>' + u.age + '</td>'
            temp += '<td>' + u.email + '</td>'
            temp += '<td>' + getRolesList(u.roles).map(r => r.role) + '</td>'
            temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-primary"' +
                'data-bs-target="#editStatic" onclick=moduleEdit(' + u.id + ')' + '>Edit</button>' + '</td>'
            temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-danger"' +
                'data-bs-target="#deleteStatic" onclick=moduleDelete(' + u.id + ')' + '>Delete</button>' + '</td>'
            document.getElementById("id" + parseInt($('#editId').val())).innerHTML = temp

            }
        )
})


// модальное окно Delete
function moduleDelete(id) {
    fetch('/api/users/' + id).then(res => {
        res.json().then(userData => {
                document.getElementById('deleteId').value = userData.id
                document.getElementById('deleteFirstName').value = userData.firstName
                document.getElementById('deleteLastName').value = userData.lastName
                document.getElementById('deleteAge').value = userData.age
                document.getElementById('deleteEmail').value = userData.email
                document.getElementById('deletePassword').value = userData.password

            fetch('http://localhost:8080/api/users/roles').then(rol => {
                rol.json().then(roleData => {
                    roleData.map(role => {
                        $('#deleteRole').append(
                            $('<option>').text(role.role))
                    })
                })
            })

            }
        )
})}



// кнопка New User
function addNewUser() {
    const newUser = {
        firstName: $('#addFirstName').val(),
        lastName: $('#addLastName').val(),
        age: $('#addAge').val(),
        email: $('#addEmail').val(),
        password: $('#passwordUser').val(),
        role: $('#newRoles').val()
    }


    fetch('/api/users' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })




}

document.querySelector('#deleteUser').addEventListener('click', (e) => {
    const deleteUser = {
        id: parseInt($('#deleteId').val()),
        firstName: $('#deleteFirstName').val(),
        lastName: $('#deleteLastName').val(),
        age: $('#deleteAge').val(),
        email: $('#deleteEmail').val(),
        password: $('#deletePassword').val(),
        role: $('#deleteRole').val()
    }


    fetch('/api/users/' + deleteUser.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteUser)
    }).then(document.getElementById("id" + parseInt($('#deleteId').val())).remove()
    )
})


//создание нового юзера
document.querySelector('#addNewUser').addEventListener('click', () => {

        let roles = getRoles($('#newRoles').val())

        const newUser = {
            name: $('#addFirstName').val(),
            lastname: $('#addLastName').val(),
            age: $('#addAge').val(),
            email: $('#addEmail').val(),
            password: $('#addPasswordUser').val(),
            roles: roles
        }


        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(u => u.json())
            .then(u => {
            let temp = ""
            let idStr = "id" + u.id
            temp += '<tr id=' + idStr + '>'
            temp += '<td>' + u.id + '</td>'
            temp += '<td>' + u.name + '</td>'
            temp += '<td>' + u.lastname + '</td>'
            temp += '<td>' + u.age + '</td>'
            temp += '<td>' + u.email + '</td>'
            temp += '<td>' + getRolesList(u.roles).map(r => r.role) + '</td>'
            temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-primary"' +
                'data-bs-target="#editStatic" onclick=moduleEdit(' + u.id + ')' + '>Edit</button>' + '</td>'
            temp += '<td>' + '<button data-bs-toggle="modal" class="btn-info btn btn-danger"' +
                'data-bs-target="#deleteStatic" onclick=moduleDelete(' + u.id + ')' + '>Delete</button>' + '</td>'
            document.getElementById('tableAllUsers').innerHTML += temp
        })
    }
)

function getRoles(list) {
    let roles = [];
    if (list.indexOf("ROLE_USER") >= 0) {
        roles.push({"id": 2});
    }
    if (list.indexOf("ROLE_ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    return roles;
}

function getRolesList(list) {
    let roles = [];
    list.forEach(item => {
        if (item.id == 1) {
            roles.push({"role": "ROLE_ADMIN"})
        }
        else if (item.id == 2) {
            roles.push({"role": "ROLE_USER"})
        }
    })
    return roles;
}