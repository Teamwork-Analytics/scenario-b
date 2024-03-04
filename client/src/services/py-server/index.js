import axios from "axios";
import toast from "react-hot-toast";

const DOMAIN_NAME = process.env.REACT_APP_PYSERVER_IP;
const PORT_NUMBER = process.env.REACT_APP_PYSERVER_PORT;

const communicationAPI = axios.create({
  baseURL: `${DOMAIN_NAME}:${PORT_NUMBER}`, //Change this if the port is being used.
});

communicationAPI.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        get: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    };
  },
  (error) => Promise.reject(error)
);

communicationAPI.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      toast.error("You are not authorised!");
    }
    return response;
  },
  function (error) {
    console.log(error);
    let message = error.response.statusText;
    if (error.response.data !== undefined) {
      if (error.response.data.code === 403) return;
      message = error.response.data;
    }
    message += ` - Python service error:`;

    // toast.error(`${message} (${error}):`); // disabled -> cause re-rendering bug. TODO: must fix the component state structure.
    console.error(`${message} (${error}):`); // disabled -> cause re-rendering bug. TODO: must fix the component state structure.
    // Do something with response error
    // return Promise.reject(message);
  }
);

const getSNAdata = async (simulationId) => {
  return await communicationAPI.get(`/get_data?sessionId=${simulationId}`);
};

const getENAdata = async (body) => {
  const { simulationId, startTime, endTime } = body;

  // Hard coded data for session 350
  const allResponse = `{"data":{"acknowledging":{"acknowledging":0,"escalation":9,"questioning":136,"task allocation":122},"escalation":{"acknowledging":9,"escalation":0,"questioning":4,"task allocation":9},"questioning":{"acknowledging":136,"escalation":4,"questioning":0,"task allocation":84},"task allocation":{"acknowledging":122,"escalation":9,"questioning":84,"task allocation":0}},"status":200,"statusText":"OK","headers":{"content-length":"389","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_ena_data?sessionId=350&start=0&end=1196"},"request":{}}`;
  const scnStartedResponse = `{"data":{"acknowledging":{"acknowledging":0,"escalation":0,"questioning":0,"task allocation":0},"escalation":{"acknowledging":0,"escalation":0,"questioning":0,"task allocation":0},"questioning":{"acknowledging":0,"escalation":0,"questioning":0,"task allocation":0},"task allocation":{"acknowledging":0,"escalation":0,"questioning":0,"task allocation":0}},"status":200,"statusText":"OK","headers":{"content-length":"379","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_ena_data?sessionId=350&start=2&end=109"},"request":{}}`;
  const handoverResponse = `{"data":{"acknowledging":{"acknowledging":0,"escalation":3,"questioning":15,"task allocation":15},"escalation":{"acknowledging":3,"escalation":0,"questioning":3,"task allocation":3},"questioning":{"acknowledging":15,"escalation":3,"questioning":0,"task allocation":15},"task allocation":{"acknowledging":15,"escalation":3,"questioning":15,"task allocation":0}},"status":200,"statusText":"OK","headers":{"content-length":"385","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_ena_data?sessionId=350&start=109&end=293"},"request":{}}`;
  const secondaryResponse = `{"data":{"acknowledging":{"acknowledging":0,"escalation":6,"questioning":31,"task allocation":33},"escalation":{"acknowledging":6,"escalation":0,"questioning":1,"task allocation":6},"questioning":{"acknowledging":31,"escalation":1,"questioning":0,"task allocation":20},"task allocation":{"acknowledging":33,"escalation":6,"questioning":20,"task allocation":0}},"status":200,"statusText":"OK","headers":{"content-length":"385","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_ena_data?sessionId=350&start=293&end=600"},"request":{}}`;
  const doctorResponse = `{"data":{"acknowledging":{"acknowledging":0,"escalation":0,"questioning":90,"task allocation":74},"escalation":{"acknowledging":0,"escalation":0,"questioning":0,"task allocation":0},"questioning":{"acknowledging":90,"escalation":0,"questioning":0,"task allocation":49},"task allocation":{"acknowledging":74,"escalation":0,"questioning":49,"task allocation":0}},"status":200,"statusText":"OK","headers":{"content-length":"385","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_ena_data?sessionId=350&start=600&end=1196"},"request":{}}`;

  let resResponse; // Declare resResponse outside the switch

  // Create a condition key for switch
  const conditionKey = `${simulationId}-${startTime}-${endTime}`;

  switch (conditionKey) {
    case "350-0-1196":
      resResponse = allResponse;
      break;
    case "350-2-109":
      resResponse = scnStartedResponse;
      break;
    case "350-109-293":
      resResponse = handoverResponse;
      break;
    case "350-293-600":
      resResponse = secondaryResponse;
      break;
    case "350-600-1196":
      resResponse = doctorResponse;
      break;
    default:
      resResponse = allResponse;
      break;
  }

  return JSON.parse(resResponse);
};

const getTeamworkBarchart = async (body) => {
  const { simulationId, startTime, endTime } = body;

  // Hard coded data for session 350
  const allResponse = `{"data":[{"label":["Working together","on tasks for Ruth"],"value":5.982436882546653},{"label":["Working individually","on tasks for Ruth"],"value":38.446761800219534},{"label":["Working together","on other tasks"],"value":3.7870472008781553},{"label":["Working individually","on other tasks"],"value":26.09769484083425},{"label":["Moving around","the beds"],"value":25.686059275521405}],"status":200,"statusText":"OK","headers":{"content-length":"380","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_teamwork_prio_data?sessionId=350&start=0&end=1196"},"request":{}}`;
  const scnStartedResponse = ` {"data":[{"label":["Working together","on tasks for Ruth"],"value":0},{"label":["Working individually","on tasks for Ruth"],"value":0},{"label":["Working together","on other tasks"],"value":82.22222222222221},{"label":["Working individually","on other tasks"],"value":2.2222222222222214},{"label":["Moving around","the beds"],"value":15.555555555555554}],"status":200,"statusText":"OK","headers":{"content-length":"351","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_teamwork_prio_data?sessionId=350&start=2&end=109"},"request":{}}`;
  const handoverResponse = ` {"data":[{"label":["Working together","on tasks for Ruth"],"value":0},{"label":["Working individually","on tasks for Ruth"],"value":90.0990099009901},{"label":["Working together","on other tasks"],"value":0},{"label":["Working individually","on other tasks"],"value":0},{"label":["Moving around","the beds"],"value":9.900990099009901}],"status":200,"statusText":"OK","headers":{"content-length":"334","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_teamwork_prio_data?sessionId=350&start=109&end=293"},"request":{}}`;
  const secondaryResponse = `{"data":[{"label":["Working together","on tasks for Ruth"],"value":7.298578199052133},{"label":["Working individually","on tasks for Ruth"],"value":36.77725118483412},{"label":["Working together","on other tasks"],"value":0.6635071090047393},{"label":["Working individually","on other tasks"],"value":30.61611374407583},{"label":["Moving around","the beds"],"value":24.644549763033176}],"status":200,"statusText":"OK","headers":{"content-length":"379","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_teamwork_prio_data?sessionId=350&start=293&end=600"},"request":{}}`;
  const doctorResponse = `{"data":[{"label":["Working together","on tasks for Ruth"],"value":6.409090909090908},{"label":["Working individually","on tasks for Ruth"],"value":33.68181818181819},{"label":["Working together","on other tasks"],"value":2.590909090909091},{"label":["Working individually","on other tasks"],"value":28.454545454545453},{"label":["Moving around","the beds"],"value":28.863636363636363}],"status":200,"statusText":"OK","headers":{"content-length":"379","content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"FormData":null},"headers":{"Access-Control-Allow-Origin":"*"},"baseURL":"http://localhost:5003","method":"get","url":"/get_teamwork_prio_data?sessionId=350&start=600&end=1196"},"request":{}}`;

  let resResponse; // Declare resResponse outside the switch

  // Create a condition key for switch
  const conditionKey = `${simulationId}-${startTime}-${endTime}`;

  switch (conditionKey) {
    case "350-0-1196":
      resResponse = allResponse;
      break;
    case "350-2-109":
      resResponse = scnStartedResponse;
      break;
    case "350-109-293":
      resResponse = handoverResponse;
      break;
    case "350-293-600":
      resResponse = secondaryResponse;
      break;
    case "350-600-1196":
      resResponse = doctorResponse;
      break;
    default:
      resResponse = allResponse;
      break;
  }

  return JSON.parse(resResponse);
};

export { getSNAdata, getENAdata, getTeamworkBarchart };
