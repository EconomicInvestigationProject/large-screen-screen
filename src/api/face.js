import request from "../utils/request.js";


/*
**人脸数据
*/
export const faceList = () => {
  return request({
    url: "/face/list",
    method: "get",
    data: {},
    mock: false
  });
};
