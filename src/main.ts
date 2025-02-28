import "/styles/styles.scss";

// create another function that will call another endpoint ie the getAlljokes enpoint

const jokesList = document.getElementById("jokesList");

if (!jokesList) {
    throw new Error("Can't find jokesList");
}

const getAllJokes = async () => {
    const result = await fetch(
        `https://definite-deloris-cogger101-14d80470.koyeb.app/api/jokes`
    );
    const allJokesData = await result.json();
    // console.log("running", allJokesData);
};

const getJokesDataByCategory = async (category: String) => {
    const result = await fetch(
        `https://definite-deloris-cogger101-14d80470.koyeb.app/api/jokes/search/cat?category=${category}`
    );
    const data = await result.json();
    // console.log("all category data =>>>", data);
    jokesList.innerText = `${data.jokes}`;
    data.forEach();
};

const handleSearch = (event: Event, category: String) => {
    event.preventDefault();
    console.log("Button clicked");
    // getJokesDataByCategory(category);
    switch (catOption) {
        case "futuristic":
            getJokesDataByCategory(category);
            break;
        case "dark":
            getJokesDataByCategory(category);
            break;
        case "geek":
            getJokesDataByCategory(category);
            break;
        default:
            getAllJokes();
    }
};
let catOption: string = "Select all";
const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
dropdown.addEventListener("change", (event: Event) => {
    const select = event?.target as HTMLSelectElement;
    catOption = select.value;
    console.log(catOption);
});

document.getElementById("searchBtn")?.addEventListener("click", (event) => {
    // swtich that will decide what string to feed the handleSearch
    // function dpeending on the option selected in the dropdown

    // add control flow to decide which api call to do
    handleSearch(event, catOption);
});
