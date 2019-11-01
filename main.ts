/**
 * KSRobot_IOT V0.010
 */
//% weight=10 color=#00A6F0 icon="\uf1eb" block="KSRobot_IOT"
namespace KSRobot_IOT {

    let IOT_WIFI_CONNECTED = false
    let IOTReturnArray: string[] = []
    let LocalIP = ""


    //% blockId=Wifi_setup
    //% block="KSRobot WIFI Set | TXD %txd| RXD %rxd| SSID %ssid| PASSWORD %passwd"
    //% weight=99
    export function Wifi_setup(txd: SerialPin, rxd: SerialPin, ssid: string, passwd: string): void {
        serial.redirect(
            SerialPin.P15,   //TX
            SerialPin.P8,  //RX
            BaudRate.BaudRate115200
        );
        serial.setRxBufferSize(256)
        serial.setTxBufferSize(256)
        serial.writeLine("AT+Restart=");
        serial.writeLine("AT+AP_SET?ssid=" + ssid + "&pwd=" + passwd + "=");
        LocalIP = "192.168.1.1"
        IOT_WIFI_CONNECTED = true
    }

    //% blockId=ThingSpeak_set
    //% block="ThingSpeak Set|Write API key = %api_key|Field 1 = %field1|Field 2 = %field2|Field 3 = %field3|Field 4 = %field4|Field 5 = %field5|Field 6 = %field6|Field 7 = %field7|Field 8 = %field8"
    export function ThingSpeak_set(api_key: string, field1: number, field2: number, field3: number, field4: number, field5: number, field6: number, field7: number, field8: number): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+ThingSpeak?host=api.thingspeak.com/update&api_key="
                + api_key
                + "&field1="
                + field1
                + "&field2="
                + field2
                + "&field3="
                + field3
                + "&field4="
                + field4
                + "&field5="
                + field5
                + "&field6="
                + field6
                + "&field7="
                + field7
                + "&field8="
                + field8
                + "=");
        }
    }

    //% blockId=IFTTT_set
    //% block="IFTTT Set|Event Name = %event_name| Write API key = %api_key| Value 1 = %value1| Value 2 = %value2| Value 3 = %value3"
    export function IFTTT_set(event_name: string, api_key: string, value1: string, value2: string, value3: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+IFTTT?host=maker.ifttt.com/trigger/"
                + event_name
                + "/with/key/"
                + api_key
                + "&value1="
                + value1
                + "&value2="
                + value2
                + "&value3="
                + value3
                + "=");
        }
    }

    //% blockId=MQTT_set
    //% block="Connect MQTT server %host| port %port| client id %clientId| username %username| password %pwd"
    export function MQTT_set(host: string, port: string, clientId: string, username: string, pwd: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+MQTT?host=" + host + "&port=" + port + "&clientId=" + clientId + "&username=" + username + "&password=" + pwd +
                + "=");
        }
    }

    //%blockId=MQTTPublish
    //% block="MQTT publish topic %topic| payload %payload"
    export function MQTTPublish(topic: string, payload: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+MQTT_Publish?topic=" + topic + "&payload=" + payload + "=");
        }
    }

    //%blockId=MQTTSubscribe
    //% block="MQTT subscribe topic %topic"
    export function MQTTSubscribe(topic: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+MQTT_Subscribe?topic=" + topic + "=");
        }
    }

    //%blockId=GetIP
    //%block="Get IP Address"
    export function GetIP(): string {
        if (IOT_WIFI_CONNECTED) {
            return LocalIP;
        }
    }


    //% blockId="GetIOTReturn" 
    //% block="IOT response"
    export function GetIOTReturn(): Array<string> {
        if (IOT_WIFI_CONNECTED) {
            return IOTReturnArray;
        }
    }

}