import request from "../utils/request.js";

/*
 **搬入搬出人员分析接口
 */

/**
 * 小区搬入搬出人员
 */
export const getTotal = (params) => {
  return request({
    url: "/moveInout/getTotal",
    method: "get",
    data: params,
    mock: false
  });
};

/**
 * 按条件所有人员分页查询
 */
export const getMoveInoutPage = (params) => {
  return request({
    url: "/moveInout/page",
    method: "get",
    data: params,
    mock: false
  });
};

/**
 * 按条件实现重点人员个人分页查询
 */
export const getPersonalPage = (params) => {
  return request({
    url: "/moveInout/personalPage",
    method: "get",
    data: params,
    mock: false
  });
};
