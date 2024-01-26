import request from "../utils/request.js";

/**
 * 异常人员接口
 */

/**
 * 小区异常人员一周统计
 */
export const abnormalpersonnelStatistics = () => {
  return request({
    url: "/abnormalpersonnel/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
