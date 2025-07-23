import { AdParams } from '../models/crm/ad_params';
import { DeferredLinkData } from '../models/deep_links/deferred_link_data';
import { getDeviceFingerprint } from './device_fingerprint';

export async function getDeferredLinkData(
	urlParams: URLSearchParams
): Promise<DeferredLinkData | undefined> {
	//  Create device fingerprint
	const deviceFingerprint = await getDeviceFingerprint();
	if (!deviceFingerprint) {
		console.error('Failed to get device fingerprint');
		return;
	}

	// Extract ad params if exists

	const adParams = AdParams.from_query_params(urlParams);
	const link = urlParams.get('src_url');
	// Create the final URL with the params
	return DeferredLinkData.from_json({
		ad_params: adParams,
		link: link,
		device_fingerprint: deviceFingerprint
	});
}
