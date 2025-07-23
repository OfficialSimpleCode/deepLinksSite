export function isAllowedDomain(target: string) {
	try {
		const urlObj = new URL(target);
		return (
			(urlObj.hostname.endsWith('simpletor.app') && urlObj.href.startsWith('https://')) ||
			_isLocalhost(urlObj.hostname)
		);
	} catch {
		return false;
	}
}

function _isLocalhost(hostName: string) {
	return hostName === 'localhost' || hostName === '127.0.0.1';
}
