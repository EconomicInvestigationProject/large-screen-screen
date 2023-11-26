/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  dev: {
    //开发环境
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api"
  },
  test: {
    //测试环境
    baseApi: "//tets.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api"
  },
  prod: {
    //生产环境
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/b6c70fa8747a78b3dfd8acdde935d3f3/api"
  }
};

export default {
  env, //开发环境
  mock: false, //是否启用mock
  namespace: "manager", //命名空间用于区分storage
  ...EnvConfig[env], //解构出对应的开发环境
  colors: [
    "#9689FF",
    "#FF8A26",
    "#5FB878",
    "#73c0de",
    "#4ED33C",
    "#FF5252",
    "#01AAED",
    "#FF5722",
    "#6648FF",
    "#2A8BFD",
    "#BAFF7F",
    "#00FAC1",
    "#00CAFF",
    "#FDE056",
    "#fac858",
    "#ee6666",
    "#91cc75",
    "#38cafb",
    "#4caff9",
    "#4adeca",
    "#2aa7ee",
    "#0270f2",
    "#488cf7"
  ],
  bmapstyle: {
    styleJson: [
      {
        featureType: "water",
        elementType: "all",
        stylers: {
          color: "#021019"
        }
      },
      {
        featureType: "highway",
        elementType: "geometry.fill",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "highway",
        elementType: "geometry.stroke",
        stylers: {
          color: "#147a92"
        }
      },
      {
        featureType: "arterial",
        elementType: "geometry.fill",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "arterial",
        elementType: "geometry.stroke",
        stylers: {
          color: "#0b3d51"
        }
      },
      {
        featureType: "local",
        elementType: "geometry",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "land",
        elementType: "all",
        stylers: {
          color: "#08304b"
        }
      },
      {
        featureType: "railway",
        elementType: "geometry.fill",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "railway",
        elementType: "geometry.stroke",
        stylers: {
          color: "#08304b"
        }
      },
      {
        featureType: "subway",
        elementType: "geometry",
        stylers: {
          lightness: -70
        }
      },
      {
        featureType: "building",
        elementType: "geometry.fill",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: {
          color: "#857f7f"
        }
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: {
          color: "#000000"
        }
      },
      {
        featureType: "building",
        elementType: "geometry",
        stylers: {
          color: "#022338"
        }
      },
      {
        featureType: "green",
        elementType: "geometry",
        stylers: {
          color: "#062032"
        }
      },
      {
        featureType: "boundary",
        elementType: "all",
        stylers: {
          color: "#1e1c1c"
        }
      },
      {
        featureType: "manmade",
        elementType: "geometry",
        stylers: {
          color: "#022338"
        }
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: {
          visibility: "off"
        }
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: {
          visibility: "off"
        }
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: {
          color: "#2da0c6",
          visibility: "on"
        }
      },
      {
        featureType: "background",
        elementType: "all",
        stylers: {
          color: "#200000"
        }
      }
    ]
  },
  defaultconfig: [
    {
      key: "theme",
      value: "dark",
      label: "界面主题",
      type: "select",
      required: true,
      options: [
        {
          value: "dark",
          label: "深色主题"
        },
        {
          value: "red",
          label: "紅色主题"
        }
      ]
    },
    {
      key: "refreshtime",
      value: 10 * 1000,
      label: "刷新时间",
      type: "number",
      required: true
    },
    {
      key: "turntime",
      value: 20 * 1000,
      label: "切换时间",
      type: "select",
      required: true,
      options: [
        {
          value: 20 * 1000,
          label: "20秒"
        },
        {
          value: 60 * 1000,
          label: "1分钟"
        },
        {
          value: 2 * 60 * 1000,
          label: "2分钟"
        },
        {
          value: 5 * 60 * 1000,
          label: "5分钟"
        }
      ]
    },
    {
      key: "serverurl",
      value: "/",
      label: "接口地址",
      type: "text",
      required: true
    }
  ],
  /**
   * 获取系统配置
   */
  getConfig: function () {
    var config = localStorage.getItem("config");
    if (!config) {
      config = this.defaultconfig;
    } else {
      config = JSON.parse(config);
    }
    return config;
  }
};