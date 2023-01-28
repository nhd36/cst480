# Homework 1 - Nam Dao - nhd36

## Submission

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
