import request from "../utils/request.js";

/*
 **小区人员搬入搬出统计
 */

export const proportionvarioustypespeopleStatistics = () => {
  return request({
    url: "/proportionvarioustypespeople/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
