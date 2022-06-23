var users = [
    {
        id: "123456789",
        createdDate: "2021-01-06",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
    {
        id: "852963741",
        createdDate: "2021-09-15",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
]

var usersTable = document.querySelector("table#users-table")

function insertCell(userObject, index) {
    var userRow = usersTable.insertRow()
    const emptyCell = document.getElementById("emptyCell")

    if (emptyCell) {
        emptyCell.remove()
    }

    for (const property in userObject) {
        const cellClasses = ["border-b", "border-slate-100", "p-4", "pl-8", "text-slate-500"]

        var cell = userRow.insertCell()
        cell.classList.value = cellClasses.join(" ")
        if (property === "status") {
            const spanClasses = ['w-full', 'p-1.5', 'rounded', "text-white"]

            let span = document.createElement("span")
            span.classList.value = spanClasses.join(" ")
            span.innerText = userObject[property]

            switch (userObject[property]) {
                case "En validation":
                    span.classList.add("on-validation")
                    break;

                case "Validé":
                    span.classList.add("valide")
                    break;

                case "Rejeté":
                    span.classList.add("rejected")
                    break;
            }

            cell.appendChild(span)
        } 
        else {
            cell.innerText = userObject[property]
        }
    }

    // Ajout d'icone de suppression :

    var deleteCell = userRow.insertCell()
    deleteCell.classList.value = ['flex justify-center p-4', "border-b", "border-slate-100"].join(" ")
    
    var img = document.createElement("img")
    img.setAttribute("src", "./trash.png")
    img.classList.value = ['h-5', 'cursor-pointer'].join(" ")

    deleteCell.appendChild(img)

    img.addEventListener("click", () => {
        users.splice(index, 1)
        userRow.remove()

        // localStorage.setItem('users', JSON.stringify(users))

    })
}


document.addEventListener("DOMContentLoaded", () => {
    // Get users from local storage
    // users = JSON.parse(localStorage.getItem('users'))
    users.forEach((user, index) => {
        insertCell(user, index)
    });
})


const form = document.querySelector("form#form")

// Adding new User Form
function submitForm() {

    const userData = Array.from(form.children)
        .map(el => el.lastElementChild)
        .reduce(function (result, item) {
            result[item.name] = item.value;
            return result;
        }, {})


    userData.createdDate = moment(userData['createdDate']).format("DD/MM/YYYY")
    const id = users.length ? users[users.length - 1].id + 1 : 1
    const data = Object.assign({
        id
    }, userData)

    insertCell(data)

    users.push(data)
    
    // Add to local storage
    // localStorage.setItem('users', JSON.stringify(users))

    toggleModal(false)
}


// Toggle Modal

function toggleModal(testing) {
    let modal = document.querySelector("#modal_overlay")
    if (testing) {
        modal.classList.remove("hidden")
    }
    else modal.classList.add("hidden")
    
}