import { page } from '$app/stores';
import { get } from 'svelte/store';
import * as uuid from 'uuid';
import { DeviceFingerprint } from '../models/deep_links/device_fingerprint';
import { getIps } from '../services/external_services/ip_finder';

export async function getDeviceFingerprint(): Promise<DeviceFingerprint | undefined> {
	console.log(get(page));
	try {
		// Fetch IP addresses
		const ips = await getIps();

		let osVersion = 'Unknown';
		console.log(`navigator.userAgent`);
		console.log(navigator.userAgent);

		const userAgent = navigator.userAgent;
		if (/iPhone|iPad|iPod/.test(userAgent)) {
			const osMatch = userAgent.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
			if (osMatch) {
				osVersion = `iOS ${osMatch[1]}.${osMatch[2]}${osMatch[3] ? `.${osMatch[3]}` : ''}`;
			}
		} else if (/Android/.test(userAgent)) {
			const osMatch = userAgent.match(/Android (\d+(?:\.\d+)?)/);
			if (osMatch) {
				osVersion = `Android ${osMatch[1]}`;
			}
		} else if (/Windows/.test(userAgent)) {
			const osMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
			if (osMatch) {
				osVersion = `Windows ${osMatch[1]}`;
			}
		} else if (/Mac OS X/.test(userAgent)) {
			const osMatch = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
			if (osMatch) {
				osVersion = `macOS ${osMatch[1].replace(/_/g, '.')}`;
			}
		}

		// Collect device information
		return DeviceFingerprint.from_json({
			screen_width: window.screen.width,
			screen_height: window.screen.height,
			device_pixel_ratio: window.devicePixelRatio,
			language: navigator.language.split('-')[0],
			platform: navigator.platform,
			ipv6: ips.ipv6,
			ipv4: ips.ipv4,
			os_version: osVersion,
			referrer_id: uuid.v4()
		});
		//
	} catch (error) {
		console.error('Failed to get device info:', error);
	}
}
