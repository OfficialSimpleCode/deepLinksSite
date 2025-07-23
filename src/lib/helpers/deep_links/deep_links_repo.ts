import * as deepLinksRouter from '$src/lib/services/external_services/simple_tor/routers/deep_links/deep_links_router';

export async function createDeferredLinkRepo({
	deferredLinkDataJson
}: {
	deferredLinkDataJson: Record<string, any>;
}): Promise<boolean> {
	const response = await deepLinksRouter.createDeferredLink({
		deferredLinkDataJson
	});
	return true;
	// return handleResponse(response);
}
