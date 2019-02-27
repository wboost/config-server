/**
 * 应用
 */
export class Env{
  label: string;
  name: string;
  state: string;
  version: string;
  profiles: Array<string>;
  propertySources: Array<propertySources>;
}

export class propertySources {
  name: string;
  source: any;
}
