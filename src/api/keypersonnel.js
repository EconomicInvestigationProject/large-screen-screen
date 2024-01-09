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

/**
 * 指定删除小区重点人员
 */
export const deleteRecord = (params) => {
  return request({
    url: "/keypersonnel/deleteRecord",
    method: "post",
    data: params,
    mock: false
  });
};

/**
 * 新增重点人员
 */

export const addRecord = () => {
  return request({
    url: "/keypersonnel/addRecord",
    method: "post",
    data: params,
    mock: false
  });
};
