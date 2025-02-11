// https://ts-trainee-js-fullstack.s3.us-east-1.amazonaws.com/ts-trainee-fullstack-prescreen-task-description-v2.html
// https://docs.google.com/forms/d/17mnkC-UWPKsKwRiftXDuWRmL4psV6LqsLPz4rcurExk/viewform?edit_requested=true
class PowerStation {
  constructor(batteryCapacity, maximumInput, maximumOutput) {
    this.serviceStartTime = Date.now()
    this.batteryCapacity = batteryCapacity
    this.maximumInput = maximumInput
    this.maximumOutput = maximumOutput
    this.connectedDevices = []
    this.connectedInput = []
  }

  updateInput(inputId, voltage, current) {
    this.connectedInput.push({
      device: inputId,
      power: voltage * current,
      start: Date.now(),
      finish: undefined
    })
  }
  disconnectInput(inputId) {
    const deviceIndex = this.connectedInput.findIndex(e => e.device === outputId)
    if (deviceIndex === -1) return
    this.connectedInput[deviceIndex].power = 0
    this.connectedInput[deviceIndex].finish = Date.now()
  }

  connectOutput(outputId) {
    this.connectedDevices.push({
      device: outputId,
      power: 0,
      start: undefined,
      finish: undefined
    })
  }

  updateOutput(outputId, voltage, current) {
    const deviceIndex = this.connectedDevices.findIndex(e => e.device === outputId)
    if (deviceIndex === -1) return
    this.connectedDevices[deviceIndex].power = voltage * current
    this.connectedDevices[deviceIndex].start = Date.now()
  }

  disconnectOutput(outputId) {
    const deviceIndex = this.connectedDevices.findIndex(e => e.device === outputId)
    if (deviceIndex === -1) return
    this.connectedDevices[deviceIndex].power = 0
    this.connectedDevices[deviceIndex].finish = Date.now()
  }

  serviceHours(start, finish) {
    const serviceEnd = finish || Date.now()
    return (serviceEnd - start) / (1000 * 60 * 60)
  }

  get batteryMomentaryPower() {
    const totalPowerIn =
      this.connectedInput.reduce((acc, e) => acc + e.power * this.serviceHours(e.start, e.finish), 0)
    const totalPowerOut =
      this.connectedDevices.reduce((acc, e) => acc + e.power * this.serviceHours(e.start, e.finish), 0)

    return (this.batteryCapacity + totalPowerIn - totalPowerOut)
  }

  get batteryPercentage() {
    return this.batteryMomentaryPower * 100 / this.batteryCapacity
  }

  get totalOutputPower() {
    return this.connectedDevices.reduce((acc, e) => {
      if (e.finish === undefined || e.start !== undefined) return acc + e.power * this.serviceHours(e.start, e.finish)
    }, 0)
  }

  get timeRemaining() {
    const isInputConnected = this.connectedInput.some(e => e.start !== undefined && e.finish === undefined)
    const isOutputConnected = this.connectedDevices.some(e => e.start !== undefined && e.finish === undefined)
    if (!isInputConnected && !isOutputConnected) return 0
    if (isInputConnected) {
      const totalPowerIn =
        this.connectedInput.reduce((acc, e) => acc + e.power * this.serviceHours(e.start, e.finish), 0)
      return (this.batteryCapacity - this.batteryMomentaryPower) / totalPowerIn
    }
  }

  get status() {

  }
}

const powerStation = new PowerStation(100, 200, 150)
powerStation.connectOutput('output1')
powerStation.updateOutput('output1', 220, 15)
setTimeout(() => {
  console.log('totalOutputPower -> ', powerStation.totalOutputPower)
  console.log('batteryPercentage -> ', powerStation.batteryPercentage)
}, 10000)