import request from "../utils/request.js";


/*
**小区人员搬入搬出统计
*/

export const peopleinandoutStatistics = () => {
  return request({
    url: "/peopleinandout/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
