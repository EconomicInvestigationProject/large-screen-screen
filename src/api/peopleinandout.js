import request from "../utils/request.js";

/*
 **所有小区人员搬入搬出统计接口
 */

export const peopleinandoutStatistics = () => {
  return request({
    url: "/peopleinandout/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
