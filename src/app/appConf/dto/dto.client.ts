/**
 * 应用
 */
export class Client{
  name: string;
  profile: string = 'dev';
  apps: ApplicationDto[];
}

export class ApplicationDto {
  ip: string;
  port: string;
  applicationName: string;
  refreshTime: number;
  registerTime: number;
  propertiesDtos: Properties[];
  ws: string;
  id: string;
}

export class Properties{
  key:string;
  val:string;
  changeVal:string;

  public setKey(key:string) : Properties {
    this.key = key;
    return this;
  }

  public setValue(val:string) : Properties {
    this.val = val;
    return this;
  }

  public setChangeVal(val:string) : Properties {
    this.changeVal = val;
    return this;
  }

}
