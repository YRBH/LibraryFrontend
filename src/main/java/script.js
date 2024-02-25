// Функция для добавления книги
var inputAuthor = document.getElementById("author")
var inputYear = document.getElementById("year")
var inputName = document.getElementById("name")

var inputNewId = document.getElementById("newId")
var inputNewAuthor = document.getElementById("newAuthor")
var inputNewYear = document.getElementById("newYear")
var inputNewName = document.getElementById("newName")

var inputNameInput = document.getElementById("nameInput")
var inputLastnameInput = document.getElementById("lastnameInput")

var inputUserId = document.getElementById("userId")
var inputBookId = document.getElementById("bookId")

function addBook() {
    var author = inputAuthor.value;
    var year = inputYear.value;
    var name = inputName.value;

    if (author === "") {
        inputAuthor.style.backgroundColor = "red"
        return
    }
    if (year === "") {
        inputYear.style.backgroundColor = "red"
        return
    }
    if (name === "") {
        inputName.style.backgroundColor = "red"
        return
    }
    fetch('http://localhost:8080/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: author,
            year: year,
            name: name
        })
    })
        .then(response => {
            if (response.ok) {
                // Книга успешно добавлена
                console.log('Книга успешно добавлена');
                location.reload()
                // Обновляем страницу или как-то еще обрабатываем успех
            } else {
                // Обработка ошибки при добавлении книги
                console.error('Ошибка при добавлении книги');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });

}

// Функция для изменения информации о книге
function updateBookById() {
    var id = inputNewId.value;
    var author = inputNewAuthor.value;
    var year = inputNewYear.value;
    var name = inputNewName.value;
    fetch(`http://localhost:8080/book/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: author,
            year: year,
            name: name
        })
    })
        .then(response => {
            if (response.ok) {
                // Информация о книге успешно изменена
                console.log('Информация о книге успешно изменена');
                location.reload()
                // Обновляем страницу или как-то еще обрабатываем успех
            } else {
                // Обработка ошибки при изменении информации о книге
                console.error('Ошибка при изменении информации о книге');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}
document.addEventListener("DOMContentLoaded", function () {
    // Выполнение GET запроса
    fetch('http://localhost:8080/book')
        .then(response => response.json())
        .then(data => {
            // Обработка полученных данных и вывод на страницу
            const tableBody = document.getElementById('booksTable');
            data.forEach(book => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = book.id;
                row.insertCell(1).textContent = book.name;
                row.insertCell(2).textContent = book.author;
                row.insertCell(3).textContent = book.year;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
function displayBooks(books) {
    const tableBody = document.getElementById('booksTable');
    // Очистить таблицу перед обновлением
    tableBody.innerHTML = '<tr><th>ID</th><th>Name</th><th>Author</th><th>Year</th></tr>';
    // Вывести книги в таблицу
    books.forEach(book => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = book.id;
        row.insertCell(1).textContent = book.name;
        row.insertCell(2).textContent = book.author;
        row.insertCell(3).textContent = book.year;
    });
}

function searchBook() {
    const searchInput = document.getElementById('searchInput').value;
    // Проверка на ввод числа
    if (!isNaN(searchInput)) {
        fetch(`http://localhost:8080/book/${searchInput}`)
            .then(response => response.json())
            .then(data => {
                // Показать результат поиска
                displayBooks([data]);
            })
            .catch(error => {
                console.error('Error searching book:', error);
                alert('Book not found');
            });
    } else {
        alert('Please enter a valid ID');
    }
}

function deleteBook() {
    const searchInput = document.getElementById('searchInput').value;
    // Проверка на ввод числа
    if (!isNaN(searchInput)) {
        fetch(`http://localhost:8080/book/${searchInput}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Успешно удалено
                    console.log('Book deleted successfully');
                    // Обновить список книг после удаления
                    fetch('http://localhost:8080/book')
                        .then(response => response.json())
                        .then(data => {
                            displayBooks(data);
                            location.reload();
                        })
                        .catch(error => console.error('Error fetching books:', error));
                } else {
                    // Книга не найдена
                    alert('Book not found');
                }
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert('Failed to delete book');
            });
    } else {
        alert('Please enter a valid ID');
    }
}

function createUser() {
    var name = inputNameInput.value;
    var lastname = inputLastnameInput.value;

    // Проверяем, что оба поля заполнены
    if (name === '' || lastname === '') {
        // Если какое-то из полей не заполнено, выделяем красным и выводим сообщение
        if (name === '') {
            inputNameInput.style.backgroundColor = "red";
        }
        if (lastname === '') {
            inputLastnameInput.style.backgroundColor = "red";
        }
        alert('Please fill in all fields');
        return; // Прекращаем выполнение функции, если не все поля заполнены
    }

    const userData = {
        name: name,
        lastname: lastname
    };

    fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            console.log('User created successfully');
            location.reload();
        })
        .catch(error => {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        });
}


document.addEventListener("DOMContentLoaded", function () {
    // Выполнение GET запроса
    fetch('http://localhost:8080/user')
        .then(response => response.json())
        .then(data => {
            // Обработка полученных данных и вывод на страницу
            const tableBody = document.getElementById('usersTable');
            data.forEach(user => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = user.id;
                row.insertCell(1).textContent = user.userName;
                row.insertCell(2).textContent = user.userLastName;
                row.insertCell(3).textContent = inputBookId.value
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
function borrowBook() {
    var userId = inputUserId.value
    var bookId = inputBookId.value
    // const userName = document.getElementById('userName').value;
    // const userId = document.getElementById('userId').value;

    // Проверка наличия значений в полях
    if (userId.trim() === '' || bookId.trim() === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    // Выполнение логики для взятия книги
    // Например:
    console.log(`Пользователь ${userId} взял книгу с ID ${bookId}`);
}

function returnBook() {
    var userId = inputUserId.value
    var bookId = inputBookId.value
    // const userName = document.getElementById('userName').value;
    // const userId = document.getElementById('userId').value;

    // Проверка наличия значений в полях
    if (userId.trim() === '' || bookId.trim() === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    // Выполнение логики для возврата книги
    // Например:
    console.log(`Пользователь ${userId} вернул книгу с ID ${bookId}`);
}

// Остальные функции для удаления книги, получения списка книг и т.д.
// Можно реализовать аналогично, используя fetch API
