# Books | Authors - Nam Dao - nhd36

## Submission HW1

#### Design

1. How did you structure your API's requests and responses?

- I separated an API into two separate layers, which I usually did when I was working with Java or Python web server: Controller and Service.
- Controller: I used this layer to parse the data from request and modify their types to get the type that I desired for further processing. Data from multiple sources such as Path Params, Query Params, Headers, Body, ...
- Service: I used this layer to communicate with database, making query and logic should be appear in this layer.

2. How did you validate inputs, what restrictions did you choose, and why?

- For validating input, Controller layer should be part to do data validation, check type and parse type into good shape before transfering it to the Service layer to interact with database.
- Restriction I chose mostly related to data type, as it may cost error when interacting with database. With that being said, these restrictions will prevent the application to crash in the middle of process.

3. What edge cases did you handle and how? What edge cases did you choose not to handle?

- Most of the edge case I handled was about corresponding datatype with database column. I do data validation and parsing into the correct type so when the data interacted with database, it would not crash anything.
- Edge case that I did not choose to handle is data appears to be NULL. The reason I am not handling those case is because there is no restriction in original schema regarding column must be NOT NULL. With that being said, even if inputting NULL data into the database, it would not cause any issue or crash the program.

#### Typescript

1. Keep track of the bugs Typescript helped you catch and the ones it didn't catch. What are some of the issues Typescript helped you prevent? What are some of the holes in the type system?

- Type static is always favorable compare to dynamic type, as it helps us to specify the type that we want to use in specific case. For me, in this project, the best thing I have experienced from Typescript is that the static type helped me avoiding so many bugs related to data type, which happens to me a lot when I was working with Javascript.

- During my development process, I noticed that there is a bug when I parse the variable from the request to the desirable type. \<Number\>req.body.variable_name should return us the **Number** variable. However, instead, it gave me string. The annoying thing is that when I put this variable into an object with interface that set the variable to be Number also accept a string value, which should not be allowed? I have to made extra effort of parsing the string into number. Lucky for me, everything works fine.

2. What kinds of values did you struggle to type correctly? Are there any Typescript topics that are still confusing you?

- I don't find Typescript is confusing. I think is superb comparing to Javascript because of static type, better control of data flow and data type for every variable. At first, I was a little bit struggling with how to run Typescript, as I was expecting it to compile directly without translating them into Javascript. It took me a while to understand the purpose of **out** directory, as I keep deleting them after every build.

#### Testing

1. What was your experience writing tests? Was it boring, soothing, rewarding? How did they affect your development process?

- It was exhausting process. I wrote 40+ test cases with nearly new 1000 lines of code. It is really time consuming but helped me realizing some of the potential bugs and fix them. It was kind of soothing and rewarding in the end, when I finished my last test case, I feel pretty relief.

2. Did your tests help you find any bugs? If so, which ones?

- Mostly not, all of my code was manually tested during the development process, so I don't really find any bugs along the way. Some of the API returns unclear status code, so I just modify them.

3. How would you structure your testing differently in the future? What did you learn while testing?

- This is the test structure that I used in every coding project. I think it is pretty reasonable to split each API service into different testing sections.
- For now, I am still looking over some sample to see if I can improve anything. One thing that I know that I need to improve is how I structure the test cases. Right now, the test cases of the whole projects are lying in just 1 file. However, I believe that we can split them into different files, maybe folders, for better maintaining and improving readability. I am hurting my eyes just to look over 1000 lines of code to find the part that I want to fix. 

## Submission HW2

#### Design

1. Keep track of the changes you made to your back-end as you implemented your front-end. What changes did you need to make and why? Would you structure your back-end differently in the future?

- I didn't really make any changes in Back End structure.
- However, I still  believe that it is a mess and will need so rework in the future. Right now, I am putting the database integration with all **service** folder. However, in the future, I will separate it into a separate folder that only in charge of communicating data with the database.

2. How did you structure the UI of your search inputs and forms? What choices did you make and why?

- As for me, I found it pretty hard to think of the way how to design a structure for Front End components in order to reuse multiple functionalities. Personally, I did not code with React really often, so I need to take some reference from the website of how they structure components in the project.

3. Did you perform client-side validation or did you rely on server-side validation alone? What are the pros/cons of making either choice?

- I leave the validation to the server-side.  The client-side only in charge of passing data to the API and display the response that the APIs return.
- I think the pros would just be more secure towards data type, I don't think there is much difference between client-side validation and server-side validation.

#### React

1. What was your experience manipulating state with React components (especially with the useEffect hook)? What kinds of things did you struggle with?

- My biggest struggle was deploying the React with Express server. Since I am using external library called **react-router-dom**, this conflicts with how Express works as React did not generate the folder structure that Express wants in order to render the public folder. So I tried but it did not give me any green light, so I make a little alternation in rendering components by removing **react-router-dom** and render by state instead.

2. What was your experience using types with the front-end? Did they catch any bugs? Did you have to make a lot of manual annotations? Did you resort to using any frequently, and if so, why?

- I find it pretty annoying when for some datatype, I could not figure it out the way to parse the data into the desired datatype. I didn't catch any bugs due to Typescript neither, so I think the experience is pretty mediocre.
- I didnt use **any** frequently. In fact, I didn't use **any**. I make a lot of manual **Type** and trying to parse data to those following types.

3. Compare and contrast your experiences writing an SPA front-end with React to writing a MPA front-end like we did in CS375.

- I didn't take CS375 with you so I don't really sure what you are referring to. But running SPA with Express is definitely better experience than MPA due to the way that React's build folder. The way that Express expose its static folder is by file structure, which means that index.html is always the first choice when people visit http://{domain_name}:{port}/. If you want to add path variables, you need to make sure that the folder matching with that path variables exists.
- React only renders index.html and whole bunch of JS and CSS. There is no file structure, so Express could not work with ***react-router-dom***.

## Submission HW3

#### UI

1. How did you integrate the book editing and deletion into your UI? Why did you choose the design you did?

- For PUT, I just set another form that required user to choose 1 row data on the table and edit that data. If the user does not choose any row data in the table, I disabled all the button.
- For DELETE, I add 1 more column in each row of data a button. Each button is associated with its data ID that will call the API with axios if clicked and result in deleting that specific data point.
- I noticed that the PUT endpoint is pretty similar to CREATE, so I decided to implement it that way. For DELETE, I think each row of data can directly have a button next for it so  the user is easier to follow and it also have a better navigation around the page, without causing too complicated UI.

2. How difficult was book editing/deletion to implement?

- It was not really hard to implement. But since I suck at splitting up the components and managing state flows through the DOM tree, I have to make some changes for the states to be passed properly down from the root tree, so it causes a mess at the first time and need to clarify a lot.

#### Material UI

1. How easy was it to refactor your existing UI to use Material UI? What pitfalls did you run into trying to use it?

- I was using Material UI on the original, but I don't have any comment for this question. However, I know one thing is that Material UI gives me a speedy development. All the component that we try to customize with raw HTML and CSS has already been available in Material UI libraries. We just need to call the API and make a few changes from the MUI components to have a full completed version of UI. Moreover, it is very reusable and we can use anywhere that we want.

#### Material UI

1. How difficult was it to add the PUT endpoint and associated tests? Did your experience writing the POST endpoints make writing the PUT endpoints smoother?

- I wrote test for PUT when I was working on HW1 so I don't think that it was hard to add PUT endpoint and its associated tests. Typically, it is just POST endpoint with the ability to check the existence and its other associated data to make sure that the newly added data satisfies the integrity of the database. 
- Yeah, I copy/paste POST endpoints and add more features to make PUT endpoints.


## Submission HW4

#### UI

1. How did you integrate authorization into your UI? How did you prevent or warn users when they weren’t authorized to perform an action?

- I implement authorization by adding another authorize middleware into each API, so if they don't have the required Cookies and contains the right type of token, Backend API will throws 401 status code with unauthorized message.
- For Frontend, I only rendered components once the user successfully authorized with Authorization API. If the user fails to authorize, only sign in / sign up component will be rendered.

2. What did you struggle with when adding logins and authorization to your front-end?

- I didn't really have any trouble trying to implement the authorization. The hardest thing I tried to figure it out is how to add authorize middleware into each router.

#### Login endpoint

1. What did you struggle with when adding logins and authorization to your back-end?

- Same as above, I did not have a lot of difficulties with this homework.


## Submission HW5

#### UI

1. How did you integrate the book editing and deletion into your UI? Why did you choose the design you did?

- For PUT, I just set another form that required user to choose 1 row data on the table and edit that data. If the user does not choose any row data in the table, I disabled all the button.
- For DELETE, I add 1 more column in each row of data a button. Each button is associated with its data ID that will call the API with axios if clicked and result in deleting that specific data point.
- I noticed that the PUT endpoint is pretty similar to CREATE, so I decided to implement it that way. For DELETE, I think each row of data can directly have a button next for it so  the user is easier to follow and it also have a better navigation around the page, without causing too complicated UI.

2. How difficult was book editing/deletion to implement?

- It was not really hard to implement. But since I suck at splitting up the components and managing state flows through the DOM tree, I have to make some changes for the states to be passed properly down from the root tree, so it causes a mess at the first time and need to clarify a lot.

#### Material UI

1. How easy was it to refactor your existing UI to use Material UI? What pitfalls did you run into trying to use it?

- I was using Material UI on the original, but I don't have any comment for this question. However, I know one thing is that Material UI gives me a speedy development. All the component that we try to customize with raw HTML and CSS has already been available in Material UI libraries. We just need to call the API and make a few changes from the MUI components to have a full completed version of UI. Moreover, it is very reusable and we can use anywhere that we want.

#### Material UI

1. How difficult was it to add the PUT endpoint and associated tests? Did your experience writing the POST endpoints make writing the PUT endpoints smoother?

- I wrote test for PUT when I was working on HW1 so I don't think that it was hard to add PUT endpoint and its associated tests. Typically, it is just POST endpoint with the ability to check the existence and its other associated data to make sure that the newly added data satisfies the integrity of the database. 
- Yeah, I copy/paste POST endpoints and add more features to make PUT endpoints.


## API Endpoints

#### Books API

- Get all books by filter pub_year or title

```
GET <http://{domain_name}:3000/books?from=&to=&title=>

* Request:
- Query param:
{
    from: <int> - optional,
    to: <int> - optional,
    title: <string> - optional
}

* Response:

- <200> success:
{
    data: [
        {
            id: <string>,
            title: <string>,
            pub_year: <int>,
            genre: <string>,
            author_id: <string>
        },
        ...
    ],
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Get 1 book by ID

```
GET <http://{domain_name}:3000/books/{book_id}>
* Request:
- Path param:
{
    book_id: <int>
}

* Response: 
- <200> success:
{
    data: {
        id: <string>,
        title: <string>,
        pub_year: <int>,
        genre: <string>,
        author: <string>
    },
    status_code: 200
    message: <string>
}
- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Create 1 book

```
POST <http://{domain_name}:3000/books>
* Request:

- Headers: 
{
    Content-Type: application/json
}

- Body:
{
    title: <string>,
    pub_year: <int>,
    genre: <string>,
    author: <string>
}

* Response:

- <200> success:
{
    data: {
        id: <string>,
        title: <string>,
        pub_year: <int>,
        genre: <string>,
        author: <string>
    },
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Delete 1 book by ID

```
DELETE <http://{domain_name}:3000/books/{book_id}>
* Request:
- Path param:
{
    book_id: <int>
}

* Response: 
- <200> success:
{
    data: null,
    status_code: 200
    message: <string>
}
- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Update 1 book

```
PUT <http://{domain_name}:3000/books/{bookId}>
* Request:

- Path Param:
{
    bookId: <string>
}

- Headers: 
{
    Content-Type: application/json
}

- Body:
{
    title: <string> - optional,
    pub_year: <int> - optional,
    genre: <string> - optional,
    author: <string> - optional
}

* Response:

- <200> success:
{
    data: null,
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

#### Authors API

- List and filter for authors by prefix author's name

```
GET <http://{domain_name}:3000/authors?name=>

* Request:
- Query param:
{
    name: <string> - optional
}

* Response:
- <200> success:
{
    data: [
        {
            id: <string>,
            name: <string>,
            bio: <string>
        },
        ...
    ],
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Get 1 author by ID

```
GET <http://{domain_name}:3000/authors/{author_id}>
* Request:
- Path param:
{
    author_id: <int>
}

* Response: 
- <200> success:
{
    data: {
        id: <string>,
        name: <string>,
        bio: <string>
    },
    status_code: 200
    message: <string>
}
- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Create 1 author

```
POST <http://{domain_name}:3000/authors>
* Request:

- Headers: 
{
    Content-Type: application/json
}

- Body:
{
    name: <string>,
    bio: <string>
}

* Response:

- <200> success:
{
    data: {
        id: <string>,
        name: <string>,
        bio: <string>
    },
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Delete 1 author by ID

```
DELETE <http://{domain_name}:3000/authors/{author_id}>
* Request:
- Path param:
{
    author_id: <int>
}

* Response: 
- <200> success:
{
    data: {
        id: <string>,
        name: <string>,
        bio: <string>
    },
    status_code: 200
    message: <string>
}
- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```

- Update 1 book

```
PUT <http://{domain_name}:3000/authors/{authorId}>
* Request:

- Path Param:
{
    authorId: <string>
}

- Headers: 
{
    Content-Type: application/json
}

- Body:
{
    name: <string> - optional,
    bio: <int> - optional,
}

* Response:

- <200> success:
{
    data: null,
    status_code: 200
    message: <string>
}

- <non-200> failed:
{
    data: null,
    status_code: <non-200 status code>
    message: <string_error>
}
```
