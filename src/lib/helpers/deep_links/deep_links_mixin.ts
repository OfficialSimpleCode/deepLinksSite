import type { DeferredLinkDataProps } from '$src/lib/models/deep_links/deferred_link_data';
import { createDeferredLinkRepo } from './deep_links_repo';

export async function createDeferredLink({
	deferredLinkDataJson
}: {
	deferredLinkDataJson: DeferredLinkDataProps;
}): Promise<boolean> {
	return await createDeferredLinkRepo({ deferredLinkDataJson });
}
