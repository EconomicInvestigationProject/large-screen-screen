import request from "../utils/request.js";

/*
 **小区重点人员接口
 */

/**
 * 小区重点人员统计
 */
export const keypersonnelStatistics = () => {
  return request({
    url: "/keypersonnel/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
