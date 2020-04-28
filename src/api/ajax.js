import axios from 'axios'//axios核心库
import ps from 'querystring'//用于将对象转为urlencoded字符串

// 该文件是对axios这个库的二次封装?:
        // 1.配置请求的基础路径
        // 2.配置超时时间
        // 3.统一处 理post请求json编码问题(转为urlencoded)
        // 2.统一返回真正的数据data, 而不是axios包装的那个response对象
    
    
                //配置请求的基础路径
            axios.defaults.baseURL = 'http://localhost:3000'
            //配置超时时间
            axios.defaults.timeout = 2000
    //请求拦截器
        axios.interceptors.request.use((config)=>{
            //     3.统处理post 请求json编码问题 (转为urlencoded)
                const {method,data}=config
                 //method请求方式   data  输入框输入的用户信息
                 //toLowerCase()转换为小写
                 //data类型为对象
                if (method.toLowerCase()==="post" && data instanceof Object) {
                    //使用querystring将data内容转换为urlencoded  username=admin&password=adminc
                    config.data = ps.stringify(data)
                }
                 return config 
             })
  //响应拦截器
         axios.interceptors.response.use(
  //  4.统一返回真正的数据data, 而不是axios包装的那个response对象     
           //成功的回调:返回的http状态码是2开头
             response => {
                return response.data
            },
            //失败的回调: 1. 返回的状态码不是2开头; 2. 达到了超时时间; 3. 网络不通
            error => {
                return  Promise.reject ('阿偶，失败了! ')
            }
         ) 
//暴露axios
export default axios