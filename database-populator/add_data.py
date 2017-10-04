import argparse
import json
from random import randint

parser = argparse.ArgumentParser(description='Populates a firebase data export JSON')
parser.add_argument('inputFileName', metavar='inputFileName', type=str, nargs=1,
                   help='an integer for the accumulator')

args = parser.parse_args()
fileName = args.inputFileName[0]

try:
    with open(fileName) as f:
        current_json = f.read()
except FileNotFoundError:
    print("Error")
    print(fileName + " is not in the directory this script is in. Put it in here.")
    exit(1)

data = json.loads(current_json)

siteName = 0
while True:
    siteName = input("Please enter the site you want to access, enter h to get list of siteNames: ")
    if siteName.strip() == 'h':
        for i in data['sites']:
            print(i)
    elif siteName not in data['sites']:
        print("That's not a site name, these are the site names:")
        for i in data['sites']:
            print(i)
    else:
        break

while True:
    timeStamp = input("Please enter the time stamp you want to access, enter h to get list of timeStamps: ")
    if timeStamp.strip() == 'h':
        for i in data['sites'][siteName]['measurements']:
            print(i)
    elif timeStamp not in data['sites'][siteName]['measurements']:
        print("That's not a site name, these are the site names:")
        for i in data['sites'][siteName]['measurements']:
            print(i)
    else:
        break

trees = data['sites'][siteName]['measurements'][timeStamp]['trees']

fixedHeight = False
randomHeightRange = False
while True:
    randomOrFixed = input("Do you want the heights of the trees to be random or fixed? ")
    if randomOrFixed == 'random':
        heightMin = input("What should the minimum height be? ")
        try:
            tmp = int(heightMin)
            if(tmp<200):
                print("Height needs to be greater than 200")
                continue
        except:
            print("That's not an integer")
            continue

        heightMax = input("What should the maximum height be? ")
        try:
            tmp = int(heightMax)
            randomHeightRange = [int(heightMin), int(heightMax)]
        except:
            print("That's not an integer")
            continue

        if(randomHeightRange[0] >= randomHeightRange[1]):
            print("The minimum needs to be smaller than the maximum")
            continue
        randomHeightRange = [int(heightMin), int(heightMax)]
        break
    elif randomOrFixed == 'fixed':
        fixedHeight = input("What should the heights be? ")
        try:
            tmp = int(fixedHeight)
            break
        except:
            print("That's not an integer")
            continue
    else:
        print("Type in random or fixed or ctrl+c to exit")

numberOfSpecies = None
while True:
    numberOfSpecies = input("How many tree types should there be? ")
    try:
        tmp = int(numberOfSpecies)
        break
    except:
        print("That's not an integer")
        continue

dbhsRangeCount = None
dbhsValueRange = None
while True:
    dbhsRangeCountMin = input("What should the minimum dbhs count be? ")
    try:
        tmp = int(dbhsRangeCountMin)
        if (tmp < 1):
            print("We always need at least 1 dbhs")
            continue
    except:
        print("That's not an integer")
        continue

    dbhsRangeCountMax = input("What should the maximum dbhs count be? ")
    try:
        tmp = int(dbhsRangeCountMax)
    except:
        print("That's not an integer")
        continue

    dbhsRangeCount = [int(dbhsRangeCountMin), int(dbhsRangeCountMax)]

    if (dbhsRangeCount[0] >= dbhsRangeCount[1]):
        print("The minimum needs to be smaller than the maximum")
        continue

    dbhsRangeCount = [int(dbhsRangeCountMin), int(dbhsRangeCountMax)]
    break

dbhsValueRange = None
while True:
    dbhsValueRangeMin = input("What should the minimum dbhs value be? ")
    try:
        tmp = int(dbhsValueRangeMin)
        if (tmp < 1):
            print("We always need at least 1 dbhs")
            continue
    except:
        print("That's not an integer")
        continue

    dbhsValueRangeMax = input("What should the maximum dbhs value be? ")
    try:
        tmp = int(dbhsValueRangeMax)
    except:
        print("That's not an integer")
        continue

    dbhsValueRange = [int(dbhsValueRangeMin), int(dbhsValueRangeMax)]

    if (dbhsValueRange[0] >= dbhsValueRange[1]):
        print("The minimum needs to be smaller than the maximum")
        continue
    dbhsValueRange = [int(dbhsValueRangeMin), int(dbhsValueRangeMax)]
    break

dataCount = None
while True:
    dataCount = input("How much data do you want? ")
    try:
        tmp = int(dataCount)
        break
    except:
        continue

otherTrees = dict(trees)
for i in range(int(dataCount)):
    dbhs = []
    for j in range(0, randint(int(dbhsRangeCount[0]), int(dbhsRangeCount[1]))):
        dbhs.append(str(randint(int(dbhsValueRange[0]), int(dbhsValueRange[1]))))
    otherTrees[str(i)] = {'species': 'tree ' + str(randint(0, int(numberOfSpecies))),
                          'dbhs': dbhs,
                          'height': str(randint(int(randomHeightRange[0]), int(randomHeightRange[1])))}

data['sites'][siteName]['measurements'][timeStamp]['trees'] = otherTrees

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)
