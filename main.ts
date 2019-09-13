/**
 * KSRobot-IOT V0.010
 */
//% weight=10 color=#00A6F0 icon="\uf1eb" block="KSRobot_IOT"
namespace KSRobot_IOT {
    //serial
    let IOT_SERIAL_INIT = false
    let IOT_WIFI_CONNECTED = false
    let IOT_WIFI_SSID = ""
    let IOT_WIFI_PASSWORD = ""
    let IOT_SERIAL_TX = SerialPin.P8
    let IOT_SERIAL_RX = SerialPin.P15
    let LOCAL_IP = ""
    



    function IOT_serial_init(): void {
        serial.writeString("123")
        let item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            IOT_SERIAL_TX,   //TX
            IOT_SERIAL_RX,  //RX
            BaudRate.BaudRate9600
        )
        serial.setRxBufferSize(200)
        serial.setTxBufferSize(100)
        serial.writeString("\r")
        item = serial.readString()
        serial.writeString("|1|1|\r")
        item = serial.readUntil("\r")
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        IOT_SERIAL_INIT = true
    }
    function IOT_connect_wifi(): void {
        if (!IOT_SERIAL_INIT) {
            IOT_serial_init()
        }
        if (IOT_SERIAL_INIT) {
            
            let item = "test"
            serial.writeString("|2|1|" + IOT_WIFI_SSID + "," + IOT_WIFI_PASSWORD + "|\r") //Send wifi account and password instructions
            item = serial.readUntil("\r")
            while (item.indexOf("|2|3|") < 0) {
                item = serial.readUntil("\r")
            }
            //LOCAL_IP = item.substr(5, item.length - 6)
            IOT_WIFI_CONNECTED = true
            
        }

    }

    //% blockId=WIFI_SETUP
    //% block="KSRobot WIFI setup Set TXD %txd| RXD %rxd| SSID %ssid| PASSWORD %passwd "
    //% weight=99
    export function WIFI_SETUP(txd: SerialPin, rxd: SerialPin, ssid: string, passwd: string):void{
        
        
        IOT_SERIAL_TX = txd
        IOT_SERIAL_RX = rxd
        IOT_WIFI_SSID = ssid
        IOT_WIFI_PASSWORD = passwd
        IOT_serial_init()
        IOT_connect_wifi()
 
    }
    
}