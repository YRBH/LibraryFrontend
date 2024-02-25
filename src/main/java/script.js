// Функция для добавления книги
var inputAuthor = document.getElementById("author")
var inputYear = document.getElementById("year")
var inputName = document.getElementById("name")

var inputNewId = document.getElementById("newId")
var inputNewAuthor = document.getElementById("newAuthor")
var inputNewYear = document.getElementById("newYear")
var inputNewName = document.getElementById("newName")


function addBook() {
    var author = inputAuthor.value;
    var year = inputYear.value;
    var name = inputName.value;

    if(author===""){
        inputAuthor.style.backgroundColor="red"
        return
    }if(year===""){
        inputYear.style.backgroundColor="red"
        return
    }if(name===""){
        inputName.style.backgroundColor="red"
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
document.addEventListener("DOMContentLoaded", function() {
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
// Остальные функции для удаления книги, получения списка книг и т.д.
// Можно реализовать аналогично, используя fetch API
