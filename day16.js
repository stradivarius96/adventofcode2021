console.time('day16')
const fs = require('fs')
let packetQueue = []

// console.log(arr)
const hexBinary = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111",
}

fs.readFileSync('day16-input.txt').toString().split("").map(hex => packetQueue.push(...hexBinary[hex].split("")))

let versionTotal = 0

let parentPacket = subPacket({})
function subPacket() {

    let packet = {}
    // every packet has at least 2 hex at beginning for version and type

    // console.log(`Packet Queue: ${packetQueue}`)
    packet.versionBinary = packetQueue.splice(0, 3).join("")
    packet.version = parseInt(packet.versionBinary, 2)
    packet.typeBinary = packetQueue.splice(0, 3).join("")
    packet.type = parseInt(packet.typeBinary, 2)


    // literal packet type
    if (packet.type == 4) {
        packet.binary = ""

        while (packetQueue[0] == "1") {
            packet.binary += packetQueue.splice(0, 5).join("").slice(1, 5)
        }

        packet.binary += packetQueue.splice(0, 5).join("").slice(1, 5)
        packet.binaryValue = parseInt(packet.binary, 2)


    }

    // operator packet type
    else {
        packet.subPackets = []


        packet.lengthTypeId = packetQueue.shift()

        // 15 bits, total length in bits of sub packets
        if (packet.lengthTypeId == "0") {

            packet.totalLength = parseInt(packetQueue.splice(0, 15).join(""), 2)

            let startLength = packetQueue.length
            while (packetQueue.length > startLength - packet.totalLength) {
                packet.subPackets.push(subPacket(packet))
            }
        }

        // 11 bits, number of sub-packets immediately contained
        else if (packet.lengthTypeId == "1") {
            packet.numberofSubPacketsBinary = packetQueue.splice(0, 11).join("")
            packet.numberOfSubPackets = parseInt(packet.numberofSubPacketsBinary, 2)

            for (let i = 0; i < packet.numberOfSubPackets; i++) {
                packet.subPackets.push(subPacket(packet))
            }
        }

    }
    versionTotal += packet.version

    switch (packet.type) {
        // sum
        case 0:
            packet.value = packet.subPackets.reduce((tv, cv) => tv + cv.value, 0)
            packet.operation = `sum ${packet.subPackets.map(val => val.value).join(" + ")}`
            break;
        // product
        case 1:
            packet.value = packet.subPackets.reduce((pv, cv) => pv * cv.value, 1)
            packet.operation = `product ${packet.subPackets.map(val => val.value).join(" * ")}`
            break;
        // minimum
        case 2:
            packet.value = packet.subPackets.reduce((mv, cv) => cv.value < mv ? cv.value : mv, Infinity)
            packet.operation = `min ${packet.subPackets.map(val => val.value).join(" , ")}`
            break;
        // maximum
        case 3:
            packet.value = packet.subPackets.reduce((mv, cv) => cv.value > mv ? cv.value : mv, 0)
            packet.operation = `max ${packet.subPackets.map(val => val.value).join(" , ")}`
            break;
        // literal
        case 4:
            packet.value = packet.binaryValue
            break;
        // greater than
        case 5:
            packet.value = packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0
            packet.operation = `greater ${packet.subPackets.map(val => val.value).join(" > ")}`
            break;
        // less than
        case 6:
            packet.value = packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0
            packet.operation = `less ${packet.subPackets.map(val => val.value).join(" < ")}`
            break;
        // equal
        case 7:
            packet.value = packet.subPackets[0].value == packet.subPackets[1].value ? 1 : 0
            packet.operation = `equal ${packet.subPackets.map(val => val.value).join(" == ")}`
            break;
    }

    return packet
}

console.log(`Part 1 Answer: ${versionTotal}`)

console.log(`Part 2 Answer: ${parentPacket.value}`)

console.timeEnd('day16')