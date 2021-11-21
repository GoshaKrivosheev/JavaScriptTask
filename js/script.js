/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    let adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        let favourit = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if(favourit) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);
            sortList(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }
        event.target.reset();
    });
    
    const deleteElement = (item) => {
        item.forEach(item => {
            item.remove();
        });
    };
    deleteElement(adv);

    const changeElement = () => {
        genre.textContent = 'драма';
        
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    changeElement();
    
    function sortList(arr) {
        arr.sort();
    }

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortList(films);
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        movieList.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    createMovieList(movieDB.movies, movieList);
});



// let adv = document.querySelectorAll('.promo__adv img'),
//     poster = document.querySelector('.promo__bg'),
//     genre = poster.querySelector('.promo__genre'),
//     filmList = document.querySelector('.promo__interactive-list');


// adv.forEach(item => {
//     item.remove();
// });


// genre.textContent = 'драма';

// poster.style.backgroundImage = 'url("img/bg.jpg")';

// filmList.innerHTML = '';

// movieDB.movies.forEach((film, i) => {
//     filmList.innerHTML += `
//         <li class="promo__interactive-item">${i + 1} ${film}
//             <div class="delete"></div>
//         </li>
//     `;
// });

// poster.style.cssText = 'background: url("img/bg.jpg") center center no-repeat; background-size: cover';

// let drama = document.createElement('div');
// drama.textContent = 'ДРАМА';
// drama.classList.add('promo__genre');
// comedy.replaceWith(drama);
