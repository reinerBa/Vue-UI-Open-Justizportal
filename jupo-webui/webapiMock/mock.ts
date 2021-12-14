import moment from 'moment'
import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/webapi/token',
        method: 'post',
        response: ({url, body, query, headers}) => {
          if(body.username === "fail") return {returnCode: "ERROR_WRONG_CREDENTIALS"}
          
          return {
              returnCode: "OK",
              authInfo: {
                  token: "toki",
                  expiresIn: 900
                }
            }
        }
    },
    {
    url: '/webapi/akteneinsichten',
    method: 'get',
    response: () => [{
        id: "53e9a97b6f294cf491eb9a6d00add72a",
        aktenzeichen:"7 O 101/18n",
        nurVorschau:false,
        bereitstellung:"2021-09-07T00:00:00",
        ablauf: "2022-10-07T00:00:00"
    }],
  },
  {
    url: '/webapi/akteneinsichten/53e9a97b6f294cf491eb9a6d00add72a',
    method: 'get',
    response: () => {
      return {
          id:"53e9a97b6f294cf491eb9a6d00add72a",
          aktenzeichen:"7 O 101/18n",
          nurVorschau: false,
          bereitstellung:"2021-09-07T00:00:00",
          ablauf:"2022-10-07T00:00:00",
          datei: {
              id:"6b2c544b65994662a090fec4c2d534d6",
              dateiname: "7 O 101_18n.zip",
              mimeType: "application/zip",
              size: 1803183
          }
        }
    },
  },
  {
    url: '/webapi/akteneinsichten/53e9a97b6f294cf491eb9a6d00add72a/details',
    method: 'get',
    response: ({ username, password }) => {
      return [{
          id: "14916678cae44ee1b5d60b8a9a206c8c",
          nummer: 9,
          datum: "2021-09-07T00:00:00",
          beschreibung: "09 - VFG-Schriftliches Vorverfahren",
          datei: {
              id: "436a1531d8734ef69571d6711974f998",
              dateiname: "09 - VFG-Schriftliches Vorverfahren.pdf",
              mimeType: "application/pdf",
              size: 226823
            }
        },
        {
            id: "1514920642d04aaaa62620b93d3d90a1",
            nummer: 8,
            datum: "2021-09-07T00:00:00",
            beschreibung: "08 - Fehlblatt",
            datei: {
                id: "2d2145b373db47c2976ee3f74387cc00",
                dateiname: "08 - Fehlblatt.pdf",
                mimeType: "application/pdf",
                size: 85277
            }
        }]
    },
  },
  {
    url: '/webapi/token/refresh',
    method: 'get',
    response: {
        returnCode:"OK",
        authInfo: {
            token: "toki",
            expiresIn: 900
        }
    },
  },
  {
    url: '/webapi/monitoring/verifyPassword/1',
    method: 'post',
    response: "true",
  },
  {
    url: '/webapi/monitoring/usageStatistic',
    method: 'post',
    response: ({password, startDate, endDate }) => {
        // var d = moment().subtract(1, 'day')
        let day = startDate
        return [
        {
            "hour": 8, day,
            "controller": "Token",
            "action": "GetToken",
            "count": 1
        },
        {
            "hour": 20, day,
            "controller": "Akteneinsichten",
            "action": "GetDetailsByAkteneinsichtId",
            "count": 5
        },
        {
            "hour": 21, day,
            "controller": "Token",
            "action": "RefreshToken",
            "count": 12
        },
        {
            "hour": 21, day,
            "controller": "Monitoring",
            "action": "VerifyPassword",
            "count": 1
        },
        {
            "hour": 22, day,
            "controller": "Monitoring",
            "action": "VerifyPassword",
            "count": 1
        }
    ]},
  },/* {
    url: '/api/text',
    method: 'post',
    timeout: 2000,
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },*/
] as MockMethod[]