/**
 * KSRobot_IOT V0.010
 */
//% weight=10 color=#00A6F0 icon="\uf1eb" block="KSRobot_IOT"
namespace KSRobot_IOT {

    let IOT_WIFI_CONNECTED = false
    let IOT_MQTT_CONNECTED = false
    let local_ip = "0.0.0.0"
    let iot_receive_data = ""



    function WifiDataReceived(): void {
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {

            iot_receive_data = serial.readLine()

        })

    }



    //% blockId=Wifi_setup
    //% block="KSRobot WIFI Set | TXD %txd| RXD %rxd| SSID %ssid| PASSWORD %passwd"
    //% weight=99
    //% txd.defl= SerialPin.P15 rxd.defl= SerialPin.P8
    export function Wifi_setup(txd: SerialPin, rxd: SerialPin, ssid: string, passwd: string): void {
        serial.redirect(
            txd,   //TX
            rxd,  //RX
            BaudRate.BaudRate115200
        );
        serial.setRxBufferSize(128)
        serial.setTxBufferSize(128)
        //WifiDataReceived()
        control.waitMicros(500000)
        serial.writeLine("AT+Restart=");
        control.waitMicros(500000)
        serial.writeLine("AT+AP_SET?ssid=" + ssid + "&pwd=" + passwd + "&AP=1=");
        IOT_WIFI_CONNECTED = true

    }

    //% blockId=Get_IP
    //% block="Get Local IP"
    export function Get_IP(): string {
        let receivedata = local_ip
        return receivedata;
    }



    //% blockId=ThingSpeak_set
    //% block="ThingSpeak Set|Write API key = %api_key|Field 1 = %field1|Field 2 = %field2|Field 3 = %field3|Field 4 = %field4|Field 5 = %field5|Field 6 = %field6|Field 7 = %field7|Field 8 = %field8"
    export function ThingSpeak_set(api_key: string, field1: number, field2: number, field3: number, field4: number, field5: number, field6: number, field7: number, field8: number): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+ThingSpeak?host=http://api.thingspeak.com/update&api_key="
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
            serial.writeLine("AT+IFTTT?host=http://maker.ifttt.com/trigger/"
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
    export function MQTT_set(host: string, port: number, clientId: string, username: string, pwd: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+MQTT?host=" + host + "&port=" + port + "&clientId=" + clientId + "&username=" + username + "&password=" + pwd + "=");
            IOT_MQTT_CONNECTED = true
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

    //% blockId=MQTT_Data
    //% block="MQTT Topic %receivedata"
    export function MQTT_Data(receivedata: string): string {

        return receivedata;

    }


    //% blockId=HTML_POST
    //% block="HTML_POST Server %host| Header %header| Body %body"
    export function HTML_POST(host: string, header: string, body: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+HTML_POST?host="
                + host
                + "&header="
                + header
                + "&body="
                + body
                + "=");
        }
    }

    //% blockId=TCP_Client
    //% block="TCP_Client Server %host| Port %port| Send Data %senddata"
    export function TCP_Client(host: string, port: number, senddata: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+TCP_Client?host="
                + host
                + "&port="
                + port
                + "&senddata="
                + senddata
                + "=");
        }
    }

    //% blockId=TCP_Server
    //% block="TCP_Server Port %port"
    export function TCP_Server(port: number): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+TCP_Server?port="
                + port
                + "=");
        }
    }

    //% blockId=TCP_SendData
    //% block="TCP_Server Send Data %senddata"
    export function TCP_SendData(senddata: string): void {
        if (IOT_WIFI_CONNECTED) {
            serial.writeLine("AT+TCP_SendData?senddata="
                + senddata
                + "=");
        }
    }


    //% blockId=Receive_Data
    //% block="Receive Data"
    export function Receive_Data(): string {
        let receivedata = iot_receive_data
        return receivedata;
    }




}