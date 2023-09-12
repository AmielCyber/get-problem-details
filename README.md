# Get Problem Details
A lightweight library that extracts the problem details (RFC 7807) object from an unsuccessful server response. Easily maps 
a typed Problem Details object to be used for handling unsuccessful responses from an API that may implement the Problem
Details web specification [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807). Designed to be use with fetch and a client
application making a server call.

Response objects may lack problem details properties or have none at all, in which case they default to a problem 
details object with `status: 500` and `title: "Server Error"`.

## Usage

### Install npm package
```bash
npm i get-problem-details
```

### Import getProblemDetails and ProblemDetails type
```typescript
import getProblemDetails from "get-problem-details";
import type {ProblemDetails} from "get-problem-details";
```

### Examples
#### Extracting as many Problem Details properties from a failed response
After parsing a response, call the `getProblemDetails` function and pass the *parsed* response to
getProblemDetails to obtain a ProblemDetails object. You can then log this object or display the failed response to the user.

```typescript
if (!response.ok) {
    const responseResult = await response.json() as unknown;

    const problemDetails: ProblemDetails = getProblemDetails(responseResult);
    
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

    const problemDetails: ProblemDetails = getProblemDetails(response, errMsg);

    problemToast(problemDetails);   // Custom toast not provided.
}
```
## Problem Details Object
```typescript
interface ProblemDetails {
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
