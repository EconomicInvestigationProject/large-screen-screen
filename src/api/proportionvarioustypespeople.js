import request from "../utils/request.js";

/*
 **所有小区人员搬入搬出统计接口
 */

export const proportionvarioustypespeopleStatistics = () => {
  return request({
    url: "/proportionvarioustypespeople/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
