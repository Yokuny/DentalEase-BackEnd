type ServiceRes = {
  data?: {} | [];
  message?: string;
};

type badServiceRes = {
  message: string;
};

const badRespObj = ({ message }: badServiceRes) => ({ success: false, message });
const respObj = ({ data = {}, message = "" }: ServiceRes) => ({ success: true, data, message });

const returnMessage = (message: string) => ({ message });
const returnData = (data: {} | []) => ({ data });
const returnDataMessage = (data: {} | [], message: string) => ({ data, message });

export { respObj, badRespObj, ServiceRes, returnMessage, returnData, returnDataMessage };
