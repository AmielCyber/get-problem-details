import getProblemDetails, {ProblemDetails} from "./index";

const defaultStatusCode = 500;
const defaultTitle = "Server Error";

test("null object should return default status code and title", () => {
    const result = getProblemDetails(null);
    expectDefaultProblemDetails(result);
})

test("undefined should return default status code and title", () => {
    const result = getProblemDetails(undefined);
    expectDefaultProblemDetails(result);
})

test("empty object should return default status code and title", () => {
    const result = getProblemDetails({});
    expectDefaultProblemDetails(result);
})
test("object with type should return default status code, default title, and its type value", () => {
    const object = {
        type: "Type information."
    }
    const result = getProblemDetails(object);
    expect(result.type).toBe(object.type);
    expectProblemDetailsContainDefaultObjectProperties(result, "type");
})
test("object with title should return default status code and its title value", () => {
    const object = {
        title: "Title information."
    }
    const result = getProblemDetails(object);
    expect(result.title).toBe(object.title);
    expectProblemDetailsContainDefaultObjectProperties(result, "title");
})

test("object with status should return default title and its status value", () => {
    const object = {
        status: 400,
    }
    const result = getProblemDetails(object);
    expect(result.status).toBe(object.status);
    expectProblemDetailsContainDefaultObjectProperties(result, "status");
})

test("object with detail should return default title, default status, and its detail value", () => {
    const object = {
        detail: "Detail information"
    }
    const result = getProblemDetails(object);
    expect(result.detail).toBe(object.detail);
    expectProblemDetailsContainDefaultObjectProperties(result, "detail");
})

test("object with traceId should return default title, default status, and its traceId value", () => {
    const object = {
        traceId: "Trace id information"
    }
    const result = getProblemDetails(object);
    expect(result.traceId).toBe(object.traceId);
    expectProblemDetailsContainDefaultObjectProperties(result, "traceId");
})

test("object with instance should return default title, default status, and its instance value", () => {
    const object = {
        instance: "Instance information"
    }
    const result = getProblemDetails(object);
    expect(result.instance).toBe(object.instance);
    expectProblemDetailsContainDefaultObjectProperties(result, "instance");
})

test("object with errors should return default title, default status, and its errors values", () => {
    const object = {
        errors: {
            "password": [
                "Length less than 8", "No capital letter"
            ],
            "email": [
                "Email is already in used"
            ]
        }
    }
    const result = getProblemDetails(object);
    expect(result.errors).toMatchObject(object.errors);
    expectProblemDetailsContainDefaultObjectProperties(result, "errors");
})

function expectProblemDetailsContainDefaultObjectProperties(result: ProblemDetails, skipProperty: string){
    for(const property in result){
        switch (property){
            case "type":
                if(skipProperty !== property){
                    expect(result.type).toBe(undefined);
                }
                break;
            case "title":
                if(skipProperty !== property){
                    expect(result.title).toBe(defaultTitle);
                }
                break;
            case "status":
                if(skipProperty !== property){
                    expect(result.status).toBe(defaultStatusCode);
                }
                break;
            case "detail":
                if(skipProperty !== property){
                    expect(result.detail).toBe(undefined);
                }
                break;
            case "traceId":
                if(skipProperty !== property){
                    expect(result.traceId).toBe(undefined);
                }
                break;
            case "instance":
                if(skipProperty !== property){
                    expect(result.instance).toBe(undefined);
                }
                break;
            case "errors":
                if(skipProperty !== property){
                    expect(result.errors).toBe(undefined);
                }
                break;
        }
    }

}
function expectDefaultProblemDetails(result: ProblemDetails) {
    expect(result.status).toBe(defaultStatusCode);
    expect(result.title).toBe(defaultTitle);
    expect(result.type).toBe(undefined);
    expect(result.detail).toBe(undefined);
    expect(result.traceId).toBe(undefined);
    expect(result.instance).toBe(undefined);
    expect(result.errors).toBe(undefined);
}


