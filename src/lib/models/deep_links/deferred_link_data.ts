import type { AdParams } from "../crm/ad_params";
import { DeviceFingerprint } from "./device_fingerprint";

export interface DeferredLinkDataProps {
  ad_params?: AdParams | undefined;
  link: string;
  device_fingerprint: DeviceFingerprint;
}

export class DeferredLinkData {
  ad_params?: AdParams;
  link: string;
  device_fingerprint: DeviceFingerprint;

  constructor(props: DeferredLinkDataProps) {
    // Assign defaults and ignore client-provided id, createdAt, expiredAt
    this.ad_params = props.ad_params;
    this.link = props.link;
    this.device_fingerprint = props.device_fingerprint;
  }

  static from_json(json: Record<string, any>): DeferredLinkData {
    const obj = new DeferredLinkData({
      ad_params: json.ad_params,
      link: json.link,
      device_fingerprint: DeviceFingerprint.from_json(json.device_fingerprint),
    });

    return obj;
  }

  // Equivalent to to_json method
  toJson(): Record<string, any> {
    const result = {
      adParams: this.ad_params,
      link: this.link,
      deviceFingerprint: this.device_fingerprint,
    };
    return result;
  }
}
