import request from "../utils/request.js";

/*
 **搬入搬出人员分析接口
 */

/**
 * 小区搬入搬出人员
 */
export const moveInoutPage = () => {
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
export const addRecord = (params) => {
  return request({
    url: "/keypersonnel/addRecord",
    method: "post",
    data: params,
    mock: false
  });
};

/**
 * 按条件实现重点人员分页查询
 */
export const getKeypersonnelPage = (params) => {
  return request({
    url: "/keypersonnel/page",
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
    url: "/keypersonnel/personalPage",
    method: "get",
    data: params,
    mock: false
  });
};
