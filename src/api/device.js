import request from "../utils/request.js";


/*
**设备数据数据接口
*/
export const deviceList = () => {
  return request({
    url: "/device/list",
    method: "get",
    data: {},
    mock: false
  });
};
