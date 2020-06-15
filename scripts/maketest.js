const parse = require('csv-parse')
const fs = require('fs')

const processArgs = (args) => {
  const config = {
    filename: '',
    noOfRecords: 300
  }
  if (typeof args[2] === 'undefined') {
    console.error('You must pass in an input filename')
    process.exit(1)
  }
  config.filename = args[2]
  if (typeof args[3] !== 'undefined') {
    const val = parseInt(args[3])
    if (Number.isInteger(val)) {
      config.noOfRecords = val
    }
  }
  return config
}

const config = processArgs(process.argv)
let processed = 0
const SbiReplacementList = ['106599008']
let fakeSBICounter = 107000000
let fakeAgreementCounter = 11111
let fakeParcelId = 1111222
const fakeSbiList = []
const getFakeSbi = (SBI) => {
  const result = fakeSbiList[SBI]
  if (result) {
    return result
  } else {
    let sbiToUse = fakeSBICounter
    if (SbiReplacementList.length > 0) {
      sbiToUse = SbiReplacementList.pop()
    }
    const retval = [sbiToUse, fakeAgreementCounter]
    fakeSBICounter++
    fakeAgreementCounter++
    fakeSbiList[SBI] = retval
    return retval
  }
}

const inStream = fs.createReadStream(config.filename)

const parser = parse({
  to: config.noOfRecords,
  columns: false
})

parser.on('readable', async () => {
  let record
  while ((record = parser.read())) {
    if (processed < config.noOfRecords) {
      processed++
    }
    // SBI,AGREEMENT_CODE,AGREEMENT_DESC,SCHEME_OPTION,SCHEME_OPTION_DESC,DURATION,AGREEMENT_START_YR,AGREEMENT_END_YR,AGREEMENT_START_DT,AGREEMENT_END_DT,PARCEL_ID,PARCEL,HECTARES
    if (processed > 1) {
      const [fakeSbi, fakeAgreement] = getFakeSbi(record[0])
      record[0] = fakeSbi
      record[1] = record[1].replace(/\d*(\/.*)*/, `${fakeAgreement}$1`)
      record[10] = fakeParcelId
      record[11] = 'NN22224444'
      for (const i of [1, 2, 3, 4, 8, 9, 10, 11]) {
        record[i] = `"${record[i]}"`
      }
      fakeParcelId++
    }
    console.log(record.join(','))
  }
})
// parser.on('end', () => {
// })

inStream.pipe(parser)
