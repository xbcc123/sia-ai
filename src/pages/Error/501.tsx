import { Button, Result, Typography } from "antd"

const Error501 = () => {
    const urlParams = new URLSearchParams(location.search);
	return  <Result
	  status="404"
	  title=""
	  extra={<Typography.Title level={4} style={{color: 'red'}}>
		{urlParams.get('msg')}
	  </Typography.Title>}
	/>
}
export default Error501