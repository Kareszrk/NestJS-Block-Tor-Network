import { createParamDecorator } from '@nestjs/common';

export const IpAddress = createParamDecorator((data, req) => {
	if (req.clientIp)
		return req.clientIp;
});
