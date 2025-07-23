import { url_to_get_ipv4, url_to_get_ipv6 } from '$src/lib/consts/network';

interface DeviceIps {
	ipv4: string;
	ipv6: string;
}

interface IpResponse {
	ip: string;
}

export async function getIps(timeoutMs: number = 2000): Promise<DeviceIps> {
	// Create AbortController for timeout
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const [ipV4Resp, ipV6Resp] = await Promise.all([
			fetch(url_to_get_ipv4, {
				cache: 'no-store',
				signal: controller.signal
			}).catch(() => null),
			fetch(url_to_get_ipv6, {
				cache: 'no-store',
				signal: controller.signal
			}).catch(() => null)
		]);

		// Process JSON in parallel where possible
		const [ipv4Json, ipv6Json] = await Promise.all([
			ipV4Resp?.ok
				? (ipV4Resp.json().catch(() => null) as Promise<IpResponse | null>)
				: Promise.resolve(null),
			ipV6Resp?.ok
				? (ipV6Resp.json().catch(() => null) as Promise<IpResponse | null>)
				: Promise.resolve(null)
		]);

		return {
			ipv4: ipv4Json?.ip ?? '',
			ipv6: ipv6Json?.ip ?? ''
		};
	} catch (error) {
		// Handle any unexpected errors (including AbortError from timeout)
		console.error('Failed to fetch IPs:', error);
		return {
			ipv4: '',
			ipv6: ''
		};
	} finally {
		// Clean up timeout
		clearTimeout(timeout);
	}
}
