enum AdSource {
  GOOGLE = "Google",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  WHATSAPP = "Whatsapp",
  NONE = "None",
}

interface IAdParams {
  /** Platform source: 'Google', 'Meta' (Facebook/Instagram), or None if undetected */
  source_platform: AdSource;

  /** Google Click ID */
  gclid?: string | null;

  /** Meta Click ID (fbclid) */
  fbclid?: string | null;

  /** Ad Set ID (Google Ad Group ID / Meta Ad Set ID) */
  adset_id?: string | null;

  /** Ad ID (Google Creative ID / Meta Ad ID) */
  ad_id?: string | null;

  /** Traffic source (google, facebook, instagram) */
  utm_source?: string | null;

  /** Marketing medium (e.g., cpc, social) */
  utm_medium?: string | null;

  /** UTM Campaign (name or ID) */
  utm_campaign?: string | null;

  /** Keyword or targeting term */
  utm_term?: string | null;

  /** Ad variation or creative ID */
  utm_content?: string | null;

  /** Ad Set Name */
  adset_name?: string | null;

  /** Ad Name */
  ad_name?: string | null;
}

export class AdParams implements IAdParams {
  source_platform: AdSource;
  gclid: string | null;
  fbclid: string | null;
  adset_id: string | null;
  ad_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  adset_name: string | null;
  ad_name: string | null;

  constructor(params: Partial<IAdParams> = {}) {
    this.source_platform = params.source_platform ?? AdSource.NONE;
    this.gclid = params.gclid ?? null;
    this.fbclid = params.fbclid ?? null;
    this.adset_id = params.adset_id ?? null;
    this.ad_id = params.ad_id ?? null;
    this.utm_source = params.utm_source ?? null;
    this.utm_medium = params.utm_medium ?? null;
    this.utm_campaign = params.utm_campaign ?? null;
    this.utm_term = params.utm_term ?? null;
    this.utm_content = params.utm_content ?? null;
    this.adset_name = params.adset_name ?? null;
    this.ad_name = params.ad_name ?? null;
  }

  detect_platform(): AdSource {
    if (this.utm_source === "google") {
      return AdSource.GOOGLE;
    } else if (this.utm_source === "ig") {
      return AdSource.INSTAGRAM;
    } else if (this.utm_source === "fb") {
      return AdSource.FACEBOOK;
    }
    return AdSource.NONE;
  }

  static from_query_params(params: URLSearchParams): AdParams {
    // Convert URLSearchParams to an object for constructor
    const query: { [key: string]: string } = {};
    params.forEach((value, key) => {
      query[key] = value;
    });

    const obj = new AdParams(query);
    obj.source_platform = obj.detect_platform();
    return obj;
  }

  static empty(): AdParams {
    return new AdParams({});
  }

  static example(): AdParams {
    return new AdParams({
      gclid: "123abc",
      fbclid: null,
      adset_id: "164609038487",
      ad_id: "696259011726",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "summer_sale",
      utm_term: "lead+gen",
      utm_content: "696259011726",
      source_platform: AdSource.GOOGLE,
    });
  }

  toJson(): Record<string, any> {
    return {
      source_platform: this.source_platform,
      gclid: this.gclid,
      fbclid: this.fbclid,
      adset_id: this.adset_id,
      ad_id: this.ad_id,
      utm_source: this.utm_source,
      utm_medium: this.utm_medium,
      utm_campaign: this.utm_campaign,
      utm_term: this.utm_term,
      utm_content: this.utm_content,
      adset_name: this.adset_name,
      ad_name: this.ad_name,
    };
  }
}
