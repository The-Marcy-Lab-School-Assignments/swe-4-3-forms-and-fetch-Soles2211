Short Response Questions
========================

Question 1: Promise Chaining
----------------------------

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((response) => {
        if (!response.ok) throw Error(`Fetch failed.`);
        const readingPromise = response.json();
      })
      .then((data) => {
        console.log(data); // undefined!
      })
      .catch((error) => console.error(error.message));

**Your Answer:**

The code logs undefined in the second `.then()` because the first `.then()` does not return `readingPromise`. The second `.then()` has no promise to handle, therefore, nothing to log.

Correction:

    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((response) => {
        if (!response.ok) throw Error(`Fetch failed.`);
        const readingPromise = response.json();
        return readingPromise;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error.message));

Question 2: Development Servers and CORS
----------------------------------------

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**

Since the student opened their `index.html` file in the browser using the `file://` protocol, their fetch calls and modules result in a CORS error because their file lives locally (on their computer) and is not available on the internet. They should instead open their html file in a live development server like Vite, which allows them to use the `http://` protocol throughout the entire development process in order to simulate a production environment. This way they are able to see how their application would work on the internet and all of their changes in real time.

Question 3: The `fetch` Response Object
---------------------------------------

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

    const response = await fetch(url);
    const data = await response.json();

**Your Answer:**

When we use `.fetch()` we check `response.ok` before reading the response body to see if the response succeeds or fails . This catches unavailable or broken APIs, as well as invalid URLs before an asynchronous process is started.

Question 4: Async/Await Conversion
----------------------------------

Rewrite the following `.then()`\-based code using `async`/`await` with `try`/`catch`:

    const getJoke = () => {
      return fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
        .then((response) => {
          if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
          return response.json();
        })
        .then((data) => {
          return { data, error: null };
        })
        .catch((error) => {
          return { data: null, error };
        });
    };

**Your Answer:**

    const getJoke = async () => {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart');
        if (!response.ok) {
          throw Error(`Fetch failed. ${response.status}`);
        }
    
        const data = await response.json();
        return { data, error: null };
      }
      catch (error) {
        return { data: null, error };
      }
    };

Question 5: `event.preventDefault()` and Form Handling
------------------------------------------------------

A student writes a form handler but the data never displays. Their code:

    form.addEventListener('submit', (event) => {
      const name = form.elements.name.value;
      document.querySelector('#output').textContent = name;
    });

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:**

The data never displays because the page automatically refreshes on form submit as a default behavior. To prevent this from happening, `event.preventDefault()` must be used at the start of the event handler.

Question 6: Putting It All Together
-----------------------------------

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

*   A. Parse the response body with `await response.json()`
    
*   B. Call `event.preventDefault()` to stop the page from reloading
    
*   C. Check `response.ok` and throw an error if the response failed
    
*   D. Update the DOM with the Pokemon's data
    
*   E. Add a `'submit'` event listener to the form
    
*   F. Handle errors in the `catch` block (display an error message)
    
*   G. Extract the Pokemon name from the form input
    
*   H. Send a GET request with `fetch()` using the Pokemon name in the URL
    
*   I. Reset the form with `form.reset()`
    
*   J. Create the HTML form with a name input and output elements for displaying results
    

**Your Answer:**

1.  J. Create the HTML form with a name input and output elements for displaying results
    
2.  E. Add a `'submit'` event listener to the form
    
3.  B. Call `event.preventDefault()` to stop the page from reloading
    
4.  H. Send a GET request with `fetch()` using the Pokemon name in the URL
    
5.  C. Check `response.ok` and throw an error if the response failed
    
6.  A. Parse the response body with `await response.json()`
    
7.  G. Extract the Pokemon name from the form input
    
8.  D. Update the DOM with the Pokemon's data
    
9.  F. Handle errors in the `catch` block (display an error message)
    
10.  I. Reset the form with `form.reset()`