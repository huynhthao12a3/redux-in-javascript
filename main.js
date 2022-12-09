console.log(window.Redux);
const { createStore } = window.Redux;
// SETUP REDUX STORE
// state
// reducer
// store
const initialState = ["Listen to music"];

const hobbyReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_HOBBY": {
			console.log("state: ", state);
			const newList = [...state];
			newList.push(action.payload);
			return newList;
		}
		default:
			return state;
	}
};

const store = createStore(hobbyReducer);

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
	if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

	const ulElement = document.querySelector("#hobby-list-id");
	if (!ulElement) return;

	// reset previous content of ul
	ulElement.innerHTML = "";
	for (const hobby of hobbyList) {
		const liElement = document.createElement("li");
		liElement.textContent = hobby;
		ulElement.appendChild(liElement);
	}
};

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
console.log("initial state: ", initialHobbyList);
renderHobbyList(initialHobbyList);

store.subscribe(() => {
	console.log("state update: ", store.getState());
	const newHobbyList = store.getState();
	renderHobbyList(newHobbyList);
});

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector("#hobby-form-id");
if (hobbyFormElement) {
	const handleFormSubmit = (e) => {
		e.preventDefault();

		const hobbyTextElement = hobbyFormElement.querySelector("#hobby-text-id");
		if (!hobbyTextElement) return;

		console.log(`\n-----\nsubmit form: `, hobbyTextElement.value);

		const action = {
			type: "ADD_HOBBY",
			payload: hobbyTextElement.value,
		};
		store.dispatch(action);

		hobbyFormElement.reset();
	};
	hobbyFormElement.addEventListener("submit", handleFormSubmit);
}
