import { SERVER_BASE_URL } from '$src/lib/consts/server_variables';

const baseURL = SERVER_BASE_URL;

/**
 * Sends a GET request to the specified endpoint.
 *
 * @param endpoint - The API endpoint path.
 * @param queryParameters - Optional query parameters.
 * @returns An HTTP response as JSON.
 */
export async function get(
	endpoint: string,
	queryParameters?: Record<string, any>
): Promise<Response> {
	return await fetch(_uri(endpoint, queryParameters), {
		method: 'GET',
		headers: await _headers()
	});
}

/**
 * Sends a POST request with a JSON-encoded body.
 *
 * @param endpoint - The API endpoint path.
 * @param body - The request body as a JSON object.
 * @param queryParameters - Optional query parameters.
 * @returns An HTTP response as JSON.
 */
export async function post(
	endpoint: string,
	body: Record<string, any>,
	queryParameters?: Record<string, any>
): Promise<Response> {
	return await fetch(_uri(endpoint, queryParameters), {
		method: 'POST',
		headers: await _headers(),
		body: JSON.stringify(body)
	});
}

/**
 * Sends a DELETE request with a JSON-encoded body.
 *
 * @param endpoint - The API endpoint path.
 * @param body - The request body as a JSON object.
 * @param queryParameters - Optional query parameters.
 * @returns An HTTP response as JSON.
 */
export async function deleteAction(
	endpoint: string,
	body: Record<string, any>,
	queryParameters?: Record<string, any>
): Promise<Response> {
	return await fetch(_uri(endpoint, queryParameters), {
		method: 'DELETE',
		headers: await _headers(),
		body: JSON.stringify(body)
	});
}

/**
 * Generates HTTP headers for requests.
 *
 * @returns A map containing HTTP headers.
 */
async function _headers(): Promise<Record<string, string>> {
	let data: Record<string, string> = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		source: 'WEB'
	};

	return data;
}

/**
 * Constructs a URI for API requests, handling HTTP or HTTPS based on the server domain.
 *
 * @param endpoint - The API endpoint path.
 * @param queryParameters - Optional query parameters for the request.
 * @returns A properly formatted URL string.
 */
function _uri(endpoint: string, queryParameters?: Record<string, any>): string {
	const base = baseURL.includes('.app') ? 'https' : 'http';
	const url = new URL(`${base}://${baseURL}/${endpoint}`);

	if (queryParameters) {
		Object.entries(queryParameters).forEach(([key, value]) => {
			if (value != null) {
				url.searchParams.append(key, value instanceof Date ? value : value.toString());
			}
		});
	}

	return url.toString();
}
