export default getProblemDetails;
/**
 * The most standard properties in a ProblemDetails object.
 * @link https://datatracker.ietf.org/doc/html/rfc7807
 */
export interface ProblemDetails {
    type?: string;
    title: string;
    status: number;
    detail?: string;
    traceId?: string;
    instance?: string;
    errors?: Record<string, string[]>;
}
/**
 * Gets a ProblemDetails object from an unsuccessful response from a fetch. Attempts to extract the
 * properties of a problem details response result if there is one.
 * @param responseResult the response object from an unsuccessful. Must be json parse first before calling this function.
 * @param errorMessage optional error message string to pass to be set in title if no title is found in the response result.
 * @return ProblemDetails object containing the problem details property from a response, or the defaults: {status=500, title = "Server Error"},
 * if no problem details properties were found.
 */
declare function getProblemDetails(responseResult: unknown, errorMessage?: string): ProblemDetails;
