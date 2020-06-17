#!/usr/bin/env node

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
let fakeSbiCounter = 107000000
let fakeAgreementCounter = 11111
let fakeParcelId = 1111222
const fakeSbiList = {}
const getFakeIdentifiers = (SBI) => {
  const existingFakeIdentifiers = fakeSbiList[SBI]
  if (existingFakeIdentifiers) {
    return existingFakeIdentifiers
  } else {
    let sbiToUse = fakeSbiCounter
    if (SbiReplacementList.length > 0) {
      sbiToUse = SbiReplacementList.pop()
    }
    const newFakeIdentifiers = [sbiToUse, fakeAgreementCounter]
    fakeSbiCounter++
    fakeAgreementCounter++
    fakeSbiList[SBI] = newFakeIdentifiers
    return newFakeIdentifiers
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
      const [fakeSbiId, fakeAgreementId] = getFakeIdentifiers(record[0])
      record[0] = fakeSbiId
      record[1] = record[1].replace(/\d*(\/.*)*/, `${fakeAgreementId}$1`)
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

inStream.pipe(parser)
