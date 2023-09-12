export default getProblemDetails;
/**
 * Gets the type property string of a fetch response if there is one.
 * @param result from a response.
 * @return problem detail's type string information, else undefined if response/problem-details contains no property.
 */
function getType(result) {
    if (!!result && typeof result === "object" && "type" in result && typeof result.type === "string") {
        return result.type;
    }
    return undefined;
}
/**
 * Gets the title property string of a fetch response if there is one. Can be passed with an error message if
 * an error occurred while fetching.
 * @param result from a response.
 * @param errorMessage If an error message occurred while fetching. Defaults to "Server Error" if no error message is passed.
 * @return string of problem detail's title information, defaults to "Server Error" if response/problem-details/errorMessage contains no property.
 */
function getTitle(result, errorMessage = "Server Error") {
    if (!!result && typeof result === "object") {
        if ("title" in result && typeof result.title === "string") {
            return result.title;
        }
        // If the response only returns a string with failed status code.
        if ("statusText" in result && typeof result.statusText === "string") {
            return result.statusText;
        }
    }
    // Default to the error message or to Server Error.
    return errorMessage;
}
/**
 * Gets the status property number of a fetch response if there is one.
 * @param result from a response.
 * @return number of problem detail's status code , else returns a default of 500 status code if no status code
 * was found.
 */
function getStatus(result) {
    if (!!result && typeof result === "object" && "status" in result && typeof result.status === "number") {
        return result.status;
    }
    // Default to a server error.
    return 500;
}
/**
 * Gets the detail property string of a response, if there is one.
 * @param result from a response.
 * @return string of problem detail's detail information, else undefined if response/problem-details contains no property.
 */
function getDetail(result) {
    if (!!result && typeof result === "object" && "detail" in result && typeof result.detail === "string") {
        return result.detail;
    }
    return undefined;
}
/**
 * Gets the traceId property string of a fetch response if there is one.
 * @param result from a response.
 * @return string of problem detail's traceId information, else undefined if response/problem-details contains no property.
 */
function getTraceId(result) {
    if (!!result && typeof result === "object" && "traceId" in result && typeof result.traceId === "string") {
        return result.traceId;
    }
    return undefined;
}
/**
 * Gets the instance property string of a fetch response if there is one.
 * @param result from a response.
 * @return string of problem detail's instance information, else undefined if response/problem-details contains no property.
 */
function getInstance(result) {
    if (!!result && typeof result === "object" && "instance" in result && typeof result.instance === "string") {
        return result.instance;
    }
    return undefined;
}
// TODO: Implement custom problem details extensions
/**
 * Gets the errors property object of a fetch response if there is one.
 * @param result from a fetch response.
 * @return record object of the problem detail's errors record, else undefined if response/problem-details contains no property.
 */
function getErrors(result) {
    if (!!result
        && typeof result === "object"
        && "errors" in result
        && typeof result.errors === "object"
        && result.errors !== null) {
        return result.errors;
    }
    return undefined;
}
/**
 * Gets a ProblemDetails object from an unsuccessful response from a fetch. Attempts to extract the
 * properties of a problem details response result if there is one.
 * @param responseResult the response object from an unsuccessful. Must be json parse first before calling this function.
 * @param errorMessage optional error message string to pass to be set in title if no title is found in the response result.
 * @return ProblemDetails object containing the problem details property from a response, or the defaults: {status=500, title = "Server Error"},
 * if no problem details properties were found.
 */
function getProblemDetails(responseResult, errorMessage) {
    return {
        type: getType(responseResult),
        title: getTitle(responseResult, errorMessage),
        status: getStatus(responseResult),
        detail: getDetail(responseResult),
        traceId: getTraceId(responseResult),
        instance: getInstance(responseResult),
        errors: getErrors(responseResult)
    };
}
