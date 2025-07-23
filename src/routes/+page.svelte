<script lang="ts">
	import { createDeferredLink } from '$src/lib/helpers/deep_links/deep_links_mixin';
	import appIcon from '$src/lib/images/icon.webp';
	import { getDeferredLinkData } from '$src/lib/utils/deep_links';
	import { isAllowedDomain } from '$src/lib/utils/domain';
	import { onMount } from 'svelte';

	let name: string | null = null;
	let url: string | null = null;
	let valid = false;

	function doRedirect() {
		if (url && isAllowedDomain(url)) {
			const redirectUrl = new URL(url);
			redirectUrl.searchParams.set('openStore', 'true');
			window.location.href = redirectUrl.toString();
			setTimeout(() => {
				history.back();
			}, 1000);
		}
	}

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		// Vars for the UI
		url = params.get('src_url');
		name = params.get('name');
		valid = isAllowedDomain(url ?? '');
		if (!valid) {
			console.error('Invalid or missing "src_url" parameter');
			return;
		}
		// Create the deferred link data to send to the server
		const deferredLinkData = await getDeferredLinkData(params);
		if (!deferredLinkData) {
			console.error('Failed to create deferred link data');
			return;
		}
		// Send request to the server to create the deferred link
		await createDeferredLink({
			deferredLinkDataJson: deferredLinkData
		});

		console.log('Device Fingerprint:', deferredLinkData);
		// doRedirect();
	});
</script>

<svelte:head>
	<title>
		{'Simple Tor | מערכת לניהול תורים'}
	</title>

	<!-- descruption about the page -->
	<meta name="description" content={name ? `הזמנת תור עם ${decodeURIComponent(name)} בקליק` : ''} />
	<!-- icon im the window -->
	<link rel="icon" href="/AppIcon.ico" type="image/x-icon" />

	<!-- Open Graphs data (for sharing a link) -->
	<!-- description -->
	<meta
		property="og:description"
		content={name ? `הזמנת תור עם ${decodeURIComponent(name)} בקליק` : ''}
	/>
	<!-- image in the center of the link -->
	<!-- <meta property="og:image" content={appOpenGraphImage} /> -->

	<!-- icon for iphone that saves the web -->
	<link rel="apple-touch-icon" sizes="180x180" href="/AppAppleIcon.png" />

	<!--  -->
</svelte:head>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-white text-center font-sans text-black"
>
	<!-- App icon -->
	<img class="-mt-8 mb-4 h-16 w-16 rounded-xl" src={appIcon} alt="Redirecting Icon" />
	<!-- Title and description -->
	<div class="mb-2 text-2xl font-light">Simple Tor - ניהול תורים</div>
	<div class="mb-8 text-base text-gray-700">מערכת לניהול תורים</div>

	<!-- Business name and text -->
	{#if name}
		<div class="mb-6 text-sm text-gray-500">
			הזמנת תור עם {decodeURIComponent(name)} בקליק
		</div>
	{/if}

	<!-- Re-direct button / Error message -->
	{#if !valid}
		<p class="text-red-500">
			{url ? "Invalid 'src_url' parameter." : "Missing 'src_url' parameter."}
		</p>
	{:else}
		<button
			class="rounded-md bg-blue-500 px-8 py-3 text-white shadow transition hover:bg-blue-600"
			on:click={doRedirect}
		>
			OPEN
		</button>
	{/if}
</div>
