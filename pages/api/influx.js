// const Influx = require('influx');
// const TOKEN = ''

// const influx= new Influx.InfluxDB({
//     host: 'localhost',
//     database: 'mydb',
//     port:8086,
//     token: TOKEN
// });

import {InfluxDB} from '@influxdata/influxdb-client'


const url = 'http://localhost:8086/';
const token = 'djsnxNNLMn71XfP7qR1lHbuvJE9SMdrFRW-TZmDQDckeqOzN4Q0mJDHhivoUo7YrxWN4KsHFCld9iBBPhrwAKg==';
const org = 'KubSTU';
const bucket = 'buck2'

const client = new InfluxDB({url: 'http://localhost:8086', token: token})



export default async (req, res) => {
    const {Point} = require('@influxdata/influxdb-client');
    const writeApi = client.getWriteApi(org, bucket);
    let data =[];
    const queryApi = client.getQueryApi(org)
    
    const query = `from(bucket: "buck2") |> range(start: -1h)`
    queryApi.queryRows(query, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            let d = {
                'time':o._time,
                'mesurement': o._measurement,
                'field': o._field,
                'value': o._value,
                'category': o.category,
            }
            data.push(d);
  },
  error(error) {
    console.error(error)
    console.log('Finished ERROR')
  },
  complete() {
    console.log('Finished SUCCESS')
    return res.json({
            message: data,
            success: true,
        });
  },
})




}
