import request from "../utils/request.js";

/**
 * 电梯人员密度接口
 */

/**
 * 电梯人员密度一周统计
 */
export const elevatorpersonneldensityStatistics = () => {
  return request({
    url: "/elevatorpersonneldensity/statistics",
    method: "get",
    data: {},
    mock: false
  });
};
