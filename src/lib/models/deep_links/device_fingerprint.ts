export interface DeviceFingerprintProps {
  screen_width: number;
  screen_height: number;
  device_pixel_ratio: number;
  language: string;
  referrer_id?: string | undefined;
  os_version: string;
  platform: string;
  ipv6: string;
  ipv4: string;
}

export class DeviceFingerprint {
  screen_width: number;
  screen_height: number;
  device_pixel_ratio: number;
  language: string;
  referrer_id?: string | undefined;
  os_version: string;
  platform: string;
  ipv6: string;
  ipv4: string;

  constructor(props: DeviceFingerprintProps) {
    this.screen_width = props.screen_width;
    this.screen_height = props.screen_height;
    this.device_pixel_ratio = props.device_pixel_ratio;
    this.language = props.language;
    this.referrer_id = props.referrer_id;
    this.os_version = props.os_version;
    this.platform = props.platform;
    this.ipv6 = props.ipv6;
    this.ipv4 = props.ipv4;
  }

  static from_json(json: Record<string, any>): DeviceFingerprint {
    const obj = new DeviceFingerprint({
      screen_width: json.screen_width,
      screen_height: json.screen_height,
      device_pixel_ratio: json.device_pixel_ratio,
      language: json.language,
      referrer_id: json.referrer_id,
      os_version: json.os_version,
      platform: json.platform,
      ipv6: json.ipv6,
      ipv4: json.ipv4,
    });
    return obj;
  }

  // Equivalent to to_json method
  toJson(): Record<string, any> {
    const result = {
      screen_width: this.screen_width,
      screen_height: this.screen_height,
      device_pixel_ratio: this.device_pixel_ratio,
      language: this.language,
      referrer_id: this.referrer_id,
      os_version: this.os_version,
      platform: this.platform,
      ipv6: this.ipv6,
      ipv4: this.ipv4,
    };
    return result;
  }
}
