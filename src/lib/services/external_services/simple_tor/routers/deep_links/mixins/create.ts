import * as httpRequest from '../../../mixins/http_request/http_request';
import { CREATE_DEEP_LINKS_ENDPOINT } from '../deep_links_endpoints';

export async function createDeferredLink({
	deferredLinkDataJson
}: {
	deferredLinkDataJson: Record<string, any>;
}): Promise<Response> {
	return httpRequest.post(CREATE_DEEP_LINKS_ENDPOINT, deferredLinkDataJson, {});
}
