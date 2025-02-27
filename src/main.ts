import '/styles/styles.scss';

// create another function that will call another endpoint ie the getAlljokes enpoint

const jokesList = document.getElementById('jokesList');

if (!jokesList) {
    throw new Error("Can't find jokesList");
}

const fetchJokeOfTheDay = async (): Promise<void> => {
    const jokeOfTheDay = document.getElementById('jokeOfTheDay');
    if (!jokeOfTheDay) return;

    try {
        const response = await fetch(
            'https://definite-deloris-cogger101-14d80470.koyeb.app/api/jokes/joke-of-the-day'
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const jokeText = data.joke.joke;

        jokeOfTheDay.textContent = `${jokeText}`;
    } catch (error) {
        jokeOfTheDay.textContent = 'Joke unavailable.';
        console.error('Error fetching joke:', error);
    }
};

const getAllJokes = async () => {
    const result = await fetch(
        `https://definite-deloris-cogger101-14d80470.koyeb.app/api/jokes`
    );
    const allJokesData = await result.json();
    console.log('running', allJokesData);
    return allJokesData;
};

const getJokesDataByCategory = async (category: String) => {
    const result = await fetch(
        `https://definite-deloris-cogger101-14d80470.koyeb.app/api/jokes/search/cat?category=${category}`
    );
    const data = await result.json();
    return data;
};

const handleSearch = async (event: Event, category: String) => {
    console.log('Button clicked');
    event.preventDefault();
    // getJokesDataByCategory(category);
    switch (catOption) {
        case 'futuristic':
        case 'dark':
        case 'geek':
            return await getJokesDataByCategory(category);
        default:
            return await getAllJokes();
    }
};
let catOption: string = 'Select all';
const dropdown = document.getElementById('dropdown') as HTMLSelectElement;
dropdown.addEventListener('change', (event: Event) => {
    const select = event?.target as HTMLSelectElement;
    catOption = select.value;
    console.log(catOption);
});

document
    .getElementById('searchBtn')
    ?.addEventListener('click', async (event) => {
        jokesList.innerHTML = '';
        // swtich that will decide what string to feed the handleSearch
        // function dpeending on the option selected in the dropdown

        // add control flow to decide which api call to do
        const jokes = await handleSearch(event, catOption);
        jokes.forEach((joke) => {
            const jokePara = document.createElement('li');
            jokePara.appendChild(document.createTextNode(`${joke.joke}`));

            jokesList.appendChild(jokePara);
        });
    });
// console.log("all category data =>>>", data);
// jokesList.innerText = `${data.jokes}`;
// data.forEach(joke);

document.addEventListener('DOMContentLoaded', fetchJokeOfTheDay);
