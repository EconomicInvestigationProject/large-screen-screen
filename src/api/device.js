import request from "../utils/request.js";


/*
**设备数据数据
*/
export const deviceList = () => {
  return request({
    url: "/device/list",
    method: "get",
    data: {},
    mock: false
  });
};
