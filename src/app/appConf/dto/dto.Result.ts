/**
 * 菜单对象
 */
export class Result{
  data: any;
  info: ResultInfo;
  status: number;
  validate: number;
}

export class ResultInfo {
  code: number;
  message: string;
  systemCode: string;
}
