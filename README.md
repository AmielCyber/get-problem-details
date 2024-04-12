# Get Problem Details
A lightweight library that extracts the problem details (RFC 7807) object from an unsuccessful server response. Easily maps 
a typed Problem Details object to be used for handling unsuccessful responses from an API that may implement the Problem
Details web specification [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807). Designed to be use with fetch and a client
application making a server call such as HttpClient from Angular.

Response objects may lack problem details properties or have none at all, in which case they default to a problem 
details object with `status: 500` and `title: "Server Error"`.

## Usage

### Install npm package
```bash
npm i get-problem-details
```

### Import the ProblemDetails class
```typescript
import {ProblemDetails} from "get-problem-details";
```

### Examples
#### Extracting as many Problem Details properties from a failed fetch response
After parsing a response, create a new ProblemDetails class and pass the *parsed* response to
the constructor to map the ProblemDetails object from the backend server. 
You can then log this object or display the failed response to the user.

```typescript
if (!response.ok) {
    const responseResult = await response.json() as unknown;

    const problemDetails = new ProblemDetails(responseResult);
    
    // Do something with your problem details object, 
    // such as making a toast for your users to display a failed response.
    problemToast(problemDetails);   // Custom toast not provided.
}
```
#### Getting a Problem Details object from a produced exception while fetching

```typescript
let response: Response | undefined;
try {
    // Your fetch logic...
} catch (e) {
    // Create your own getErrorMessage to extract error message or set a default error message.
    const errMsg = getErrorMessage(e);

    const problemDetails = new ProblemDetails(response, errMsg);

    problemToast(problemDetails);   // Custom toast not provided.
}
```
#### Extracting Problem Details from a failed HttpErrorResponse in Angular
Catch the error from an HttpClient error and pass the error property to obtain the problem details object from your
server. You can then log this object and or display the failed response to the user.
```typescript
    this.myHttpService.getData()
    .pipe(
        catchError(err => {
            // Do something with your problem details object, 
            // such as making a toast for your users to display a failed HttpErrorResponse.
            const problemDetails = new ProblemDetails(err.error)
            console.error(problemDetails);
            this.snackbarService.problemDetails(problemDetails); // Custom toast not provided.
        // ...
        })
    );
```
## Problem Details Object Properties
```typescript
interface ProblemDetailsI {
    type?: string;
    title: string;
    status: number;
    detail?: string;
    traceId?: string;
    instance?: string;
    // Default problem details extention in ASP.NET
    errors?: Record<string, string[]>
}
```
## TODO
- [ ] Add functionality for custom problem details extensions to replace errors.
