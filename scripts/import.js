#!/usr/bin/env node

const parse = require('csv-parse')
const fs = require('fs')
const repo = require('../app/repository/scheme-repository')

const processArgs = (args) => {
  const config = {
    filename: '',
    noOfRecords: 3000
  }
  if (typeof args[2] === 'undefined') {
    console.log('You must pass in a filename')
    process.exit(1)
  }
  config.filename = args[2]
  if (typeof args[3] !== 'undefined') {
    const val = parseInt(args[3])
    if (Number.isInteger(val)) {
      config.noOfRecords = val
    }
  }
  console.log(config)
  return config
}

const config = processArgs(process.argv)
let processed = 0

const inStream = fs.createReadStream(config.filename)

const parser = parse({
  to: config.noOfRecords,
  columns: true
})

parser.on('readable', async () => {
  let record
  while ((record = parser.read())) {
    if (processed < config.noOfRecords) {
      const importScheme = {
        sbi: record.SBI,
        agreementCode: record.AGREEMENT_CODE,
        agreementDesc: record.AGREEMENT_DESC,
        schemeOption: record.SCHEME_OPTION,
        schemeOptionDesc: record.SCHEME_OPTION_DESC,
        duration: record.DURATION,
        agreementStartYear: record.AGREEMENT_START_YR,
        agreementEndYear: record.AGREEMENT_END_YR,
        agreementStartDate: record.AGREEMENT_START_DT,
        agreementEndDate: record.AGREEMENT_END_DT,
        parcelId: record.PARCEL_ID,
        parcel: record.PARCEL,
        hectares: record.HECTARES
      }
      console.log(importScheme)
      await repo.create(importScheme)
      processed++
    }
  }
})
parser.on('end', () => {
  console.log(processed)
})

inStream.pipe(parser)
