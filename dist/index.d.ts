/**
 * A ProblemDetails object from an unsuccessful response from a fetch or HttpErrorResponse.
 * The ProblemDetails contains the standard properties in a ProblemDetails object RFC7807.
 * @link https://datatracker.ietf.org/doc/html/rfc7807
 */
export declare class ProblemDetails {
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
    constructor(responseResult: unknown, defaultErrorMessage?: string);
    /**
     * Gets the title property string of a fetch response if there is one. Can be passed with an error message if
     * an error occurred while fetching.
     * @param result from a response.
     * @param errorMessage If an error message occurred while fetching.
     * Defaults to "Server Error" if no error message is passed.
     * @return string of problem detail's title information.
     * Defaults to "Server Error" if response/problem-details/errorMessage contains no property.
     */
    private getTitle;
    /**
     * Gets the status property number of a fetch response if there is one.
     * @param result from a response.
     * @return number of problem detail's status code,
     * else returns a default of 500 status code if no status code was found.
     */
    private getStatus;
    /**
     * Gets the type property string of a response object if there is one.
     * @param result from a response.
     * @return problem detail's type string information,
     * else undefined if response/problem-details contains no property.
     */
    private getType;
    /**
     * Gets the detail property string of a response, if there is one.
     * @param result from a response.
     * @return string of problem detail's detail information,
     * else undefined if response/problem-details contains no property.
     */
    private getDetail;
    /**
     * Gets the traceId property string of a fetch response if there is one.
     * @param result from a response.
     * @return string of problem detail's traceId information,
     * else undefined if response/problem-details contains no property.
     */
    private getTraceId;
    /**
     * Gets the instance property string of a fetch response if there is one.
     * @param result from a response.
     * @return string of problem detail's instance information,
     * else undefined if response/problem-details contains no property.
     */
    private getInstance;
    /**
     * Gets the errors property object of a fetch response if there is one.
     * @param result from a fetch response.
     * @return record object of the problem detail's errors record,
     * else undefined if response/problem-details contains no property.
     */
    private getErrors;
}
