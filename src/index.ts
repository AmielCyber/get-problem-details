/**
 * A ProblemDetails object from an unsuccessful response from a fetch or HttpErrorResponse.
 * The ProblemDetails contains the standard properties in a ProblemDetails object RFC7807.
 * @link https://datatracker.ietf.org/doc/html/rfc7807
 */
export class ProblemDetails {
    readonly title: string;
    readonly status: number;
    readonly type?: string | undefined;
    readonly detail?: string | undefined;
    readonly traceId?: string | undefined;
    readonly instance?: string | undefined;
    readonly errors?: Record<string, string[]> | undefined;

    /**
     * Creates a ProblemDetails object from an unsuccessful response from a fetch or HttpErrorResponse.
     * Attempts to extract the properties of a problem details response.
     * @param responseResult the response object from an unsuccessful request. Must be json parsed first before calling
     * this function if using fetch.
     * @param  defaultErrorMessage optional error message string to pass to be set in title if no title property is found
     * in the response result.
     * @return ProblemDetails object containing the problem details property from a response,
     * or the defaults: {status=500, title = "Server Error"}, if no problem details properties were found.
     */
    constructor(responseResult: unknown, defaultErrorMessage?: string) {
        this.title = this.getTitle(responseResult, defaultErrorMessage);
        this.status = this.getStatus(responseResult);
        this.type = this.getType(responseResult);
        this.detail = this.getDetail(responseResult);
        this.traceId = this.getTraceId(responseResult);
        this.instance = this.getInstance(responseResult);
        this.errors = this.getErrors(responseResult);
    }


    /**
     * Gets the title property string of a fetch response if there is one. Can be passed with an error message if
     * an error occurred while fetching.
     * @param result from a response.
     * @param errorMessage If an error message occurred while fetching.
     * Defaults to "Server Error" if no error message is passed.
     * @return string of problem detail's title information.
     * Defaults to "Server Error" if response/problem-details/errorMessage contains no property.
     */
    private getTitle(result: unknown, errorMessage = "Server Error"): string {
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
     * @return number of problem detail's status code,
     * else returns a default of 500 status code if no status code was found.
     */
    private getStatus(result: unknown): number {
        if (!!result && typeof result === "object" && "status" in result && typeof result.status === "number") {
            return result.status;
        }
        // Default to a server error.
        return 500;
    }

    /**
     * Gets the type property string of a response object if there is one.
     * @param result from a response.
     * @return problem detail's type string information,
     * else undefined if response/problem-details contains no property.
     */
    private getType(result: unknown): string | undefined {
        if (!!result && typeof result === "object" && "type" in result && typeof result.type === "string") {
            return result.type;
        }
        return undefined;
    }

    /**
     * Gets the detail property string of a response, if there is one.
     * @param result from a response.
     * @return string of problem detail's detail information,
     * else undefined if response/problem-details contains no property.
     */
    private getDetail(result: unknown): string | undefined {
        if (!!result && typeof result === "object" && "detail" in result && typeof result.detail === "string") {
            return result.detail;
        }
        return undefined;
    }

    /**
     * Gets the traceId property string of a fetch response if there is one.
     * @param result from a response.
     * @return string of problem detail's traceId information,
     * else undefined if response/problem-details contains no property.
     */
    private getTraceId(result: unknown): string | undefined {
        if (!!result && typeof result === "object" && "traceId" in result && typeof result.traceId === "string") {
            return result.traceId;
        }
        return undefined;
    }

    /**
     * Gets the instance property string of a fetch response if there is one.
     * @param result from a response.
     * @return string of problem detail's instance information,
     * else undefined if response/problem-details contains no property.
     */
    private getInstance(result: unknown): string | undefined {
        if (!!result && typeof result === "object" && "instance" in result && typeof result.instance === "string") {
            return result.instance;
        }
        return undefined;
    }

    // TODO: Implement custom problem details extensions
    /**
     * Gets the errors property object of a fetch response if there is one.
     * @param result from a fetch response.
     * @return record object of the problem detail's errors record,
     * else undefined if response/problem-details contains no property.
     */
    private getErrors(result: unknown): Record<string, string[]> | undefined {
        if (!!result
            && typeof result === "object"
            && "errors" in result
            && typeof result.errors === "object"
            && result.errors !== null
        ) {
            return result.errors as Record<string, string[]>;
        }
        return undefined;
    }
}
