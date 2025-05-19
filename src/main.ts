import '/styles/styles.scss';

interface Joke {
	id?: string;
	joke: string;
	category?: string;
	author?: string;
	tag?: string;
	rating?: number;
}

interface JokeOfTheDayResponse {
	joke: Joke;
}

interface DeleteJokeResponse {
	message: string;
	success: boolean;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const jokesList = document.getElementById('jokesList');
if (!jokesList) {
	throw new Error("Can't find jokesList");
}

// Fetch Joke of the Day
const fetchJokeOfTheDay = async (): Promise<void> => {
	const jokeOfTheDay = document.getElementById('jokeOfTheDay');
	if (!jokeOfTheDay) return;

	try {
		const response = await fetch(`${baseUrl}/api/jokes/joke-of-the-day`);
		const contentType = response.headers.get("content-type");

		console.log("Joke of the Day response status:", response.status);

		if (!response.ok || !contentType?.includes("application/json")) {
			throw new Error("Invalid Joke of the Day response");
		}

		const data = (await response.json()) as JokeOfTheDayResponse;
		console.log(" Joke of the Day data:", data);

		// Graceful fallback if joke is missing
		const jokeText = data?.joke?.joke || 'Joke unavailable.';
		jokeOfTheDay.textContent = jokeText;

	} catch (error) {
		jokeOfTheDay.textContent = 'Joke unavailable.';
		console.error(' Error fetching joke of the day:', error);
	}
};

//  Get all jokes
const getAllJokes = async () => {
	const response = await fetch(`${baseUrl}/api/jokes`);
	return await response.json();
};

//  Get jokes by category
const getJokesDataByCategory = async (category: string) => {
	const response = await fetch(`${baseUrl}/api/jokes/search/cat?category=${category}`);
	return await response.json();
};

// Delete a joke
const deleteJoke = async (id: string): Promise<DeleteJokeResponse> => {
	try {
		const response = await fetch(`${baseUrl}/api/jokes/${id}`, { method: 'DELETE' });

		const message = await response.text();
		return {
			message,
			success: response.ok,
		};
	} catch (error) {
		return {
			message: error instanceof Error ? error.message : 'Unknown error',
			success: false,
		};
	}
};

// Search functionality
const handleSearch = async (event: Event) => {
	event.preventDefault();
	jokesList.innerHTML = '';

	let jokes: Joke[] = [];

	if (catOption === 'all') {
		jokes = await getAllJokes();
	} else {
		jokes = await getJokesDataByCategory(catOption);
	}

	jokes.forEach((joke: Joke) => {
		const jokeItem = document.createElement('li');
		jokeItem.textContent = joke.joke;
		jokesList.appendChild(jokeItem);
	});
};

// Dropdown
let catOption = 'all';
const dropdown = document.getElementById('dropdown') as HTMLSelectElement;
dropdown.addEventListener('change', (event) => {
	const selected = (event.target as HTMLSelectElement).value;
	catOption = selected;
});

// Search button
document.getElementById('searchBtn')?.addEventListener('click', handleSearch);

// Delete joke form
document.getElementById('delete-joke-form')?.addEventListener('submit', async (event) => {
	event.preventDefault();

	const deleteInput = document.getElementById('delete-joke-id-input') as HTMLInputElement;
	const jokeId = deleteInput.value.trim();

	if (!jokeId) {
		alert('Please enter a joke ID');
		return;
	}

	const result = await deleteJoke(jokeId);
	alert(result.success ? `Deleted: ${result.message}` : `Error: ${result.message}`);
	if (result.success) deleteInput.value = '';
});

// Add joke form
document.querySelector('.jokes__form--add')?.addEventListener('submit', async (event) => {
	event.preventDefault();

	const jokeInput = document.querySelector('.jokes__input--new') as HTMLInputElement;
	const categoryInput = document.querySelector('.jokes__input--category') as HTMLInputElement;
	const authorInput = document.querySelector('.jokes__input--author') as HTMLInputElement;
	const tagInput = document.querySelector('.jokes__input--tag') as HTMLInputElement;

	const newJoke: Joke = {
		joke: jokeInput.value.trim(),
		category: categoryInput.value.trim(),
		author: authorInput.value.trim(),
		tag: tagInput.value.trim(),
		rating: 0
	};

	if (!newJoke.joke || !newJoke.category || !newJoke.author || !newJoke.tag) {
		alert('Please fill in all fields!');
		return;
	}

	try {
		const response = await fetch(`${baseUrl}/api/jokes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newJoke)
		});

		if (!response.ok) {
			throw new Error(`Failed to add joke: ${response.status}`);
		}

		alert('Joke added successfully!');

		// Clear form
		jokeInput.value = '';
		categoryInput.value = '';
		authorInput.value = '';
		tagInput.value = '';

	} catch (error) {
		console.error('Error adding joke:', error);
		alert('There was a problem adding your joke.');
	}
});

// On page load
document.addEventListener('DOMContentLoaded', fetchJokeOfTheDay);
