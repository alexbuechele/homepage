import sys
from time import sleep
import requests

## takes command line FromFile and ToFile arguments, converts
## from nginx log format to just IP address and datetime

def nginx_to_txt():
    with open(sys.argv[1], "r") as fromFile, open(sys.argv[2], "a") as toFile:

        entries = fromFile.readlines()

        ## will be a list of tuples
        entriesToSort = []

        for entry in entries:
            entry = entry.replace("Jan", "1").replace("Feb", "2").replace("Mar", "3").replace("/", ":")

            line = entry.split(" - - [")

            ip = line[0]

            dateTimeString = line[1].split(":")

            day = dateTimeString[0]
            month = dateTimeString[1]
            year = dateTimeString[2]
            hour = dateTimeString[3]
            minute = dateTimeString[4]
            second = dateTimeString[5].split(" ")[0]

            ## TO_TIMESTAMP('2017-03-31 9:30:20','YYYY-MM-DD HH:MI:SS');
            timeStamp = year + "-" + \
                        month + "-" + \
                        day + " " + \
                        hour + ":" + \
                        minute + ":" + \
                        second
            ## append the tuple
            entriesToSort.append((ip, timeStamp))

        entriesToSort.sort(key=lambda time: time[1])

        lastip = ""
        for sortedEntry in entriesToSort:
            if lastip != sortedEntry[0]:
                toFile.write(sortedEntry[0] + "," + sortedEntry[1] + "\n")
                lastip = sortedEntry[0]


## takes command line arg of filename for comma-delineated file
## prints number of unique IP addresses
def unique_ip_count():
    with open(sys.argv[1], "r") as fromFile:
        lines = fromFile.readlines()
        addressSet = set()
        for line in lines:
            addressSet.add(line.split(',')[0])

        print(len(addressSet))

## takes command line fromFile, toFile args
## fromFile is comma-separated ip address and timestamp with newline
## toFile should be comma-separated data by format:
##
## uses ip-api.com to add geolocation and isp data
def add_ip_api_data():
    with open(sys.argv[1], "r") as fromFile, open(sys.argv[2], "a") as toFile:
        lines = fromFile.readlines()
        addressSet = set()
        for line in lines:
            addressSet.add(line.split(',')[0])

        lineInfoPairs = {}


        for address in addressSet:
            ## get string
            urlString = ("http://ip-api.com/csv/" + address +"?fields=" +
            "country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,status,message")

            ## message only returned with fail

            response = requests.get(urlString)
            addressInfo = response.content

            ## REWORK THIS TO USE JSON FOR RETURNED VALUES ??
            ## RELYING ON ORDER WITH CSV DOESN'T SEEM SAFE ??
            ## HANDLE COMMA (DELIMITER CHARACTER) IN FIELDS
            ## HANDLE QUOTES IN FIELDS

            lineInfoPairs[address] = addressInfo
            sleep(0.5)

        for line in lines:
            address = line.split(',')[0]
            toFile.write(line[:-1] + "," + lineInfoPairs[address] + "\n")





def main():
    ##nginx_to_txt()
    ##unique_ip_count()
    add_ip_api_data()

if __name__ == "__main__":
    main()
